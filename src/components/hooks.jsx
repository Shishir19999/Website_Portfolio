import { useEffect, useState } from 'react'
import { subscribe } from '../lib/motion.js'

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
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1c1b18' : '#f6f2e8')
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

/** Highlights the section whose top has passed the header; shares the page's single scroll loop. */
export function useScrollState(ids) {
  const [active, setActive] = useState(ids[0])
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    return subscribe(({ y, vh }) => {
      const max = document.documentElement.scrollHeight - vh
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
      setShowTop(y > 700)
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) cur = id
      }
      if (max > 0 && y >= max - 4) cur = ids[ids.length - 1]
      setActive(cur)
    })
  }, [ids])
  return { active, showTop }
}
