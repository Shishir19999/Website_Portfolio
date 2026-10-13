// Hand-drawn marks. Each one is a single stroked path that "draws" when its AOS wrapper reveals.
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', vectorEffect: 'non-scaling-stroke', pathLength: 1 }

function Mark({ className = '', viewBox, stretch, children, aos = 'draw', delay = 0, duration = 900, once = true }) {
  return (
    <svg
      className={`doodle ${className}`} viewBox={viewBox} aria-hidden="true" focusable="false"
      preserveAspectRatio={stretch ? 'none' : 'xMidYMid meet'}
      data-aos={aos} data-aos-delay={delay} data-aos-duration={duration} data-aos-once={once ? 'true' : 'false'}
    >
      {children}
    </svg>
  )
}

export const Circle = (p) => (
  <Mark viewBox="0 0 200 80" stretch {...p}>
    <path {...base} d="M30,44 C14,22 66,6 112,8 C164,10 198,28 186,50 C174,72 118,76 76,70 C30,64 8,50 22,28 C26,22 34,18 42,15" />
  </Mark>
)

export const Underline = (p) => (
  <Mark viewBox="0 0 200 12" stretch {...p}>
    <path {...base} d="M2,8 C30,2 58,11 98,6 S168,3 198,8" />
  </Mark>
)

export const Squiggle = (p) => (
  <Mark viewBox="0 0 200 14" stretch {...p}>
    <path {...base} d="M2,8 C12,1 20,1 28,8 S44,15 54,8 S70,1 80,8 S96,15 106,8 S122,1 132,8 S148,15 158,8 S174,1 184,8 S196,12 198,9" />
  </Mark>
)

export const Arrow = (p) => (
  <Mark viewBox="0 0 120 90" {...p}>
    <path {...base} d="M6,12 C34,4 84,22 98,70" />
    <path {...base} d="M82,58 L98,74 L110,54" />
  </Mark>
)

export const Check = (p) => (
  <Mark viewBox="0 0 48 40" {...p}>
    <path {...base} strokeWidth={4} d="M4,22 L17,35 L44,4" />
  </Mark>
)

export const Scribble = (p) => (
  <Mark viewBox="0 0 110 44" {...p}>
    <path {...base} d="M4,34 L20,6 L34,36 L50,8 L66,38 L82,10 L98,36" />
  </Mark>
)

export const Cross = (p) => (
  <Mark viewBox="0 0 40 40" {...p}>
    <path {...base} d="M6,6 L34,34 M33,5 L7,35" />
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

/** Piece of masking tape. */
export const Tape = ({ className = '' }) => <span className={`tape ${className}`} aria-hidden="true" />
