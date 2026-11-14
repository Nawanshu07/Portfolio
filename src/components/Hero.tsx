import { motion, type Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import MagneticWrap from './MagneticWrap'
import { useScramble } from '../hooks/useScramble'
import { useState } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

const HEADING_LINE1 = 'I engineer software from'
const HEADING_LINE2 = 'low-level systems'
const HEADING_LINE3 = 'to the interface.'

export default function Hero() {
  // Scramble triggers after the initial stagger animation fires (~0.3s)
  const [scrambleActive, setScrambleActive] = useState(false)

  const line1 = useScramble(HEADING_LINE1, scrambleActive, 26, 32)
  const line2 = useScramble(HEADING_LINE2, scrambleActive, 26, 42)
  const line3 = useScramble(HEADING_LINE3, scrambleActive, 26, 42)

  return (
    <section
      aria-label="Hero Introduction"
      className="relative isolate overflow-hidden bg-navy-dark text-cream min-h-[92svh] flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-cream/10"
    >
      {/* ── 1. Base Navy Canvas Floor ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-30 bg-gradient-to-b from-[#0B1222] via-[#14213D] to-[#0B1222]"
        aria-hidden="true"
      />

      {/* ── 2. Subtle radial coral glow — just a soft bloom, no aurora ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 glow-coral-bloom opacity-50"
        aria-hidden="true"
      />

      {/* ── 3. Fluted Ribbed Glass Overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-fluted-glass opacity-60 mix-blend-overlay"
        aria-hidden="true"
      />

      {/* ── 4. Edge Vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,18,34,0.90)_100%)]"
        aria-hidden="true"
      />

      {/* ── HERO CONTENT ── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex flex-col justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left max-w-4xl"
          onAnimationComplete={() => setScrambleActive(true)}
        >

          {/* ── Eyebrow label ── */}
          <motion.p
            variants={itemVariant}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-coral/80 select-none"
          >
            // New Delhi, India · Software Developer
          </motion.p>

          {/* ── Scrambled Hero Heading ── */}
          <motion.h1
            variants={itemVariant}
            className="font-sans text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.04] tracking-[-0.035em] text-cream"
          >
            {/* Each line scrambles independently */}
            <span className="block">{line1}</span>
            <span className="block text-coral">{line2}</span>
            <span className="block">{line3}</span>
          </motion.h1>

          {/* ── Description ── */}
          <motion.p
            variants={itemVariant}
            className="mt-6 sm:mt-8 text-base sm:text-xl leading-relaxed text-cream/70 max-w-2xl font-normal"
          >
            A software developer focused on C, C++, Python, Data Structures &amp; Algorithms,
            and modern web architectures. Building software with rigorous engineering
            discipline from the fundamentals up.
          </motion.p>

          {/* ── Action Buttons (Magnetic) ── */}
          <motion.div
            variants={itemVariant}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Primary Coral CTA — magnetic */}
            <MagneticWrap strength={0.4}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3.5 text-sm font-medium text-white shadow-[0_8px_28px_rgba(255,107,91,0.38)] transition-all duration-300 hover:bg-coral-hover hover:shadow-[0_14px_38px_rgba(255,107,91,0.52)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cream focus:outline-none"
              >
                <span>Explore Work</span>
                <span className="text-xs font-bold transition-transform duration-300 group-hover:translate-x-1">
                  »
                </span>
              </a>
            </MagneticWrap>

            {/* Secondary ghost link */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-cream/85 transition-colors duration-200 hover:text-cream focus-visible:ring-2 focus-visible:ring-coral focus:outline-none rounded-full px-3 py-1.5"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-coral" />
            </a>

            {/* Social Icons — magnetic each */}
            <div className="flex items-center gap-2 sm:pl-3 sm:border-l sm:border-cream/15">
              <MagneticWrap strength={0.5}>
                <a
                  href="https://github.com/nawanshu07"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 bg-white/[0.04] text-cream/70 hover:text-cream hover:border-coral/50 hover:bg-white/[0.08] transition duration-200 shadow-sm"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </MagneticWrap>

              <MagneticWrap strength={0.5}>
                <a
                  href="https://www.linkedin.com/in/nawanshu-sharma-104619351"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 bg-white/[0.04] text-cream/70 hover:text-cream hover:border-coral/50 hover:bg-white/[0.08] transition duration-200 shadow-sm"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </MagneticWrap>
            </div>
          </motion.div>

          {/* ── Availability badge ── */}
          <motion.div
            variants={itemVariant}
            className="mt-10 sm:mt-14 flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/12 bg-white/[0.04] px-4 py-1.5 text-[12px] font-mono text-cream/60 tracking-wide backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" aria-hidden="true" />
              Available for 2026 internships &amp; roles
            </span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
