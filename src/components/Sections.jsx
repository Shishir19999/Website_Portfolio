import { Icon } from './icons.jsx'
import { Reveal } from './hooks.jsx'
import profile from '../data/profile.json'
import cv from '../pdf/Shishir_Sharma_CV.pdf'

export function SectionHead({ eyebrow, title, children, id }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children ? <p className="lead">{children}</p> : null}
    </Reveal>
  )
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h">
      <div className="container">
        <SectionHead eyebrow="About" title="Quality engineer who also builds" id="about-h" />
        <div className="about-grid">
          <Reveal className="about-text">
            <p className="summary">{profile.summary}</p>
            {profile.about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            <p className="meta-line"><Icon name="pin" /> Based in {profile.location}</p>
          </Reveal>
          <div className="focus-grid">
            {profile.focus.map((f, i) => (
              <Reveal key={f.title} className="card focus-card" delay={i * 80}>
                <span className="card-icon"><Icon name={f.icon} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section alt" aria-labelledby="exp-h">
      <div className="container">
        <SectionHead eyebrow="Experience" title="Where I have worked" id="exp-h">
          From QA Intern to QA Associate at Cloud Tech Service.
        </SectionHead>
        <ol className="timeline">
          {profile.experience.map((job, i) => (
            <Reveal as="li" key={job.title} className="tl-item" delay={i * 100}>
              <span className={`tl-dot${job.current ? ' current' : ''}`} aria-hidden="true" />
              <div className="card">
                <div className="tl-top">
                  <h3>{job.title}</h3>
                  <span className="pill">{job.period}</span>
                </div>
                <p className="tl-company">{job.company} <span className="muted">| {job.place}</span>{job.current ? <span className="badge">Current</span> : null}</p>
                <ul className="ticks">
                  {job.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function EduCard({ item, icon }) {
  return (
    <Reveal className="card edu-card">
      <span className="card-icon"><Icon name={icon} /></span>
      <div>
        <h4>{item.title}</h4>
        <p>{item.school}</p>
        <p className="muted">{item.place} | {item.period}</p>
      </div>
    </Reveal>
  )
}

export function Education() {
  return (
    <section id="education" className="section alt" aria-labelledby="edu-h">
      <div className="container">
        <SectionHead eyebrow="Education" title="Education and courses" id="edu-h" />
        <div className="two-col">
          <div>
            <h3 className="sub">Education</h3>
            <div className="stack">{profile.education.map((e) => <EduCard key={e.title} item={e} icon="education" />)}</div>
          </div>
          <div>
            <h3 className="sub">Courses</h3>
            <div className="stack">{profile.courses.map((e) => <EduCard key={e.title} item={e} icon="doc" />)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-h">
      <div className="container">
        <Reveal className="contact-card">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-h">Let us talk quality</h2>
          <p className="lead">
            Open to QA and testing roles, and to conversations about test design, API testing and automation. The quickest way to reach me is through LinkedIn or GitHub.
          </p>
          <div className="btn-row center">
            <a className="btn btn-primary" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" /> LinkedIn</a>
            <a className="btn btn-ghost" href={profile.links.github} target="_blank" rel="noopener noreferrer"><Icon name="github" /> GitHub</a>
            <a className="btn btn-ghost" href={cv} download="Shishir_Sharma_CV.pdf"><Icon name="download" /> Download CV</a>
          </div>
          <p className="meta-line"><Icon name="pin" /> Based in {profile.location}</p>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-in">
        <p>&copy; {new Date().getFullYear()} {profile.name}. {profile.role}.</p>
        <p>
          <a href="#/cv">Print-friendly CV</a>
          <span aria-hidden="true"> | </span>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <span aria-hidden="true"> | </span>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  )
}
