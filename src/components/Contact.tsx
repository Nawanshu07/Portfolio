import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'nawanshusharma05@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div id="contact" className="relative w-full bg-[#050505] text-zinc-200">
      <section
        aria-label="Contact Information"
        className="relative z-10 py-16 sm:py-24 border-b border-zinc-800"
      >
        <div className="container-shell max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-2">
              // Contact
            </p>
            <h2 className="font-sans text-2xl sm:text-4xl font-medium text-zinc-50 tracking-tight">
              Get in touch.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
              Available for software engineering internships and technical opportunities for 2026. Direct email is the most reliable way to reach me.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mt-8 flex flex-col gap-4"
          >
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 bg-zinc-50 text-black px-4 py-2.5 rounded-sm font-medium hover:bg-white transition-colors"
              >
                <span>send email</span>
                <span>→</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 border border-zinc-800 bg-[#080808] px-4 py-2.5 rounded-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-zinc-50" />
                    <span className="text-zinc-50">copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Profile Links & Metadata */}
            <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
              <a
                href="https://github.com/nawanshu07"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-zinc-50 transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>github.com/nawanshu07</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-500" />
              </a>

              <a
                href="https://www.linkedin.com/in/nawanshu-sharma-104619351"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-zinc-50 transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>linkedin</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-500" />
              </a>

              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">New Delhi, India (UTC+05:30)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brutalist Minimalist Footer */}
      <footer className="container-shell py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-zinc-600 select-none">
        <div>
          <span>nawanshu_ · BCA student · 2026</span>
        </div>

        <div className="flex items-center gap-4">
          <a href="#work" className="hover:text-zinc-300 transition-colors">work</a>
          <a href="#ecosystem" className="hover:text-zinc-300 transition-colors">stack</a>
          <a href="#about" className="hover:text-zinc-300 transition-colors">about</a>
          <a href="#goals" className="hover:text-zinc-300 transition-colors">goals</a>
          <a href="#experience" className="hover:text-zinc-300 transition-colors">timeline</a>
          <a href="#contact" className="hover:text-zinc-300 transition-colors">contact</a>
        </div>
      </footer>
    </div>
  )
}
