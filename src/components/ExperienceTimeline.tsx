import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from './SectionHeading'
import { experience } from '../data/portfolio'

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // The line will scale as the user scrolls through the container smoothly
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="experience" className="section-padding">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Journey"
          title="A focused learning path from fundamentals to internship readiness."
          description="The roadmap is simple: strengthen core concepts, build practical projects, and keep improving through real coding practice."
        />

        <div ref={containerRef} className="relative mx-auto max-w-5xl py-4">
          {/* Faint background line */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-white/5 md:left-1/2 md:-translate-x-[0.5px]" />
          
          {/* Glowing animated line that draws on scroll */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-teal-400 to-teal-900/10 md:left-1/2 md:-translate-x-[0.5px]"
          />

          {experience.map((item, index) => (
            <motion.article
              key={item.period}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative grid gap-5 pb-16 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${
                index % 2 === 0 ? '' : 'md:[&>div:first-child]:col-start-2'
              }`}
            >
              <div
                className={`rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.04] ${
                  index % 2 === 0 ? 'md:text-right' : ''
                }`}
              >
                <p className="text-sm font-medium tracking-wider text-zinc-500 uppercase">{item.period}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-teal-300">{item.company}</p>
                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </div>

              {/* Checkpoint Dot */}
              <div
                className={`absolute left-0 top-4 grid h-8 w-8 place-items-center rounded-full border border-teal-500/20 bg-[#0A0A0A] md:left-1/2 md:-translate-x-1/2`}
                aria-hidden="true"
              >
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-20% 0px' }}
                  transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
                  className="h-2.5 w-2.5 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" 
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
