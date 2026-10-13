import { useMemo, useState } from 'react'
import { Icon } from './icons.jsx'
import { Reveal } from './hooks.jsx'
import { SectionHead } from './Sections.jsx'
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

  return (
    <section id="skills" className="section" aria-labelledby="skills-h">
      <div className="container">
        <SectionHead eyebrow="Skills" title="Tools and technologies" id="skills-h">
          Grouped by the kind of work. Items marked exposure are tools I have worked with in a learning capacity.
        </SectionHead>
        <div className="toolbar">
          <div className="search">
            <label htmlFor="skill-search" className="sr-only">Search skills</label>
            <input
              id="skill-search" type="search" placeholder="Search skills, e.g. Postman"
              value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off"
            />
          </div>
          <div className="chips" role="group" aria-label="Filter skills by group">
            {[{ id: 'all', title: 'All' }, ...groups].map((g) => (
              <button key={g.id} type="button" className="chip" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
                {g.title}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{total} skills shown</p>
        {visible.length === 0 ? (
          <p className="empty">No skills match &ldquo;{q}&rdquo;. Try a different word or choose All.</p>
        ) : (
          <div className="skill-grid">
            {visible.map((g, gi) => (
              <Reveal key={g.id} className="card skill-card" delay={gi * 60}>
                <h3><span className="card-icon sm"><Icon name={g.icon} /></span> {g.title}</h3>
                <ul className="skill-list">
                  {g.items.map((i) => (
                    <li key={i.name} className="skill">
                      <Icon name={i.icon} />
                      <span>{i.name}</span>
                      {i.exposure ? <em className="tag-exposure">exposure</em> : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
