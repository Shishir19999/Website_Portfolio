import { Circle, ArrowGlyph } from './Doodles.jsx'
import { CV_URL, CV_NAME } from '../lib/cv.js'
import profile from '../data/profile.json'

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      {/* layer 1: faint grid, drifts slowly */}
      <div className="hero-grid-bg" aria-hidden="true" data-speed="0.12" data-max="30" data-lite="off" />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="kicker" data-aos="fade-up">QA notebook / Lalitpur, Nepal</p>
          <h1 id="hero-title" data-aos="fade-up" data-aos-delay="60">{profile.name}</h1>
          <p className="hero-role" data-aos="fade-up" data-aos-delay="120">
            Software <span className="circled">QA<Circle delay={500} /></span> Engineer
          </p>
          <p className="hero-tagline" data-aos="fade-up" data-aos-delay="180">{profile.tagline}</p>
          <div className="hero-actions" data-aos="fade-up" data-aos-delay="240">
            <a className="btn" href="#projects">See the projects <ArrowGlyph dir="s" /></a>
            <a className="link-under" href={CV_URL} download={CV_NAME}>Download CV (PDF)</a>
            <a className="link-under" href="#contact">Get in touch</a>
          </div>
        </div>
        {/* layer 2: the avatar */}
        <div className="avatar-wrap" data-speed="-0.05" data-max="24" data-lite="off">
          <figure className="avatar" data-aos="fade-up" data-aos-delay="150">
            <img
              src={`${import.meta.env.BASE_URL}assets/hero/hero.avif`}
              alt={`Illustrated avatar of ${profile.shortName} working on a laptop`}
              width="320" height="320" fetchPriority="high"
            />
            <figcaption>Me, drawn.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
