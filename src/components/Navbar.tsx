import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { name: 'Projects', href: '#work' },
  { name: 'Skills', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#experience' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-5 z-50 px-3 sm:px-5"
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#2b160f]/75 px-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:h-16 sm:px-6">
        <a href="#" className="text-lg font-bold text-white sm:text-xl">
          Nawanshu
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white/65 transition hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden h-11 items-center rounded-full bg-white px-6 text-sm font-bold text-black shadow-[0_12px_35px_rgba(255,255,255,0.16)] transition hover:bg-zinc-200 md:inline-flex"
        >
          Contact
        </a>

        <button
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.08] text-white md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0A0A0A]/95 px-5 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-full bg-white px-4 py-3 text-center text-base font-bold text-black"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
