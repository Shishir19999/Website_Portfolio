import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import QASamples from './components/QASamples.jsx'
import CVPage from './components/CVPage.jsx'
import { About, Experience, Education, Contact, Footer } from './components/Sections.jsx'
import { useTheme } from './components/hooks.jsx'

const isCv = () => window.location.hash.startsWith('#/cv')

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [cv, setCv] = useState(isCv)

  useEffect(() => {
    const on = () => setCv(isCv())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  // After the view switches, honour a section hash (e.g. #projects) once the sections exist.
  useEffect(() => {
    if (cv) return
    const id = window.location.hash.slice(1)
    if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView()
  }, [cv])

  if (cv) return <><a className="skip-link" href="#main">Skip to content</a><CVPage /></>

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1}>
        <Hero theme={theme} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <QASamples />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
