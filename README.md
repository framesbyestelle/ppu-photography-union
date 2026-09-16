# Plumbers' Photographer Union (PPU)

Website for PPU, McGill Engineering Undergraduate Society's student photography collective. Rebuilt from the original Framer site as a plain static HTML/CSS/JS site — no build step, no framework.

## Structure

- `index.html` — home page: hero, services, portfolio teaser, FAQ, contact
- `pricing.html` — pricing plans
- `gallery.html` — photo gallery with a lightbox viewer
- `assets/css/style.css` — all styling (design tokens at the top)
- `assets/js/main.js` — mobile nav toggle + gallery lightbox
- `assets/images/` — logo, hero photos, and `gallery/` (event photos)

## Running locally

No build tools needed. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

This is a static site — it can be hosted as-is on GitHub Pages, Netlify, Vercel, or any static host.
