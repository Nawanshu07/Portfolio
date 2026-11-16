import { motion, type Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import MagneticWrap from './MagneticWrap'
import { useScramble } from '../hooks/useScramble'
import { useState } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

const LINE1 = 'Nawanshu Sharma'
const LINE2 = 'BCA Student. Systems & Web.'

export default function Hero() {
  const [scrambleActive, setScrambleActive] = useState(false)
  const nameScramble = useScramble(LINE1, scrambleActive, 24, 28)
  const roleScramble = useScramble(LINE2, scrambleActive, 24, 28)

  return (
    <section
      aria-label="Introduction"
      className="relative bg-[#050505] text-zinc-200 min-h-[85svh] flex flex-col justify-center pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-zinc-800"
    >
      <div className="container-shell relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-3xl"
          onAnimationComplete={() => setScrambleActive(true)}
        >
          {/* Status Metadata */}
          <motion.div variants={itemVariant} className="mb-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 select-none">
              New Delhi, India // Open for 2026 internships
            </p>
          </motion.div>

          {/* Primary Name / Identity */}
          <motion.h1
            variants={itemVariant}
            className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-50 leading-[1.08]"
          >
            {nameScramble}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariant}
            className="mt-3 font-mono text-base sm:text-xl text-zinc-400"
          >
            {roleScramble}
          </motion.p>

          {/* Blunt Factual Summary */}
          <motion.p
            variants={itemVariant}
            className="mt-5 text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed"
          >
            Building command-line tools, algorithmic implementations in C++, and responsive web applications.
          </motion.p>

          {/* Action Links */}
          <motion.div
            variants={itemVariant}
            className="mt-7 flex flex-wrap items-center gap-3 font-mono text-xs"
          >
            <MagneticWrap strength={0.35}>
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-zinc-50 text-black px-4 py-2.5 rounded-sm font-medium hover:bg-white transition-colors"
              >
                <span>view projects</span>
                <span>→</span>
              </a>
            </MagneticWrap>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-zinc-700 bg-zinc-950 text-zinc-200 hover:text-white hover:border-zinc-400 px-4 py-2.5 rounded-sm transition-colors"
            >
              <span>resume.pdf</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-600 px-4 py-2.5 rounded-sm transition-colors"
            >
              <span>contact</span>
            </a>

            <div className="flex items-center gap-2 ml-1">
              <MagneticWrap strength={0.4}>
                <a
                  href="https://github.com/nawanshu07"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="grid h-9 w-9 place-items-center border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-600 rounded-sm transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </MagneticWrap>

              <MagneticWrap strength={0.4}>
                <a
                  href="https://www.linkedin.com/in/nawanshu-sharma-104619351"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="grid h-9 w-9 place-items-center border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-600 rounded-sm transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </MagneticWrap>
            </div>
          </motion.div>

          {/* Quick Spec Matrix */}
          <motion.div
            variants={itemVariant}
            className="mt-12 pt-6 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl font-mono text-xs"
          >
            <div>
              <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">Degree</span>
              <span className="text-zinc-300 mt-1 block">BCA (Undergrad)</span>
            </div>
            <div>
              <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">Core Lang</span>
              <span className="text-zinc-300 mt-1 block">C, C++, Python</span>
            </div>
            <div>
              <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">Focus</span>
              <span className="text-zinc-300 mt-1 block">DSA &amp; Systems</span>
            </div>
            <div>
              <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">Location</span>
              <span className="text-zinc-300 mt-1 block">New Delhi, IN</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
