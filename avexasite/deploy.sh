#!/usr/bin/env bash
# One-command deploy for avexasite -> Vercel.
# Usage: bash deploy.sh
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v npx >/dev/null 2>&1; then
  echo "Node.js (which provides npx) is required. Install it from https://nodejs.org and re-run this script."
  exit 1
fi

echo "==> Installing dependencies"
npm install

echo "==> Checking Vercel login"
if ! npx --yes vercel whoami >/dev/null 2>&1; then
  echo "    Not logged in yet - opening Vercel login (follow the prompt/browser link)."
  npx --yes vercel login
fi

if [ ! -f .env ] && [ -z "${VITE_WEB3FORMS_ACCESS_KEY:-}" ]; then
  echo
  echo "NOTE: the /start and /contact forms need VITE_WEB3FORMS_ACCESS_KEY to send email."
  echo "Get a free key at https://web3forms.com, then either:"
  echo "  - add it as an env var in the Vercel dashboard (Project Settings -> Environment Variables), or"
  echo "  - run: npx vercel env add VITE_WEB3FORMS_ACCESS_KEY production"
  echo
fi

echo "==> Deploying to Vercel (production)"
npx --yes vercel --prod
