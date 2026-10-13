// One shared requestAnimationFrame loop for every scroll-linked effect on the page.
// Only transform-class properties are written (translate / scale), nothing that triggers layout.
//
// Markup contract (all optional, combine freely):
//   data-speed="0.2"     vertical parallax: element lags (+) or runs ahead (-) of the scroll
//   data-speed-x="-0.1"  horizontal drift tied to scroll
//   data-max="60"        clamp the offset to +/- this many px
//   data-lite="off"      skip on phones / low-power devices
//   data-draw            scaleY from 0 to 1 as the element is read (timeline line)
//   data-marquee="1|-1"  ribbon whose speed follows scroll velocity (child .track holds two copies)

const subs = new Set()
const items = []
const marquees = []
let mode = 'full'
let raf = 0
let until = 0
let lastT = 0
let lastY = 0
let vel = 0
let started = false
let vh = 800

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

function computeMode() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'off'
  const lowPower = (navigator.hardwareConcurrency || 8) <= 2 || (navigator.deviceMemory || 8) <= 2
  if (window.matchMedia('(max-width: 760px)').matches || lowPower) return 'lite'
  return 'full'
}

export const getMode = () => mode

function measure() {
  vh = window.innerHeight
  const sy = window.scrollY
  items.length = 0
  document.querySelectorAll('[data-speed],[data-speed-x],[data-draw]').forEach((el) => {
    const it = {
      el,
      sy: parseFloat(el.dataset.speed || '0'),
      sx: parseFloat(el.dataset.speedX || '0'),
      max: el.dataset.max ? parseFloat(el.dataset.max) : 99999,
      lite: el.dataset.lite !== 'off',
      draw: el.hasAttribute('data-draw'),
      cy: 0,
      cx: 0,
    }
    const prev = el.__m
    if (prev) { it.cy = prev.cy; it.cx = prev.cx }
    const r = el.getBoundingClientRect()
    it.base = r.top + sy + r.height / 2 - it.cy
    it.h = r.height
    el.__m = it
    items.push(it)
  })
  marquees.length = 0
  document.querySelectorAll('[data-marquee]').forEach((el) => {
    const track = el.querySelector('.track')
    if (!track) return
    const m = el.__mq || { pos: 0, visible: false }
    m.el = el
    m.track = track
    m.dir = parseFloat(el.dataset.marquee) || 1
    m.half = track.scrollWidth / 2
    el.__mq = m
    marquees.push(m)
  })
}

function reset(it) {
  it.el.style.translate = ''
  if (it.draw) it.el.style.transform = ''
  it.cy = 0
  it.cx = 0
}

function render(dt) {
  const y = window.scrollY
  if (dt > 0) {
    const v = (y - lastY) / dt
    vel += (v - vel) * Math.min(1, dt * 10)
  }
  lastY = y
  const center = y + vh / 2
  const k = mode === 'lite' ? 0.45 : 1
  for (const it of items) {
    if (mode === 'off' || (mode === 'lite' && !it.lite)) {
      if (it.cy || it.cx) reset(it)
      continue
    }
    if (it.draw) {
      const r = it.el.getBoundingClientRect()
      const p = clamp((vh * 0.62 - r.top) / (r.height || 1), 0, 1)
      it.el.style.transform = `scaleY(${p.toFixed(4)})`
      continue
    }
    const p = center - it.base
    if (Math.abs(p) > vh * 2.2 + it.h) continue
    const ny = clamp(p * it.sy * k, -it.max, it.max)
    const nx = clamp(p * it.sx * k, -it.max, it.max)
    if (Math.abs(ny - it.cy) > 0.05 || Math.abs(nx - it.cx) > 0.05) {
      it.cy = ny
      it.cx = nx
      it.el.style.translate = `${nx.toFixed(1)}px ${ny.toFixed(1)}px`
    }
  }
  for (const m of marquees) {
    if (!m.visible) continue
    if (mode === 'off') { m.track.style.transform = ''; continue }
    const speed = (mode === 'lite' ? 24 : 40) + Math.min(Math.abs(vel), 3000) * (mode === 'lite' ? 0.06 : 0.22)
    m.pos = (m.pos + speed * dt * m.dir) % (m.half || 1)
    const x = m.dir > 0 ? -m.pos : m.pos - m.half
    m.track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`
  }
  subs.forEach((fn) => fn({ y, vh, vel, dt, mode }))
}

function loop(t) {
  raf = 0
  const dt = lastT ? Math.min((t - lastT) / 1000, 0.1) : 0
  lastT = t
  render(dt)
  const keep = t < until || (mode !== 'off' && marquees.some((m) => m.visible))
  if (keep && !document.hidden) raf = requestAnimationFrame(loop)
  else lastT = 0
}

export function wake(ms = 300) {
  until = Math.max(until, performance.now() + ms)
  if (!raf && !document.hidden) raf = requestAnimationFrame(loop)
}

/** Subscribe to every frame (called with scroll state). Returns an unsubscribe function. */
export function subscribe(fn) {
  subs.add(fn)
  wake(50)
  return () => subs.delete(fn)
}

export function remeasure() {
  measure()
  wake(100)
}

export function startMotion() {
  if (started) return () => {}
  started = true
  mode = computeMode()
  document.documentElement.dataset.motion = mode
  measure()
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.target.__mq) e.target.__mq.visible = e.isIntersecting })
    wake(100)
  }, { rootMargin: '120px' })
  const watch = () => marquees.forEach((m) => io.observe(m.el))
  watch()

  let rm = 0
  const reflow = () => {
    cancelAnimationFrame(rm)
    rm = requestAnimationFrame(() => {
      const next = computeMode()
      if (next !== mode) { mode = next; document.documentElement.dataset.motion = mode }
      measure()
      watch()
      wake(200)
    })
  }
  const onScroll = () => wake(200)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', reflow, { passive: true })
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', reflow)
  const main = document.getElementById('main')
  const ro = main && 'ResizeObserver' in window ? new ResizeObserver(reflow) : null
  if (ro) ro.observe(main)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reflow)
  window.addEventListener('load', reflow)
  document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(200) })
  wake(400)

  return () => {
    started = false
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', reflow)
    window.removeEventListener('load', reflow)
    mq.removeEventListener('change', reflow)
    if (ro) ro.disconnect()
    io.disconnect()
    cancelAnimationFrame(raf)
    raf = 0
    items.forEach(reset)
  }
}
