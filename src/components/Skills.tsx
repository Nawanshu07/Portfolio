import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { skillCategories } from '../data/portfolio'

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
          {skillCategories.map((category) => {
            const CategoryIcon = category.icon

            return (
              <motion.article
                key={category.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="group flex flex-col justify-between rounded-md border border-hairline bg-canvas p-6 shadow-level2 hover:shadow-level3 hover:border-hairline-strong hover:-translate-y-1 transition duration-300"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-sm border border-hairline bg-canvas-soft-2 text-ink group-hover:bg-primary group-hover:text-on-primary transition duration-300">
                      <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-display-sm text-ink font-semibold tracking-tight">
                      {category.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-body-sm text-body leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon
                    return (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 rounded-sm bg-canvas-soft-2 border border-hairline px-2.5 py-1 text-caption-mono text-[11px] text-body uppercase font-mono tracking-wider hover:border-hairline-strong hover:text-ink transition duration-150"
                      >
                        <SkillIcon className="h-3 w-3 text-mute" aria-hidden="true" />
                        {skill.name}
                      </span>
                    )
                  })}
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
