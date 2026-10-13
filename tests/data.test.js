import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, extname, resolve } from 'node:path'
import projects from '../src/data/projects.json'
import skills from '../src/data/skills.json'
import profile from '../src/data/profile.json'
import qa from '../src/data/qaSamples.json'

const root = resolve(import.meta.dirname, '..')
const FILTERS = ['Full-stack', 'Frontend', 'QA/Security', 'Tools']

describe('projects data', () => {
  it('lists at least 15 projects with unique ids and repos', () => {
    expect(projects.length).toBeGreaterThanOrEqual(15)
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    expect(new Set(projects.map((p) => p.repo)).size).toBe(projects.length)
  })

  it.each(projects.map((p) => [p.id, p]))('%s has the required fields and well-formed links', (_id, p) => {
    expect(p.title).toBeTruthy()
    expect(p.description.length).toBeGreaterThan(30)
    expect(p.repo).toMatch(/^[A-Za-z0-9_.-]+$/)
    expect(p.live).toBe(`https://shishir19999.github.io/${p.repo}/`)
    expect(() => new URL(p.live)).not.toThrow()
    expect(p.tags.length).toBeGreaterThan(0)
    expect(p.categories.length).toBeGreaterThan(0)
    p.categories.forEach((c) => expect(FILTERS).toContain(c))
    expect(existsSync(join(root, 'public', p.image))).toBe(true)
  })

  it('every filter chip matches at least one project', () => {
    FILTERS.forEach((f) => expect(projects.some((p) => p.categories.includes(f))).toBe(true))
  })

  it('project screenshots stay small', () => {
    projects.forEach((p) => expect(statSync(join(root, 'public', p.image)).size).toBeLessThan(120 * 1024))
  })
})

describe('profile, skills and QA samples', () => {
  it('profile has the expected basics', () => {
    expect(profile.role).toBe('Software QA Engineer')
    expect(profile.experience.map((e) => e.title)).toEqual(['QA Associate', 'QA Intern'])
    expect(profile.links.github).toBe('https://github.com/Shishir19999')
    expect(profile.links.linkedin).toMatch(/^https:\/\/linkedin\.com\/in\//)
  })

  it('skills are grouped, named and contain no percentage ratings', () => {
    expect(skills.map((g) => g.title)).toEqual([
      'QA & Testing', 'Automation', 'API & Backend', 'Security & Performance', 'Web Development', 'Tools',
    ])
    skills.forEach((g) => {
      expect(g.items.length).toBeGreaterThan(0)
      g.items.forEach((i) => {
        expect(i.name).toBeTruthy()
        expect(JSON.stringify(i)).not.toMatch(/%|level|percent/i)
      })
    })
  })

  it('every table sample has rows matching its columns', () => {
    qa.tabs.filter((t) => t.kind === 'table').forEach((t) => {
      t.rows.forEach((r) => expect(r.length).toBe(t.columns.length))
    })
    expect(qa.tabs.length).toBeGreaterThanOrEqual(6)
  })
})

describe('forbidden content', () => {
  const j = (...p) => p.join('')
  const words = [
    j('core', 'nroll'), j('pure', 'nroll'), j('cor', 'ey'), j('benefit', ' store'), j('elev', 'ate'), j('nue', 'ra'),
    j('om pra', 'kash'), j('kan', 'del'), j('PHOH', '3123'), j('payment', '_qa'), j('nb_', 'payments'),
    j('userinfo', '_policy'), j('qa-', 'enroll'),  ].map((w) => w.toLowerCase())
  const TEXT = new Set(['.js', '.jsx', '.json', '.css', '.html', '.md', '.txt', '.xml', '.svg', '.webmanifest'])

  const walk = (dir, out = []) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name)
      if (statSync(full).isDirectory()) walk(full, out)
      else if (TEXT.has(extname(name))) out.push(full)
    }
    return out
  }
  const files = [
    ...walk(join(root, 'src')), ...walk(join(root, 'public')),
    join(root, 'index.html'), join(root, 'README.md'), join(root, 'package.json'),
  ]

  it('scans a meaningful number of files', () => {
    expect(files.length).toBeGreaterThan(15)
  })

  it('contains no e-mail address, phone number or employer-internal names', () => {
    const email = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}/
    const phone = /(\+?977[\s-]?)?\b9[78]\d{8}\b/
    const bad = []
    for (const f of files) {
      const text = readFileSync(f, 'utf8')
      const lower = text.toLowerCase()
      if (email.test(text)) bad.push(`${f}: e-mail`)
      if (phone.test(text)) bad.push(`${f}: phone`)
      for (const w of words) if (lower.includes(w)) bad.push(`${f}: forbidden term`)
    }
    expect(bad).toEqual([])
  })

  it('has no mailto or tel links', () => {
    for (const f of files) {
      const text = readFileSync(f, 'utf8')
      expect(/mailto:|tel:/i.test(text), f).toBe(false)
    }
  })
})

describe('static site files', () => {
  it.each(['public/robots.txt', 'public/sitemap.xml', 'public/404.html', 'public/favicon.svg', 'public/og-image.png', 'src/pdf/Shishir_Sharma_CV.pdf'])(
    '%s exists',
    (f) => expect(existsSync(join(root, f))).toBe(true),
  )

  it('index.html carries SEO tags and a Person schema', () => {
    const html = readFileSync(join(root, 'index.html'), 'utf8')
    ;['og:title', 'og:image', 'twitter:card', 'rel="canonical"', 'name="description"'].forEach((t) => expect(html).toContain(t))
    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
    expect(ld['@type']).toBe('Person')
    expect(ld).not.toHaveProperty('email')
    expect(ld).not.toHaveProperty('telephone')
  })
})
