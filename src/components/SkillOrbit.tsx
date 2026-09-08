import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
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

type OrbitItem = {
  id: string
  name: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  brandColor: string
  hoverBorder: string
  hoverShadow: string
}

const orbitItems: OrbitItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Automation & Systems',
    icon: PythonIcon,
    badge: 'Proficient',
    brandColor: '#387EB8',
    hoverBorder: 'rgba(56, 126, 184, 0.5)',
    hoverShadow: '0 0 20px rgba(56, 126, 184, 0.25)',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'OOP & Architecture',
    icon: CppIcon,
    badge: 'Core',
    brandColor: '#00599C',
    hoverBorder: 'rgba(0, 89, 156, 0.5)',
    hoverShadow: '0 0 20px rgba(0, 89, 156, 0.25)',
  },
  {
    id: 'dsa',
    name: 'DSA',
    category: 'Algorithms & Logic',
    icon: DsaIcon,
    badge: 'In Progress',
    brandColor: '#d9663d',
    hoverBorder: 'rgba(217, 102, 61, 0.5)',
    hoverShadow: '0 0 20px rgba(217, 102, 61, 0.25)',
  },
  {
    id: 'c',
    name: 'C Language',
    category: 'Pointers & Memory',
    icon: CIcon,
    badge: 'Fundamentals',
    brandColor: '#659AD2',
    hoverBorder: 'rgba(101, 154, 210, 0.5)',
    hoverShadow: '0 0 20px rgba(101, 154, 210, 0.25)',
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'Modern ES6+ Logic',
    icon: JavaScriptIcon,
    badge: 'Web Logic',
    brandColor: '#F7DF1E',
    hoverBorder: 'rgba(247, 223, 30, 0.5)',
    hoverShadow: '0 0 20px rgba(247, 223, 30, 0.25)',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Component Interfaces',
    icon: ReactIcon,
    badge: 'UI & State',
    brandColor: '#61DAFB',
    hoverBorder: 'rgba(97, 218, 251, 0.5)',
    hoverShadow: '0 0 20px rgba(97, 218, 251, 0.25)',
  },
  {
    id: 'git',
    name: 'Git / GitHub',
    category: 'Version Control',
    icon: GitIcon,
    badge: 'Workflow',
    brandColor: '#F05032',
    hoverBorder: 'rgba(240, 80, 50, 0.5)',
    hoverShadow: '0 0 20px rgba(240, 80, 50, 0.25)',
  },
  {
    id: 'dbms',
    name: 'DBMS / SQL',
    category: 'Relational Models',
    icon: SqlIcon,
    badge: 'Data',
    brandColor: '#336791',
    hoverBorder: 'rgba(51, 103, 145, 0.5)',
    hoverShadow: '0 0 20px rgba(51, 103, 145, 0.25)',
  },
]

