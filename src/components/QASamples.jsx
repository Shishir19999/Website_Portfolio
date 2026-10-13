import { useEffect, useState } from 'react'
import { BigNum, Tc } from './Sections.jsx'
import { Tape } from './Doodles.jsx'
import { remeasure } from '../lib/motion.js'
import { refreshAos } from '../lib/aos.js'
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
  useEffect(() => { remeasure(); refreshAos() }, [id])
  return (
    <section id="qa-samples" className="section qa" aria-labelledby="qa-h">
      <BigNum t="05" data-speed="0.1" data-speed-x="0.26" />
      <div className="wrap">
        <div className="qa-head">
          <div>
            <Tc n={5} name="qa work samples" />
            <h2 id="qa-h" className="h-xl" data-aos="fade-right">How I write things down.</h2>
            <p className="qa-intro" data-aos="fade-up" data-aos-delay="150">
              Sample artifacts for my own public{' '}
              <a href={qa.app.live} target="_blank" rel="noopener noreferrer">{qa.app.name} live preview</a>.
            </p>
          </div>
          <div className="sticky qa-note" role="note" data-aos="flip-right" data-aos-duration="900">
            <Tape className="t2" />
            <span className="hand">read this first</span>
            <span>{qa.app.note}</span>
          </div>
        </div>
        <div className="textfilter tabs" role="group" aria-label="Choose a sample">
          {qa.tabs.map((t, i) => (
            <span key={t.id}>
              {i > 0 ? <span className="slash" aria-hidden="true"> / </span> : null}
              <button type="button" aria-pressed={id === t.id} onClick={() => setId(t.id)}>{t.label.toLowerCase()}</button>
            </span>
          ))}
        </div>
        <div className="sheet" data-aos="fade-up" data-aos-duration="800" data-aos-offset="20">
          <p className="sample-intro"><span className="stamp small">sample</span> {tab.intro}</p>
          <View tab={tab} />
        </div>
      </div>
    </section>
  )
}
