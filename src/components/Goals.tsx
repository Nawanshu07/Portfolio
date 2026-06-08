import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { goals } from '../data/portfolio'

export default function Goals() {
  return (
    <section id="goals" className="section-padding bg-canvas-soft border-b border-hairline" aria-label="My Current Goals">
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
            
            // "Strengthen DSA Skills" (index === 0) will be featured / polarity-flipped to primary ink
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
                className={`group flex flex-col justify-between rounded-lg p-8 shadow-level4 border transition-all duration-300 min-h-[280px] ${
                  isFeatured
                    ? 'bg-primary text-on-primary border-primary shadow-[0_12px_40px_rgba(255,255,255,0.06)]'
                    : 'bg-canvas text-ink border-hairline hover:border-hairline-strong'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className={`grid h-10 w-10 place-items-center rounded-sm border ${
                      isFeatured 
                        ? 'border-on-primary/10 bg-on-primary/5 text-on-primary' 
                        : 'border-hairline bg-canvas-soft-2 text-ink'
                    }`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    {isFeatured && (
                      <span className="inline-flex items-center text-caption-mono bg-link text-white px-2 py-0.5 rounded-sm uppercase font-mono text-[9px] tracking-wider select-none font-medium">
                        Active Milestone
                      </span>
                    )}
                  </div>

                  <h3 className="mt-8 text-display-sm font-semibold tracking-tight leading-tight">
                    {goal.title}
                  </h3>
                  
                  <p className={`mt-3 text-body-sm leading-relaxed ${isFeatured ? 'text-on-primary/70' : 'text-body'}`}>
                    {goal.description}
                  </p>
                </div>

                <div className={`mt-8 pt-4 border-t ${isFeatured ? 'border-on-primary/10' : 'border-hairline'}`}>
                  <p className={`text-caption-mono font-mono text-[10px] uppercase tracking-wider ${isFeatured ? 'text-on-primary/50' : 'text-body/60'}`}>
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
