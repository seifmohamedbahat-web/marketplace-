# 🍔 Blaze Burger — 3D Restaurant Homepage

A single-page 3D website for a burger restaurant, built with vanilla HTML/CSS/JS and Three.js.

## Highlights

- **Interactive 3D burger** in the hero — built from Three.js primitives (no model files), drag to spin, idle rotation, floating animation, brand-colored rim lighting.
- **Video hero background** — rotating cheeseburger footage with a layered dark overlay, film grain, floating fire embers, and an animated gradient fallback if the video can't load.
- **Brand palette** — red `#e8261f`, yellow `#ffc72c`, black `#0d0d0d`, white `#ffffff`.
- **Legendary Menu** — six signature burgers with real food photography, prices, badges, 3D tilt-on-hover cards, plus a sides & shakes row.
- **Our Craft** — real burger photo with a floating framed treatment.
- **CTA banner** — "20% off your first order" with order/call actions.
- **Contact section** — contact form (name, email, phone, topic, message) with validation and success state, plus address, hours, and social links.
- **Full footer** — brand, explore links, opening hours, and contact columns.
- **Extras** — scroll-reveal animations, animated stat counters, slanted marquee ticker, sticky glass navbar, mobile menu, `prefers-reduced-motion` support, fully responsive.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page markup (hero, ticker, menu, craft, CTA, contact, footer) |
| `assets/img/` | Menu & craft food photos (from the MIT-licensed [Foodish](https://github.com/surhud004/Foodish) project) |
| `styles.css` | All styling and animations |
| `script.js` | Interactions + the Three.js 3D burger |
| `vendor/three.min.js` | Three.js r152 (vendored locally) |

## Run it

Just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

Deployed automatically to GitHub Pages via the workflow in `.github/workflows/`.

## Hero video

The hero uses free stock footage from Pexels ([Rotating Shot of Cheeseburger](https://www.pexels.com/video/rotating-shot-of-cheeseburger-8879540/)) with multiple fallback sources. To use your own video, replace the `<source>` URLs inside the `.hero-video` element in `index.html`.
