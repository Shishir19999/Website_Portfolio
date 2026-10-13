import AOS from 'aos'
import 'aos/dist/aos.css'

const MQ = '(prefers-reduced-motion: reduce)'

/** Start AOS once fonts and layout have settled. Disabled for reduced motion. */
export function initAos() {
  const run = () => {
    AOS.init({
      duration: 500,
      easing: 'ease-out-cubic',
      offset: 60,
      once: true,
      disable: () => window.matchMedia(MQ).matches,
    })
    requestAnimationFrame(() => AOS.refreshHard())
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(run)
  else run()
}

export const refreshAos = () => requestAnimationFrame(() => AOS.refreshHard())
