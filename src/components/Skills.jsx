import { useEffect, useMemo, useState } from 'react'
import { BigNum, Tc } from './Sections.jsx'
import { Squiggle } from './Doodles.jsx'
import { remeasure } from '../lib/motion.js'
import { refreshAos } from '../lib/aos.js'
import groups from '../data/skills.json'

export default function Skills() {
  const [group, setGroup] = useState('all')
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()

  const visible = useMemo(
    () =>
      groups
        .filter((g) => group === 'all' || g.id === group)
        .map((g) => ({ ...g, items: g.items.filter((i) => !query || i.name.toLowerCase().includes(query)) }))
        .filter((g) => g.items.length > 0),
    [group, query],
  )
  const total = visible.reduce((n, g) => n + g.items.length, 0)

  useEffect(() => { remeasure(); refreshAos() }, [group, query])

  return (
    <section id="skills" className="section skills ruled" aria-labelledby="skills-h">
      <BigNum t="03" data-speed="0.1" data-speed-x="0.28" />
      <div className="wrap">
        <div className="skills-head">
          <div>
            <Tc n={3} name="skills" />
            <h2 id="skills-h" className="h-xl" data-aos="fade-right">The checklist.</h2>
          </div>
          <p className="hand skills-note" data-aos="fade-left" data-aos-delay="200">
            [x] I use it.<br />[~] exposure: I have worked with it while learning, not every day.
          </p>
        </div>

        <div className="toolbar">
          <div className="search">
            <label htmlFor="skill-search">find a tool</label>
            <input
              id="skill-search" type="search" placeholder="e.g. Postman"
              value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off"
            />
          </div>
          <div className="textfilter" role="group" aria-label="Filter skills by group">
            {[{ id: 'all', title: 'All' }, ...groups].map((g, i) => (
              <span key={g.id}>
                {i > 0 ? <span className="slash" aria-hidden="true"> / </span> : null}
                <button type="button" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>{g.title}</button>
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{total} skills shown</p>

        {visible.length === 0 ? (
          <p className="empty">Nothing matches &ldquo;{q}&rdquo;. Try another word, or pick All.</p>
        ) : (
          <div className="skill-sheet">
            {visible.map((g, gi) => (
              <section key={g.id} className={`skillgroup sg${gi % 3}`} aria-labelledby={`sg-${g.id}`} data-aos={['fade-up', 'fade-right', 'fade-left'][gi % 3]} data-aos-delay={(gi % 2) * 100}>
                <h3 id={`sg-${g.id}`}>{g.title}</h3>
                <ul className="checks">
                  {g.items.map((i) => (
                    <li key={i.name} className={i.exposure ? 'exp' : ''}>
                      <span className="box" aria-hidden="true">{i.exposure ? '[~]' : '[x]'}</span>
                      <span>{i.name}{i.exposure ? <em className="sr-only"> (exposure)</em> : null}</span>
                    </li>
                  ))}
                </ul>
                {gi % 3 === 0 ? <Squiggle className="sg-squiggle" delay={400} /> : null}
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
