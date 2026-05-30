import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { services } from '../data/portfolio'

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Current Goals"
          title="The next milestones I am actively working toward."
          description="My focus is on improving fundamentals, building real projects, and preparing for software development opportunities."
        />

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.09 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
        >
          {services.map((service) => {
            const Icon = service.icon

            return (
              <motion.article
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -8 }}
                className="group min-h-[330px] rounded-lg border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.065] hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]"
              >
                <div className="flex h-full flex-col">
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white transition group-hover:border-white/25 group-hover:bg-white group-hover:text-black">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold leading-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-8">
                    <p className="text-xs text-zinc-500">{service.outcome}</p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
