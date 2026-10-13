import { useEffect, useRef, useState } from 'react'

const MQ = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(MQ).matches)
  useEffect(() => {
    const mq = window.matchMedia(MQ)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

/** Returns a ref; adds the "in" class once the element scrolls into view. */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window) || window.matchMedia(MQ).matches) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

/** Highlights the section whose top has passed the header, and tracks scroll progress. */
export function useScrollState(ids) {
  const [active, setActive] = useState(ids[0])
  const [showTop, setShowTop] = useState(false)
  const bar = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
      setShowTop(y > 700)
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) cur = id
      }
      if (max > 0 && y >= max - 4) cur = ids[ids.length - 1]
      setActive(cur)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids])
  return { active, showTop, bar }
}

/** Typewriter that cycles through words. Static first word when motion is reduced. */
export function useTypewriter(words, reduced) {
  const [text, setText] = useState(reduced ? words[0] : '')
  useEffect(() => {
    if (reduced) return undefined
    let i = 0
    let n = 0
    let del = false
    let t
    const tick = () => {
      const w = words[i]
      n += del ? -1 : 1
      setText(w.slice(0, n))
      let wait = del ? 40 : 80
      if (!del && n === w.length) { del = true; wait = 1400 }
      else if (del && n === 0) { del = false; i = (i + 1) % words.length; wait = 350 }
      t = setTimeout(tick, wait)
    }
    t = setTimeout(tick, 600)
    return () => clearTimeout(t)
  }, [words, reduced])
  return reduced ? words[0] : text
}
