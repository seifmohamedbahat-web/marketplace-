# Global Market — Premium Marketplace Homepage (Empty State)

A high-end, fully responsive homepage **mockup** for **Global Market**, a global
marketplace platform connecting buyers with custom-product creators worldwide.

> This is a structural/branding **empty-state mockup**. By design it contains
> **no real product listings, photos, prices, seller names, or testimonials**
> — only platform visuals, "Coming Soon" categories, process steps, and trust
> elements, in line with standard empty-state design patterns.

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
| 1 | **Header** | Midnight Navy navbar, brand logo, primary nav, centered search, location selector ("Shipping to: Worldwide"), Sign In / Join Free |
| 2 | **Hero** | Headline + dual CTAs over a teal→navy→coral glow, with an abstract connected-globe visual (no fabricated UI data) |
| 3 | **Trust / Value Strip** | Verified Sellers, Ships Worldwide, 100% Custom & Made-to-Order, Secure Checkout |
| 4 | **Category Showcase** | Six category tiles (Home & Decor, Apparel & Fashion, Art & Illustration, Jewelry & Accessories, Tech & Gadgets, Gifts & Personalized Items) each marked **Coming Soon** in Warm Gold |
| 5 | **How It Works** | Four numbered steps — Browse, Customize, Order Securely, Receive Worldwide |
| 6 | **Global Reach** | Three stat cards (190+ Countries, 10,000+ Makers, 100% Custom) clearly marked as illustrative/sample figures |
| 7 | **Seller CTA Banner** | "Have Something Custom to Sell? The World Is Your Market." on a dark navy gradient |
| 8 | **Footer** | Company / For Buyers / For Sellers / Connect columns + language & currency selector |

## Design system

| Token | Value | Usage |
|-------|-------|-------|
| Primary (Trust/Brand) | `#0E6E6E` Deep Ocean Teal | Brand accents, icons |
| Primary Dark (Header/Footer) | `#0A2540` Midnight Navy | Navbar, footer, dark CTA panel |
| Accent (CTAs) | `#FF6B4A` Coral Sunrise | Primary buttons |
| Secondary Accent | `#F5A623` Warm Gold | "Coming Soon" badges, highlights |
| Background | `#F7F9FA` Soft Cloud White | Page background |
| Card / Surface | `#FFFFFF` Pure White | Cards, panels |
| Text Primary | `#1C1F26` Charcoal Ink | Headings, body |
| Text Secondary | `#5A6472` Slate Gray | Supporting copy |
| Borders / Dividers | `#E4E8EC` Mist Gray | Card borders, rules |
| Success / Verified | `#2EAA6D` Emerald | Verified badges |

- **Type:** Plus Jakarta Sans (display) + Inter (body)
- **Corners:** 12–28px rounded radii
- **Elevation:** layered soft shadows
- **Motion:** reveal-on-scroll, animated stat counters, gradient hovers — all
  disabled automatically under `prefers-reduced-motion`.

## Files

```
index.html    # markup for all eight sections
styles.css    # design system + component styles + responsive rules
script.js     # sticky nav, mobile menu, scroll reveals, stat counters
```

## Responsiveness & accessibility

- Fluid layout from large desktop down to small phones (4 → 2 → 1 column grids).
- Navbar collapses to an accessible mobile menu.
- Semantic landmarks, `aria-label`s, keyboard-focusable controls, visible
  focus rings, and reduced-motion support.

---

© 2026 Global Market. Mockup for demonstration purposes.
