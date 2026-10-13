import { useState } from 'react'
import { Icon } from './icons.jsx'
import { Reveal } from './hooks.jsx'
import { SectionHead } from './Sections.jsx'
import projects from '../data/projects.json'

const FILTERS = ['All', 'Full-stack', 'Frontend', 'QA/Security', 'Tools']
const GH = 'https://github.com/Shishir19999/'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = projects.filter((p) => filter === 'All' || p.categories.includes(filter))
  const count = (f) => (f === 'All' ? projects.length : projects.filter((p) => p.categories.includes(f)).length)

  return (
    <section id="projects" className="section alt" aria-labelledby="projects-h">
      <div className="container">
        <SectionHead eyebrow="Projects" title="Things I have built" id="projects-h">
          {projects.length} projects, each with a live preview that runs in your browser. Full-stack apps run their server code in the browser for the preview, so no data leaves your device.
        </SectionHead>
        <div className="chips" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f} <span className="count">{count(f)}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">Showing {list.length} of {projects.length} projects</p>
        <ul className="project-grid">
          {list.map((p) => (
            <li key={p.id} className="project">
              <Reveal as="article" className="card project-card" aria-labelledby={`p-${p.id}`}>
                <div className="thumb">
                  <img
                    src={`${import.meta.env.BASE_URL}${p.image}`}
                    alt={`Screenshot of the ${p.title} live preview`}
                    width="720" height={p.image.match(/(login|rwt|simplilearn)/) ? 405 : 450}
                    loading="lazy" decoding="async"
                  />
                  {p.featured ? <span className="badge float">Featured</span> : null}
                </div>
                <div className="project-body">
                  <h3 id={`p-${p.id}`}>{p.title}</h3>
                  <p>{p.description}</p>
                  <ul className="tags" aria-label="Technologies">
                    {p.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  <div className="project-links">
                    <a className="btn btn-primary sm" href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Live preview: ${p.title}`}>
                      Live preview <Icon name="external" />
                    </a>
                    <a className="btn btn-ghost sm" href={`${GH}${p.repo}`} target="_blank" rel="noopener noreferrer" aria-label={`Source on GitHub: ${p.title}`}>
                      <Icon name="source" /> Source
                    </a>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
