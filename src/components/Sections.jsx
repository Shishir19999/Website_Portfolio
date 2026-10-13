import { Underline, ArrowGlyph } from './Doodles.jsx'
import { CV_URL, CV_NAME } from '../lib/cv.js'
import profile from '../data/profile.json'

export const Tc = ({ n, name }) => (
  <p className="tc">
    <span className="tc-id">TC-{String(n).padStart(3, '0')}</span>
    <span className="tc-name">{name}</span>
  </p>
)

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h">
      <div className="wrap">
        <Tc n={1} name="about" />
        <div className="two">
          <div>
            <h2 id="about-h" className="h2" data-aos="fade-up">
              Tester first, <span className="hl">builder<Underline delay={400} /></span> too.
            </h2>
            <blockquote className="quote" data-aos="fade-up" data-aos-delay="60">{profile.summary}</blockquote>
          </div>
          <div className="prose">
            {profile.about.map((p, i) => <p key={p.slice(0, 20)} data-aos="fade-up" data-aos-delay={i * 60}>{p}</p>)}
          </div>
        </div>
        <ol className="charters" aria-label="What I spend my time on">
          {profile.focus.map((f, i) => (
            <li key={f.title} data-aos="fade-up" data-aos-delay={i * 60}>
              <span className="charter-tag" aria-hidden="true">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section alt" aria-labelledby="exp-h">
      <div className="wrap exp-grid">
        <div className="exp-side">
          <div className="exp-sticky" data-speed="0.04" data-max="24" data-lite="off">
            <Tc n={2} name="experience" />
            <h2 id="exp-h" className="h2" data-aos="fade-up">Two entries in the log.</h2>
            <p className="muted" data-aos="fade-up" data-aos-delay="60">Same company, intern first and associate now.</p>
          </div>
        </div>
        <ol className="exp-list">
          <li className="exp-track" aria-hidden="true"><i className="exp-line" data-draw /></li>
          {profile.experience.map((job) => (
            <li key={job.title} className="exp-item" data-aos="fade-up">
              <span className={`exp-dot${job.current ? ' now' : ''}`} aria-hidden="true" />
              <p className="exp-period">{job.period}{job.current ? <span className="badge">current</span> : null}</p>
              <h3>{job.title}</h3>
              <p className="exp-co">{job.company}, {job.place}</p>
              <ul className="ticks">
                {job.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section id="education" className="section alt" aria-labelledby="edu-h">
      <div className="wrap">
        <Tc n={6} name="education" />
        <h2 id="edu-h" className="h2" data-aos="fade-up">School and courses.</h2>
        <div className="two edu-cols">
          {[['education', profile.education], ['courses', profile.courses]].map(([label, list]) => (
            <div key={label}>
              <h3 className="h-mono">{label}</h3>
              <ul className="ledger">
                {list.map((e) => (
                  <li key={e.title} data-aos="fade-up">
                    <span className="when">{e.period}</span>
                    <span className="what"><strong>{e.title}</strong><br />{e.school}<br /><span className="muted">{e.place}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-h">
      <div className="wrap">
        <Tc n={7} name="contact" />
        <h2 id="contact-h" className="h2" data-aos="fade-up">Want me on your test team?</h2>
        <p className="lede" data-aos="fade-up" data-aos-delay="60">
          I am looking for QA and testing roles. LinkedIn is the quickest way to reach me.
        </p>
        <ul className="big-links" data-aos="fade-up" data-aos-delay="120">
          <li><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowGlyph /><span className="sr-only"> (opens in a new tab)</span></a></li>
          <li><a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowGlyph /><span className="sr-only"> (opens in a new tab)</span></a></li>
          <li><a href={CV_URL} download={CV_NAME}>Download CV <ArrowGlyph dir="s" /></a></li>
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <p>&copy; {new Date().getFullYear()} {profile.name}. {profile.role}, {profile.location}.</p>
        <p>
          <a href="#/cv">Print-friendly CV</a>
          <span aria-hidden="true"> / </span>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <span aria-hidden="true"> / </span>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  )
}
