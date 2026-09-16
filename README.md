# Plumbers' Photographer Union (PPU)

Website for PPU, McGill Engineering Undergraduate Society's student photography collective. Rebuilt from the original Framer site as a plain static HTML/CSS/JS site — no build step, no framework.

## Structure

- `index.html` — home page: hero, services, "what we shoot" categories, portfolio teaser, FAQ, contact
- `pricing.html` — pricing plans
- `team.html` — meet the team
- `book.html` — booking request form (embedded)
- `gallery.html` — photo gallery with a lightbox viewer
- `assets/css/style.css` — all styling (design tokens at the top)
- `assets/js/main.js` — mobile nav toggle + gallery lightbox
- `assets/images/` — logo, hero/category photos, `team/` (headshots), and `gallery/` (event photos)

## Running locally

No build tools needed. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

This is a static site — it can be hosted as-is on GitHub Pages, Netlify, Vercel, or any static host. It's currently live via GitHub Pages at https://framesbyestelle.github.io/ppu-photography-union/. Once you have a domain, add it under repo Settings → Pages → Custom domain and point the domain's DNS at GitHub — no code changes needed.

## Updating content

There's no admin panel — you edit the HTML/image files directly and push. Every change below follows the same pattern: add the image file, then add a matching snippet of HTML in the right place.

### Add a photo to the gallery

1. Drop the image file into `assets/images/gallery/` (any filename, e.g. `gallery-31.jpg`).
2. Open `gallery.html`, find the `<div class="gallery-grid" data-gallery>` block, and add a new line anywhere inside it:
   ```html
   <figure class="gallery-item" data-category="blues"><img src="assets/images/gallery/gallery-31.jpg" alt="Describe the photo" loading="lazy"></figure>
   ```
3. `data-category` controls which filter tab the photo shows under. Valid values: `headshots`, `eweek`, `techfair`, `blues`, `grad`. Use `blues` for general event/nightlife photos — it's the catch-all category with the most photos today.
4. Save, commit, push. That's it — the lightbox and filter tabs pick it up automatically.

### Add or remove a team member

Open `team.html`, find the `<div class="team-grid">` under "Meet the Team" (the first one, above the Alumni section). Copy an existing block and edit it:

```html
<article class="team-card">
  <img src="assets/images/team/yourfile.jpg" alt="Full Name">
  <div class="team-card__body">
    <h3>Full Name</h3>
    <p class="role">Their role (e.g. Photographer, VP Events)</p>
    <p class="meta">Shooting since 2024</p>
    <a class="handle" href="https://www.instagram.com/handle" target="_blank" rel="noopener">@handle</a>
  </div>
</article>
```

Put their photo in `assets/images/team/` first. To remove someone, delete their `<article class="team-card">...</article>` block — **move it to the Alumni section below instead of deleting it outright**, so they stay on the site as a past member.

### Add someone to Alumni

Same page, further down — look for the `<!-- To add an alumni member... -->` comment inside the "Past Photographers" section. It contains a template block commented out. Copy it, uncomment it, paste it above the comment, and fill in their details (add `2021–2024` style dates in place of "Shooting since ..." to show their years active). Alumni cards render slightly desaturated automatically via the `team-card--alumni` class — keep that class on the `<article>`.

### General tips

- Keep image files reasonably sized (under ~500KB) before adding them — big multi-MB photos slow the site down. `sips -Z 1200 yourfile.jpg` (Mac, built-in) resizes to a 1200px max dimension.
- After editing, preview locally (`python3 -m http.server 8000`) before pushing, to catch typos in tags/paths.
- Every page repeats the same header/footer HTML — if you change nav links or footer content, update it on all 5 pages (`index.html`, `pricing.html`, `team.html`, `book.html`, `gallery.html`).
