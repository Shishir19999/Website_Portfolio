import { useEffect } from 'react'
import { Icon } from './icons.jsx'
import profile from '../data/profile.json'
import skills from '../data/skills.json'
import projects from '../data/projects.json'
import cv from '../pdf/Shishir_Sharma_CV.pdf'

export default function CVPage() {
  useEffect(() => {
    const prev = document.title
    document.title = `CV | ${profile.name}`
    window.scrollTo(0, 0)
    return () => { document.title = prev }
  }, [])

  return (
    <main id="main" tabIndex={-1} className="cv container">
      <div className="cv-actions no-print">
        <a className="btn btn-ghost" href="#home">&larr; Back to portfolio</a>
        <button type="button" className="btn btn-primary" onClick={() => window.print()}><Icon name="print" /> Print or save as PDF</button>
        <a className="btn btn-ghost" href={cv} download="Shishir_Sharma_CV.pdf"><Icon name="download" /> Download CV (PDF)</a>
      </div>
      <header className="cv-head">
        <h1>{profile.name}</h1>
        <p className="cv-role">{profile.role} | {profile.location}</p>
        <p className="cv-links">
          {profile.links.github.replace('https://', '')} | {profile.links.linkedin.replace('https://', '')} | {profile.links.site.replace('https://', '')}
        </p>
      </header>
      <section aria-labelledby="cv-profile"><h2 id="cv-profile">Profile</h2><p>{profile.summary}</p></section>
      <section aria-labelledby="cv-exp">
        <h2 id="cv-exp">Professional experience</h2>
        {profile.experience.map((j) => (
          <div key={j.title} className="cv-item">
            <h3>{j.title}, {j.company} <span className="muted">({j.place}, {j.period})</span></h3>
            <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </section>
      <section aria-labelledby="cv-skills">
        <h2 id="cv-skills">Skills</h2>
        <ul className="cv-skills">
          {skills.map((g) => <li key={g.id}><strong>{g.title}:</strong> {g.items.map((i) => i.name).join(', ')}</li>)}
        </ul>
      </section>
      <section aria-labelledby="cv-proj">
        <h2 id="cv-proj">Selected projects</h2>
        <ul>
          {projects.filter((p) => p.featured).map((p) => (
            <li key={p.id}><strong>{p.title}.</strong> {p.description} <span className="muted">{p.live.replace('https://', '')}</span></li>
          ))}
        </ul>
        <p className="muted">All projects: {profile.links.site.replace('https://', '')}#projects</p>
      </section>
      <section aria-labelledby="cv-edu">
        <h2 id="cv-edu">Education</h2>
        <ul>{profile.education.map((e) => <li key={e.title}><strong>{e.title}</strong>, {e.school}, {e.place} ({e.period})</li>)}</ul>
      </section>
      <section aria-labelledby="cv-courses">
        <h2 id="cv-courses">Courses</h2>
        <ul>{profile.courses.map((e) => <li key={e.title}><strong>{e.title}</strong>, {e.school} ({e.period})</li>)}</ul>
      </section>
    </main>
  )
}
