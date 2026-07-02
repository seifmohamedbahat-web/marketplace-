import { spawnSync } from 'node:child_process';

// Replaces any known secret values with '***' so tokens never hit the terminal or logs.
function redact(text, secrets) {
  let out = text;
  for (const secret of secrets) {
    if (secret) out = out.split(secret).join('***');
  }
  return out;
}

export function runSteps(steps, { dryRun, secrets }) {
  for (const step of steps) {
    const printableArgs = step.args.map((arg) => redact(arg, secrets));
    console.log(`\n→ ${step.note}`);
    console.log(`  $ ${step.cmd} ${printableArgs.join(' ')}`);

    if (dryRun) continue;

    const result = spawnSync(step.cmd, step.args, { stdio: 'inherit' });
    if (result.error) {
      throw new Error(`Failed to run "${step.cmd}": ${result.error.message}`);
    }
    if (result.status !== 0 && !step.allowFail) {
      throw new Error(`"${step.cmd} ${step.args[0] ?? ''}" exited with code ${result.status}`);
    }
  }
}
