import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { experience } from '../data/portfolio'

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Journey"
          title="A focused learning path from fundamentals to internship readiness."
          description="The roadmap is simple: strengthen core concepts, build practical projects, and keep improving through real coding practice."
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />

          {experience.map((item, index) => (
            <motion.article
              key={item.period}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative grid gap-5 pb-10 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${
                index % 2 === 0 ? '' : 'md:[&>div:first-child]:col-start-2'
              }`}
            >
              <div
                className={`rounded-lg border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-white/25 ${
                  index % 2 === 0 ? 'md:text-right' : ''
                }`}
              >
                <p className="text-sm text-zinc-500">{item.period}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-teal-200">{item.company}</p>
                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </div>

              <div
                className={`absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-[#0A0A0A] md:left-1/2 md:-translate-x-1/2`}
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-white" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
