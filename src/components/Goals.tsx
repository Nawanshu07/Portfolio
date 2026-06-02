import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { goals } from '../data/portfolio'

export default function Goals() {
  return (
    <section id="goals" className="section-padding" aria-label="My Current Goals">
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
              transition: { staggerChildren: 0.15 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {goals.map((goal) => {
            const Icon = goal.icon

            return (
              <motion.article
                key={goal.title}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -8 }}
                className="group h-full rounded-lg border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-white/[0.065] hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
              >
                <div className="flex h-full flex-col">
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white transition-all duration-300 group-hover:border-violet-500/50 group-hover:bg-violet-500/10 group-hover:text-violet-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold leading-tight text-white">
                    {goal.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    {goal.description}
                  </p>
                  <div className="mt-auto pt-8">
                    <p className="text-xs text-zinc-500">{goal.outcome}</p>
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
