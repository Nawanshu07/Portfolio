import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

import { findPage, navigation, projects } from './pages'
import { PageTransition } from './PageTransition'
import { MagneticLink, magneticPointerEvents } from './MagneticLink'
import { NavigationDrawer } from './NavigationDrawer'
import { SectionCurve } from './SectionCurve'

const contactEmail = 'nawanshusharma05@gmail.com'
const contactPhone = '+91 9509055309'
const emailHref = `mailto:${contactEmail}`
const phoneHref = `tel:${contactPhone.replace(/\s/g, '')}`

type IconName = 'down' | 'up-right' | 'right' | 'mail'

const iconPaths: Record<IconName, string> = {
  down: 'M12 3v17m-7-7 7 7 7-7',
  'up-right': 'M5 19 19 5M5 5h14v14',
  right: 'M3 12h17m-7-7 7 7-7 7',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
}

function Icon({ name }: { name: IconName }) {
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name]} /></svg>
}

function ProjectList({ items }: { items: readonly (typeof projects)[number][] }) {
  function moveCursor(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') {
      clearCursor(event)
      return
    }
    const list = event.currentTarget
    list.style.setProperty('--cursor-x', `${event.clientX}px`)
    list.style.setProperty('--cursor-y', `${event.clientY}px`)
    list.dataset.viewCursor = ''
  }

  function clearCursor(event: PointerEvent<HTMLDivElement>) {
    delete event.currentTarget.dataset.viewCursor
  }

  return (
    <div
      className="project-list"
      onPointerEnter={moveCursor}
      onPointerMove={moveCursor}
      onPointerLeave={clearCursor}
      onPointerCancel={clearCursor}
    >
      <ul className="project-table" role="list">
        {items.map(item => (
          <li key={item.path}>
            <a href={item.path} className="project-row">
              <h2 className="project-row-title">{item.title}</h2>
              <span className="project-row-type">{item.type}</span>
              <Icon name="right" />
            </a>
          </li>
        ))}
      </ul>
      <span className="project-cursor" aria-hidden="true">View</span>
    </div>
  )
}

function Work() {
  return (
    <section className="work wrap" id="work" aria-labelledby="work-title">
      <p className="work-eyebrow" id="work-title">Recent work</p>
      <ProjectList items={projects.slice(0, 3)} />
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
          <div className="contact-methods">
            <MagneticLink variant="contact-method" href={emailHref}>{contactEmail}</MagneticLink>
            <MagneticLink variant="contact-method" href={phoneHref}>{contactPhone}</MagneticLink>
          </div>
          <div className="contact-socials">
            <a href="https://github.com/Nawanshu07" target="_blank" rel="noreferrer"><span className="link-underline">GitHub</span> <Icon name="up-right" /></a>
            <a href="https://www.linkedin.com/in/nawanshu-sharma-104619351" target="_blank" rel="noreferrer"><span className="link-underline">LinkedIn</span> <Icon name="up-right" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactReveal() {
  return (
    <div className="contact-reveal">
      <SectionCurve className="section-edge" />
      <Contact />
    </div>
  )
}

function WorkPage() {
  return (
    <section className="route-body wrap" aria-labelledby="page-title">
      <h1 className="page-title" id="page-title">Work<span>.</span></h1>
      <ProjectList items={projects} />
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
            {project.href && (
              <MagneticLink variant="scroll" href={project.href} target="_blank">
                Repository <span className="arrow-disc"><Icon name="up-right" /></span>
              </MagneticLink>
            )}
            {project.liveHref && (
              <MagneticLink variant="scroll" href={project.liveHref} target="_blank">
                Live demo <span className="arrow-disc"><Icon name="up-right" /></span>
              </MagneticLink>
            )}
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
      window.location.href = `${emailHref}?subject=${subject}&body=${body}`
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
            <div className="direct-contacts">
              <a href={emailHref} className="direct-contact">
                <span className="contact-info-eyebrow">Email</span>
                <span><span className="link-underline">{contactEmail}</span></span>
              </a>
              <a href={phoneHref} className="direct-contact">
                <span className="contact-info-eyebrow">Phone</span>
                <span><span className="link-underline">{contactPhone}</span></span>
              </a>
            </div>

            <div className="contact-info-group">
              <span className="contact-info-eyebrow">Location</span>
              <span className="contact-info-text">Alwar, India</span>
            </div>
            <div className="contact-info-group">
              <span className="contact-info-eyebrow">Socials</span>
              <div className="contact-social-links">
                <a href="https://github.com/Nawanshu07" target="_blank" rel="noreferrer" className="contact-info-link">
                  <span className="link-underline">GitHub</span> <span className="social-arrow" aria-hidden="true"><span className="social-arrow-track"><Icon name="up-right" /><Icon name="up-right" /></span></span>
                </a>
                <a href="https://www.linkedin.com/in/nawanshu-sharma-104619351" target="_blank" rel="noreferrer" className="contact-info-link">
                  <span className="link-underline">LinkedIn</span> <span className="social-arrow" aria-hidden="true"><span className="social-arrow-track"><Icon name="up-right" /><Icon name="up-right" /></span></span>
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
            <form className="contact-form" aria-labelledby="message-heading" onSubmit={handleSubmit}>
              <h2 id="message-heading">Send a message<span>.</span></h2>
              <div className="form-field">
                <label htmlFor="name" className="field-label">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  readOnly={sending}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="field-input"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="field-label">Your email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  maxLength={254}
                  readOnly={sending}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="field-input"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="field-label">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  readOnly={sending}
                  rows={4}
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
      <PageTransition label={page?.label ?? 'Page not found'} onNavigate={setPathname} />
      <NavigationDrawer key={pathname} pathname={pathname} home={home} />
      <a className="skip" href="#main">Skip to content</a>
      <header className="masthead wrap">
        <a className="brand" href="/" aria-label="Nawanshu portfolio home" aria-current={home ? 'page' : undefined}>
          <svg className="brand-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
            {[3, 9, 15].map(x => (
              <path key={x} d={`M${x} 17l6 -10 M${x - 14.4} 41l6 -10`} />
            ))}
          </svg>
          <span className="brand-name" aria-hidden="true">
            <span className="brand-track">Nawanshu<span>Nawanshu</span></span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          {navigation.map(item => (
            <a key={item.path} href={item.path} {...magneticPointerEvents}
              aria-current={page?.path === item.path ? 'page' : page?.path.startsWith(item.path + '/') ? 'location' : undefined}>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </header>
      <main id="main" tabIndex={-1}><PageContent key={pathname} path={page?.path} /></main>
      <footer><div className="wrap"><span>© {new Date().getFullYear()} Nawanshu</span><a href="#top">Back to top <Icon name="down" /></a></div></footer>
    </div>
  )
}
