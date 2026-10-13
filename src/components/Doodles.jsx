// Two small hand-drawn marks, used sparingly. Each draws once when revealed.
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', vectorEffect: 'non-scaling-stroke', pathLength: 1 }

function Mark({ className = '', viewBox, children, delay = 0 }) {
  return (
    <svg className={`doodle ${className}`} viewBox={viewBox} aria-hidden="true" focusable="false" preserveAspectRatio="none"
      data-aos="draw" data-aos-delay={delay} data-aos-duration="700">
      {children}
    </svg>
  )
}

export const Circle = (p) => (
  <Mark viewBox="0 0 200 80" {...p}>
    <path {...base} d="M30,44 C14,22 66,6 112,8 C164,10 198,28 186,50 C174,72 118,76 76,70 C30,64 8,50 22,28 C26,22 34,18 42,15" />
  </Mark>
)

export const Underline = (p) => (
  <Mark viewBox="0 0 200 12" {...p}>
    <path {...base} d="M2,8 C30,2 58,11 98,6 S168,3 198,8" />
  </Mark>
)

export const ArrowGlyph = ({ dir = 'ne' }) => {
  const rot = { ne: 0, e: 45, s: 135, n: -45 }[dir]
  return (
    <svg className="glyph" viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true" focusable="false" style={{ rotate: `${rot}deg` }}>
      <path d="M4 12 L12 4 M5 4 H12 V11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}
