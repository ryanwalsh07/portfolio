# Ryan Walsh, Product Designer (UX/UI)

The source for my portfolio, live at **[ryanwalsh.uk](https://ryanwalsh.uk)**.

I’m a product designer in Belfast. I design complex digital products end to end, from discovery and research through to high-fidelity UI and developer handoff, with accessibility built in from the first sketch.

## Featured work

**[TapSOS](https://ryanwalsh.uk/tapsos)**: a fast, secure, non-verbal way to contact the emergency services when speaking isn’t possible or safe. Designed at Inclutech and validated with members of the Deaf community.

## How the site is built

Hand-written HTML, CSS and a small amount of JavaScript. No frameworks and no build step.

- **Accessible by default.** Text meets WCAG AA contrast, every control has a visible focus state, there’s a skip link, and motion respects the reduced-motion setting.
- **Typography.** Set entirely in Manrope, using light weights at large sizes.
- **Annotations.** The pink hand-drawn marks echo the annotation style from my TapSOS work, and they draw themselves as you scroll.
- **Mockups in code.** The phone screens on the home page and case study are built from HTML, so the pages stay sharp at any size.

## Structure

```
index.html      Home: work, about, recommendations, contact
tapsos.html     TapSOS case study
tapsos-new.html Old link, redirects to tapsos.html
404.html        Page-not-found
favicon.svg     Browser tab icon
css/            Styles (colour and type tokens at the top)
js/             Menu, Belfast clock, copy email, scroll details
cv/             CV download
images/         Project images (see HOW-TO-ADD-IMAGES.txt)
CNAME           Custom domain for GitHub Pages
```

## Updating

Edit a file here on GitHub (open it, then the pencil icon) or upload a replacement with **Add file → Upload files**. Changes go live on ryanwalsh.uk within a minute or two.

Browsers keep `css/styles.css` and `js/main.js` for up to 10 minutes. When you change either file, bump the `?v=` number where the pages link to them (`index.html`, `tapsos.html`, `404.html`), e.g. `styles.css?v=20260923` to today's date, so visitors get the new file straight away.

---

© Ryan Walsh. All rights reserved.
