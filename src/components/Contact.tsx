import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Mail,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Contact form submission error:', err)
      setStatus('error')
      setErrorMessage('Could not connect to the server. Please try again later.')
    }
  }

  return (
    <div className="relative w-full bg-canvas text-ink">
      {/* Contact Section */}
      <section 
        id="contact" 
        aria-label="Contact and Collaboration"
        className="section-padding bg-canvas border-b border-hairline relative overflow-hidden"
      >
        {/* Soft pastel atmospheric gradient orb bloom */}
        <div className="absolute right-0 top-1/4 pointer-events-none select-none" aria-hidden="true">
          <div className="orb-sky h-[450px] w-[450px] rounded-full blur-[90px] opacity-45" />
          <div className="orb-rose h-[350px] w-[350px] -translate-x-20 rounded-full blur-[80px] opacity-40" />
        </div>
        
        <div className="container-shell relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-12 lg:grid-cols-2 lg:items-start"
          >
            {/* Left Column: Contact details */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-caption-mono text-muted uppercase tracking-widest text-[11px] select-none">
                  // Contact &amp; Connect
                </p>
                <h2 className="mt-3 font-display font-light text-display-lg md:text-display-xl tracking-tight text-ink text-pretty">
                  Open to software opportunities, internships, and technical collaboration.
                </h2>
              </div>
              
              <p className="text-body-md md:text-body-lg text-body leading-relaxed text-pretty">
                I am always excited to connect with developers, learn from real-world engineering environments, and contribute through diligent software development.
              </p>

              <div className="flex flex-col gap-3.5 mt-2 text-body-sm">
                <a 
                  href="mailto:nawanshusharma05@gmail.com" 
                  className="flex items-center gap-3 text-body hover:text-ink transition duration-150 group w-fit"
                >
                  <span className="p-2.5 rounded-full border border-hairline bg-surface-card group-hover:border-hairline-strong group-hover:shadow-sm transition duration-200">
                    <Mail className="h-4 w-4 text-ink" />
                  </span>
                  <span className="font-medium">nawanshusharma05@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-3 text-body w-fit">
                  <span className="p-2.5 rounded-full border border-hairline bg-surface-card">
                    <Phone className="h-4 w-4 text-ink" />
                  </span>
                  <span>Available for Internships &amp; Practical Projects</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5 mt-4">
                <MagneticButton href="mailto:nawanshusharma05@gmail.com" variant="primary">
                  <Mail className="h-4 w-4" />
                  <span>Email Nawanshu</span>
                </MagneticButton>

                <MagneticButton href="#work" variant="outline">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>View Projects</span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Column: Contact form with DESIGN.md text-input styles */}
            <div className="bg-surface-card border border-hairline p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <CheckCircle2 className="h-12 w-12 text-primary mb-3" />
                    <h3 className="font-display font-light text-display-sm text-ink mb-2">Message Sent</h3>
                    <p className="text-body-sm text-body max-w-xs leading-relaxed">
                      Thank you for reaching out. I have received your message and will reply promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-caption-mono text-ink hover:underline uppercase tracking-wider text-[11px] cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="font-display font-light text-display-sm text-ink mb-2">
                      Send a Message
                    </h3>
                    
                    {status === 'error' && (
                      <div className="flex items-start gap-2.5 p-3.5 rounded-md bg-error-soft border border-error/20 text-error text-body-sm">
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-caption-mono text-muted text-[11px] uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-surface-card border border-hairline-strong rounded-md px-4 py-2.5 text-ink placeholder:text-muted-soft focus:outline-none focus:border-2 focus:border-ink transition-all text-body-md h-11"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-caption-mono text-muted text-[11px] uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        spellCheck={false}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@example.com"
                        className="w-full bg-surface-card border border-hairline-strong rounded-md px-4 py-2.5 text-ink placeholder:text-muted-soft focus:outline-none focus:border-2 focus:border-ink transition-all text-body-md h-11"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-caption-mono text-muted text-[11px] uppercase tracking-wider">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-surface-card border border-hairline-strong rounded-md px-4 py-2.5 text-ink placeholder:text-muted-soft focus:outline-none focus:border-2 focus:border-ink transition-all text-body-md h-11"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-caption-mono text-muted text-[11px] uppercase tracking-wider">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Share a brief note about your project or opportunity…"
                        className="w-full bg-surface-card border border-hairline-strong rounded-md px-4 py-3 text-ink placeholder:text-muted-soft focus:outline-none focus:border-2 focus:border-ink transition-all text-body-md resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="mt-2 h-11 w-full relative flex items-center justify-center gap-2 bg-primary text-on-primary rounded-pill font-medium hover:bg-primary-active transition duration-200 disabled:opacity-75 disabled:cursor-not-allowed group shadow-sm"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Footer (DESIGN.md) */}
      <footer className="bg-canvas border-t border-hairline py-16 text-body">
        <div className="container-shell">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Column 1: Brand Identity */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-display font-light text-xl text-ink tracking-tight">
                Nawanshu
              </p>
              <p className="mt-3 text-body-sm leading-relaxed max-w-[240px] text-muted">
                Student and aspiring software engineer focused on C, C++, Python, Data Structures, and modern web development.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <p className="text-caption-mono text-muted uppercase tracking-widest text-[10px] mb-4 select-none">
                // Navigation
              </p>
              <div className="flex flex-col gap-2.5">
                <a href="#work" className="text-body-sm hover:text-ink transition duration-150">Projects</a>
                <a href="#ecosystem" className="text-body-sm hover:text-ink transition duration-150">Ecosystem Orbit</a>
                <a href="#skills" className="text-body-sm hover:text-ink transition duration-150">Curriculum</a>
                <a href="#about" className="text-body-sm hover:text-ink transition duration-150">About</a>
                <a href="#goals" className="text-body-sm hover:text-ink transition duration-150">Goals</a>
                <a href="#experience" className="text-body-sm hover:text-ink transition duration-150">Journey</a>
              </div>
            </div>

            {/* Column 3: Socials */}
            <div>
              <p className="text-caption-mono text-muted uppercase tracking-widest text-[10px] mb-4 select-none">
                // Socials
              </p>
              <div className="flex flex-col gap-2.5">
                <a 
                  href="https://github.com/nawanshu07" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-body-sm hover:text-ink transition duration-150 inline-flex items-center gap-1"
                >
                  GitHub <ArrowUpRight className="h-3 w-3" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/nawanshu-sharma-104619351" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-body-sm hover:text-ink transition duration-150 inline-flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div>
              <p className="text-caption-mono text-muted uppercase tracking-widest text-[10px] mb-4 select-none">
                // Direct
              </p>
              <div className="flex flex-col gap-2.5">
                <a 
                  href="mailto:nawanshusharma05@gmail.com" 
                  className="text-body-sm hover:text-ink transition duration-150 break-all"
                >
                  nawanshusharma05@gmail.com
                </a>
                <span className="text-body-sm text-muted">
                  Open for Internship Roles
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Block */}
          <div className="mt-12 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-muted select-none">
            <p>2026 Nawanshu. Designed following editorial print design standards.</p>
            <p className="text-caption-mono text-[11px] uppercase tracking-wider">
              // editorial.canvas.system
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