export default function SkillOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  
  // Triggers pop-out when scrolled into view, and collapses back when scrolled away
  const isInView = useInView(containerRef, { amount: 0.3, once: false })

  // Responsive radius calculation
  const [orbitRadius, setOrbitRadius] = useState(220)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOrbitRadius(130)
      } else if (window.innerWidth < 1024) {
        setOrbitRadius(175)
      } else {
        setOrbitRadius(220)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate cardinal & diagonal coordinates around the circle (starting from top)
  const getItemCoords = (index: number) => {
    const angle = (index / orbitItems.length) * 2 * Math.PI - Math.PI / 2
    const x = Math.round(Math.cos(angle) * orbitRadius)
    const y = Math.round(Math.sin(angle) * orbitRadius)
    return { x, y }
  }

  return (
    <section
      ref={containerRef}
      id="ecosystem"
      aria-label="Interactive Skill Orbit Ecosystem"
      className="relative min-h-[90vh] md:min-h-[105vh] flex flex-col items-center justify-center bg-canvas py-24 overflow-hidden border-b border-hairline"
    >
      {/* Editorial Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="container-shell text-center mb-12 sm:mb-16 relative z-30"
      >
        <p className="text-caption-mono uppercase tracking-widest text-muted text-[11px]">
          // Interactive Arsenal
        </p>
        <h2 className="mt-3 text-display-lg md:text-display-xl font-light text-ink tracking-tight text-pretty">
          Core Tech Stack
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-body-md text-body leading-relaxed text-pretty">
          Foundational tools and languages revolving around modern software engineering and computer science principles.
        </p>
      </motion.div>

      {/* Atmospheric Pastel Glow Orbs (GPU-composited) */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden" aria-hidden="true">
        <div className="orb-mint absolute h-[420px] w-[420px] -translate-x-32 -translate-y-16 rounded-full opacity-70 transform-gpu" />
        <div className="orb-lavender absolute h-[440px] w-[440px] translate-x-32 translate-y-16 rounded-full opacity-60 transform-gpu" />
        <div className="orb-peach absolute h-[340px] w-[340px] translate-y-24 rounded-full opacity-50 transform-gpu" />
      </div>

      {/* Main Orbit Stage Container */}
      <div className="relative flex items-center justify-center w-full max-w-[650px] h-[480px] sm:h-[560px] md:h-[620px] select-none">
        {/* Visual Orbit Guide Ring (Dashed hairline) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.85 } : { scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
          }}
          className="absolute rounded-full border border-hairline-strong border-dashed pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer subtle secondary ring */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.4 } : { scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: orbitRadius * 2 + 44,
            height: orbitRadius * 2 + 44,
          }}
          className="absolute rounded-full border border-hairline/60 pointer-events-none hidden sm:block"
          aria-hidden="true"
        />

        {/* 
          CENTRAL OBJECT
          Stable anchor for the orbital system
        */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Central Medallion */}
          <div className="relative group grid h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 place-items-center rounded-full bg-surface-card border border-hairline shadow-level2 transition-[border-color,box-shadow] duration-200">
            {/* Soft inner halo */}
            <div className="absolute inset-1.5 rounded-full border border-hairline-soft bg-canvas-soft flex flex-col items-center justify-center text-center p-2 shadow-inner">
              <span className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
                N
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted mt-0.5">
                Core
              </span>
            </div>

            {/* Indicator pill */}
            <div className="absolute -bottom-3 rounded-pill bg-primary px-3 py-1 text-[10px] font-medium text-on-primary shadow-sm flex items-center gap-1.5 whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-mint animate-pulse" aria-hidden="true" />
              <span>Developer Core</span>
            </div>
          </div>
        </motion.div>

        {/* 
          ORBITING SATELLITES
          Pop out from center when scrolled in, collapse and hide when scrolled away
        */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {orbitItems.map((item, index) => {
            const Icon = item.icon
            const { x: targetX, y: targetY } = getItemCoords(index)

            return (
              <motion.div
                key={item.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { x: targetX, y: targetY, scale: 1, opacity: 1 }
                    : { x: 0, y: 0, scale: 0, opacity: 0 }
                }
                transition={
                  isInView
                    ? {
                        type: 'spring',
                        stiffness: 240,
                        damping: 22,
                        mass: 0.6,
                        delay: shouldReduceMotion ? 0 : 0.04 * index + 0.08,
                      }
                    : {
                        duration: shouldReduceMotion ? 0 : 0.25,
                        ease: [0.16, 1, 0.3, 1],
                        delay: shouldReduceMotion ? 0 : 0.02 * (orbitItems.length - 1 - index),
                      }
                }
                className="absolute pointer-events-auto z-15"
              >
                <motion.div
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.name}: ${item.category} (${item.badge})`}
                  whileHover={{ scale: 1.14, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="group relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border transition-[border-color,background-color,box-shadow] duration-200 bg-surface-card border-hairline hover:bg-canvas-soft cursor-pointer focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.18)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.hoverBorder
                    e.currentTarget.style.boxShadow = item.hoverShadow
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-hairline)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.18)'
                  }}
                >
                  <div
                    style={{ color: item.brandColor }}
                    className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>

                  {/* Label pill — positioned below the icon using top-full to avoid container clipping */}
                  <span
                    className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-[11px] font-mono tracking-tight text-ink/90 bg-surface-card/95 border border-hairline px-2.5 py-0.5 rounded-pill shadow-sm pointer-events-none z-30 group-hover:border-hairline-strong group-hover:text-ink transition-[border-color,color] duration-200"
                  >
                    {item.name}
                  </span>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Orbit Helper Hint */}
      <p className="text-caption-mono text-muted text-[11px] mt-6 tracking-wider uppercase select-none">
        // Core Stack · Hover to inspect
      </p>
    </section>
  )
}
