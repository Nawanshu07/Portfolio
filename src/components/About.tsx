import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'
import { stats } from '../data/portfolio'

type CounterProps = {
  suffix?: string
  to: number
}

function Counter({ suffix = '', to }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Use a generous margin so the counter triggers as soon as the element
  // enters the viewport — negative margins can prevent firing on mobile
  // when the section doesn't scroll far enough into view.
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const shouldReduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    // When the user prefers reduced motion, skip the animation but still
    // show the correct final number (previously it stayed at 0).
    if (shouldReduceMotion) {
      setValue(to)
      return
    }

    let frame = 0
    let animation = 0
    const totalFrames = 60

    const tick = () => {
      frame += 1
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3)
      setValue(Math.round(to * progress))

      if (frame < totalFrames) {
        animation = window.requestAnimationFrame(tick)
      }
    }

    animation = window.requestAnimationFrame(() => {
      setValue(0)
      animation = window.requestAnimationFrame(tick)
    })

    return () => window.cancelAnimationFrame(animation)
  }, [isInView, shouldReduceMotion, to])

  return (
    <span ref={ref} className="font-display font-light tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-canvas text-ink border-b border-hairline relative overflow-hidden">
      {/* Subtle atmospheric gradient orb in background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden="true">
        <div className="orb-peach h-[400px] w-[400px] rounded-full blur-[80px] opacity-40" />
      </div>

      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Profile & Background"
          title="A computer science student focused on programming discipline and problem solving."
          description="Building a solid foundation through deliberate practice, practical software applications, and continuous curiosity."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="font-display font-light text-display-md sm:text-display-lg leading-snug tracking-tight text-ink text-pretty">
              I enjoy constructing clean, purposeful applications, exploring new tools, and strengthening my programming abilities every single day.
            </p>
            <p className="text-body-md md:text-body-lg leading-relaxed text-body text-pretty">
              My current active focus spans C, C++, Python, Data Structures &amp; Algorithms, and modern Web Development. I am preparing for software engineering internships and professional opportunities where thoughtful code and dependable problem solving matter.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px' }}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border border-hairline bg-surface-card p-6 shadow-sm hover:border-hairline-strong hover:shadow-soft-drop"
              >
                <div className="font-display font-light text-display-xl sm:text-[48px] sm:leading-none text-ink">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-caption-mono text-muted text-[11px] uppercase tracking-wider select-none">
                  // {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
