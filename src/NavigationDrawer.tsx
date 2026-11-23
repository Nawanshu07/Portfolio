import { useEffect, useRef, useState, type PointerEvent } from 'react'

interface NavigationDrawerProps {
  pathname: string
  home: boolean
}

export function NavigationDrawer({ pathname, home }: NavigationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const drawerRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const isFirstRender = useRef(true)

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
  const isButtonVisible = !home || isScrolled || isOpen

  // Magnetic hover tracking for the floating button wrapper
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
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
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Body scroll locking when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Animated curved wave drawer entry & exit
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const drawer = drawerRef.current
    const path = pathRef.current
    if (!drawer || !path) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawer.style.transform = isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'
      path.setAttribute('d', 'M 100 0 L 100 100 Q 100 50 100 0 Z')
      return
    }

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

    const startTime = performance.now()
    const duration = isOpen ? 680 : 520

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)

      if (isOpen) {
        // Cubic ease out for drawer slide
        const eased = 1 - Math.pow(1 - progress, 3)
        const translateX = (1 - eased) * 100

        // Organic curve wave: bows outwards into the page (negative x in viewBox)
        // Reaches peak bulge around progress ~ 0.45, then snaps back to flat (100)
        const bulge = Math.sin(progress * Math.PI) * 180
        const cx = 100 - bulge

        drawer!.style.transform = `translate3d(${translateX}%, 0, 0)`
        path!.setAttribute('d', `M 100 0 L 100 100 Q ${cx} 50 100 0 Z`)
      } else {
        // Cubic ease in for drawer exit
        const eased = Math.pow(progress, 2.8)
        const translateX = eased * 100

        // Curve during exit pulls back smoothly
        const bulge = Math.sin(progress * Math.PI) * 50
        const cx = 100 + bulge

        drawer!.style.transform = `translate3d(${translateX}%, 0, 0)`
        path!.setAttribute('d', `M 100 0 L 100 100 Q ${cx} 50 100 0 Z`)
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step)
      } else {
        if (!isOpen) {
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
  }, [isOpen])

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
        ref={drawerRef}
        className={`menu-drawer ${isOpen ? 'is-open' : ''}`}
        aria-label="Side navigation"
        aria-hidden={!isOpen}
        style={{ transform: 'translate3d(100%, 0, 0)' }}
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
