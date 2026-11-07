import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { GithubIcon } from './Icons'

const navItems = [
  { name: 'Works', href: '#work', sectionId: 'work' },
  { name: 'Skills', href: '#skills', sectionId: 'skills' },
  { name: 'About', href: '#about', sectionId: 'about' },
  { name: 'Goals', href: '#goals', sectionId: 'goals' },
  { name: 'Journey', href: '#experience', sectionId: 'experience' },
  { name: 'Contact', href: '#contact', sectionId: 'contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>('work')
  const navRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Default to Dark Navy Theme (isDark = true)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved) return saved === 'dark'
    }
    return true
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
    const visibleSections = new Map<string, number>()

    const updateActive = () => {
      if (visibleSections.size === 0) return
      let best: string | null = null
      let bestRatio = 0
      visibleSections.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = id
        }
      })
      if (best) setActiveSection(best)
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
      {/* Mobile drawer backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-navy-dark/70 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Distributed Floating Top Navigation (Tidewell Architecture) */}
      <div
        ref={navRef}
        className="fixed top-5 inset-x-0 z-50 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex items-center justify-between pointer-events-none"
      >
        {/* Left: Brand with Tidewell Wave Symbol */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <a
            href="#"
            className="group flex items-center gap-2.5 text-cream hover:opacity-90 transition duration-150 focus-visible:ring-2 focus-visible:ring-coral focus:outline-none rounded-full py-1.5 px-3"
            aria-label="Nawanshu - Home"
          >
            {/* Elegant Tidewell-style wave mark */}
            <svg
              className="h-4 w-5 text-coral transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 12c3-4 6-4 9 0s6 4 9 0" />
            </svg>
            <span className="font-sans text-[15px] sm:text-base font-medium tracking-tight text-cream">
              Nawanshu
            </span>
          </a>
        </motion.div>

        {/* Center: Frosted Glass Capsule Nav (Desktop) */}
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Main Navigation"
          className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#14213D]/65 backdrop-blur-xl border border-cream/15 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition duration-200 focus-visible:ring-2 focus-visible:ring-coral focus:outline-none flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cream bg-white/[0.08] shadow-sm'
                    : 'text-cream/70 hover:text-cream hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse"
                    aria-hidden="true"
                  />
                )}
                <span>{item.name}</span>
              </a>
            )
          })}
        </motion.nav>

        {/* Right: Circular Frosted Glass Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-2.5"
        >
          {/* GitHub Circle Button */}
          <a
            href="https://github.com/nawanshu07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:grid h-9 w-9 place-items-center rounded-full bg-[#14213D]/65 backdrop-blur-xl border border-cream/15 text-cream/80 hover:text-cream hover:border-coral/50 hover:bg-white/[0.08] transition duration-200 shadow-md focus-visible:ring-2 focus-visible:ring-coral focus:outline-none"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to navy theme'}
            className="h-9 w-9 grid place-items-center rounded-full bg-[#14213D]/65 backdrop-blur-xl border border-cream/15 text-cream/80 hover:text-cream hover:border-coral/50 hover:bg-white/[0.08] transition duration-200 shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-coral focus:outline-none"
          >
            {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>

          {/* Mobile Menu / Contact Toggle Button */}
          <button
            type="button"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            onClick={toggleMenu}
            className="h-9 w-9 grid place-items-center rounded-full bg-[#14213D]/65 backdrop-blur-xl border border-cream/15 text-cream hover:border-coral/50 hover:bg-white/[0.08] transition duration-200 shadow-md cursor-pointer md:hidden focus-visible:ring-2 focus-visible:ring-coral focus:outline-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: isOpen ? -90 : 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: isOpen ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.16 }}
                className="flex items-center justify-center"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Connect CTA Pill on Desktop */}
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-coral hover:bg-coral-hover text-white px-4 py-2 text-xs font-medium shadow-[0_4px_14px_rgba(255,107,91,0.3)] transition duration-200 focus-visible:ring-2 focus-visible:ring-cream focus:outline-none"
          >
            <span>Get in touch</span>
            <Sparkles className="h-3 w-3" />
          </a>
        </motion.div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 inset-x-4 z-50 md:hidden overflow-hidden rounded-3xl bg-[#14213D]/95 backdrop-blur-2xl border border-cream/20 shadow-2xl p-5"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                    activeSection === item.sectionId
                      ? 'bg-white/10 text-cream'
                      : 'text-cream/75 hover:bg-white/5 hover:text-cream'
                  }`}
                >
                  <span>{item.name}</span>
                  {activeSection === item.sectionId && (
                    <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  )}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-cream/10 flex flex-col gap-2.5">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="h-11 flex items-center justify-center rounded-full bg-coral text-white text-sm font-medium hover:bg-coral-hover shadow-lg shadow-coral/20 transition"
              >
                Get in touch »
              </a>
              <a
                href="https://github.com/nawanshu07"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="h-11 flex items-center justify-center rounded-full border border-cream/15 text-cream text-sm font-medium hover:bg-white/5 transition"
              >
                GitHub Profile
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
