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

  // The line scales as the user scrolls, styled in brand primary ink
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="experience" className="section-padding bg-canvas-soft border-b border-hairline">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Journey"
          title="A focused learning path from fundamentals to internship readiness."
          description="The roadmap is simple: strengthen core concepts, build practical projects, and keep improving through real coding practice."
        />

        <div ref={containerRef} className="relative mx-auto max-w-5xl py-4">
          {/* Faint background timeline track */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-hairline md:left-1/2 md:-translate-x-[0.5px]" />
          
          {/* Animated tracking line (solid Vercel primary ink) */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 top-4 bottom-4 w-px bg-primary md:left-1/2 md:-translate-x-[0.5px]"
          />

          {experience.map((item, index) => (
            <motion.article
              key={item.period}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative grid gap-5 pb-16 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${
                index % 2 === 0 ? '' : 'md:[&>div:first-child]:col-start-2'
              }`}
            >
              <div
                className={`rounded-md border border-hairline bg-canvas p-6 shadow-level2 hover:shadow-level3 hover:border-hairline-strong transition-all duration-200 ${
                  index % 2 === 0 ? 'md:text-right' : ''
                }`}
              >
                <p className="text-caption-mono text-mute font-mono uppercase tracking-wider text-[11px] select-none">// {item.period}</p>
                <h3 className="mt-2 text-display-sm font-semibold text-ink tracking-tight">
                  {item.role}
                </h3>
                <p className="mt-0.5 text-body-sm-strong text-link font-medium">{item.company}</p>
                <p className="mt-4 text-body-sm text-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Checkpoint Dot */}
              <div
                className="absolute left-0 top-4 grid h-8 w-8 place-items-center rounded-full border border-hairline bg-canvas md:left-1/2 md:-translate-x-1/2 shadow-level2"
                aria-hidden="true"
              >
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-20% 0px' }}
                  transition={{ duration: 0.4, delay: 0.05, type: 'spring' }}
                  className="h-2 w-2 rounded-full bg-primary" 
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
