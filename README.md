# Ryan Walsh, Product Designer (UX/UI)

The source for my portfolio, live at **[ryanwalsh.uk](https://ryanwalsh.uk)**.

I’m a product designer in Belfast. I design complex digital products end to end, from discovery and research through to high-fidelity UI and developer handoff, with accessibility built in from the first sketch.

## Case studies

**TapSOS** is public, built only from the approved TapSOS 2.0 Portfolio Pack from Inclutech. Its screens and icons live in `images/tapsos/`. The page is still marked `noindex` while it's being worked on. MyJourney (formerly NightCommute) material must not go on this site: Inclutech allows it in private interview presentations only.

**NightCommute** has been retired. Its case study and images are gone for good; the URL now 404s.

**Together** is a work-in-progress placeholder on the home page, with no case study yet.

## How the site is built

Hand-written HTML, CSS and a small amount of JavaScript. No frameworks and no build step.

- **Accessible by default.** Text meets WCAG AA contrast, every control has a visible focus state, there’s a skip link, and motion respects the reduced-motion setting.
- **Typography.** Set entirely in Manrope, using light weights at large sizes.
- **Annotations.** The pink hand-drawn marks draw themselves as you scroll.
- **Placeholder banner.** The "under construction" / "coming soon" ticker is pure CSS, and it stops moving when reduced motion is on.

## Structure

```
index.html        Home: work, about, recommendations, contact
orbit.html         orbit case study
tapsos.html       TapSOS case study
tapsos-new.html   Old link, redirects to tapsos.html
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

Browsers keep `css/styles.css` and `js/main.js` for up to 10 minutes. When you change either file, bump the `?v=` number where the pages link to them (`index.html`, `orbit.html`, `tapsos.html` and `404.html`), e.g. `styles.css?v=20260923` to today's date, so visitors get the new file straight away.

---

© Ryan Walsh. All rights reserved.
