# deploy-cli

One command to deploy any static site (or built frontend) to a **free host with a
live subdomain** — like Netlify's `deploy` button, but pointed at whichever free
host you want, or all of them at once.

It doesn't reinvent hosting. It's a thin, zero-dependency wrapper around each
provider's own official CLI (`netlify-cli`, `vercel`, `wrangler`, `gh-pages`,
`surge`), run through `npx` so nothing has to be pre-installed. You keep your own
account and free-tier quota on each service; this tool just gives you one
consistent command instead of five different ones.

## Supported providers

| Provider | `--to` id | Free URL | Auth needed |
|---|---|---|---|
| [Surge.sh](https://surge.sh) | `surge` | `<name>.surge.sh` | none to try; login once for CI |
| [Netlify](https://netlify.com) | `netlify` | `<name>.netlify.app` | Personal Access Token |
| [Vercel](https://vercel.com) | `vercel` | `<name>.vercel.app` | Access Token |
| [Cloudflare Pages](https://pages.cloudflare.com) | `cloudflare` | `<name>.pages.dev` | API Token + Account ID |
| [GitHub Pages](https://pages.github.com) | `gh-pages` | `<owner>.github.io/<repo>` | Personal Access Token |

Run `deploy-cli providers` any time to see this list with direct links to
generate each token.

## Install

No publish step needed — link it locally:

```bash
cd deploy-cli
npm link          # makes the `deploy-cli` command available globally
# or just run it directly:
node bin/deploy-cli.js --help
```

## Quick start

```bash
# From your project root (the folder with index.html, or dist/, build/, out/, public/)
deploy-cli init                       # detects the build dir + picks a subdomain name
deploy-cli deploy --to surge          # live in a few seconds, no account required
```

Surge needs no signup for a first try. For a stable, reusable subdomain and for
every other provider, save a token once:

```bash
deploy-cli login netlify              # prompts for NETLIFY_AUTH_TOKEN, saves it
deploy-cli login vercel abcd1234...   # or pass the value directly (non-interactive/CI)
deploy-cli login cloudflare <api-token> <account-id>
```

Tokens are saved to `~/.config/deploy-cli/tokens.json` (file mode `600`, never
committed to git) and exported as env vars automatically on every deploy. You
can also just set the env vars yourself (`NETLIFY_AUTH_TOKEN=... deploy-cli
deploy --to netlify`) — that always takes priority.

Then deploy anywhere, including everywhere at once:

```bash
deploy-cli deploy --to netlify --prod
deploy-cli deploy --to netlify,vercel,cloudflare --prod
deploy-cli deploy --to all --prod          # every provider with a saved token
deploy-cli deploy --to surge --dry-run     # print the commands without running them
```

## Commands

```
deploy-cli init [--dir <path>] [--name <name>] [--provider <id>]
deploy-cli deploy [--to <id|all|a,b,c>] [--dir <path>] [--name <name>]
                   [--repo <owner/name>] [--prod] [--dry-run]
deploy-cli login <provider> [values...]
deploy-cli providers
deploy-cli --help
```

- **`--dir`** is auto-detected: it looks for `dist/`, `build/`, `out/`,
  `public/`, then falls back to the project root if `index.html` is there.
- **`--name`** (the subdomain) is auto-detected from `package.json`'s `name`,
  falling back to the git remote or folder name, sanitized to a valid hostname
  (lowercase, `a-z0-9-`).
- **`--repo`** (GitHub Pages only) is auto-detected from the git `origin`
  remote.
- `deploy-cli init` writes a `deploy.config.json` in your project so
  `deploy-cli deploy` needs no flags afterwards. Safe to commit — it holds no
  secrets, just `dir`/`name`/`provider`.

## Example: this repo

The marketplace homepage in this repo is plain `index.html` at the root, so
`deploy-cli` picks it up with no build step:

```bash
cd deploy-cli
node bin/deploy-cli.js deploy --to surge --dir .. --name global-market --dry-run
```

Drop `--dry-run` once you're ready to actually ship it.

## Notes & limits

- **GitHub Pages** doesn't hand out arbitrary subdomains for free — you get
  `<owner>.github.io/<repo>`. All the other providers give you a real
  `<name>.<host>` subdomain.
- This tool only automates deploys to *existing* free hosting platforms. It
  does not run its own hosting infrastructure, so there's nothing to keep
  online yourself — the providers do that.
- Provider CLIs are fetched on demand via `npx`, so the first deploy to a
  given provider is a little slower while `npx` downloads it.
