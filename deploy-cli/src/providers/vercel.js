export const vercel = {
  id: 'vercel',
  label: 'Vercel',
  domainSuffix: 'vercel.app',
  tokenHelpUrl: 'https://vercel.com/account/tokens',
  requiredEnv: ['VERCEL_TOKEN'],
  setupNote:
    'Create a free Vercel account, then generate a token at https://vercel.com/account/tokens ' +
    'and export it as VERCEL_TOKEN.',
  getSteps({ dir, name, prod }) {
    const args = [
      '--yes',
      'vercel',
      '--token',
      process.env.VERCEL_TOKEN ?? '',
      '--yes',
      '--name',
      name,
      '--cwd',
      dir,
    ];
    if (prod) args.push('--prod');
    return [
      {
        cmd: 'npx',
        args,
        note: `Deploying ${dir} -> https://${name}.vercel.app (exact URL is printed by Vercel above)`,
      },
    ];
  },
  liveUrl({ name }) {
    return `https://${name}.vercel.app`;
  },
};
