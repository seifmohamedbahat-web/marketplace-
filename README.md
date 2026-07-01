# Avexa — Web Agency Site

A TanStack Start (React 19 + Vite + Nitro) marketing site for Avexa, a web
development agency. Includes a portfolio, testimonials, i18n (EN/FR/AR), and
a contact form that submits via [Web3Forms](https://web3forms.com).

## Local development

```bash
bun install
bun run dev
```

## Deploying to Vercel (free)

This repo is pre-configured for Vercel: `vite.config.ts` sets the Nitro
build preset to `"vercel"`, which emits Vercel's Build Output API v3 at
`.vercel/output` during `bun run build`.

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login works).
2. **Add New... → Project**, then import this GitHub repository.
3. Framework Preset: choose **Other**.
4. Install Command: `bun install` (auto-detected from `bun.lock`).
5. Build Command: `bun run build`.
6. Output Directory: leave as default — Vercel auto-detects `.vercel/output`.
7. Add the environment variables below, then click **Deploy**.

### Environment variables

Copy the values from `.env.example` (or your own Supabase project) into the
Vercel project's **Settings → Environment Variables**:

| Name | Notes |
|------|-------|
| `VITE_SUPABASE_URL` | Supabase project URL (public) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable/anon key (public) |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ref |
| `SUPABASE_URL` | Same value, read on the server |
| `SUPABASE_PUBLISHABLE_KEY` | Same value, read on the server |
| `SUPABASE_PROJECT_ID` | Same value, read on the server |

These are Supabase *publishable* keys, safe to expose client-side — the
Supabase integration isn't currently wired into any page, so the site works
without them, but set them to avoid console errors if that changes.

## Files

```
src/routes/        # pages: /, /start, /contact, /thank-you
src/components/    # Nav, Footer, Portfolio, TestimonialsCarousel, etc.
src/i18n/          # en.json, fr.json, ar.json
src/lib/sendForm.ts  # contact form submission via Web3Forms
```
