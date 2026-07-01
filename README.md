# Metro Wash Pros — Pressure Washing Website

A premium, art-directed marketing site for **Metro Wash Pros**, a residential
and commercial pressure washing company. Design direction: **Industrial
Editorial** — dark, geometric, high-contrast, closer to an architecture
magazine than a typical local-service flyer.

> Tagline: *"Professional Clean. Strong Results."*

## Preview

Plain HTML, CSS, and vanilla JS — no build step or dependencies.

```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

## Sections

| # | Section | Notes |
|---|---------|-------|
| — | **Nav** | Fixed; transparent over hero, fades to solid Ink Navy on scroll. Persistent "Free Estimate" button, collapses to an icon-triggered mobile menu. |
| — | **Hero** | Full-bleed dark navy with an art-directed SVG scene (city skyline + spray fan) — no stock photography. Single primary CTA with a small signature droplet animation. |
| 01 | **About** | Editorial two-column: standards/guarantee copy + three large-numeral stat callouts. |
| 02 | **Services** | Asymmetric dark grid, six numbered services with line icons. |
| 03 | **Pricing** | Three tiers, "Signature" flagged as Most Requested using the one Signal Blue accent. |
| 04 | **Hours & Contact** | Day-by-day table (today's row auto-highlighted), phone/email/service area. |
| 05 | **Free Estimate** | Form (Name, Phone, Email, Address, Service, Details) + reassurance copy. Client-side only — no backend is wired up. |
| — | **Footer** | Quiet logo mark, nav recap, hours recap, contact, social, copyright. |

## Design system

| Token | Value | Usage |
|-------|-------|-------|
| Ink Navy | `#0A1128` | Dominant background, primary text on light sections |
| Deep Blue | `#1E5AA8` | Structural accent — dividers, borders |
| Signal Blue | `#2E9BF5` | The one "electric" accent — CTAs, links, key numbers only |
| Off-White | `#F4F6F8` | Light section backgrounds, body text on dark |
| Steel Gray | `#8A94A6` | Muted text, captions, secondary info |

- **Display type:** Bebas Neue, extreme scale for headlines
- **Body/UI type:** Space Grotesk
- **Motion:** short (300–500ms), decelerating ease, staggered scroll reveals,
  understated hover states, one signature droplet animation on the hero CTA —
  all disabled under `prefers-reduced-motion`.

## Files

```
index.html          # markup for all sections
styles.css           # design tokens + component styles + responsive rules
script.js            # nav scroll state, mobile menu, scroll reveals, form handling
assets/
  favicon.svg         # vector logomark (nav/footer/favicon source)
  favicon-32.png       # rasterized favicon
  apple-touch-icon.png # iOS home-screen icon
  og-cover.svg / .png  # Open Graph / social share image
```

## Notes for going live

- **Logo:** the nav/footer mark is an original vector recreation inspired by
  the supplied logomark (city skyline + spray), since the source raster
  wasn't accessible as a file in this environment. Drop a cropped PNG/SVG of
  the real logo into `assets/` and swap the `<svg><use href="#logomark"/>`
  references in `index.html` for an `<img>` tag if you'd like the exact
  artwork instead.
- **Placeholder business info:** phone `(312) 555-0148`, email
  `hello@metrowashpros.com`, and the service-area radius are placeholders —
  replace with real details before launch.
- **Imagery:** the hero uses an art-directed SVG scene rather than a
  photograph. Swap in real commissioned photography (dark-graded to match the
  navy palette) behind `.hero-art` in `styles.css` / `index.html` for an even
  stronger result.
- **Form:** `estimate` form shows a client-side confirmation message on
  submit; wire `script.js`'s submit handler up to a real endpoint
  (email service, form backend, CRM) before launch.

## Accessibility & performance

- Semantic HTML5 landmarks (`nav`, `main`, `section`, `footer`), correct
  heading hierarchy.
- WCAG AA contrast on all text/background pairs.
- Full keyboard navigability with visible focus states.
- No external JS libraries; two Google Fonts requests; vector-only imagery.

---

© 2026 Metro Wash Pros. Mockup for demonstration purposes.
