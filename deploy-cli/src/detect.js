import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const CANDIDATE_BUILD_DIRS = ['dist', 'build', 'out', 'public'];

export function detectDir(cwd) {
  for (const candidate of CANDIDATE_BUILD_DIRS) {
    if (existsSync(path.join(cwd, candidate, 'index.html'))) {
      return candidate;
    }
  }
  if (existsSync(path.join(cwd, 'index.html'))) {
    return '.';
  }
  return null;
}

export function detectName(cwd) {
  const pkgPath = path.join(cwd, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      if (pkg.name) return sanitizeName(pkg.name);
    } catch {
      // ignore malformed package.json
    }
  }

  try {
    const remote = execFileSync('git', ['config', '--get', 'remote.origin.url'], {
      cwd,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    const match = remote.match(/([^/:]+?)(\.git)?$/);
    if (match) return sanitizeName(match[1]);
  } catch {
    // no git remote available, fall through
  }

  return sanitizeName(path.basename(cwd));
}

export function detectRepo(cwd) {
  try {
    const remote = execFileSync('git', ['config', '--get', 'remote.origin.url'], {
      cwd,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    const match = remote.match(/github\.com[:/]([^/]+\/[^/]+?)(\.git)?$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export function sanitizeName(input) {
  const cleaned = input
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return cleaned || 'my-app';
}
