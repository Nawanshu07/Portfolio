import { useLayoutEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { findPage, pageTitle } from './pages'

const covered = 'translateY(0)'
const below = 'translateY(103%)'
const above = 'translateY(-103%)'
const easing = 'cubic-bezier(.55,0,.18,1)'

export function PageTransition({ onNavigate }: { onNavigate: (path: string) => void }) {
  const curtain = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const sheet = curtain.current!
    const caption = title.current!
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animation: Animation | undefined
    let destination: URL | undefined
    let renderedPath = location.pathname

    function reset() {
      destination = undefined
      animation?.cancel()
      animation = undefined
      caption.textContent = findPage(location.pathname)?.label ?? 'Page not found'
    }

    function enter(opening: boolean) {
      reset()
      if (motion.matches || !sheet.animate) return
      const hold = opening ? 330 : 0
      const reveal = opening ? 850 : 480
      document.documentElement.style.setProperty('--heading-delay', `${hold + reveal * .35}ms`)
      animation = sheet.animate(
        [{ transform: covered }, { transform: above }],
        { delay: hold, duration: reveal, easing: opening ? easing : 'cubic-bezier(.24,.34,.22,1)', fill: 'backwards' },
      )
    }

    function renderLocation() {
      renderedPath = location.pathname
      flushSync(() => onNavigate(location.pathname))
      document.title = pageTitle(findPage(location.pathname)?.label ?? 'Page not found')
    }

    function switchPage(url: URL) {
      history.pushState(null, '', url)
      renderLocation()
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main')?.focus({ preventScroll: true })
      enter(false)
    }

    function follow(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
          event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') ||
          (link.target && link.target !== '_self')) return
      const url = new URL(link.href)
      if (url.origin !== location.origin || url.pathname === location.pathname || url.hash) return
      const next = findPage(url.pathname)
      if (!next) return

      event.preventDefault()
      if (destination) return
      if (motion.matches || !sheet.animate) {
        switchPage(url)
        return
      }
      destination = url
      const start = animation?.playState === 'running' ? getComputedStyle(sheet).transform : below
      animation?.cancel()
      caption.textContent = next.label
      animation = sheet.animate([{ transform: start }, { transform: covered }], {
        duration: 380, easing: 'cubic-bezier(.44,0,.66,.72)', fill: 'forwards',
      })
      animation.onfinish = () => { if (destination === url) switchPage(url) }
    }

    function onRestore(event: PageTransitionEvent) {
      if (event.persisted) enter(false)
    }

    function onHistory() {
      if (renderedPath === location.pathname && !destination) return
      renderLocation()
      enter(false)
    }

    function onMotionChange() {
      if (!motion.matches) return
      const next = destination
      reset()
      if (next) switchPage(next)
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const fromPortfolio = document.referrer && new URL(document.referrer).origin === location.origin
    enter(navigation?.type === 'reload' || (navigation?.type !== 'back_forward' && !fromPortfolio))
    document.addEventListener('click', follow)
    window.addEventListener('pageshow', onRestore)
    window.addEventListener('popstate', onHistory)
    window.addEventListener('pagehide', reset)
    motion.addEventListener('change', onMotionChange)
    return () => {
      reset()
      document.removeEventListener('click', follow)
      window.removeEventListener('pageshow', onRestore)
      window.removeEventListener('popstate', onHistory)
      window.removeEventListener('pagehide', reset)
      motion.removeEventListener('change', onMotionChange)
    }
  }, [onNavigate])

  return (
    <div className="page-curtain" ref={curtain} aria-hidden="true">
      <span className="curtain-mark">///</span>
      <span ref={title} />
    </div>
  )
}
