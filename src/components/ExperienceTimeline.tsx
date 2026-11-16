import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from './SectionHeading'
import { experience } from '../data/portfolio'

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  return (
    <section id="experience" className="section-padding bg-[#050505] text-zinc-200 border-b border-zinc-800">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Timeline"
          title="Academic &amp; technical progression."
          description="Education, active study areas, and internship preparation."
        />

        <div ref={containerRef} className="relative mx-auto max-w-4xl py-4 mt-8">
          {/* Static track */}
          <div className="absolute left-3 top-3 bottom-3 w-px bg-zinc-800 md:left-1/2 md:-translate-x-[0.5px]" />

          {/* Active progress track */}
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
            className="absolute left-3 top-3 bottom-3 w-px bg-zinc-400 md:left-1/2 md:-translate-x-[0.5px] will-change-transform"
          />

          {experience.map((item, index) => (
            <motion.article
              key={item.period}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative grid gap-4 pb-12 pl-10 md:grid-cols-2 md:gap-10 md:pl-0 ${
                index % 2 === 0 ? '' : 'md:[&>div:first-child]:col-start-2'
              }`}
            >
              <div
                className={`rounded-sm border border-zinc-800 bg-[#080808] p-5 hover:border-zinc-500 hover:bg-[#0c0c0c] transition-colors duration-150 ${
                  index % 2 === 0 ? 'md:text-right' : ''
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                  <span>// {item.period}</span>
                </div>

                <h3 className="font-mono text-sm sm:text-base font-medium text-zinc-100 tracking-tight">
                  {item.role}
                </h3>

                <p className="mt-0.5 font-mono text-xs text-zinc-400">
                  {item.company}
                </p>

                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Node dot */}
              <div
                className="absolute left-3 top-4 -translate-x-1/2 h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-900 md:left-1/2"
                aria-hidden="true"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="block h-full w-full rounded-full bg-zinc-300"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
