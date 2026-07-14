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
      initial={{ y: -20, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col w-[92%] max-w-[900px] md:w-max border border-white/10 bg-[#0f0f11]/85 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 ${isOpen ? 'rounded-[24px]' : 'rounded-full'}`}
      style={{ transformOrigin: 'top center' }}
    >
      <div className="flex h-12 items-center justify-between px-3 md:px-2 gap-4">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2 pl-4 text-xs font-semibold text-white tracking-wider uppercase select-none hover:text-link transition"
        >
          <span>Nawanshu</span>
          <span className="h-1.5 w-1.5 rounded-full bg-link animate-pulse" />
        </a>

        {/* Desktop Navigation Link Row */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs text-[#a1a1a1] px-4 py-1.5 rounded-full hover:bg-white/5 hover:text-white transition duration-150 font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA Action Row */}
        <div className="hidden items-center gap-2 md:flex pr-2">
          <a
            href="https://github.com/nawanshu07"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/5 px-4 text-xs font-medium text-[#a1a1a1] hover:bg-white/10 hover:text-white transition duration-150"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="h-8 inline-flex items-center justify-center rounded-full bg-link text-black px-4 text-xs font-bold hover:bg-link-deep transition duration-150 shadow-[0_4px_12px_rgba(249,203,40,0.2)]"
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
          className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-[#a1a1a1] hover:bg-white/10 hover:text-white transition md:hidden mr-2 focus-visible:outline-none"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Menu Overlay inside Expandable Pill Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-white/5 bg-[#0f0f11]/90 px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm text-[#a1a1a1] hover:bg-white/5 hover:text-white transition duration-150"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
                <a
                  href="https://github.com/nawanshu07"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-sm font-medium text-white hover:bg-white/10 transition duration-150"
                >
                  GitHub
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="h-10 flex items-center justify-center rounded-full bg-link text-black text-sm font-bold hover:bg-link-deep transition duration-150"
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
