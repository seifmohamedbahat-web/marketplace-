import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import { providers, getProvider, readyProviders } from './providers/index.js';
import { detectDir, detectName, detectRepo, sanitizeName } from './detect.js';
import { applyGlobalTokensToEnv, writeGlobalToken, readProjectConfig, writeProjectConfig } from './config.js';
import { runSteps } from './run.js';

const HELP = `deploy-cli — one command to deploy a static site to a free host with a live subdomain.

Usage:
  deploy-cli init [--dir <path>] [--name <name>] [--provider <id>]
                                           Detect this project and save deploy.config.json
                                           (prompts interactively for anything not passed as a flag)
  deploy-cli deploy [options]             Deploy the project
  deploy-cli login <provider> [values...] Save token(s) for a provider (~/.config/deploy-cli/tokens.json)
                                           Pass values positionally in the order shown by "providers",
                                           or omit them to be prompted interactively.
  deploy-cli providers                    List supported providers and how to get a free token
  deploy-cli --help                       Show this help

Deploy options:
  --to <provider|all|a,b,c>   Target provider(s): surge, netlify, vercel, cloudflare, gh-pages, or "all"
                               (all = every provider whose token is already configured)
  --dir <path>                Directory to deploy (auto-detected: dist/build/out/public/.)
  --name <subdomain>          Subdomain / site name, e.g. "myapp" -> myapp.surge.sh (auto-detected)
  --repo <owner/name>         GitHub repo for gh-pages (auto-detected from git remote)
  --prod                      Deploy to production instead of a preview (netlify, vercel)
  --dry-run                   Print the commands without running them

Examples:
  deploy-cli init
  deploy-cli deploy --to surge --name my-portfolio
  deploy-cli deploy --to netlify,vercel --prod
  deploy-cli deploy --to all --dry-run
`;

const BOOLEAN_FLAGS = new Set(['prod', 'dry-run', 'help']);

// A value-flag with no following value (e.g. trailing, or followed by another
// --flag) parses to `true` rather than a string — treat that as "not provided".
function strFlag(value) {
  return typeof value === 'string' ? value : undefined;
}

function parseFlags(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (BOOLEAN_FLAGS.has(key) || next === undefined || next.startsWith('--')) {
      flags[key] = true;
    } else {
      flags[key] = next;
      i += 1;
    }
  }
  return flags;
}

export async function runCli(argv) {
  const [command, ...rest] = argv;

  if (!command || command === '--help' || command === '-h' || command === 'help') {
    console.log(HELP);
    return;
  }

  if (command === 'providers') {
    return cmdProviders();
  }

  if (command === 'init') {
    return cmdInit(parseFlags(rest));
  }

  if (command === 'login') {
    return cmdLogin(rest[0], rest.slice(1));
  }

  if (command === 'deploy') {
    return cmdDeploy(parseFlags(rest));
  }

  throw new Error(`Unknown command "${command}". Run "deploy-cli --help" for usage.`);
}

function cmdProviders() {
  console.log('Supported providers:\n');
  for (const provider of providers) {
    console.log(`${provider.label} (--to ${provider.id})`);
    console.log(`  Free URL:     ${provider.urlPattern ?? `<name>.${provider.domainSuffix}`}`);
    console.log(`  Needs env:    ${provider.requiredEnv.join(', ') || '(none required)'}`);
    console.log(`  Get a token:  ${provider.tokenHelpUrl}`);
    console.log(`  Setup:        ${provider.setupNote}`);
    console.log('');
  }
}

async function cmdInit(flags) {
  const cwd = process.cwd();
  const existing = readProjectConfig(cwd);
  const detectedDir = detectDir(cwd) ?? '.';
  const detectedName = detectName(cwd);
  const flagDir = strFlag(flags.dir);
  const flagName = strFlag(flags.name);
  const flagProvider = strFlag(flags.provider);
  const interactive = process.stdin.isTTY && !(flagDir && flagName && flagProvider);

  let dir = flagDir ?? existing?.dir ?? detectedDir;
  let name = flagName ?? existing?.name ?? detectedName;
  let provider = flagProvider ?? existing?.provider ?? 'surge';

  if (interactive) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    try {
      if (!flagDir) dir = (await rl.question(`Directory to deploy [${dir}]: `)).trim() || dir;
      if (!flagName) name = (await rl.question(`Subdomain name [${name}]: `)).trim() || name;
      if (!flagProvider) {
        provider =
          (await rl.question(`Default provider (${providers.map((p) => p.id).join('/')}) [${provider}]: `)).trim() ||
          provider;
      }
    } finally {
      rl.close();
    }
  }

  getProvider(provider); // throws early on a typo instead of failing later at deploy time

  const config = { dir, name: sanitizeName(name), provider };
  const savedPath = writeProjectConfig(cwd, config);
  console.log(`\nSaved ${path.relative(cwd, savedPath)}:`);
  console.log(JSON.stringify(config, null, 2));
  console.log('\nRun "deploy-cli deploy" to deploy with these defaults.');
}

