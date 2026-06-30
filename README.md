# Global Market — Premium Marketplace Homepage

A high-end, fully responsive homepage mockup for **Global Market**, a global
marketplace platform that connects buyers with custom product creators
worldwide. Built to a premium startup standard — clean luxury aesthetic,
soft shadows, rounded corners, spacious layout, and modern typography in the
spirit of Shopify + Stripe + Airbnb.

> This is a **marketplace UI mockup**. By design it shows platform visuals,
> categories, seller cards, and trust elements only — **no products, product
> cards, or product imagery**.

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

| # | Section | Highlights |
|---|---------|-----------|
| 1 | **Header** | White glassmorphism navbar, brand logo, primary nav, centered search, Login / Sign Up / Cart |
| 2 | **Hero** | Headline + dual CTAs over a pointer-reactive, slowly-drifting gradient glow, with an abstract connected-globe visual: floating seller card, live order-status tracker, messaging UI, animated global-shipping route, and a customer review card |
| 3 | **Categories** | Six category cards (Fashion, Home Decor, Jewelry, Art, Handmade Gifts, Tech Accessories) with custom icons |
| 4 | **Why Us** | Four feature cards — Worldwide Sellers, Secure Payments, Fast Delivery, Custom Orders |
| 5 | **Seller Spotlight** | Four verified seller cards with avatar, rating, country, and store stats |
| 6 | **Platform Stats** | Animated count-up dashboard cards — 10,000+ Sellers, 50+ Countries, 1M+ Customers, 500K+ Orders |
| 7 | **Testimonials** | Three modern review cards with avatars |
| 8 | **Final CTA** | "Start Selling Globally Today" on a dark premium gradient with grid texture |
| 9 | **Footer** | Company / Support / Legal / Social columns + newsletter signup + trust badges |

## Design system

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#2563EB` | Premium blue — CTAs, links, accents |
| Secondary | `#7C3AED` | Modern purple — gradients, highlights |
| Accent | `#06B6D4` | Cyan — status, secondary highlights |
| Dark text | `#111827` | Headings, body |
| Gray text | `#6B7280` | Secondary copy |
| Background | `#F8FAFC` | Page background |
| Cards | `#FFFFFF` | Surfaces |
| Borders | `#E5E7EB` | Dividers, outlines |

- **Type:** Plus Jakarta Sans (display) + Inter (body)
- **Corners:** 12–28px rounded radii
- **Elevation:** layered soft shadows
- **Motion:** reveal-on-scroll, animated stat counters, floating hero cards,
  gradient hovers — all disabled automatically under
  `prefers-reduced-motion`.

## Files

```
index.html    # markup for all nine sections
styles.css    # design system + component styles + responsive rules
script.js     # sticky nav, mobile menu, scroll reveals, stat counters
```

## Responsiveness & accessibility

- Fluid layout from large desktop down to small phones (4 → 2 → 1 column grids).
- Glassmorphism navbar collapses to an accessible mobile menu.
- Semantic landmarks, `aria-label`s, keyboard-focusable controls, visible
  focus rings, and reduced-motion support.

---

© 2026 Global Market. Mockup for demonstration purposes.
