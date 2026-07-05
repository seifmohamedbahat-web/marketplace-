# Aurelia Estates — Luxury Real Estate Website

A fully animated, 3D-accented website for a premium real-estate agency. Built as a
zero-build static site (deployable straight to GitHub Pages).

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Home — 3D video hero, about, opportunities + search, reviews, contact form, CTA, footer |
| `property.html?id=<slug>` | Opportunity detail — gallery, specs, price, features, reviews, enquiry form, similar listings |
| `contact.html` | Contact — advisory form, office cards, stylised world map |

## Highlights

- **3D hero** — the skyline construction video plays behind a live Three.js
  scene (gold particle field, floating wireframe architectural forms, receding grid),
  with mouse-driven 3D parallax on the video and content layers.
- **Animation system** — GSAP + ScrollTrigger reveals, scroll-scrubbed hero zoom,
  staggered grids, 3D tilt cards, animated counters, marquee ticker, floating glass
  chips, orb-lit CTA, custom cursor, and an animated preloader.
- **Premium design language** — ink navy / champagne gold / ivory palette,
  Cormorant Garamond display type, glassmorphism panels.
- **Live search** — filter opportunities by keyword, asset type and budget.
- **Self-contained artwork** — every property image is a deterministic generated
  SVG skyline (no external image dependencies); the only binary asset is `assets/hero.mp4`.
- Responsive, keyboard-accessible, honours `prefers-reduced-motion`.

## Structure

```
index.html  property.html  contact.html
css/main.css          — design system + all styling
js/data.js            — property/review data + SVG art generator
js/main.js            — Three.js scene, GSAP animations, search, forms
js/property.js        — detail-page renderer (?id= driven)
assets/hero.mp4       — hero video
```

## Run locally

```
python3 -m http.server 8080
# open http://localhost:8080
```

Deployment: pushed branches deploy via the GitHub Pages workflow in `.github/workflows/`.
