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
    const totalFrames = 80

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
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-shell">
        <SectionHeading
          eyebrow="About"
          title="A BCA student focused on programming, problem-solving, and software development."
          description="I am building my foundation through consistent practice, practical projects, and a steady focus on core computer science concepts."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-lg border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:p-10"
          >
            <p className="max-w-4xl text-2xl font-semibold leading-tight text-white md:text-4xl">
              I enjoy building practical applications, learning new
              technologies, and improving my coding skills through consistent
              practice.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
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
                  staggerChildren: 0.12,
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
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="rounded-lg border border-white/10 bg-zinc-950/80 p-6"
              >
                <div className="text-5xl font-bold leading-none text-white">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-sm text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
