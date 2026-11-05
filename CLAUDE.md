# ryanwalsh.uk: project brief for Claude Code

Ryan Walsh's portfolio, a product designer in Belfast. Hand-written HTML, CSS and a little JavaScript, with no framework and no build step. Published from this repository's `main` branch through GitHub Pages on the custom domain in `CNAME`.

Ryan owns every design and content decision. Claude Code builds and checks; it doesn't decide.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, Selected projects, About me, Recommendations, Contact (centred label and Email, LinkedIn, CV icons). Every page ends with a one-line footer (name, place, LinkedIn, Email, CV) |
| `tapsos.html` | TapSOS case study (shipped work at Inclutech) |
| `orbit.html` | orbit case study (final-year university project) |
| `portfolio-site.html` | "The makings of my portfolio" case study: designing and building this site with AI, from template to live site |
| `medicool.html` | Medicool case study (Catalyst Co-Founders 2023; selected for a £10k grant, then withdrew): branding and app UX/UI. Visuals from the team’s Figma file only, never the third-party references in it |
| `together.html` | Together case study (in progress): joined-up GP, hospital and pharmacy care, with an AI letter-reading feature and a staff worklist ranked by admin need only. All people, places and brands are fictional (Declan and Rose Quinn, Millbrook, Carnmore). Validation results are still to be added |
| `404.html` | Page not found |
| `css/styles.css` | All shared styles; tokens at the top |
| `js/main.js` | Menu, reveal-on-scroll, pen marks, reading progress; exposes `window.RW_initPage` |
| `js/case-study-gate.js` | Password gate for locking a draft case study in the browser. No page uses it now; kept for future drafts |

## Design tokens (from `:root` in `css/styles.css`)

Use the tokens. Don't hard-code new colours or sizes when a token covers it.

- **Colour:** `--navy` #0d173f (text), `--violet` #5d51ff (accent, 5.1:1 on white), `--tint` #f4f5f8, `--pen` #ff2fad (hand-drawn marks and focus rings only, never small text: 3.4:1).
- **Text colours:** `--paper` (navy, 17.3:1), `--paper-soft` #475472 (7.6:1), `--paper-faint` #5a6785 (5.7:1). Inside `.on-dark` sections these flip to light values automatically.
- **Type:** Manrope only (`--font`). Fluid sizes from `--text-sm` to `--text-display`. Hero and case study titles use 32 / 40 / 56px at regular weight.
- **Layout:** `--gutter` clamp(20px, 4.2vw, 64px), `--col-gap`, `--max` 1440px, a 12-column `.grid` from 900px.
- **Shape and motion:** `--radius-media` 16px, `--radius-control` 10px, `--ease-out`.
- **Breakpoints:** 640px (two-column details), 860px (full menu), 900px (12-column grid), 1120px (case study index).

## Components and patterns

- **Project cards** (`.project`): a badge, a hover/focus overlay, a caption shown on touch screens, and the full card text in `.visually-hidden` for screen readers. TapSOS leads full width; the others sit in pairs.
- **Card states:** live case study (links to its page), in progress (the `pending` band; a `.project--off` card is not a link, while Together links to its in-progress case study), private (`.project--locked`, a padlock and an email link).
- **Case studies:** reuse the existing hero, details (`.facts`), sections and figure patterns. Image slots show a labelled placeholder until the real file exists (`onerror="this.remove()"` on the `<img>`).
- **Pen marks** (`.pen`): Ryan's hand-drawn pink circle, ticks, dots and arrow. Keep them as they are unless he asks.
- **Wordmark:** "Ryan Walsh." with the full stop in `--pen`; the full stop is `aria-hidden`.

## Accessibility (non-negotiable)

- WCAG 2.2 AA. Measure contrast for every new text colour and background before shipping: 4.5:1 for text, 3:1 for icons and focus indicators.
- One `<h1>` per page; no skipped heading levels.
- Visible focus on everything interactive (the pink outline from `:focus-visible`). Keep the skip link first.
- Targets at least 24×24px; main controls 44px tall.
- Decorative SVGs and duplicated text get `aria-hidden="true"`; real images get descriptive alt text.
- Respect `prefers-reduced-motion` for any new animation.
- Respect phone safe areas: `.wrap`, the open menu and the footer pad with `env(safe-area-inset-*)`.
- Check every change at 1440px and 375px, with no horizontal scroll.

## Content rules

- Keep Ryan's wording. Don't rewrite his personal copy (hero, About) from your own drafts; ask him for his words.
- Don't invent facts, numbers, scores or dates. Unknown details stay as highlighted `[placeholders]`.
- TapSOS visuals come only from the approved TapSOS 2.0 Portfolio Pack. Follow its rules: no client names, internal documents, Figma files or unreleased features.
- Don't name other Inclutech products or their former names, and don't describe the work in terms of confidentiality agreements. Ryan keeps the exact list privately; ask if unsure.

## Shipping

- Every change goes through a pull request into `main`, with a clear description of what changed and how it was checked.
- When `css/styles.css` or `js/main.js` changes, bump the `?v=` query on the pages that load it, so browsers fetch the new file.
- Locked drafts: the readable source is kept outside this repository and re-encrypted before pushing. Never commit the readable draft or its password.
- Show Ryan the change before pushing anything personal or visual.
