import { motion, type Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

const EASE = [0.16, 1, 0.3, 1] as const

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export default function Hero() {
  return (
    <section
      aria-label="Hero Introduction"
      className="relative isolate overflow-hidden bg-navy-dark text-cream min-h-[92svh] flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-cream/10"
    >
      {/* 
        ============================================================
        ATMOSPHERIC BACKDROP: Fluted Ribbed Glass + Radiant Coral Glow
        ============================================================
      */}
      {/* 1. Base Navy Canvas Floor */}
      <div
        className="pointer-events-none absolute inset-0 -z-30 bg-gradient-to-b from-[#0B1222] via-[#14213D] to-[#0B1222]"
        aria-hidden="true"
      />

      {/* 2. Central Radiant Coral Glow Bloom */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 glow-coral-bloom opacity-90"
        aria-hidden="true"
      />

      {/* 3. Fluted / Ribbed Vertical Textured Glass Pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-fluted-glass opacity-70 mix-blend-overlay"
        aria-hidden="true"
      />

      {/* 4. Fine Vignette around edges to frame content */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,18,34,0.85)_100%)]"
        aria-hidden="true"
      />

      {/* MAIN HERO CONTENT (Minimal, spacious, uncluttered) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex flex-col justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left max-w-4xl"
        >
          {/* Main Hero Heading */}
          <motion.h1
            variants={itemVariant}
            className="text-balance font-sans text-4xl sm:text-6xl lg:text-7xl font-normal sm:font-medium leading-[1.05] tracking-[-0.035em] text-cream"
          >
            I engineer software from low-level systems to the{' '}
            <span className="text-coral">interface.</span>
          </motion.h1>

          {/* Minimal, direct description */}
          <motion.p
            variants={itemVariant}
            className="mt-6 sm:mt-8 text-base sm:text-xl leading-relaxed text-cream/75 max-w-2xl font-normal"
          >
            A software developer focused on C, C++, Python, Data Structures &amp; Algorithms,
            and modern web architectures. Building software with rigorous engineering
            discipline from the fundamentals up.
          </motion.p>

          {/* Action Buttons & Quick Links */}
          <motion.div
            variants={itemVariant}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Primary Coral Pill CTA */}
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(255,107,91,0.32)] transition-all duration-300 hover:bg-coral-hover hover:shadow-[0_12px_32px_rgba(255,107,91,0.45)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cream focus:outline-none"
            >
              <span>Explore Work</span>
              <span className="text-xs font-bold transition-transform duration-300 group-hover:translate-x-1">
                »
              </span>
            </a>

            {/* Secondary Link */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-cream/85 transition-colors duration-200 hover:text-cream focus-visible:ring-2 focus-visible:ring-coral focus:outline-none rounded-full px-3 py-1.5"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-coral" />
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:pl-3 sm:border-l sm:border-cream/15">
              <a
                href="https://github.com/nawanshu07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 bg-white/[0.04] text-cream/70 hover:text-cream hover:border-coral/50 hover:bg-white/[0.08] transition duration-200 shadow-sm"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/nawanshu-sharma-104619351"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 bg-white/[0.04] text-cream/70 hover:text-cream hover:border-coral/50 hover:bg-white/[0.08] transition duration-200 shadow-sm"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
