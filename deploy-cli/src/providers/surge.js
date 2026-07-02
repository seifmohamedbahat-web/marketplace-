export const surge = {
  id: 'surge',
  label: 'Surge.sh',
  domainSuffix: 'surge.sh',
  tokenHelpUrl: 'https://surge.sh/help/using-the-cli-with-a-build-system',
  requiredEnv: [],
  optionalEnv: ['SURGE_LOGIN', 'SURGE_TOKEN'],
  setupNote:
    'No account needed to try it. For non-interactive deploys (CI, this CLI) run `npx surge login` once ' +
    'to see your token, then export SURGE_LOGIN=<email> and SURGE_TOKEN=<token>.',
  getSteps({ dir, name }) {
    const domain = `${name}.surge.sh`;
    return [
      {
        cmd: 'npx',
        args: ['--yes', 'surge', dir, domain],
        note: `Deploying ${dir} -> https://${domain}`,
      },
    ];
  },
  liveUrl({ name }) {
    return `https://${name}.surge.sh`;
  },
};
