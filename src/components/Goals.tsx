import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { goals } from '../data/portfolio'

export default function Goals() {
  return (
    <section id="goals" className="section-padding bg-[#050505] text-zinc-200 border-b border-zinc-800" aria-label="Current Targets">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Targets"
          title="Current technical goals."
          description="Specific areas of focus and practical targets for 2026."
        />

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.05 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8"
        >
          {goals.map((goal, index) => {
            const Icon = goal.icon

            return (
              <motion.article
                key={goal.title}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="group flex flex-col justify-between rounded-sm p-5 border border-zinc-800 bg-[#080808] hover:border-zinc-500 hover:bg-[#0c0c0c] transition-colors duration-150"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-zinc-500 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-zinc-400 group-hover:text-zinc-50 transition-colors" aria-hidden="true" />
                      <span>TARGET_0{index + 1}</span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-mono text-sm sm:text-base font-medium tracking-tight text-zinc-100 group-hover:text-zinc-50 transition-colors">
                    {goal.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
                    {goal.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-900 font-mono text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>OUTCOME:</span>
                  <span className="text-zinc-300">{goal.outcome}</span>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
