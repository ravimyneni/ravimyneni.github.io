# Suvarna Myneni · Portfolio

Static personal portfolio for **Suvarna Myneni**, AI-Native UX Designer at eXp Realty (Hyderabad, India · open to remote).

## Structure

```
index.html          single page: hero, intro, highlights, work, experience, mentor, contact
css/styles.css      all styles (dark-first theme with a light mode, responsive)
js/main.js          menu overlay, theme toggle, scroll reveal, carousels, sticky header
assets/img/         Suvarna's own project art and illustration (from suvarnamyneni-project.github.io)
assets/fonts/       Urbanist (self-hosted, SIL Open Font License, see OFL.txt)
```

No build step and no external requests: every path is relative.

## Run locally

```
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

Push the contents of this folder to a repository (root of the default branch), then
**Settings → Pages → Deploy from a branch → main / (root)**. It works as-is at either
`username.github.io` or `username.github.io/repo-name/`.

## Editing

- Case-study cards live in the `#projects` section of `index.html`; each links to its live case study.
- Theme colors are CSS variables at the top of `css/styles.css` (`:root` for dark, `html.light` for light).
- Layout and interaction style were inspired by a big-type, dark-first designer portfolio; all text and images are Suvarna's own.
