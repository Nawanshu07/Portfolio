import { useLayoutEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { findPage, pageTitle } from './pages'
import { SectionCurve } from './SectionCurve'

const covered = 'translateY(0)'
const below = 'translateY(103%)'
const above = 'translateY(-103%)'
const easing = 'cubic-bezier(.55,0,.18,1)'
const coverDuration = 580
const titleDelay = 80
const titleDuration = 300
const readingTime = 320
const revealDuration = 720

export function PageTransition({ label, onNavigate }: { label: string; onNavigate: (path: string) => void }) {
  const curtain = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const sheet = curtain.current!
    const caption = title.current!
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animation: Animation | undefined
    let titleAnimation: Animation | undefined
    let destination: URL | undefined
    let renderedPath = location.pathname

    function reset() {
      destination = undefined
      animation?.cancel()
      animation = undefined
      titleAnimation?.cancel()
      titleAnimation = undefined
    }

    function enter() {
      reset()
      if (motion.matches || !sheet.animate) return
      const hold = titleDelay + titleDuration + readingTime
      document.documentElement.style.setProperty('--heading-delay', `${hold + revealDuration * .35}ms`)
      titleAnimation = caption.animate(
        [{ opacity: 0, transform: 'translateY(.2em)' }, { opacity: 1, transform: 'translateY(0)' }],
        { delay: titleDelay, duration: titleDuration, easing: 'ease-out', fill: 'both' },
      )
      animation = sheet.animate(
        [{ transform: covered }, { transform: above }],
        { delay: hold, duration: revealDuration, easing, fill: 'backwards' },
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
      enter()
    }

    function follow(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
          event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') ||
          (link.target && link.target !== '_self')) return
      const url = new URL(link.href)
      if (url.origin !== location.origin || url.hash) return
      const next = findPage(url.pathname)
      if (!next) return

      if (next === findPage(location.pathname)) {
        if (url.search && url.search !== location.search) return
        event.preventDefault()
        if (destination) return
        if (location.hash || location.search !== url.search) {
          history.replaceState(history.state, '', location.pathname + url.search)
        }
        // Let the drawer release its focus and scroll locks first.
        requestAnimationFrame(() => {
          document.getElementById('main')?.focus({ preventScroll: true })
          window.scrollTo({ top: 0, behavior: 'auto' })
        })
        return
      }
      event.preventDefault()
      if (destination) return
      if (motion.matches || !sheet.animate) {
        switchPage(url)
        return
      }
      destination = url
      function cover() {
        if (destination !== url) return
        titleAnimation?.cancel()
        animation?.cancel()
        animation = sheet.animate([{ transform: below }, { transform: covered }], {
          duration: coverDuration, easing, fill: 'forwards',
        })
        animation.onfinish = () => { if (destination === url) switchPage(url) }
      }
      if (animation?.playState === 'running') animation.onfinish = cover
      else cover()
    }

    function onRestore(event: PageTransitionEvent) {
      if (event.persisted) enter()
    }

    function onHistory() {
      if (renderedPath === location.pathname && !destination) return
      renderLocation()
      enter()
    }

    function onMotionChange() {
      if (!motion.matches) return
      const next = destination
      reset()
      if (next) switchPage(next)
    }

    enter()
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
      <SectionCurve className="curtain-edge curtain-edge-top" />
      <span className="curtain-caption" ref={title}>
        <span className="curtain-mark">///</span>
        <span>{label}</span>
      </span>
      <SectionCurve className="curtain-edge curtain-edge-bottom" />
    </div>
  )
}
