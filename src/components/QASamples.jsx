import { useState } from 'react'
import { Icon } from './icons.jsx'
import { Reveal } from './hooks.jsx'
import { SectionHead } from './Sections.jsx'
import qa from '../data/qaSamples.json'

function DataTable({ tab }) {
  return (
    <div className="table-scroll" role="region" aria-label={`${tab.label} table, scrolls sideways`} tabIndex={0}>
      <table>
        <caption className="sr-only">{tab.label}</caption>
        <thead>
          <tr>{tab.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
        </thead>
        <tbody>
          {tab.rows.map((r) => (
            <tr key={r[3] && tab.columns.length > 10 ? r[3] : r[0]}>
              {r.map((cell, i) => (
                i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell === '' ? <span className="blank">to be filled</span> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Defect({ tab }) {
  return (
    <div className="defect">
      <dl className="defect-fields">
        {tab.fields.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <div className="defect-body">
        <h3>Steps to reproduce</h3>
        <ol>{tab.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        <h3>Expected result</h3><p>{tab.expected}</p>
        <h3>Actual result</h3><p>{tab.actual}</p>
        <h3>Notes</h3><p>{tab.notes}</p>
      </div>
    </div>
  )
}

function Code({ tab }) {
  return (
    <div className="code-blocks">
      {tab.blocks.map((b) => (
        <figure key={b.title}>
          <figcaption>{b.title}</figcaption>
          <pre tabIndex={0}><code>{b.code}</code></pre>
        </figure>
      ))}
    </div>
  )
}

function Strategy({ tab }) {
  return (
    <div className="strategy">
      {tab.sections.map((s) => (
        <div key={s.title} className="strategy-card">
          <h3>{s.title}</h3>
          <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      ))}
    </div>
  )
}

const VIEW = { table: DataTable, defect: Defect, code: Code, strategy: Strategy }

export default function QASamples() {
  const [id, setId] = useState(qa.tabs[0].id)
  const tab = qa.tabs.find((t) => t.id === id)
  const View = VIEW[tab.kind]
  return (
    <section id="qa-samples" className="section" aria-labelledby="qa-h">
      <div className="container">
        <SectionHead eyebrow="QA work samples" title="How I document testing" id="qa-h">
          Original sample artifacts for my own public{' '}
          <a href={qa.app.live} target="_blank" rel="noopener noreferrer">{qa.app.name} live preview</a>.
        </SectionHead>
        <Reveal className="notice" role="note"><Icon name="doc" /> <span>{qa.app.note}</span></Reveal>
        <div className="chips" role="group" aria-label="Choose a sample">
          {qa.tabs.map((t) => (
            <button key={t.id} type="button" className="chip" aria-pressed={id === t.id} onClick={() => setId(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="card sample">
          <p className="sample-intro"><span className="badge">Sample</span> {tab.intro}</p>
          <View tab={tab} />
        </div>
      </div>
    </section>
  )
}
