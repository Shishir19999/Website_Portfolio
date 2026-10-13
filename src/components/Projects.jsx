import { useEffect, useRef, useState } from 'react'
import { BigNum, Tc } from './Sections.jsx'
import { ArrowGlyph, Tape, Arrow } from './Doodles.jsx'
import { subscribe, wake, remeasure, getMode } from '../lib/motion.js'
import { refreshAos } from '../lib/aos.js'
import projects from '../data/projects.json'

const FILTERS = ['All', 'Full-stack', 'Frontend', 'QA/Security', 'Tools']
const GH = 'https://github.com/Shishir19999/'
const img = (p) => `${import.meta.env.BASE_URL}${p.image}`
const PEEK_W = 340

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = projects.filter((p) => filter === 'All' || p.categories.includes(filter))
  const featured = projects.filter((p) => p.featured)
  const count = (f) => (f === 'All' ? projects.length : projects.filter((p) => p.categories.includes(f)).length)

  const peek = useRef(null)
  const peekImg = useRef(null)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => { remeasure(); refreshAos() }, [filter])

  // The preview card eases toward the pointer using the page's shared frame loop.
  useEffect(() => subscribe(() => {
    const el = peek.current
    if (!el) return
    const p = pos.current
    const k = getMode() === 'off' ? 1 : 0.2
    p.x += (p.tx - p.x) * k
    p.y += (p.ty - p.y) * k
    el.style.transform = `translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0)`
    if (el.classList.contains('on') && (Math.abs(p.tx - p.x) > 0.5 || Math.abs(p.ty - p.y) > 0.5)) wake(120)
  }), [])

  const show = (p, x, y) => {
    if (!peek.current || !peekImg.current) return
    if (peekImg.current.getAttribute('src') !== img(p)) peekImg.current.setAttribute('src', img(p))
    const o = pos.current
    if (!peek.current.classList.contains('on')) { o.x = x; o.y = y }
    o.tx = x
    o.ty = y
    peek.current.classList.add('on')
    wake(300)
  }
  const hide = () => peek.current?.classList.remove('on')
  const target = (e) => [Math.min(e.clientX + 28, window.innerWidth - PEEK_W - 16), Math.max(e.clientY - 110, 70)]

  const onMove = (p) => (e) => { if (e.pointerType === 'mouse') { const [x, y] = target(e); show(p, x, y) } }
  const onFocus = (p) => (e) => {
    if (!e.target.matches(':focus-visible')) return
    const r = e.currentTarget.getBoundingClientRect()
    show(p, Math.max(16, r.right - PEEK_W - 24), Math.min(Math.max(r.top - 70, 70), window.innerHeight - 260))
  }

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-h">
      <BigNum t="04" data-speed="0.1" data-speed-x="-0.3" className="right" />
      <div className="wrap">
        <div className="projects-head">
          <div>
            <Tc n={4} name="projects" />
            <h2 id="projects-h" className="h-xxl" data-aos="fade-up" data-aos-duration="900">
              Fifteen projects.<br /><span className="out">All of them live.</span>
            </h2>
          </div>
          <p className="projects-intro" data-aos="fade-left" data-aos-delay="200">
            Click a title and the live preview opens. The full-stack ones run their server code in your browser for the preview, so no data leaves your device.
          </p>
        </div>

        {filter === 'All' ? (
          <div className="board" aria-label="Pinned projects">
            {featured.map((p, i) => (
              <a
                key={p.id}
                href={p.live} target="_blank" rel="noopener noreferrer"
                className={`pin pin${i + 1}`}
                aria-label={`Live preview: ${p.title}`}
                data-aos={['fade-right', 'fade-up', 'zoom-in', 'fade-left'][i]}
                data-aos-delay={(i % 2) * 150}
                data-aos-duration="1000"
              >
                <Tape className={i % 2 ? 't6' : 't7'} />
                <span className="frame">
                  <img
                    src={img(p)} alt={`Screenshot of the ${p.title} live preview`}
                    width="720" height="450" loading="lazy" decoding="async"
                    data-speed="0.07" data-max="26" data-lite="off"
                  />
                </span>
                <span className="cap hand">{p.title} <ArrowGlyph /></span>
              </a>
            ))}
            <Arrow className="board-arrow" delay={500} />
            <p className="hand board-note" aria-hidden="true">the four I would show first</p>
          </div>
        ) : null}

        <div className="index-bar">
          <div className="textfilter" role="group" aria-label="Filter projects">
            {FILTERS.map((f, i) => (
              <span key={f}>
                {i > 0 ? <span className="slash" aria-hidden="true"> / </span> : null}
                <button type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f.toLowerCase()} <sup>{count(f)}</sup>
                </button>
              </span>
            ))}
          </div>
          <p className="index-count" role="status" aria-live="polite">showing {list.length} of {projects.length}</p>
        </div>

        <ol className="index" onPointerLeave={hide}>
          {list.map((p, i) => (
            <li
              key={p.id}
              className="row"
              data-aos="fade-up" data-aos-delay={(i % 3) * 60} data-aos-duration="700" data-aos-offset="30"
              onPointerEnter={onMove(p)} onPointerMove={onMove(p)}
            >
              <span className="row-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="row-main">
                <h3>
                  <a
                    className="row-link" href={p.live} target="_blank" rel="noopener noreferrer"
                    aria-label={`${p.title}, live preview (opens in a new tab)`}
                    onFocus={onFocus(p)} onBlur={hide}
                  >
                    {p.title}
                  </a>
                </h3>
                <p className="row-desc">{p.description}</p>
              </div>
              <p className="row-meta">
                <span className="row-stack">{p.tags.join(' / ')}</span>
                <span className="row-kind">{p.year ? `${p.year}, ` : ''}{p.categories.join(', ').toLowerCase()}</span>
              </p>
              <a
                className="row-src" href={`${GH}${p.repo}`} target="_blank" rel="noopener noreferrer"
                aria-label={`Source on GitHub: ${p.title}`}
              >
                source <ArrowGlyph />
              </a>
              <img className="row-thumb" src={img(p)} alt="" width="720" height="450" loading="lazy" decoding="async" />
            </li>
          ))}
        </ol>
      </div>
      <div className="peek" ref={peek} aria-hidden="true">
        <img ref={peekImg} alt="" width="720" height="450" decoding="async" />
      </div>
    </section>
  )
}
