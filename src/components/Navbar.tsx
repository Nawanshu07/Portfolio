import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { name: 'Projects', href: '#work' },
  { name: 'Skills', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Goals', href: '#goals' },
  { name: 'Journey', href: '#experience' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full h-16 bg-canvas/85 backdrop-blur-md border-b border-hairline"
    >
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Brand Logo */}
        <a href="#" className="text-body-md-strong text-ink tracking-tight font-semibold hover:opacity-85 select-none">
          Nawanshu
        </a>

        {/* Desktop Navigation Link Row */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-body-sm text-body px-3 py-1.5 rounded-full hover:bg-canvas-soft-2 hover:text-ink transition duration-150"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA Action Row */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/nawanshu07"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 inline-flex items-center justify-center rounded-sm bg-canvas border border-hairline px-3 text-body-sm-strong text-ink hover:bg-canvas-soft-2 hover:border-hairline-strong transition duration-150"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="h-8 inline-flex items-center justify-center rounded-sm bg-primary border border-primary px-3 text-body-sm-strong text-on-primary hover:bg-canvas hover:text-ink hover:border-hairline-strong transition duration-150 shadow-level2"
          >
            Connect
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={toggleMenu}
          className="grid h-8 w-8 place-items-center rounded-sm border border-hairline bg-canvas text-ink hover:bg-canvas-soft-2 hover:border-hairline-strong transition md:hidden focus-visible:outline focus-visible:outline-2"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-[64px] z-40 border-b border-hairline bg-canvas px-6 py-6 shadow-level5 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-sm px-3 py-2 text-body-md text-body hover:bg-canvas-soft-2 hover:text-ink transition duration-150"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-hairline flex flex-col gap-3">
                <a
                  href="https://github.com/nawanshu07"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="h-10 flex items-center justify-center rounded-sm bg-canvas border border-hairline text-body-sm-strong text-ink hover:bg-canvas-soft-2 transition duration-150"
                >
                  GitHub
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="h-10 flex items-center justify-center rounded-sm bg-primary border border-primary text-body-sm-strong text-on-primary hover:bg-canvas hover:text-ink transition duration-150"
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
