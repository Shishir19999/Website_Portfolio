import { Circle, Arrow, Scribble, Tape, ArrowGlyph, Underline } from './Doodles.jsx'
import profile from '../data/profile.json'
import cv from '../pdf/Shishir_Sharma_CV.pdf'

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      {/* layer 1: oversized lettering far behind everything */}
      <div className="hero-bg" aria-hidden="true">
        <span className="giant g-qa" data-t="QA" data-speed="0.34" data-speed-x="-0.12" />
        <span className="giant g-tested" data-t="TESTED" data-speed="-0.08" data-speed-x="0.2" data-lite="off" />
      </div>

      {/* layer 2: paper on the desk */}
      <div className="hero-desk" aria-hidden="true">
        <div className="desk-item scrap-wrap" data-speed="0.22">
          <div className="scrap" data-aos="fade-left" data-aos-delay="500" data-aos-duration="1100">
            <span className="scrap-title">TC-000</span>
            <span className="scrap-line" /><span className="scrap-line short" /><span className="scrap-line" />
            <span className="scrap-box">expected</span>
            <span className="scrap-box">actual</span>
            <Tape className="t1" />
          </div>
        </div>
        <div className="desk-item sticky-wrap" data-speed="0.14">
          <div className="sticky" data-aos="zoom-in" data-aos-delay="700" data-aos-duration="900">
            <Tape className="t2" />
            I can follow a defect from the screen, through the API, down to the data.
          </div>
        </div>
        <div className="desk-item scribble-wrap" data-speed="0.3" data-lite="off">
          <Scribble className="scribble" delay={900} />
        </div>
      </div>

      <div className="hero-grid">
        <div className="hero-copy" data-speed="0.05" data-lite="off">
          <p className="kicker" data-aos="fade-right" data-aos-delay="100">QA notebook / Lalitpur, Nepal</p>
          <h1 id="hero-title">
            <span className="sr-only">{profile.name}, </span>
            <span className="nm n1" data-aos="fade-up" data-aos-delay="150" aria-hidden="true">Shishir</span>
            <span className="nm n2" data-aos="fade-up" data-aos-delay="300" aria-hidden="true">Sharma</span>
            <span className="nm n3" data-aos="fade-up" data-aos-delay="450" aria-hidden="true">Upadhyay</span>
            <span className="hero-role" data-aos="fade-up" data-aos-delay="650">
              Software <span className="circled">QA<Circle delay={1100} /></span> Engineer
            </span>
          </h1>
          <p className="hero-tagline" data-aos="fade-up" data-aos-delay="800">{profile.tagline}</p>
          <div className="hero-actions" data-aos="fade-up" data-aos-delay="950">
            <a className="btn" href="#projects">See the projects <ArrowGlyph dir="s" /></a>
            <a className="link-under" href={cv} download="Shishir_Sharma_CV.pdf">Download CV (PDF)</a>
            <a className="link-under" href="#contact">Say hello</a>
          </div>
        </div>

        {/* layer 3: the avatar, taped on */}
        <div className="polaroid-wrap" data-speed="-0.07" data-lite="off">
          <figure className="polaroid" data-aos="zoom-in-up" data-aos-delay="400" data-aos-duration="1000">
            <Tape className="t3" />
            <Tape className="t4" />
            <div className="polaroid-img">
              <img
                src={`${import.meta.env.BASE_URL}assets/hero/hero.avif`}
                alt={`Illustrated avatar of ${profile.shortName} working on a laptop`}
                width="320" height="320" fetchPriority="high"
              />
            </div>
            <figcaption>that&rsquo;s me, drawn</figcaption>
          </figure>
        </div>
      </div>

      {/* layer 4: red-pen annotations in front, moving fastest */}
      <div className="hero-ink" aria-hidden="true">
        <div className="ink-item stamp-wrap" data-speed="-0.2" data-lite="off">
          <div className="stamp" data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="500">FAIL &rarr; PASS</div>
        </div>
        <div className="ink-item note-wrap" data-speed="-0.12" data-lite="off">
          <p className="hand note" data-aos="fade-up" data-aos-delay="1400">found it. fixed it.<br />retested it.</p>
          <Arrow className="note-arrow" delay={1600} />
        </div>
        <div className="ink-item under-wrap" data-speed="-0.1" data-lite="off">
          <Underline className="under-line" delay={1300} />
        </div>
      </div>
      <p className="scroll-cue" aria-hidden="true">scroll, there is more</p>
    </section>
  )
}
