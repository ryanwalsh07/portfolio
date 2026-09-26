# Ryan Walsh, Product Designer (UX/UI)

The source for my portfolio, live at **[ryanwalsh.uk](https://ryanwalsh.uk)**.

I’m a product designer in Belfast. I design complex digital products end to end, from discovery and research through to high-fidelity UI and developer handoff, with accessibility built in from the first sketch.

## Case studies

The two case studies are **on hold while I wait for permission to share them**. The home page shows placeholder cards with an animated "Not available, under construction" banner, and the case study pages redirect back to the home page. They'll return once permission is confirmed.

## How the site is built

Hand-written HTML, CSS and a small amount of JavaScript. No frameworks and no build step.

- **Accessible by default.** Text meets WCAG AA contrast, every control has a visible focus state, there’s a skip link, and motion respects the reduced-motion setting.
- **Typography.** Set entirely in Manrope, using light weights at large sizes.
- **Annotations.** The pink hand-drawn marks draw themselves as you scroll.
- **Placeholder banner.** The "under construction" ticker is pure CSS, and it stops moving when reduced motion is on.

## Structure

```
index.html        Home: work, about, recommendations, contact
tapsos.html       Redirects to the home page (case study on hold)
nightcommute.html Redirects to the home page (case study on hold)
tapsos-new.html   Old link, redirects to the home page
404.html          Page-not-found
favicon.svg       Browser tab icon
css/              Styles (colour and type tokens at the top)
js/               Menu, Belfast clock, scroll details
cv/               CV download
images/           Site images (see HOW-TO-ADD-IMAGES.txt)
CNAME             Custom domain for GitHub Pages
```

## Updating

Edit a file here on GitHub (open it, then the pencil icon) or upload a replacement with **Add file → Upload files**. Changes go live on ryanwalsh.uk within a minute or two.

Browsers keep `css/styles.css` and `js/main.js` for up to 10 minutes. When you change either file, bump the `?v=` number where the pages link to them (`index.html` and `404.html`), e.g. `styles.css?v=20260923` to today's date, so visitors get the new file straight away.

---

© Ryan Walsh. All rights reserved.
