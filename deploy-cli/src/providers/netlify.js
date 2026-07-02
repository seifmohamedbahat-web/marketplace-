export const netlify = {
  id: 'netlify',
  label: 'Netlify',
  domainSuffix: 'netlify.app',
  tokenHelpUrl: 'https://app.netlify.com/user/applications#personal-access-tokens',
  requiredEnv: ['NETLIFY_AUTH_TOKEN'],
  setupNote:
    'Create a free Netlify account, then generate a Personal Access Token at ' +
    'https://app.netlify.com/user/applications#personal-access-tokens and export it as NETLIFY_AUTH_TOKEN.',
  getSteps({ dir, name, prod }) {
    const deployArgs = ['--yes', 'netlify-cli', 'deploy', `--dir=${dir}`, `--site=${name}`];
    if (prod) deployArgs.push('--prod');
    return [
      {
        cmd: 'npx',
        args: ['--yes', 'netlify-cli', 'sites:create', `--name=${name}`],
        note: `Creating Netlify site "${name}" (skipped if it already exists)`,
        allowFail: true,
      },
      {
        cmd: 'npx',
        args: deployArgs,
        note: `Deploying ${dir} -> https://${name}.netlify.app`,
      },
    ];
  },
  liveUrl({ name }) {
    return `https://${name}.netlify.app`;
  },
};
