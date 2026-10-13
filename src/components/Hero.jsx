import { useEffect, useRef } from 'react'
import { Icon } from './icons.jsx'
import { useReducedMotion, useTypewriter } from './hooks.jsx'
import profile from '../data/profile.json'
import cv from '../pdf/Shishir_Sharma_CV.pdf'

function Particles({ reduced, theme }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const color = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim() || '175,145,100'
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let pts = []
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(18, Math.min(60, Math.round((w * h) / 22000)))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: 1 + Math.random() * 1.6,
      }))
      draw()
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        ctx.fillStyle = `rgba(${color},0.8)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 120) {
            ctx.strokeStyle = `rgba(${color},${0.25 * (1 - d / 120)})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
    }
    const step = () => {
      raf = 0
      if (!visible) return
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(step)
    }
    resize()
    window.addEventListener('resize', resize)
    let io
    if (!reduced) {
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(step)
      })
      io.observe(canvas)
      raf = requestAnimationFrame(step)
    }
    return () => {
      window.removeEventListener('resize', resize)
      if (io) io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced, theme])
  return <canvas ref={ref} className="particles" aria-hidden="true" />
}

export default function Hero({ theme }) {
  const reduced = useReducedMotion()
  const typed = useTypewriter(profile.typedRoles, reduced)
  const photo = useRef(null)

  useEffect(() => {
    if (reduced) return undefined
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = Math.min(window.scrollY, 600)
        if (photo.current) photo.current.style.transform = `translateY(${y * 0.08}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Particles reduced={reduced} theme={theme} />
      <div className="container hero-grid">
        <div className="hero-card reveal in">
          <p className="eyebrow"><Icon name="pin" /> Based in {profile.location}</p>
          <h1 id="hero-title">
            <span className="hero-name">{profile.name}</span>
            <span className="hero-role">{profile.role}</span>
          </h1>
          <p className="typed" aria-hidden="true">
            I work as a <strong>{typed}</strong><span className="caret" />
          </p>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#projects"><Icon name="projects" /> View projects</a>
            <a className="btn btn-ghost" href={cv} download="Shishir_Sharma_CV.pdf"><Icon name="download" /> Download CV</a>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
          <ul className="social-row" aria-label="Profiles">
            <li><a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Icon name="github" /></a></li>
            <li><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Icon name="linkedin" /></a></li>
          </ul>
        </div>
        <div className="hero-photo-wrap">
          <div ref={photo} className="hero-photo">
            <img
              src={`${import.meta.env.BASE_URL}assets/hero/hero.avif`}
              alt={`Illustrated avatar of ${profile.shortName} working on a laptop`}
              width="320" height="320"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
