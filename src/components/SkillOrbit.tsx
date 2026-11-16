import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  PythonIcon,
  CppIcon,
  CIcon,
  JavaScriptIcon,
  ReactIcon,
  GitIcon,
  SqlIcon,
  DsaIcon,
} from './Icons'

type SkillItem = {
  id: string
  name: string
  category: string
  icon: React.ComponentType<{ className?: string }>
}

const skills: SkillItem[] = [
  { id: 'c', name: 'C Language', category: 'Memory & Pointers', icon: CIcon },
  { id: 'cpp', name: 'C++', category: 'OOP & Architecture', icon: CppIcon },
  { id: 'dsa', name: 'DSA in C++', category: 'Algorithms & Complexity', icon: DsaIcon },
  { id: 'python', name: 'Python', category: 'Automation & CLI', icon: PythonIcon },
  { id: 'js', name: 'JavaScript', category: 'ES6+ Logic', icon: JavaScriptIcon },
  { id: 'react', name: 'React', category: 'UI Components', icon: ReactIcon },
  { id: 'dbms', name: 'SQL & DBMS', category: 'Relational Databases', icon: SqlIcon },
  { id: 'git', name: 'Git & GitHub', category: 'Version Control', icon: GitIcon },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function SkillOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.15, once: true })

  return (
    <section
      ref={containerRef}
      id="ecosystem"
      aria-label="Core Tech Stack"
      className="bg-[#050505] py-16 sm:py-20 border-b border-zinc-800"
    >
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-8 sm:mb-10"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-1.5">
            // Stack
          </p>
          <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-medium text-zinc-50 tracking-tight">
            Languages &amp; Tooling
          </h2>
        </motion.div>

        {/* 1px grid divider layout — zero fluff, zero lag */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.03 * index + 0.05,
                }}
                className="group bg-[#050505] p-4 sm:p-5 flex flex-col justify-between min-h-[120px] hover:bg-[#0c0c0c] transition-colors duration-150"
              >
                <div className="flex items-center justify-between text-zinc-500 group-hover:text-zinc-50 transition-colors">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-mono text-sm font-medium text-zinc-200 group-hover:text-zinc-50 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-zinc-500">
                    {skill.category}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
