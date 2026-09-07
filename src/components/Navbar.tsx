import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { name: 'Projects', href: '#work' },
  { name: 'Stack', href: '#ecosystem' },
  { name: 'Skills', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Goals', href: '#goals' },
  { name: 'Journey', href: '#experience' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  
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

  const toggleTheme = () => setIsDark((prev) => !prev)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col w-[92%] max-w-[920px] md:w-max border border-hairline bg-surface-card/90 backdrop-blur-md shadow-level1 overflow-hidden transition-all duration-300 ${
        isOpen ? 'rounded-[24px]' : 'rounded-pill'
      }`}
      style={{ transformOrigin: 'top center' }}
    >
      <div className="flex h-12 items-center justify-between px-3 md:px-2 gap-3">
        {/* Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2 pl-3 text-[13px] font-medium text-ink tracking-tight select-none hover:opacity-80 transition"
        >
          <span className="font-display text-base font-light">Nawanshu</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        </a>

        {/* Desktop Navigation Link Row */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[13px] text-body px-3.5 py-1.5 rounded-pill hover:bg-canvas-soft hover:text-ink transition duration-150 font-normal"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions Row */}
        <div className="hidden items-center gap-2 md:flex pr-1.5">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to black theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to black theme'}
            className="h-8 w-8 grid place-items-center rounded-full border border-hairline text-body hover:text-ink hover:border-hairline-strong hover:bg-canvas-soft transition duration-150 cursor-pointer"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <a
            href="https://github.com/nawanshu07"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 inline-flex items-center justify-center rounded-pill bg-transparent border border-hairline px-3.5 text-xs font-medium text-body hover:text-ink hover:border-hairline-strong hover:bg-canvas-soft transition duration-150"
          >
            GitHub
          </a>

          <a
            href="#contact"
            className="h-8 inline-flex items-center justify-center rounded-pill bg-primary text-on-primary px-4 text-xs font-medium hover:bg-primary-active transition duration-150 shadow-sm"
          >
            Connect
          </a>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-1.5 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to black theme'}
            className="grid h-8 w-8 place-items-center rounded-full bg-canvas-soft text-body hover:text-ink transition"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            onClick={toggleMenu}
            className="grid h-8 w-8 place-items-center rounded-full bg-canvas-soft text-body hover:bg-surface-strong hover:text-ink transition mr-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-hairline bg-surface-card px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-body hover:bg-canvas-soft hover:text-ink transition duration-150"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-hairline flex flex-col gap-2.5">
                <a
                  href="https://github.com/nawanshu07"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="h-10 flex items-center justify-center rounded-pill border border-hairline text-sm font-medium text-body hover:text-ink hover:bg-canvas-soft transition duration-150"
                >
                  GitHub
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="h-10 flex items-center justify-center rounded-pill bg-primary text-on-primary text-sm font-medium hover:bg-primary-active transition duration-150"
                >
                  Connect
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