async function cmdLogin(providerId, values = []) {
  if (!providerId) {
    throw new Error('Usage: deploy-cli login <provider> [values...]. Run "deploy-cli providers" to see options.');
  }
  const provider = getProvider(providerId);
  const envKeys = provider.requiredEnv.length > 0 ? provider.requiredEnv : provider.optionalEnv ?? [];
  if (envKeys.length === 0) {
    console.log(`${provider.label} does not require a saved token. See: ${provider.setupNote}`);
    return;
  }

  if (values.length > 0) {
    if (values.length !== envKeys.length) {
      throw new Error(
        `${provider.label} needs ${envKeys.length} value(s) in this order: ` +
          `${envKeys.join(', ')}. Got ${values.length}.`,
      );
    }
    envKeys.forEach((envKey, i) => writeGlobalToken(envKey, values[i]));
    console.log(`Saved. deploy-cli will export these automatically for ${provider.label} deploys.`);
    return;
  }

  if (!process.stdin.isTTY) {
    throw new Error(
      `Not an interactive terminal. Run: deploy-cli login ${provider.id} ${envKeys
        .map((k) => `<${k}>`)
        .join(' ')}`,
    );
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    for (const envKey of envKeys) {
      const value = await rl.question(`Paste value for ${envKey}: `);
      if (value.trim()) {
        writeGlobalToken(envKey, value.trim());
      }
    }
    console.log(`\nSaved. deploy-cli will export these automatically for ${provider.label} deploys.`);
  } finally {
    rl.close();
  }
}

async function cmdDeploy(flags) {
  if (flags.help) {
    console.log(HELP);
    return;
  }

  const cwd = process.cwd();
  applyGlobalTokensToEnv();
  const projectConfig = readProjectConfig(cwd) ?? {};

  const dir = strFlag(flags.dir) ?? projectConfig.dir ?? detectDir(cwd);
  if (!dir) {
    throw new Error(
      'Could not find anything to deploy. Pass --dir <path>, or run "deploy-cli init" first.',
    );
  }

  const name = sanitizeName(strFlag(flags.name) ?? projectConfig.name ?? detectName(cwd));
  const repo = strFlag(flags.repo) ?? detectRepo(cwd);
  const prod = Boolean(flags.prod);
  const dryRun = Boolean(flags['dry-run']);

  const targets = resolveTargets(strFlag(flags.to) ?? projectConfig.provider);

  console.log(`Project dir:  ${dir}`);
  console.log(`Subdomain:    ${name}`);
  console.log(`Targets:      ${targets.map((p) => p.id).join(', ')}`);

  const results = [];
  for (const provider of targets) {
    const missingEnv = provider.requiredEnv.filter((key) => !process.env[key]);
    if (missingEnv.length > 0) {
      console.log(`\n⚠ Skipping ${provider.label}: missing ${missingEnv.join(', ')}.`);
      console.log(`  ${provider.setupNote}`);
      console.log(`  Fix with: deploy-cli login ${provider.id}`);
      continue;
    }

    const secrets = provider.requiredEnv.map((key) => process.env[key]);
    const steps = provider.getSteps({ dir, name, prod, repo });
    runSteps(steps, { dryRun, secrets });

    const liveUrl = provider.liveUrl({ name, repo });
    if (liveUrl) results.push({ provider: provider.label, url: liveUrl });
  }

  if (results.length > 0) {
    console.log('\nDone. Live URLs:');
    for (const r of results) console.log(`  ${r.provider}: ${r.url}`);
  } else if (!dryRun) {
    console.log('\nNo provider deployed. Run "deploy-cli providers" to see setup steps.');
  }
}

function resolveTargets(to) {
  if (!to) {
    const ready = readyProviders();
    if (ready.length === 0) {
      throw new Error(
        'No --to given and no provider has a token configured. Run "deploy-cli login <provider>" or pass --to <provider>.',
      );
    }
    return ready;
  }
  if (to === 'all') {
    const ready = readyProviders();
    if (ready.length === 0) {
      throw new Error('No provider is configured yet. Run "deploy-cli login <provider>" for at least one.');
    }
    return ready;
  }
  return to.split(',').map((id) => getProvider(id.trim()));
}
