import { existsSync, readFileSync, writeFileSync, mkdirSync, chmodSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const GLOBAL_CONFIG_DIR = path.join(os.homedir(), '.config', 'deploy-cli');
const GLOBAL_CONFIG_PATH = path.join(GLOBAL_CONFIG_DIR, 'tokens.json');
const PROJECT_CONFIG_NAME = 'deploy.config.json';

export function readGlobalTokens() {
  if (!existsSync(GLOBAL_CONFIG_PATH)) return {};
  try {
    return JSON.parse(readFileSync(GLOBAL_CONFIG_PATH, 'utf8'));
  } catch {
    return {};
  }
}

export function writeGlobalToken(envKey, value) {
  mkdirSync(GLOBAL_CONFIG_DIR, { recursive: true });
  const tokens = readGlobalTokens();
  tokens[envKey] = value;
  writeFileSync(GLOBAL_CONFIG_PATH, JSON.stringify(tokens, null, 2), { mode: 0o600 });
  chmodSync(GLOBAL_CONFIG_PATH, 0o600);
}

// Fills process.env from the saved global config, without overriding
// variables the caller has already set in the shell.
export function applyGlobalTokensToEnv() {
  const tokens = readGlobalTokens();
  for (const [key, value] of Object.entries(tokens)) {
    if (!process.env[key]) process.env[key] = value;
  }
}

export function readProjectConfig(cwd) {
  const configPath = path.join(cwd, PROJECT_CONFIG_NAME);
  if (!existsSync(configPath)) return null;
  return JSON.parse(readFileSync(configPath, 'utf8'));
}

export function writeProjectConfig(cwd, config) {
  const configPath = path.join(cwd, PROJECT_CONFIG_NAME);
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  return configPath;
}
