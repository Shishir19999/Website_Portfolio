import { useEffect, useState } from 'react'
import { Icon } from './icons.jsx'
import { useScrollState } from './hooks.jsx'
import profile from '../data/profile.json'

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'qa-samples', label: 'QA Samples' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
const IDS = ['home', ...SECTIONS.map((s) => s.id)]

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const { active, showTop, bar } = useScrollState(IDS)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="site-header">
        <div className="progress" aria-hidden="true"><div ref={bar} className="progress-bar" /></div>
        <nav className="nav container" aria-label="Main">
          <a className="brand" href="#home" onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden="true">SS</span>
            <span className="brand-name">{profile.shortName}</span>
          </a>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
          <ul id="nav-links" className={`nav-links${open ? ' open' : ''}`}>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === s.id ? 'active' : ''}
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li className="nav-tools">
              <button
                type="button"
                className="icon-btn"
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <a
        href="#home"
        className={`to-top${showTop ? ' show' : ''}`}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <Icon name="up" />
      </a>
    </>
  )
}
