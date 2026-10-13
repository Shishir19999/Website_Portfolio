import { Underline, Check, Cross, Arrow, Tape, ArrowGlyph, Squiggle } from './Doodles.jsx'
import profile from '../data/profile.json'
import cv from '../pdf/Shishir_Sharma_CV.pdf'

export const Tc = ({ n, name, className = '' }) => (
  <p className={`tc ${className}`}>
    <span className="tc-id">TC-{String(n).padStart(3, '0')}</span>
    <span className="tc-name">{name}</span>
  </p>
)

export const BigNum = ({ t, className = '', ...rest }) => (
  <span className={`bignum ${className}`} data-t={t} aria-hidden="true" {...rest} />
)

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-h">
      <BigNum t="01" data-speed="0.12" data-speed-x="0.3" />
      <div className="wrap">
        <Tc n={1} name="about" className="tc-side" />
        <div className="about-grid">
          <h2 id="about-h" className="h-xl about-h" data-aos="fade-right" data-aos-duration="900">
            Tester first.<br />
            <span className="hl">Builder<Underline delay={500} /></span> too.
          </h2>
          <div className="about-body">
            {profile.about.map((p, i) => (
              <p key={p.slice(0, 20)} className={i === 0 ? 'lede' : ''} data-aos="fade-up" data-aos-delay={i * 150}>{p}</p>
            ))}
          </div>
          <aside className="pull" data-aos="flip-left" data-aos-duration="1000">
            <Tape className="t5" />
            <p>{profile.summary}</p>
            <span className="hand pull-hand">(this is the whole job, really)</span>
          </aside>
        </div>
        <ol className="charters" aria-label="What I spend my time on">
          {profile.focus.map((f, i) => (
            <li
              key={f.title}
              className={`charter c${i + 1}`}
              data-aos={['fade-right', 'fade-up', 'flip-right'][i]}
              data-aos-delay={i * 120}
              data-aos-once={i === 1 ? 'false' : 'true'}
            >
              <span className="charter-tag" aria-hidden="true">{f.tag}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
              {i === 0 ? <Check className="charter-check" delay={600} /> : null}
              {i === 2 ? <Cross className="charter-cross" delay={600} /> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const TOOLS = ['Selenium', 'TestNG', 'Postman', 'JMeter', 'Burp Suite', 'Cypress', 'Maven', 'MySQL', 'Figma', 'Git']
const VERBS = ['FAIL', 'RETEST', 'PASS', 'REGRESSION', 'SMOKE', 'EDGE CASE', 'PASS']

function Strip({ words, dir, className, sep }) {
  const half = [...words, ...words]
  return (
    <div className={`ribbon ${className}`} data-marquee={dir} aria-hidden="true">
      <div className="track">
        {[0, 1].map((k) => (
          <span key={k} className="run">
            {half.map((w, i) => <span key={`${k}-${i}`} className="w">{w}<span className="sep">{sep}</span></span>)}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Two crossing tape ribbons; their speed follows scroll velocity. */
export function Ribbon() {
  return (
    <div className="ribbons" aria-hidden="true">
      <Strip words={TOOLS} dir={1} className="r-solid" sep=" / " />
      <Strip words={VERBS} dir={-1} className="r-outline" sep=" > " />
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section exp" aria-labelledby="exp-h">
      <BigNum t="02" data-speed="0.1" data-speed-x="-0.25" className="right" />
      <div className="wrap exp-grid">
        <div className="exp-side">
          <div className="exp-sticky">
            <Tc n={2} name="experience" />
            <h2 id="exp-h" className="h-xl" data-aos="fade-right">Two entries in the log, so far.</h2>
            <p className="margin-note hand" data-aos="fade-up" data-aos-delay="200">
              same company both times.<br />intern first, associate now.
            </p>
          </div>
        </div>
        <ol className="exp-list">
          <li className="exp-track" aria-hidden="true"><i className="exp-line" data-draw /></li>
          {profile.experience.map((job, i) => (
            <li key={job.title} className="exp-item" data-aos={i === 0 ? 'fade-left' : 'fade-up'} data-aos-duration="900">
              <span className={`exp-dot${job.current ? ' now' : ''}`} aria-hidden="true" />
              <p className="exp-period">{job.period}{job.current ? <span className="stamp small">still running</span> : null}</p>
              <h3>{job.title}</h3>
              <p className="exp-co">{job.company}, {job.place}</p>
              <ul className="ticks">
                {job.points.map((p, k) => <li key={p} data-aos="fade-up" data-aos-delay={Math.min(k, 4) * 70} data-aos-offset="20">{p}</li>)}
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
    <section id="education" className="section edu" aria-labelledby="edu-h">
      <BigNum t="06" data-speed="0.12" data-speed-x="0.22" />
      <div className="wrap">
        <Tc n={6} name="education" className="tc-side" />
        <h2 id="edu-h" className="h-lg" data-aos="fade-right">School, and the courses I took on top.</h2>
        <div className="edu-cols">
          <div className="edu-col a">
            <h3 className="h-mono">education</h3>
            <ul className="ledger">
              {profile.education.map((e, i) => (
                <li key={e.title} data-aos="fade-up" data-aos-delay={i * 120}>
                  <span className="when">{e.period}</span>
                  <span className="what"><strong>{e.title}</strong><br />{e.school}<br /><span className="muted">{e.place}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="edu-col b">
            <h3 className="h-mono">courses</h3>
            <ul className="ledger">
              {profile.courses.map((e, i) => (
                <li key={e.title} data-aos="fade-left" data-aos-delay={i * 120}>
                  <span className="when">{e.period}</span>
                  <span className="what"><strong>{e.title}</strong><br />{e.school}<br /><span className="muted">{e.place}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-h">
      <BigNum t="07" data-speed="0.1" data-speed-x="-0.2" className="right" />
      <div className="wrap">
        <Tc n={7} name="contact" className="tc-side" />
        <h2 id="contact-h" className="h-xl" data-aos="zoom-in-right" data-aos-duration="900">
          Want me on<br />your test team?
        </h2>
        <p className="contact-lede" data-aos="fade-up" data-aos-delay="150">
          I am looking for QA and testing roles. LinkedIn is the quickest way to reach me. GitHub is where the code lives.
        </p>
        <ul className="big-links">
          <li data-aos="fade-up" data-aos-delay="100">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowGlyph /><span className="sr-only"> (opens in a new tab)</span></a>
          </li>
          <li data-aos="fade-up" data-aos-delay="250">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowGlyph /><span className="sr-only"> (opens in a new tab)</span></a>
          </li>
          <li data-aos="fade-up" data-aos-delay="400">
            <a href={cv} download="Shishir_Sharma_CV.pdf">Download CV <ArrowGlyph dir="s" /></a>
          </li>
        </ul>
        <div className="result" data-aos="zoom-in" data-aos-delay="300" data-aos-once="false">
          <span className="stamp big">Result: PASS</span>
          <span className="hand">(pending your reply)</span>
          <Squiggle className="result-squiggle" delay={700} />
        </div>
        <Arrow className="contact-arrow" delay={800} />
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <p>End of report. &copy; {new Date().getFullYear()} {profile.name}. {profile.role}, {profile.location}.</p>
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
