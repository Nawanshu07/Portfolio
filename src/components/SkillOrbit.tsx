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
  badge: string
  brandColor: string
}

const skills: SkillItem[] = [
  {
    id: 'cpp',
    name: 'C++',
    category: 'OOP & Architecture',
    icon: CppIcon,
    badge: 'Core',
    brandColor: '#00599C',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Automation & Systems',
    icon: PythonIcon,
    badge: 'Proficient',
    brandColor: '#387EB8',
  },
  {
    id: 'dsa',
    name: 'DSA',
    category: 'Algorithms & Logic',
    icon: DsaIcon,
    badge: 'Active',
    brandColor: '#FF6B5B',
  },
  {
    id: 'c',
    name: 'C Language',
    category: 'Pointers & Memory',
    icon: CIcon,
    badge: 'Fundamentals',
    brandColor: '#659AD2',
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'Modern ES6+',
    icon: JavaScriptIcon,
    badge: 'Web Logic',
    brandColor: '#F7DF1E',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Component Interfaces',
    icon: ReactIcon,
    badge: 'UI & State',
    brandColor: '#61DAFB',
  },
  {
    id: 'git',
    name: 'Git / GitHub',
    category: 'Version Control',
    icon: GitIcon,
    badge: 'Workflow',
    brandColor: '#F05032',
  },
  {
    id: 'dbms',
    name: 'DBMS / SQL',
    category: 'Relational Models',
    icon: SqlIcon,
    badge: 'Data',
    brandColor: '#336791',
  },
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
      className="relative bg-navy py-20 sm:py-28 overflow-hidden border-b border-cream/10"
    >
      {/* Faint atmospheric glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-coral/8 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-12 sm:mb-16"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/45 mb-3">
            // Technical Stack
          </p>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-medium text-cream tracking-tight max-w-2xl">
            Core Tech Stack
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream/65 max-w-lg leading-relaxed">
            Foundational tools and languages I build with every day.
          </p>
        </motion.div>

        {/* ── Bento Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: 0.04 * index + 0.12,
                }}
                className="group relative rounded-2xl border border-cream/10 bg-[#1C2D52]/60 p-5 sm:p-6 transition-all duration-300 hover:border-cream/25 hover:bg-[#1C2D52]/90 hover:-translate-y-1"
                style={{
                  // CSS custom property for the brand glow on hover
                  '--brand': skill.brandColor,
                } as React.CSSProperties}
              >
                {/* Brand color top-edge accent on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${skill.brandColor}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="mb-4 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-cream/10 bg-white/[0.04] transition-all duration-300 group-hover:border-cream/20 group-hover:scale-105"
                >
                  <div style={{ color: skill.brandColor }} className="transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>
                </div>

                {/* Name & Category */}
                <h3 className="font-sans text-sm sm:text-base font-medium text-cream tracking-tight">
                  {skill.name}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-cream/50 font-mono tracking-wide">
                  {skill.category}
                </p>

                {/* Badge */}
                <span className="mt-3 inline-block rounded-full border border-cream/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-cream/55 tracking-wider uppercase group-hover:border-coral/30 group-hover:text-cream/70 transition-colors duration-300">
                  {skill.badge}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
