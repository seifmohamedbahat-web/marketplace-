import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeName } from '../src/detect.js';
import { getProvider, providers } from '../src/providers/index.js';

test('sanitizeName lowercases, strips invalid chars, and trims hyphens', () => {
  assert.equal(sanitizeName('My Cool App!'), 'my-cool-app');
  assert.equal(sanitizeName('marketplace-'), 'marketplace');
  assert.equal(sanitizeName('___'), 'my-app');
  assert.equal(sanitizeName('already-fine'), 'already-fine');
});

test('every provider exposes the fields the CLI relies on', () => {
  for (const provider of providers) {
    assert.equal(typeof provider.id, 'string');
    assert.equal(typeof provider.label, 'string');
    assert.ok(Array.isArray(provider.requiredEnv));
    assert.equal(typeof provider.getSteps, 'function');
    assert.equal(typeof provider.liveUrl, 'function');
  }
});

test('getProvider throws a helpful error for unknown ids', () => {
  assert.throws(() => getProvider('not-a-real-host'), /Unknown provider/);
});

test('surge steps deploy the given dir to <name>.surge.sh', () => {
  const surge = getProvider('surge');
  const steps = surge.getSteps({ dir: 'dist', name: 'demo' });
  assert.equal(steps.length, 1);
  assert.deepEqual(steps[0].args, ['--yes', 'surge', 'dist', 'demo.surge.sh']);
  assert.equal(surge.liveUrl({ name: 'demo' }), 'https://demo.surge.sh');
});

test('gh-pages requires a repo', () => {
  const ghPages = getProvider('gh-pages');
  assert.throws(() => ghPages.getSteps({ dir: 'dist' }), /needs a repo/);
});
