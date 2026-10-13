# Portfolio website

Personal portfolio of Shishir Sharma Upadhyay, a Software QA Engineer in Lalitpur, Nepal who also builds full-stack apps.

**Live site:** https://shishir19999.github.io/Website_Portfolio/

A static single-page site (React 19 + Vite 8, plain CSS). No server, no API keys, no tracking.

## What is on the page

- Hero with typed rotating roles, a light particle canvas and a gentle parallax. All motion stops when the visitor prefers reduced motion.
- About, Experience timeline (QA Intern to QA Associate), grouped and searchable Skills (no percentage bars), Education and courses, Contact (GitHub, LinkedIn, Download CV).
- Projects: 15 live projects with screenshot, tags, filter chips (Full-stack, Frontend, QA/Security, Tools), "Live preview" and "Source" links.
- QA work samples: original sample artifacts (scenario table, frontend and API test cases, defect report, Postman example, test strategy) written against a public sample app. They are clearly labelled as samples.
- Dark and light theme (remembered), sticky navbar with active-section highlight and scroll progress, back-to-top button, skip link, keyboard-friendly focus styles.
- Print-friendly CV page at `#/cv` (also reachable from the footer) and a print stylesheet.
- SEO: title, description, Open Graph and Twitter tags, JSON-LD Person schema, `sitemap.xml`, `robots.txt`, favicon, social preview image, custom `404.html`.

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
| `projects.json` | Projects: `title`, `repo`, `live`, `image`, `categories`, `tags`, `description`, optional `featured` |
| `qaSamples.json` | The QA sample tabs (tables, defect report, code blocks, strategy) |

To add a project: add an entry to `projects.json` and put a screenshot (WebP, under 120 KB, about 720 px wide) in `public/assets/projects/`. `npm test` checks that every project has the required fields, a well-formed live URL and an existing image.

The CV file is `src/pdf/Shishir_Sharma_CV.pdf`. Replace it with the new PDF using exactly that filename.

## Structure

```
index.html            SEO tags, JSON-LD, theme bootstrap script
public/               favicon, og-image.png, robots.txt, sitemap.xml, 404.html, assets/
src/App.jsx           Layout and the #/cv route
src/components/       Navbar, Hero, Sections (About, Experience, Education, Contact, Footer),
                      Skills, Projects, QASamples, CVPage, hooks, icons
src/data/             Editable content (JSON)
src/index.css         All styles, light and dark theme tokens, print rules
src/pdf/              CV PDF
tests/                Vitest tests
docs/screenshots/     Screenshots of the site
```

## Tests

`npm test` runs data-integrity checks: required project fields, link format, image presence and size, skill grouping, table shape, SEO tags, and a scan of `src/`, `public/`, `index.html`, `README.md` and `package.json` that fails if a contact detail (e-mail address, phone number, or a mail or phone link) or a blocked employer-internal term appears.

## Privacy note

Contact details are deliberately not published in the code or on the page. Visitors reach the owner through the LinkedIn and GitHub links.
