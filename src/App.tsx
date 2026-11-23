import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

import { findPage, navigation, projects } from './pages'
import { PageTransition } from './PageTransition'
import { MagneticLink } from './MagneticLink'
import { NavigationDrawer } from './NavigationDrawer'

type IconName = 'mark' | 'globe' | 'down' | 'up-right' | 'right' | 'mail'

const iconPaths: Record<IconName, string> = {
  mark: 'M3 17 9 7m0 10L15 7m0 10 6-10',
  globe: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM2 12h20M12 2c-6 5-6 15 0 20 6-5 6-15 0-20Z',
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

function NameMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = 0
    let scrollV = 0
    let lastY = window.scrollY
    let half = 0
    let raf: number
    const baseSpeed = -0.9

    function measure() { half = track!.scrollWidth / 2 }

    function tick() {
      if (!half) measure()
      scrollV *= 0.92
      x += baseSpeed + scrollV
      if (half > 0) {
        if (x <= -half) x += half
        if (x >= 0) x -= half
      }
      track!.style.transform = `translate3d(${x}px,0,0)`
      raf = requestAnimationFrame(tick)
    }

    function onScroll() {
      const y = window.scrollY
      const delta = (y - lastY) * 0.05
      scrollV = Math.max(-3.5, Math.min(3.5, scrollV + delta))
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(raf)
    }
  }, [])

  const segment = 'Nawanshu \u2014 '

  return (
    <div className="name-marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        <span>{segment.repeat(6)}</span>
        <span>{segment.repeat(6)}</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="intro-title">
      <img className="hero-photo" src={new URL('./assets/studio-computer.webp', import.meta.url).href} width="1536" height="1024" alt="" fetchPriority="high" />
      <div className="hero-inner wrap">
        <div className="hero-title">
          <p className="role"><i aria-hidden="true" /> Student developer</p>
          <h1 id="intro-title" className="sr-only">Nawanshu</h1>
          <p className="intro">Building practical software with<br />C, C++, Python, and the web.</p>
        </div>
        <div className="hero-foot">
          <div className="location-badge">
            <span className="location-text">Located<br />in Alwar</span>
            <span className="badge-globe"><Icon name="globe" /></span>
          </div>
          <MagneticLink variant="scroll" href="/work">
            Explore work <span className="arrow-disc"><Icon name="right" /></span>
          </MagneticLink>
        </div>
      </div>
      <NameMarquee />
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
      <div className="project-spread">
        <img className="cover" src={project.artwork} width="960" height="960" alt="" />
        <div>
          <p className="eyebrow">{project.type}</p>
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
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Inquiry from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:nawanshusharma05@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
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
          {submitted ? (
            <div className="form-success">
              <span className="field-num">00</span>
              <h2>Message initiated!</h2>
              <p>Your mail client has been opened to dispatch your message directly to nawanshusharma05@gmail.com.</p>
              <button type="button" className="form-reset-btn" onClick={() => setSubmitted(false)}>
                Send another message <Icon name="right" />
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
                  type="text"
                  required
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
                  type="email"
                  required
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
                  required
                  rows={4}
                  placeholder="Hello Nawanshu, can you help me with ... *"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="field-textarea"
                />
              </div>

              <div className="form-submit-row">
                <MagneticLink as="button" type="submit" variant="submit-button" label="Send it!">
                  Send it!
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
      <NavigationDrawer pathname={pathname} home={home} />
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
