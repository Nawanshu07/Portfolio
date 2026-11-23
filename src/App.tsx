import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

import { findPage, navigation, projects } from './pages'
import { PageTransition } from './PageTransition'
import { MagneticLink } from './MagneticLink'
import { NavigationDrawer } from './NavigationDrawer'

type IconName = 'mark' | 'down' | 'up-right' | 'right' | 'mail'

const iconPaths: Record<IconName, string> = {
  mark: 'M3 17 9 7m0 10L15 7m0 10 6-10',
  down: 'M12 3v17m-7-7 7 7 7-7',
  'up-right': 'M5 19 19 5M5 5h14v14',
  right: 'M3 12h17m-7-7 7 7-7 7',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
}

function Icon({ name }: { name: IconName }) {
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={name === 'mark' ? 2.8 : 2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name]} /></svg>
}

function Work() {
  const homeProjects = projects.slice(0, 3)

  return (
    <section className="work wrap" id="work" aria-labelledby="work-title">
      <p className="work-eyebrow" id="work-title">Recent work</p>
      <div className="project-table" role="list">
        {homeProjects.map(item => (
          <a key={item.path} href={item.path} className="project-row" role="listitem">
            <h2 className="project-row-title">{item.title}</h2>
            <span className="project-row-type">{item.type}</span>
          </a>
        ))}
      </div>
      <div className="work-more">
        <MagneticLink variant="about-button" href="/work">
          More work <span className="work-more-count">({projects.length})</span>
        </MagneticLink>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="intro-title">
      <div className="hero-inner wrap">
        <h1 className="hero-title" id="intro-title">Nawanshu</h1>
        <div className="hero-bottom">
          <blockquote className="hero-quote">
            <p>The best way to predict the future <span>is to invent it.</span></p>
          </blockquote>
          <div className="hero-profile">
            <p className="hero-role">Student developer · Alwar</p>
            <p className="hero-intro">BCA undergraduate building practical software with C, C++, Python, and the web.</p>
            <MagneticLink variant="scroll" href="/work">
              Explore work <span className="arrow-disc"><Icon name="right" /></span>
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function About({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className="about wrap" id="about" aria-labelledby="about-title">
      <h2 className="eyebrow" id="about-title">About me</h2>
      <div>
        <p className="statement">I’m a BCA undergraduate exploring data structures in C++ and building modern web interfaces.</p>
        <dl>
          <div><dt>Working with</dt><dd>C, C++, Python, JavaScript, HTML, CSS, Git, and GitHub</dd></div>
          <div><dt>Looking for</dt><dd>Software engineering internships</dd></div>
        </dl>
        <MagneticLink variant="about-button" href={standalone ? '/contact' : '/about'}>
          {standalone ? 'Contact me' : 'More about me'} <Icon name="right" />
        </MagneticLink>
      </div>
    </section>
  )
}

function Contact({ standalone = false }: { standalone?: boolean }) {
  const Title = standalone ? 'h1' : 'h2'
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="eyebrow">Available for jobs and internships</p>
        <div className="contact-title">
          <Title id="contact-title">Let’s work<br />together<span>.</span></Title>
          {!standalone && (
            <MagneticLink variant="touch-button" href="/contact" label="Get in touch">
              Get in touch
            </MagneticLink>
          )}
        </div>
        <div className="contact-links">
          <a href="mailto:nawanshusharma05@gmail.com">nawanshusharma05@gmail.com</a>
          <div>
            <a href="https://github.com/Nawanshu07" target="_blank" rel="noreferrer">GitHub <Icon name="up-right" /></a>
            <a href="https://www.linkedin.com/in/nawanshu-sharma-104619351" target="_blank" rel="noreferrer">LinkedIn <Icon name="up-right" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactReveal() {
  return (
    <div className="contact-reveal">
      <svg className="section-edge" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0H100Q50 20 0 0Z" />
      </svg>
      <Contact />
    </div>
  )
}

function WorkPage() {
  return (
    <section className="route-body wrap" aria-labelledby="page-title">
      <h1 className="page-title" id="page-title">Work<span>.</span></h1>
      <div className="project-table" role="list">
        {projects.map(item => (
          <a key={item.path} href={item.path} className="project-row" role="listitem">
            <h2 className="project-row-title">{item.title}</h2>
            <span className="project-row-type">{item.type}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function ProjectPage({ project }: { project: typeof projects[number] }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <article className="route-body wrap" aria-labelledby="page-title">
      <a className="back-link" href="/work">All projects</a>
      <h1 className="page-title" id="page-title">{project.title}<span>.</span></h1>
      <div className="project-overview">
        <p className="eyebrow">{project.type}</p>
        <div>
          <p className="project-summary">{project.description}</p>
          <div className="project-links">
            <a href={project.href} target="_blank" rel="noreferrer">Repository <Icon name="up-right" /></a>
            {project.liveHref && <a href={project.liveHref} target="_blank" rel="noreferrer">Live demo <Icon name="up-right" /></a>}
          </div>
        </div>
      </div>
      <a className="next-project" href={next.path}>
        <span className="eyebrow">Next project</span>
        <span>{next.title} <Icon name="right" /></span>
      </a>
    </article>
  )
}

function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'draft' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const sending = status === 'sending'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    if (import.meta.env.DEV && !import.meta.env.VITE_CONTACT_API) {
      const subject = encodeURIComponent(`Inquiry from ${formData.name}`)
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      window.location.href = `mailto:nawanshusharma05@gmail.com?subject=${subject}&body=${body}`
      setStatus('draft')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok || (await response.json()).sent !== true) {
        setStatus('error')
        return
      }
      setFormData({ name: '', email: '', message: '' })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact-page wrap" aria-labelledby="contact-heading">
      <div className="contact-page-grid">
        <div className="contact-page-left">
          <h1 id="contact-heading" className="contact-page-title">
            Let’s start a<br />project together<span>.</span>
          </h1>

          <div className="contact-info-blocks">
            <div className="contact-info-group">
              <span className="contact-info-eyebrow">Contact Details</span>
              <a href="mailto:nawanshusharma05@gmail.com" className="contact-info-link">
                nawanshusharma05@gmail.com
              </a>
              <span className="contact-info-text">Alwar, India</span>
            </div>

            <div className="contact-info-group">
              <span className="contact-info-eyebrow">Socials</span>
              <div className="contact-social-links">
                <a href="https://github.com/Nawanshu07" target="_blank" rel="noreferrer" className="contact-info-link">
                  GitHub <Icon name="up-right" />
                </a>
                <a href="https://www.linkedin.com/in/nawanshu-sharma-104619351" target="_blank" rel="noreferrer" className="contact-info-link">
                  LinkedIn <Icon name="up-right" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-page-right">
          {status === 'sent' || status === 'draft' ? (
            <div className="form-success">
              <div role="status">
                <h2>{status === 'sent' ? 'Message sent.' : 'Finish in your email app.'}</h2>
                <p>{status === 'sent' ? 'Thanks for reaching out.' : 'Send the draft from your email app to complete your message.'}</p>
              </div>
              <button type="button" className="form-reset-btn" onClick={() => setStatus('idle')}>
                {status === 'sent' ? 'Send another message' : 'Back to the form'} <Icon name="right" />
              </button>
            </div>
          ) : (
            <form className="dennis-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <div className="field-header">
                  <span className="field-num">01</span>
                  <label htmlFor="name" className="field-label">What’s your name?</label>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  readOnly={sending}
                  placeholder="John Doe *"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="field-input"
                />
              </div>

              <div className="form-field">
                <div className="field-header">
                  <span className="field-num">02</span>
                  <label htmlFor="email" className="field-label">What’s your email?</label>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  readOnly={sending}
                  placeholder="john@doe.com *"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="field-input"
                />
              </div>

              <div className="form-field">
                <div className="field-header">
                  <span className="field-num">03</span>
                  <label htmlFor="message" className="field-label">Your message</label>
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  readOnly={sending}
                  rows={4}
                  placeholder="Hello Nawanshu, can you help me with ... *"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="field-textarea"
                />
              </div>

              {status === 'error' && (
                <p role="alert">Your message couldn’t be sent. Try again or use the email link.</p>
              )}
              <div className="form-submit-row">
                <MagneticLink as="button" type="submit" variant="submit-button" disabled={sending}>
                  {sending ? 'Sending…' : 'Send it!'}
                </MagneticLink>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function PageContent({ path }: { path?: string }) {
  switch (path) {
    case '/':
      return <><Hero /><Work /><About /><ContactReveal /></>
    case '/work':
      return <WorkPage />
    case '/about':
      return (
        <>
          <div className="wrap about-intro"><p className="role"><i aria-hidden="true" /> Alwar</p>
            <h1 className="page-title">About Nawanshu<span>.</span></h1>
          </div>
          <About standalone />
        </>
      )
    case '/contact':
      return <ContactPage />
    default: {
      const project = projects.find(item => item.path === path)
      return project ? <ProjectPage project={project} /> : (
        <div className="route-body wrap"><h1 className="page-title">Page not found<span>.</span></h1>
          <a className="page-link" href="/">Go home <Icon name="right" /></a>
        </div>
      )
    }
  }
}

export default function App() {
  const [pathname, setPathname] = useState(location.pathname)
  const page = findPage(pathname)
  const home = page?.path === '/'

  return (
    <div id="top" className={home ? 'home-page' : 'interior-page'}>
      <PageTransition onNavigate={setPathname} />
      <NavigationDrawer key={pathname} pathname={pathname} home={home} />
      <a className="skip" href="#main">Skip to content</a>
      <header className="masthead wrap">
        <a className="brand" href="/" aria-label="Nawanshu portfolio home" aria-current={home ? 'page' : undefined}>
          <Icon name="mark" />Portfolio
        </a>
        <nav aria-label="Main navigation">
          {navigation.map(item => (
            <a key={item.path} href={item.path}
              aria-current={page?.path === item.path ? 'page' : page?.path.startsWith(item.path + '/') ? 'location' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main" tabIndex={-1}><PageContent key={pathname} path={page?.path} /></main>
      <footer><div className="wrap"><span>© {new Date().getFullYear()} Nawanshu</span><a href="#top">Back to top <Icon name="down" /></a></div></footer>
    </div>
  )
}
