import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { skills } from '../data/portfolio'

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
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
                staggerChildren: 0.07,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((skill) => {
            const Icon = skill.icon

            return (
              <motion.article
                key={skill.title}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group min-h-[220px] rounded-lg border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.065]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white transition group-hover:bg-white group-hover:text-black">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-zinc-500">{skill.level}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">
                  {skill.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {skill.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
