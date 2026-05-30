import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Mail,
  UserRound,
} from 'lucide-react'
import MagneticButton from './MagneticButton'

const socials = [
  { href: 'https://github.com/', icon: Code2, label: 'GitHub' },
  { href: 'https://www.linkedin.com/', icon: Briefcase, label: 'LinkedIn' },
  { href: '#about', icon: UserRound, label: 'About' },
]

export default function Contact() {
  return (
    <section id="contact" className="section-padding pb-10">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-12"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_32%),linear-gradient(135deg,rgba(45,212,191,0.09),transparent_34%,rgba(251,113,133,0.08))]"
            aria-hidden="true"
          />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="section-eyebrow">Contact</p>
              <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-none text-white md:text-7xl">
                Open to learning opportunities, collaborations, and exciting
                software development projects.
              </h2>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-lg text-base leading-8 text-zinc-300">
                I am always open to connecting with people, learning from real
                projects, and growing through practical software development
                work. Feel free to connect with me.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <MagneticButton href="mailto:hello@nawanshu.dev">
                  <Mail className="h-4 w-4" />
                  Email Nawanshu
                </MagneticButton>
                <MagneticButton href="#work" variant="ghost">
                  <ArrowUpRight className="h-4 w-4" />
                  View Projects
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>

        <footer className="flex flex-col gap-6 border-t border-white/10 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>2026 Nawanshu. Designed and built with React.</p>
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon

              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-white/30 hover:bg-white hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </footer>
      </div>
    </section>
  )
}
