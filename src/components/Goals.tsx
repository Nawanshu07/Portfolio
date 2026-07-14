import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { goals } from '../data/portfolio'

export default function Goals() {
  return (
    <section id="goals" className="section-padding bg-transparent border-b border-hairline" aria-label="My Current Goals">
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
                className={`group flex flex-col justify-between rounded-lg p-8 border-2 transition-all duration-300 min-h-[280px] ${
                  isFeatured
                    ? 'bg-[#ffd300] text-black border-black shadow-[4px_4px_0px_rgba(255,255,255,0.1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#ffffff]'
                    : 'bg-[#0f0f11] text-white border-white/10 shadow-[4px_4px_0px_rgba(255,255,255,0.05)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#f9cb28] hover:border-[#f9cb28]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className={`grid h-10 w-10 place-items-center rounded-sm border ${
                      isFeatured 
                        ? 'border-black/20 bg-black/5 text-black' 
                        : 'border-hairline bg-[#161619] text-ink'
                    }`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    {isFeatured && (
                      <span className="inline-flex items-center text-caption-mono bg-black text-white px-2 py-0.5 rounded-sm uppercase font-mono text-[9px] tracking-wider select-none font-semibold">
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
