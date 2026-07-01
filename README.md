# Metro Wash Pros — Pressure Washing Homepage

A one-page marketing website for **Metro Wash Pros**, built to match the
brand's logo colors (navy + bright blue) with a bold, professional feel.
It's a single scrolling page with anchor navigation to an About Us section,
Services, Prices, Business Hours, Testimonials, and a Free Estimate contact
form.

## Preview

Open `index.html` in any modern browser — no build step or dependencies
required. Everything is plain HTML, CSS, and a small amount of vanilla JS.

```bash
# from the project root
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

## Sections

| # | Section | What's in it |
|---|---------|-----------|
| 1 | **Header** | Sticky navy navbar, brand lockup, nav links, click-to-call phone number, "Free Estimate" button |
| 2 | **Hero** | Headline + dual CTAs (Free Estimate / Call Now) over a navy gradient, spray-graphic visual, trust badge strip |
| 3 | **About Us** (`#about`) | Company story, mission, and a "why choose us" checklist |
| 4 | **Services** (`#services`) | Driveway, house/siding, roof, deck/fence, commercial, gutter cleaning |
| 5 | **Prices** (`#prices`) | Starting prices per service in card format, with a "Most Popular" highlight |
| 6 | **Business Hours** (`#hours`) | Hours table (Mon–Fri / Sat / Sun) plus phone, email, and service area |
| 7 | **Testimonials** | Three customer review cards |
| 8 | **Free Estimate** (`#estimate`) | Contact form (name, phone, email, address, service, details) |
| 9 | **Final CTA + Footer** | Closing call-to-action banner, footer with hours recap and quick links |

## Design system

| Token | Value | Usage |
|-------|-------|-------|
| Navy 950/900 | `#050b14` / `#0a1626` | Header, hero, dark sections, footer |
| Blue 700/600/500 | `#0d5bc4` / `#1673e0` / `#2f8fef` | Primary buttons, links, accents |
| Blue 400 | `#5fb2ff` | Highlights, icon accents |
| Text dark | `#0b1420` | Headings, body copy |
| Text gray | `#55677c` | Secondary copy |
| Background | `#f7fafc` | Page background |
| Cards | `#ffffff` | Surfaces |

- **Type:** Oswald (bold condensed headings) + Inter (body)
- **Corners:** 10–22px rounded radii
- **Motion:** reveal-on-scroll, floating hero cards — disabled automatically
  under `prefers-reduced-motion`.

## Files

```
index.html    # markup for all sections
styles.css    # design system + component styles + responsive rules
script.js     # sticky nav, mobile menu, scroll reveals, estimate form handling
```

## Things to customize before going live

- **Logo:** the header/footer currently use a hand-built icon + text lockup
  in your brand colors. To use your actual logo artwork, drop an image file
  (e.g. `logo.png`) into this folder and swap the `.brand-mark` SVG in
  `index.html` for `<img src="logo.png" alt="Metro Wash Pros logo">`.
- **Phone / email / address:** replace the placeholder `(555) 123-4567`,
  `info@metrowashpros.com`, and "Greater Metro Area" text throughout
  `index.html` with your real contact details.
- **Prices & hours:** update the numbers in the Prices and Hours sections to
  match your actual rates and schedule.
- **Free Estimate form:** this is a static site, so the form currently shows
  a confirmation message in the browser but doesn't send an email. To
  actually receive submissions, connect it to a form backend such as
  Formspree, Netlify Forms, or your own server endpoint.

## Responsiveness & accessibility

- Fluid layout from desktop down to small phones (3 → 2 → 1 column grids).
- Sticky navbar collapses to an accessible slide-in mobile menu.
- Semantic landmarks, `aria-label`s, keyboard-focusable controls, and
  reduced-motion support.

---

© 2026 Metro Wash Pros. Mockup for demonstration purposes.
