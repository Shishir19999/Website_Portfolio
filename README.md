# Portfolio website

Personal portfolio of Shishir Sharma Upadhyay, a Software QA Engineer in Lalitpur, Nepal who also builds full-stack apps.

**Live site:** https://shishir19999.github.io/Website_Portfolio/

A static single-page site (React 19 + Vite 8, plain CSS). No server, no API keys, no tracking.

## What is on the page

A quiet tester's-notebook look: off-white paper, ink, one muted accent, small mono TC-00x section labels.

- Hero with two gently parallaxed layers (a faint grid and the avatar).
- About, Experience (sticky heading plus a timeline line that draws on scroll), Skills as a checklist with a text-style filter and search, Education and courses, Contact (GitHub, LinkedIn, Download CV).
- Projects: 3 featured screenshots plus an index of all 15. Hovering or focusing a row shows a screenshot that follows the cursor. Clicking a title opens the live preview.
- QA work samples: original sample artifacts (scenario table, frontend and API test cases, defect report, Postman example, test strategy) written against a public sample app, clearly labelled as samples.
- Motion: one shared requestAnimationFrame loop (`src/lib/motion.js`) drives small parallax shifts and the timeline line. AOS handles short fade-up reveals. Phones get a lighter version, and reduced motion turns it off.
- Light ("day shift") and dark ("night shift") theme, sticky nav with active highlight, skip link, print-friendly CV at `#/cv`.
- SEO: title, description, Open Graph and Twitter tags, JSON-LD Person schema, `sitemap.xml`, `robots.txt`, favicon, social preview image, custom `404.html`.

## Photo

The avatar is `public/assets/hero/hero.avif`. To use a real photo, replace that single file (square, about 640 px).

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` (base path `/Website_Portfolio/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm test` | Vitest data-integrity tests |
| `npm run deploy` | Build and publish `dist/` with gh-pages |

## Editing the content

All text lives in `src/data/`, so most changes need no component edits:

| File | Content |
| --- | --- |
| `profile.json` | Name, role, typed roles, summary, About text, experience, education, courses, links |
| `skills.json` | Skill groups and items. Set `"exposure": true` for tools used in a learning capacity. `icon` is a key from `src/components/icons.jsx` |
| `projects.json` | Projects: `title`, `repo`, `live`, `image`, `categories`, `tags`, `description`, optional `featured` (pinned on the board) and `year` |
| `cv.json` | Text of the print-friendly CV page, mirrors the PDF |
| `qaSamples.json` | The QA sample tabs (tables, defect report, code blocks, strategy) |

To add a project: add an entry to `projects.json` and put a screenshot (WebP, under 120 KB, about 720 px wide) in `public/assets/projects/`. `npm test` checks that every project has the required fields, a well-formed live URL and an existing image.

The CV file is `public/Shishir_Sharma_CV.pdf`. Replace it with the new PDF using exactly that filename.

## Structure

```
index.html            SEO tags, JSON-LD, theme bootstrap script
public/               favicon, og-image.png, robots.txt, sitemap.xml, 404.html, assets/
src/App.jsx           Layout and the #/cv route
src/components/       Navbar, Hero, Sections (About, Experience, Education, Contact, Footer),
                      Skills, Projects, QASamples, CVPage, hooks, icons
src/data/             Editable content (JSON)
src/index.css         All styles, light and dark theme tokens, print rules
public/Shishir_Sharma_CV.pdf  the CV (stable URL)
tests/                Vitest tests
docs/screenshots/     Screenshots of the site
```

## Tests

`npm test` runs data-integrity checks: required project fields, link format, image presence and size, skill grouping, table shape, SEO tags, and a scan of `src/`, `public/`, `index.html`, `README.md` and `package.json` that fails if a contact detail (e-mail address, phone number, or a mail or phone link) or a blocked employer-internal term appears.

## Privacy note

Contact details are deliberately not published in the code or on the page. Visitors reach the owner through the LinkedIn and GitHub links.
