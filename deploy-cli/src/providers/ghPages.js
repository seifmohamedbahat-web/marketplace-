export const ghPages = {
  id: 'gh-pages',
  label: 'GitHub Pages',
  domainSuffix: 'github.io',
  urlPattern: '<owner>.github.io/<repo>',
  tokenHelpUrl: 'https://github.com/settings/tokens?type=beta',
  requiredEnv: ['GITHUB_TOKEN'],
  setupNote:
    'Generate a fine-grained personal access token with Contents: read/write on the target repo at ' +
    'https://github.com/settings/tokens?type=beta and export it as GITHUB_TOKEN. The project directory must ' +
    'already be a git repo with a "origin" remote pointing at GitHub (or pass --repo owner/name).',
  getSteps({ dir, repo }) {
    if (!repo) {
      throw new Error(
        'GitHub Pages needs a repo to push to. Pass --repo owner/name (auto-detected from the git ' +
          '"origin" remote when available).',
      );
    }
    const remote = `https://x-access-token:${process.env.GITHUB_TOKEN ?? ''}@github.com/${repo}.git`;
    return [
      {
        cmd: 'npx',
        args: ['--yes', 'gh-pages', '-d', dir, '-b', 'gh-pages', '-r', remote],
        note: `Pushing ${dir} -> gh-pages branch of ${repo}`,
      },
    ];
  },
  liveUrl({ repo }) {
    if (!repo) return null;
    const [owner, name] = repo.split('/');
    return `https://${owner}.github.io/${name}/`;
  },
};
