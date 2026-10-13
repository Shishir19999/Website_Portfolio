import { useEffect, useState } from 'react'
import { useScrollState } from './hooks.jsx'
import { ArrowGlyph } from './Doodles.jsx'
import profile from '../data/profile.json'

export const SECTIONS = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'qa-samples', label: 'qa samples' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
]
const IDS = ['home', ...SECTIONS.map((s) => s.id)]

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const { active, showTop } = useScrollState(IDS)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="site-header">
        <div className="progress" aria-hidden="true"><div id="progress-bar" className="progress-bar" /></div>
        <nav className="nav" aria-label="Main">
          <a className="brand" href="#home" onClick={() => setOpen(false)}>
            <span className="brand-name">{profile.shortName}</span>
            <span className="brand-tag" aria-hidden="true">/qa</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'close' : 'menu'}
          </button>
          <ul id="nav-links" className={`nav-links${open ? ' open' : ''}`}>
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === s.id ? 'active' : ''}
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span> {s.label}
                </a>
              </li>
            ))}
            <li className="nav-tools">
              <button
                type="button"
                className="theme-btn"
                onClick={onToggleTheme}
                aria-pressed={theme === 'dark'}
                aria-label={theme === 'dark' ? 'Switch to day shift (light theme)' : 'Switch to night shift (dark theme)'}
              >
                {theme === 'dark' ? 'day shift' : 'night shift'}
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <a href="#home" className={`to-top${showTop ? " show" : ""}`} tabIndex={showTop ? 0 : -1} aria-label="Back to top">
        <ArrowGlyph dir="n" /> top
      </a>
    </>
  )
}
