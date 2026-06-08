import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { skills } from '../data/portfolio'

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-canvas-soft border-b border-hairline">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Skills"
          title="Core skills across programming, concepts, web development, and tools."
          description="My current skill set is grounded in programming fundamentals, problem solving, responsive web development, and everyday developer tools."
        />

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((skill) => {
            const Icon = skill.icon

            return (
              <motion.article
                key={skill.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="group flex flex-col justify-between min-h-[200px] rounded-md border border-hairline bg-canvas p-6 shadow-level2 hover:shadow-level3 hover:border-hairline-strong transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-sm border border-hairline bg-canvas-soft-2 text-ink transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-caption-mono text-mute uppercase font-mono text-[10px] tracking-wider select-none">
                      // {skill.level}
                    </span>
                  </div>
                  
                  <h3 className="mt-6 text-display-sm text-ink font-semibold tracking-tight">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-body leading-relaxed">
                    {skill.description}
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
