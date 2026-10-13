import { useEffect } from 'react'
import profile from '../data/profile.json'
import cv from '../data/cv.json'
import { CV_URL, CV_NAME } from '../lib/cv.js'

const strip = (u) => u.replace('https://', '')

/** Print-friendly page. Content mirrors the downloadable CV exactly. */
export default function CVPage() {
  useEffect(() => {
    const prev = document.title
    document.title = `CV | ${profile.name}`
    window.scrollTo(0, 0)
    return () => { document.title = prev }
  }, [])

  return (
    <main id="main" tabIndex={-1} className="cv wrap">
      <div className="cv-actions no-print">
        <a className="link-under" href="#home">&larr; Back to portfolio</a>
        <button type="button" className="btn" onClick={() => window.print()}>Print or save as PDF</button>
        <a className="link-under" href={CV_URL} download={CV_NAME}>Download CV (PDF)</a>
      </div>
      <header className="cv-head">
        <h1>{profile.name}</h1>
        <p className="cv-role">{cv.role} | Lalitpur</p>
        <p className="cv-links">{strip(profile.links.github)} | {strip(profile.links.linkedin)} | {strip(profile.links.site)}</p>
      </header>
      <section aria-labelledby="cv-profile"><h2 id="cv-profile">Profile</h2><p>{cv.profile}</p></section>
      <section aria-labelledby="cv-edu">
        <h2 id="cv-edu">Education</h2>
        {cv.education.map((e) => (
          <div key={e.title} className="cv-item">
            <h3>{e.title}</h3>
            <p>{e.school}</p>
            <p className="muted">{e.period}, {e.place}</p>
          </div>
        ))}
      </section>
      <section aria-labelledby="cv-skills">
        <h2 id="cv-skills">Skills</h2>
        <ul className="cv-skills">
          {cv.skills.map((g) => <li key={g.title}><strong>{g.title}:</strong> {g.items}</li>)}
        </ul>
      </section>
      <section aria-labelledby="cv-courses">
        <h2 id="cv-courses">Courses</h2>
        {cv.courses.map((c) => (
          <div key={c.title} className="cv-item">
            <h3>{c.title}</h3>
            <p>{c.school}</p>
            <p className="muted">{c.period}{c.place ? `, ${c.place}` : ''}</p>
          </div>
        ))}
      </section>
      <section aria-labelledby="cv-proj">
        <h2 id="cv-proj">Projects</h2>
        {cv.projects.map((p) => (
          <div key={p.title} className="cv-item">
            <h3>{p.title}{p.tag ? <span className="muted"> ({p.tag})</span> : null}</h3>
            <p>{p.text}</p>
            <p className="muted">{p.period}</p>
          </div>
        ))}
        <p className="muted">More projects with live previews: {strip(profile.links.site)}#projects</p>
      </section>
      <section aria-labelledby="cv-exp">
        <h2 id="cv-exp">Professional experience</h2>
        {cv.experience.map((j) => (
          <div key={j.title} className="cv-item">
            <h3>{j.title}, {j.company}</h3>
            <p className="muted">{j.period}, {j.place}</p>
            <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </section>
    </main>
  )
}
