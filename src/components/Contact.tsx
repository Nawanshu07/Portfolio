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

    // Form validations
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
            className="grid gap-12 lg:grid-cols-2 lg:items-start"
          >
            {/* Left Column: Contact details */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-caption-mono text-mute font-mono uppercase tracking-widest text-[11px] select-none">
                  // Connect
                </p>
                <h2 className="mt-4 text-display-lg md:text-[44px] md:leading-[48px] font-semibold text-white tracking-tight text-pretty">
                  Open to learning opportunities, collaborations, and software projects.
                </h2>
              </div>
              
              <p className="text-body-md md:text-body-lg text-hairline-strong leading-relaxed text-pretty">
                I am always open to connecting with people, learning from real projects, and growing through practical software development work. Feel free to reach out.
              </p>

              <div className="flex flex-col gap-4 mt-4 text-body-sm text-hairline-strong">
                <a href="mailto:nawanshusharma05@gmail.com" className="flex items-center gap-3 text-mute hover:text-white transition duration-150 group w-fit">
                  <span className="p-2.5 rounded-lg border border-hairline bg-canvas-soft group-hover:border-link group-hover:bg-link-bg-soft transition duration-200">
                    <Mail className="h-4 w-4 text-mute group-hover:text-link transition duration-200" />
                  </span>
                  <span>nawanshusharma05@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-3 text-mute w-fit">
                  <span className="p-2.5 rounded-lg border border-hairline bg-canvas-soft">
                    <Phone className="h-4 w-4 text-mute" />
                  </span>
                  <span>Available for Internships & Projects</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
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

            {/* Right Column: Contact form */}
            <div className="bg-canvas-soft-2/40 border border-hairline p-6 sm:p-8 rounded-xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full blur-[60px] opacity-10 bg-link pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="relative z-10">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <CheckCircle2 className="h-12 w-12 text-link mb-4 animate-bounce" />
                    <h3 className="text-display-sm text-white font-semibold mb-2">Message Sent!</h3>
                    <p className="text-body-sm text-mute max-w-xs">
                      Thank you for reaching out. I've received your submission and will get back to you as soon as possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-caption-mono text-link hover:text-white uppercase tracking-wider text-[11px] underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-display-sm text-white font-semibold mb-6">Send a Message</h3>
                    
                    {status === 'error' && (
                      <div className="flex items-start gap-2.5 p-3.5 mb-6 rounded-lg bg-error-soft border border-error/20 text-error-deep text-body-sm">
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="relative mb-6">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Name"
                        className="peer w-full bg-transparent border-b border-hairline py-2.5 text-white placeholder-transparent focus:outline-none focus:border-link transition duration-200 text-body-md"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-caption-mono text-mute transition-all duration-200 pointer-events-none peer-placeholder-shown:text-body-md peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-caption-mono peer-focus:text-link font-mono uppercase tracking-wider text-[10px]"
                      >
                        Your Name *
                      </label>
                    </div>

                    <div className="relative mb-6">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email Address"
                        className="peer w-full bg-transparent border-b border-hairline py-2.5 text-white placeholder-transparent focus:outline-none focus:border-link transition duration-200 text-body-md"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-caption-mono text-mute transition-all duration-200 pointer-events-none peer-placeholder-shown:text-body-md peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-caption-mono peer-focus:text-link font-mono uppercase tracking-wider text-[10px]"
                      >
                        Email Address *
                      </label>
                    </div>

                    <div className="relative mb-6">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="peer w-full bg-transparent border-b border-hairline py-2.5 text-white placeholder-transparent focus:outline-none focus:border-link transition duration-200 text-body-md"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-0 -top-3.5 text-caption-mono text-mute transition-all duration-200 pointer-events-none peer-placeholder-shown:text-body-md peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-caption-mono peer-focus:text-link font-mono uppercase tracking-wider text-[10px]"
                      >
                        Phone Number (Optional)
                      </label>
                    </div>

                    <div className="relative mb-8">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Message"
                        className="peer w-full bg-transparent border-b border-hairline py-2.5 text-white placeholder-transparent focus:outline-none focus:border-link transition duration-200 text-body-md resize-none"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-0 -top-3.5 text-caption-mono text-mute transition-all duration-200 pointer-events-none peer-placeholder-shown:text-body-md peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-caption-mono peer-focus:text-link font-mono uppercase tracking-wider text-[10px]"
                      >
                        Your Message *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full relative flex items-center justify-center gap-2 bg-link text-on-primary py-3 px-4 rounded-lg font-semibold hover:bg-link-deep transition duration-200 disabled:opacity-75 disabled:cursor-not-allowed group overflow-hidden"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
