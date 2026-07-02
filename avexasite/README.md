# Avexa — We Build, You Earn

A premium, dark, multilingual (EN / FR / AR) marketing site for **Avexa**, a
web-development studio. Built with TanStack Start, React, Tailwind CSS v4,
and Framer Motion.

## Stack

- **TanStack Start** (React + Vite, SSR) — file-based routing in `src/routes`
- **Tailwind CSS v4** — theme tokens (black / white / brand red) defined in `src/styles.css`
- **Framer Motion** — page/section/marquee/wizard animations
- **react-i18next** — English, French, and Arabic (full RTL) via `src/i18n`
- **Web3Forms** — form submission for `/start` and `/contact` (no `mailto:` fallback)
- **Vercel** — SSR deploy via Nitro (`nitro/vite`)

## Getting started

```bash
npm install
cp .env.example .env   # then paste your Web3Forms access key
npm run dev             # http://localhost:3000
```

### Web3Forms setup (required for the forms to actually send email)

The `/start` project wizard and `/contact` page both submit to
[Web3Forms](https://web3forms.com), which forwards submissions to
`seifmohamedbahat@gmail.com`. To activate this:

1. Go to https://web3forms.com and enter your email — no signup, you get an
   access key instantly.
2. Put it in `.env` as `VITE_WEB3FORMS_ACCESS_KEY=...` for local dev, and as
   an environment variable in your Vercel project settings for production.

Without a key, submissions will fail gracefully with an inline error message
(no `mailto:` fallback is used anywhere).

## Project structure

```
src/
  routes/            # /, /start, /contact, /thank-you, __root layout
  components/        # Nav, Footer, Hero, Services, Portfolio, About,
                      # Reviews, CTA, Modal, PhonePicker, ProgressBar, Particles, Logo
  i18n/               # react-i18next setup + en.json / fr.json / ar.json
  data/               # portfolio.ts, reviews.ts, countries.ts (phone dial codes)
  lib/                # web3forms.ts submission helper
  styles.css          # Tailwind v4 theme tokens + utility classes
public/
  portfolio/          # real project screenshots used in the portfolio marquee
```

## Scripts

```bash
npm run dev              # start dev server
npm run build             # production build (client + SSR)
npm run preview           # preview the production build
npm run generate-routes   # regenerate src/routeTree.gen.ts after adding routes
npm test                  # run vitest
```

## Notes

- The portfolio section showcases 13 real Avexa projects (screenshots in
  `public/portfolio/`), each localized into EN/FR/AR.
- The Avexa wordmark (`Ave` white + `x` red + `a` white) is rendered as a
  styled text logo component (`src/components/Logo.tsx`) in Oswald, matching
  the brand's black/white/red system, rather than a static image.
- Language preference is stored in `localStorage` and applied to
  `<html lang dir>` on the client; Arabic flips the whole layout to RTL and
  switches to Cairo/Tajawal.
