import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'nawanshusharma05@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div id="contact" className="relative w-full bg-navy text-cream overflow-hidden">
      {/* Subtle radiant coral atmospheric glow */}
      <div
        className="pointer-events-none absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 h-[500px] w-[600px] rounded-full bg-coral/10 blur-[130px] select-none"
        aria-hidden="true"
      />

      <section
        aria-label="Contact and Collaboration"
        className="relative z-10 py-24 sm:py-32 border-b border-cream/10"
      >
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14213D]/70 backdrop-blur-md border border-cream/15 text-xs text-cream/80 font-mono tracking-tight select-none mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            <span>Open for 2026 roles &amp; technical internships</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-sans font-medium text-3xl sm:text-5xl lg:text-6xl text-cream tracking-[-0.03em] max-w-3xl leading-[1.1]"
          >
            Let&#39;s build something <br className="hidden sm:inline" />
            <span className="text-coral">thoughtful together.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-base sm:text-lg text-cream/70 max-w-xl leading-relaxed"
          >
            Always excited to discuss software systems, low-level code, web architecture,
            or potential engineering opportunities.
          </motion.p>

          {/* Direct Action Hub (Replaces the clunky form) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 sm:mt-12 w-full max-w-xl flex flex-col items-center gap-4"
          >
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
              {/* Direct Mail Link */}
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(255,107,91,0.32)] transition-all duration-300 hover:bg-coral-hover hover:shadow-[0_12px_32px_rgba(255,107,91,0.45)] hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                <span>Say Hello</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">
                  »
                </span>
              </a>

              {/* Copy Email Pill Button */}
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex items-center gap-2 rounded-full border border-cream/20 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-cream hover:text-white hover:border-coral/50 hover:bg-white/[0.08] transition duration-200 cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-xs">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-coral transition-transform duration-200 group-hover:scale-110" />
                    <span className="font-mono text-xs">{email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social & Meta Details */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-cream/70">
              <a
                href="https://github.com/nawanshu07"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream/10 bg-white/[0.03] hover:border-cream/25 hover:text-cream transition"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub Profile</span>
                <ArrowUpRight className="h-3 w-3 text-coral" />
              </a>

              <a
                href="https://www.linkedin.com/in/nawanshu-sharma-104619351"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream/10 bg-white/[0.03] hover:border-cream/25 hover:text-cream transition"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 text-coral" />
              </a>

              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cream/10 bg-white/[0.03] text-cream/60">
                <MapPin className="h-3.5 w-3.5 text-coral" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Minimal Editorial Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50 select-none">
        <div className="flex items-center gap-2">
          <span className="font-medium text-cream/80 text-sm">Nawanshu</span>
          <span>·</span>
          <span>Software Developer &amp; Systems Builder</span>
        </div>

        <div className="flex items-center gap-4">
          <a href="#work" className="hover:text-cream transition">Works</a>
          <a href="#skills" className="hover:text-cream transition">Curriculum</a>
          <a href="#about" className="hover:text-cream transition">About</a>
          <a href="#contact" className="hover:text-cream transition">Contact</a>
        </div>

        <div>
          <span>© 2026 · Built with minimal precision</span>
        </div>
      </footer>
    </div>
  )
}
