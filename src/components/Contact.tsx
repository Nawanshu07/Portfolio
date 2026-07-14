import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Mail,
} from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function Contact() {
  return (
    <div className="relative w-full">
      {/* Polarity-Flipped Dark Contact Section */}
      <section id="contact" className="section-padding bg-transparent text-on-primary border-b border-hairline-dark relative overflow-hidden">
        {/* Subtle mesh background element */}
        <div className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle, #50e3c2 0%, #0070f3 50%, transparent 100%)' }} />
        
        <div className="container-shell">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
          >
            <div>
              <p className="text-caption-mono text-mute font-mono uppercase tracking-widest text-[11px] select-none">
                // Connect
              </p>
              <h2 className="mt-4 text-display-lg md:text-[44px] md:leading-[48px] font-semibold text-white tracking-tight text-pretty">
                Open to learning opportunities, collaborations, and exciting software projects.
              </h2>
            </div>

            <div className="flex flex-col gap-6 lg:pl-6">
              <p className="text-body-md md:text-body-lg text-hairline-strong leading-relaxed text-pretty">
                I am always open to connecting with people, learning from real projects, and growing through practical software development work. Feel free to reach out.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton href="mailto:nawanshusharma05@gmail.com" variant="primary" darkBg={true}>
                  <Mail className="h-4 w-4" />
                  <span>Email Nawanshu</span>
                </MagneticButton>
                <MagneticButton href="#work" variant="ghost" darkBg={true}>
                  <ArrowUpRight className="h-4 w-4" />
                  <span>View Projects</span>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Structured Light Vercel-Style Footer */}
      <footer className="bg-canvas border-t border-hairline py-16 text-body">
        <div className="container-shell">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Column 1: Brand Identity */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-body-md-strong text-ink font-semibold tracking-tight">
                Nawanshu
              </p>
              <p className="mt-4 text-body-sm leading-relaxed max-w-[240px]">
                BCA student and software developer focused on C, C++, Python, DSA, and modern web development.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <p className="text-caption-mono text-mute font-mono uppercase tracking-widest text-[10px] mb-4 select-none">
                // Navigation
              </p>
              <div className="flex flex-col gap-2.5">
                <a href="#work" className="text-body-sm hover:text-ink transition duration-150">Projects</a>
                <a href="#skills" className="text-body-sm hover:text-ink transition duration-150">Skills</a>
                <a href="#about" className="text-body-sm hover:text-ink transition duration-150">About</a>
                <a href="#goals" className="text-body-sm hover:text-ink transition duration-150">Goals</a>
                <a href="#experience" className="text-body-sm hover:text-ink transition duration-150">Journey</a>
              </div>
            </div>

            {/* Column 3: Socials */}
            <div>
              <p className="text-caption-mono text-mute font-mono uppercase tracking-widest text-[10px] mb-4 select-none">
                // Socials
              </p>
              <div className="flex flex-col gap-2.5">
                <a href="https://github.com/nawanshu07" target="_blank" rel="noopener noreferrer" className="text-body-sm hover:text-ink transition duration-150 inline-flex items-center gap-1">
                  GitHub <ArrowUpRight className="h-3 w-3" />
                </a>
                <a href="https://www.linkedin.com/in/nawanshu-sharma-104619351" target="_blank" rel="noopener noreferrer" className="text-body-sm hover:text-ink transition duration-150 inline-flex items-center gap-1">
                  LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div>
              <p className="text-caption-mono text-mute font-mono uppercase tracking-widest text-[10px] mb-4 select-none">
                // Contact
              </p>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:nawanshusharma05@gmail.com" className="text-body-sm hover:text-ink transition duration-150 break-all">
                  nawanshusharma05@gmail.com
                </a>
                <span className="text-body-sm">Available for Internship</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Block */}
          <div className="mt-12 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-mute select-none font-medium">
            <p>2026 Nawanshu. Designed and built with React.</p>
            <p className="text-caption-mono font-mono text-[11px] uppercase tracking-wider">
              // stark.duet.canvas
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
