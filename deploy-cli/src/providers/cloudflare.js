export const cloudflare = {
  id: 'cloudflare',
  label: 'Cloudflare Pages',
  domainSuffix: 'pages.dev',
  tokenHelpUrl: 'https://dash.cloudflare.com/profile/api-tokens',
  requiredEnv: ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'],
  setupNote:
    'Create a free Cloudflare account, generate an API token (Pages:Edit permission) at ' +
    'https://dash.cloudflare.com/profile/api-tokens, export it as CLOUDFLARE_API_TOKEN, and export your ' +
    'account id (from the dashboard sidebar) as CLOUDFLARE_ACCOUNT_ID.',
  getSteps({ dir, name }) {
    return [
      {
        cmd: 'npx',
        args: ['--yes', 'wrangler', 'pages', 'deploy', dir, `--project-name=${name}`, '--branch=main'],
        note: `Deploying ${dir} -> https://${name}.pages.dev (creates the project on first deploy)`,
      },
    ];
  },
  liveUrl({ name }) {
    return `https://${name}.pages.dev`;
  },
};
