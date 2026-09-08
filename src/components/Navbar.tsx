import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

const navItems = [
  { name: 'Projects', href: '#work', sectionId: 'work' },
  { name: 'Stack', href: '#ecosystem', sectionId: 'ecosystem' },
  { name: 'Skills', href: '#skills', sectionId: 'skills' },
  { name: 'About', href: '#about', sectionId: 'about' },
  { name: 'Goals', href: '#goals', sectionId: 'goals' },
  { name: 'Journey', href: '#experience', sectionId: 'experience' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Default to Black Theme (isDark = true)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved) return saved === 'dark'
    }
    return true // Default: Black Themed!
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      localStorage.setItem('portfolio-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('portfolio-theme', 'light')
    }
  }, [isDark])

  // Close mobile nav on Escape key press or resize
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.sectionId)
    const observers: IntersectionObserver[] = []

    // Track which sections are currently in view
    const visibleSections = new Map<string, number>()

    const updateActive = () => {
      if (visibleSections.size === 0) {
        setActiveSection(null)
        return
      }
      // Pick the section with the highest intersection ratio
      let best: string | null = null
      let bestRatio = 0
      visibleSections.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = id
        }
      })
      setActiveSection(best)
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio)
          } else {
            visibleSections.delete(id)
          }
          updateActive()
        },
        { threshold: [0.15, 0.4, 0.6], rootMargin: '-60px 0px -30% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const toggleTheme = () => setIsDark((prev) => !prev)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <>
      {/* Dim backdrop overlay for mobile view when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Centered Navigation Bar */}
      <div
        ref={navRef}
        className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pointer-events-auto flex flex-col w-full max-w-[520px] md:max-w-none md:w-max border border-hairline bg-surface-card/95 backdrop-blur-md shadow-level1 rounded-[24px] overflow-hidden transition-colors duration-200"
        >
          <div className="flex h-12 items-center justify-between px-3 md:px-2 gap-3">
            {/* Brand Wordmark */}
            <a
              href="#"
              className="flex items-center gap-2 pl-3 text-[13px] font-medium text-ink tracking-tight select-none hover:opacity-80 transition duration-150 focus-visible:ring-1 focus-visible:ring-primary focus:outline-none rounded-pill"
            >
              <span className="font-display text-base font-light">Nawanshu</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            </a>

            {/* Desktop Navigation Link Row with active indicator */}
            <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative text-[13px] px-3.5 py-1.5 rounded-pill transition duration-150 font-normal focus-visible:ring-1 focus-visible:ring-primary focus:outline-none ${
                      isActive
                        ? 'text-ink bg-canvas-soft'
                        : 'text-body hover:bg-canvas-soft hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-pill bg-canvas-soft"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                )
              })}
            </nav>

            {/* Desktop Actions Row */}
            <div className="hidden items-center gap-2 md:flex pr-1.5">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light theme' : 'Switch to black theme'}
                title={isDark ? 'Switch to light theme' : 'Switch to black theme'}
                className="h-8 w-8 grid place-items-center rounded-full border border-hairline text-body hover:text-ink hover:border-hairline-strong hover:bg-canvas-soft transition duration-150 cursor-pointer focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
              >
                {isDark ? <Sun className="h-3.5 w-3.5" aria-hidden="true" /> : <Moon className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>

              <a
                href="https://github.com/nawanshu07"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 inline-flex items-center justify-center rounded-pill bg-transparent border border-hairline px-3.5 text-xs font-medium text-body hover:text-ink hover:border-hairline-strong hover:bg-canvas-soft transition duration-150 focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
              >
                GitHub
              </a>

              <a
                href="#contact"
                className="h-8 inline-flex items-center justify-center rounded-pill bg-primary text-on-primary px-4 text-xs font-medium hover:bg-primary-active transition duration-150 shadow-sm focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
              >
                Connect
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5 md:hidden">
              {/* Mobile Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light theme' : 'Switch to black theme'}
                className="grid h-8 w-8 place-items-center rounded-full bg-canvas-soft text-body hover:text-ink transition duration-150 focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
              >
                {isDark ? <Sun className="h-3.5 w-3.5" aria-hidden="true" /> : <Moon className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>

              {/* Mobile Menu Button with Animated Icon */}
              <button
                type="button"
                aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
                onClick={toggleMenu}
                className="grid h-8 w-8 place-items-center rounded-full bg-canvas-soft text-body hover:bg-surface-strong hover:text-ink transition duration-150 mr-1 focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isOpen ? 'close-icon' : 'open-icon'}
                    initial={{ rotate: isOpen ? -90 : 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: isOpen ? 90 : -90, opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                    className="flex items-center justify-center"
                  >
                    {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Smooth Mobile Menu Drawer */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id="mobile-nav-drawer"
                key="mobile-nav-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  transition: {
                    height: { duration: shouldReduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: shouldReduceMotion ? 0 : 0.22, ease: 'easeOut' },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: { duration: shouldReduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: shouldReduceMotion ? 0 : 0.15, ease: 'easeIn' },
                  },
                }}
                className="overflow-hidden md:hidden"
              >
                <div className="border-t border-hairline bg-surface-card px-4 py-4 flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : 0.03 * index + 0.05,
                          duration: shouldReduceMotion ? 0 : 0.2,
                        }}
                        className={`rounded-xl px-3.5 py-2.5 text-sm font-normal active:scale-[0.98] transition duration-150 focus-visible:ring-1 focus-visible:ring-primary focus:outline-none ${
                          activeSection === item.sectionId
                            ? 'bg-canvas-soft text-ink'
                            : 'text-body hover:bg-canvas-soft hover:text-ink'
                        }`}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-hairline flex flex-col gap-2">
                    <a
                      href="https://github.com/nawanshu07"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="h-10 flex items-center justify-center rounded-pill border border-hairline text-sm font-medium text-body hover:text-ink hover:bg-canvas-soft hover:border-hairline-strong active:scale-[0.98] transition duration-150 focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
                    >
                      GitHub
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setIsOpen(false)}
                      className="h-10 flex items-center justify-center rounded-pill bg-primary text-on-primary text-sm font-medium hover:bg-primary-active active:scale-[0.98] transition duration-150 shadow-sm focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
                    >
                      Connect
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </>
  )
}
