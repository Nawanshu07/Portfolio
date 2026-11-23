import { useEffect, useRef, useState, type PointerEvent } from 'react'

interface NavigationDrawerProps {
  pathname: string
  home: boolean
}

const compactMenu = '(max-width: 48rem), (pointer: coarse) and (max-height: 32rem)'

export function NavigationDrawer({ pathname, home }: NavigationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [compact, setCompact] = useState(() => matchMedia(compactMenu).matches)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const drawerRef = useRef<HTMLElement | null>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const hasOpenedRef = useRef(false)

  // Scroll tracking: on home page, appear after hero (scrollY > 220px)
  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 220)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Floating button visible on interior pages immediately, or on scroll on home page, or whenever open
  useEffect(() => {
    const query = matchMedia(compactMenu)
    const sync = () => setCompact(query.matches)
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])
  const isButtonVisible = compact || !home || isScrolled || isOpen

  // Magnetic hover tracking for the floating button wrapper
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const limit = 16
    const pullX = Math.max(-limit, Math.min(limit, (e.clientX - rect.left - rect.width / 2) * 0.25))
    const pullY = Math.max(-limit, Math.min(limit, (e.clientY - rect.top - rect.height / 2) * 0.25))
    el.style.setProperty('--pull-x', `${pullX}px`)
    el.style.setProperty('--pull-y', `${pullY}px`)
  }

  function handlePointerLeave() {
    const el = wrapRef.current
    if (!el) return
    el.style.removeProperty('--pull-x')
    el.style.removeProperty('--pull-y')
  }

  // Keyboard navigation & accessibility (ESC to close)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        buttonRef.current?.focus({ preventScroll: true })
        setIsOpen(false)
      }
      if (isOpen && e.key === 'Tab') {
        const links = drawerRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]')
        const last = links?.[links.length - 1]
        if (e.shiftKey && document.activeElement === buttonRef.current) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          buttonRef.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Body scroll locking when open
  useEffect(() => {
    if (!isOpen) return
    buttonRef.current?.focus({ preventScroll: true })
    const background = document.querySelectorAll<HTMLElement>('#top > :is(header, main, footer, .skip):not([inert])')
    background.forEach(el => { el.inert = true })
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      background.forEach(el => { el.inert = false })
    }
  }, [isOpen])

  // Animated curved wave drawer entry & exit
  useEffect(() => {
    // If drawer is closed and has never been opened in this lifecycle, do nothing
    if (!isOpen && !hasOpenedRef.current) {
      return
    }

    const drawer = drawerRef.current
    const path = pathRef.current
    if (!drawer || !path) return

    if (isOpen) {
      hasOpenedRef.current = true
    }

    setIsAnimating(true)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawer.style.transform = isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'
      path.setAttribute('d', 'M 100 0 L 100 100 Q 100 50 100 0 Z')
      setIsAnimating(false)
      if (!isOpen) hasOpenedRef.current = false
      return
    }

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

    const startTime = performance.now()
    const start = Math.max(0, Math.min(100, new DOMMatrix(getComputedStyle(drawer).transform).m41 / drawer.offsetWidth * 100))
    const end = isOpen ? 0 : 100
    const duration = Math.max(1, (compact ? 360 : 650) * Math.abs(end - start) / 100)

    // Smooth power3 in/out curve for perfectly symmetric organic drawer motion
    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased = easeInOutCubic(progress)

      // Identical organic wave curve for both opening and closing:
      // Reaches peak bulge right in the middle (progress = 0.5) as the drawer sweeps across
      const bulge = Math.sin(progress * Math.PI) * 180
      const cx = 100 - bulge

      drawer!.style.transform = `translate3d(${start + (end - start) * eased}%, 0, 0)`
      path!.setAttribute('d', `M 100 0 L 100 100 Q ${cx} 50 100 0 Z`)

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step)
      } else {
        setIsAnimating(false)
        if (!isOpen) {
          hasOpenedRef.current = false
          drawer!.style.transform = 'translate3d(100%, 0, 0)'
          path!.setAttribute('d', 'M 100 0 L 100 100 Q 100 50 100 0 Z')
        } else {
          drawer!.style.transform = 'translate3d(0, 0, 0)'
          path!.setAttribute('d', 'M 100 0 L 100 100 Q 100 50 100 0 Z')
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(step)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isOpen, compact])

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* Floating circular cobalt hamburger / close button wrapper */}
      <div
        ref={wrapRef}
        className={`floating-menu-wrap ${isButtonVisible ? 'is-visible' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >
        <button
          ref={buttonRef}
          type="button"
          className={`floating-menu-btn ${isOpen ? 'is-active' : ''}`}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="quick-navigation"
          disabled={!isButtonVisible}
        >
          <div className="menu-burger-bars" aria-hidden="true">
            <span className="burger-bar" />
            <span className="burger-bar" />
          </div>
        </button>
      </div>

      {/* Tinted backdrop */}
      <div
        className={`menu-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Side curved drawer */}
      <aside
        id="quick-navigation"
        ref={el => { drawerRef.current = el; if (el) el.inert = !isOpen }}
        className={`menu-drawer ${isOpen ? 'is-open' : ''} ${isAnimating ? 'is-animating' : ''}`}
        aria-label="Side navigation"
        aria-hidden={!isOpen}
      >
        {/* SVG curved leading edge for organic slide-in animation */}
        <svg
          className="menu-curve-svg"
          viewBox="-100 0 200 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path ref={pathRef} d="M 100 0 L 100 100 Q 100 50 100 0 Z" />
        </svg>

        <div className="menu-drawer-inner">
          <div className="menu-nav-top">
            <p className="menu-section-eyebrow">Navigation</p>
            <div className="menu-section-divider" />
            <nav className="menu-nav-list" aria-label="Quick links">
              {navItems.map(item => {
                const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path)
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`menu-nav-link ${isActive ? 'is-active' : ''}`}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="menu-nav-dot" aria-hidden="true">•</span>
                    <span className="menu-nav-text">{item.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>

          <div className="menu-nav-bottom">
            <p className="menu-section-eyebrow">Socials</p>
            <div className="menu-socials-list">
              <a href="https://github.com/Nawanshu07" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/nawanshu-sharma-104619351" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                LinkedIn
              </a>
              <a href="mailto:nawanshusharma05@gmail.com" onClick={() => setIsOpen(false)}>
                Email
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
