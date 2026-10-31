# Ravi Myneni · Portfolio

Static personal portfolio for **Ravi Myneni**, Senior UX Designer (Hyderabad, India).
8+ years of UX research and product design across banking, e-commerce, real estate, transport and B2B:
Virtusa, Celanese, First American, Amazon and ICICI Bank.

## Structure

All files sit at the repository root:

```
index.html      single page: hero, about, highlights, selected work, experience timeline,
                skills & tools, education, mentor
styles.css      all styles (light-first editorial theme with a dark toggle, responsive)
main.js         menu overlay, theme toggle, sticky header, back-to-top, active nav
404.html        not-found page
sitemap.xml     home + the six linked case studies
robots.txt      allows all, points to the sitemap
*.jpg/*.webp    case-study card images, the hero photo, the OG image, ICICI Bank and Chemille logos
*.woff2         Urbanist (self-hosted, SIL Open Font License, see OFL.txt)
Ravi-Myneni-Resume.pdf   the resume behind the Download Resume buttons
```

No build step and no external requests: every path is relative.

## Case studies

Each case study is its own GitHub Pages repository, served at `https://ravimyneni.github.io/<repo>/`.
Portfolio order (also the Previous / Next order inside the case studies):

1. `cubic-translink-merchant-case-study`: Translink Merchant, Cubic Transportation Systems
2. `amazon-fresh-case-study`: Amazon Food, Shop by Recipe (repo name kept so links don't break)
3. `askchemille-case-study`: Chemille B2B website redesign, Celanese
4. `ignitere-help-center-case-study`: First American IgniteRE, Help Center & Chat Support
5. `imobile-case-study`: ICICI Bank iMobile
6. `amazon-prime-music-case-study`: Amazon Prime Music (supporting project)

## Run locally

```
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

**Settings → Pages → Deploy from a branch → main / (root)**.

## Editing

- Project cards live in the `#projects` list of `index.html`; each card links to its live case study.
  Cards share one template: same image ratio, two-line title slot, tags and Read link pinned to the bottom.
- Theme colours are CSS variables at the top of `styles.css` (`:root` for light, `html.dark` for dark).
- All text is Ravi's own, from his resume and his case studies.
