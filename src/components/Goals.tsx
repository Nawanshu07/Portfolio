import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { goals } from '../data/portfolio'

export default function Goals() {
  return (
    <section id="goals" className="section-padding bg-canvas border-b border-hairline" aria-label="My Current Goals">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Current Milestones"
          title="The milestones I am actively working toward."
          description="My focus is directed toward deepening computer science principles, building production-grade software, and preparing for engineering opportunities."
        />

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {goals.map((goal, index) => {
            const Icon = goal.icon
            
            // First milestone features dark surface inversion per DESIGN.md ({colors.surface-dark})
            const isFeatured = index === 0

            return (
              <motion.article
                key={goal.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col justify-between rounded-xl p-7 border min-h-[280px] cursor-default ${
                  isFeatured
                    ? 'bg-surface-dark text-on-dark border-surface-dark shadow-level2 hover:shadow-level3'
                    : 'bg-surface-card text-ink border-hairline shadow-sm hover:border-hairline-strong hover:shadow-soft-drop'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className={`grid h-9 w-9 place-items-center rounded-full border ${
                      isFeatured 
                        ? 'border-white/20 bg-white/10 text-on-dark' 
                        : 'border-hairline bg-canvas-soft text-ink'
                    }`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    {isFeatured && (
                      <span className="inline-flex items-center text-caption-mono bg-white/10 text-on-dark border border-white/20 px-2.5 py-0.5 rounded-pill uppercase text-[10px] tracking-wider select-none font-medium">
                        Active Focus
                      </span>
                    )}
                  </div>

                  <h3 className={`mt-6 font-display font-light text-display-sm tracking-tight leading-snug ${
                    isFeatured ? 'text-on-dark' : 'text-ink'
                  }`}>
                    {goal.title}
                  </h3>
                  
                  <p className={`mt-2.5 text-body-sm leading-relaxed ${
                    isFeatured ? 'text-on-dark-soft' : 'text-body'
                  }`}>
                    {goal.description}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t ${
                  isFeatured ? 'border-white/10' : 'border-hairline-soft'
                }`}>
                  <p className={`text-caption-mono font-mono text-[10px] uppercase tracking-wider ${
                    isFeatured ? 'text-on-dark-soft/70' : 'text-muted'
                  }`}>
                    // Target: {goal.outcome}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
