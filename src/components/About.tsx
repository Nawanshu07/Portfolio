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
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()
  const [value, setValue] = useState(to)

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return

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
    <span ref={ref} className="font-mono tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-transparent text-on-primary border-b border-hairline-dark">
      <div className="container-shell">
        <SectionHeading
          eyebrow="About"
          title="A BCA student focused on programming, problem-solving, and software development."
          description="I am building my foundation through consistent practice, practical projects, and a steady focus on core computer science concepts."
          dark
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-display-sm sm:text-2xl md:text-3xl font-semibold leading-snug tracking-tight text-white text-pretty">
              I enjoy building practical applications, learning new
              technologies, and improving my coding skills through consistent
              practice.
            </p>
            <p className="text-body-md md:text-body-lg leading-relaxed text-hairline-strong text-pretty">
              My current focus is on C, C++, Python, Data Structures and
              Algorithms, and Web Development. I am actively working on projects
              to strengthen my development skills and prepare for internships
              and professional opportunities.
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
            viewport={{ once: true, margin: '-80px' }}
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
                className="rounded-md border-2 border-white/10 bg-[#0f0f11] p-6 shadow-[4px_4px_0px_rgba(255,255,255,0.05)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#f9cb28] hover:border-[#f9cb28] transition-all duration-200"
              >
                <div className="text-display-lg sm:text-[44px] sm:leading-none font-semibold text-white">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-caption-mono text-mute font-mono text-[11px] uppercase tracking-wider select-none">
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
