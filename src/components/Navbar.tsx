import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { GithubIcon } from './Icons'

const navItems = [
  { name: 'work', href: '#work', sectionId: 'work' },
  { name: 'stack', href: '#ecosystem', sectionId: 'ecosystem' },
  { name: 'about', href: '#about', sectionId: 'about' },
  { name: 'goals', href: '#goals', sectionId: 'goals' },
  { name: 'journey', href: '#experience', sectionId: 'experience' },
  { name: 'contact', href: '#contact', sectionId: 'contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>('work')
  const navRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen((prev) => !prev)

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

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.sectionId)
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio)
          } else {
            visibleSections.delete(entry.target.id)
          }
        })
        updateActive()
      },
      { threshold: [0.15, 0.4, 0.6], rootMargin: '-60px 0px -30% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/80 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header
        ref={navRef}
        className="fixed top-0 inset-x-0 z-50 h-12 bg-[#050505]/90 backdrop-blur-md border-b border-zinc-800"
      >
        <div className="max-w-[1120px] mx-auto px-5 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <a
            href="#"
            className="font-mono text-xs tracking-wider text-zinc-300 hover:text-zinc-50 transition-colors"
            aria-label="Home"
          >
            nawanshu_
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 font-mono text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1 transition-colors ${
                    isActive
                      ? 'text-zinc-50 font-medium'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  <span className={isActive ? 'text-zinc-50' : 'text-zinc-700'}>/</span>
                  {item.name}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center text-[11px] font-mono text-zinc-300 border border-zinc-800 hover:border-zinc-500 hover:text-white px-2 py-1 rounded-sm transition-colors"
            >
              resume ↗
            </a>

            <a
              href="https://github.com/nawanshu07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-zinc-400 hover:text-zinc-50 transition-colors p-1"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <button
              type="button"
              aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isOpen}
              onClick={toggleMenu}
              className="text-zinc-400 hover:text-zinc-50 transition-colors md:hidden p-1"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="fixed top-12 inset-x-0 z-50 md:hidden bg-[#050505] border-b border-zinc-800 p-4 font-mono text-xs"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 transition-colors ${
                    activeSection === item.sectionId
                      ? 'text-zinc-50 bg-zinc-900 border-l border-zinc-50'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950'
                  }`}
                >
                  /{item.name}
                </a>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800 flex justify-between items-center px-3 text-zinc-500">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white"
              >
                resume.pdf ↗
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-zinc-50 hover:underline"
              >
                contact →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
