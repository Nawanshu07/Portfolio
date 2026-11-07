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
    hoverBorder: 'rgba(56, 126, 184, 0.6)',
    hoverShadow: '0 0 24px rgba(56, 126, 184, 0.35)',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'OOP & Architecture',
    icon: CppIcon,
    badge: 'Core',
    brandColor: '#00599C',
    hoverBorder: 'rgba(0, 89, 156, 0.6)',
    hoverShadow: '0 0 24px rgba(0, 89, 156, 0.35)',
  },
  {
    id: 'dsa',
    name: 'DSA',
    category: 'Algorithms & Logic',
    icon: DsaIcon,
    badge: 'Active',
    brandColor: '#FF6B5B',
    hoverBorder: 'rgba(255, 107, 91, 0.7)',
    hoverShadow: '0 0 24px rgba(255, 107, 91, 0.45)',
  },
  {
    id: 'c',
    name: 'C Language',
    category: 'Pointers & Memory',
    icon: CIcon,
    badge: 'Fundamentals',
    brandColor: '#659AD2',
    hoverBorder: 'rgba(101, 154, 210, 0.6)',
    hoverShadow: '0 0 24px rgba(101, 154, 210, 0.35)',
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'Modern ES6+ Logic',
    icon: JavaScriptIcon,
    badge: 'Web Logic',
    brandColor: '#F7DF1E',
    hoverBorder: 'rgba(247, 223, 30, 0.6)',
    hoverShadow: '0 0 24px rgba(247, 223, 30, 0.35)',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Component Interfaces',
    icon: ReactIcon,
    badge: 'UI & State',
    brandColor: '#61DAFB',
    hoverBorder: 'rgba(97, 218, 251, 0.6)',
    hoverShadow: '0 0 24px rgba(97, 218, 251, 0.35)',
  },
  {
    id: 'git',
    name: 'Git / GitHub',
    category: 'Version Control',
    icon: GitIcon,
    badge: 'Workflow',
    brandColor: '#F05032',
    hoverBorder: 'rgba(240, 80, 50, 0.6)',
    hoverShadow: '0 0 24px rgba(240, 80, 50, 0.35)',
  },
  {
    id: 'dbms',
    name: 'DBMS / SQL',
    category: 'Relational Models',
    icon: SqlIcon,
    badge: 'Data',
    brandColor: '#336791',
    hoverBorder: 'rgba(51, 103, 145, 0.6)',
    hoverShadow: '0 0 24px rgba(51, 103, 145, 0.35)',
  },
]

export default function SkillOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Triggers pop-out from center when scrolled into view, collapses back when scrolled away
  const isInView = useInView(containerRef, { amount: 0.3, once: false })

  // Responsive radius calculation
  const [orbitRadius, setOrbitRadius] = useState(220)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOrbitRadius(135)
      } else if (window.innerWidth < 1024) {
        setOrbitRadius(180)
      } else {
        setOrbitRadius(225)
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
      aria-label="Core Tech Stack Ecosystem"
      className="relative min-h-[85vh] md:min-h-[95vh] flex flex-col items-center justify-center bg-navy py-20 sm:py-28 overflow-hidden border-b border-cream/10 select-none"
    >
      {/* Editorial Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto px-6 text-center mb-10 sm:mb-14 relative z-30"
      >
        <p className="text-caption-mono uppercase tracking-widest text-cream/50 text-[11px] font-mono">
          // Technical Stack Ecosystem
        </p>
        <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-sans font-medium text-cream tracking-tight">
          Core Tech Stack
        </h2>
        <p className="mt-4 max-w-lg mx-auto text-sm sm:text-base text-cream/70 leading-relaxed font-normal">
          Foundational tools, low-level languages, and modern frameworks engineered
          for dependable software performance.
        </p>
      </motion.div>

      {/* Atmospheric Radiant Coral Glow */}
      <div
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute h-[520px] w-[520px] rounded-full bg-coral/15 blur-[130px] transform-gpu" />
      </div>

      {/* Main Orbit Stage Container */}
      <div className="relative flex items-center justify-center w-full max-w-[650px] h-[460px] sm:h-[540px] md:h-[600px] select-none">
        
        {/* Visual Orbit Guide Ring (Dashed hairline) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.7 } : { scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
          }}
          className="absolute rounded-full border border-cream/20 border-dashed pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer subtle secondary ring */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.35 } : { scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: orbitRadius * 2 + 48,
            height: orbitRadius * 2 + 48,
          }}
          className="absolute rounded-full border border-cream/10 pointer-events-none hidden sm:block"
          aria-hidden="true"
        />

        {/* 
          ============================================================
          CENTRAL OBJECT (The Sun/Core Anchor)
          ============================================================
        */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Central Frosted Glass Medallion */}
          <div className="relative group grid h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 place-items-center rounded-full bg-[#14213D]/85 backdrop-blur-2xl border border-cream/25 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition duration-300">
            {/* Inner Ring */}
            <div className="absolute inset-1.5 rounded-full border border-cream/15 bg-white/[0.04] flex flex-col items-center justify-center text-center p-2 shadow-inner">
              <span className="font-sans text-2xl sm:text-3xl font-medium text-cream tracking-tight">
                N
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-cream/50 mt-0.5">
                Core
              </span>
            </div>

            {/* Indicator pill */}
            <div className="absolute -bottom-3 rounded-full bg-coral px-3 py-1 text-[10px] font-medium text-white shadow-md flex items-center gap-1.5 whitespace-nowrap font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
              <span>Developer Core</span>
            </div>
          </div>
        </motion.div>

        {/* 
          ============================================================
          ORBITING SATELLITES (Pop out smoothly from the center)
          Animate from {x: 0, y: 0, scale: 0} outward to orbit radius
          ============================================================
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
                        damping: 20,
                        mass: 0.5,
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
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="group relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border transition-all duration-200 bg-[#14213D]/85 backdrop-blur-xl border-cream/20 hover:bg-white/[0.08] cursor-pointer focus-visible:ring-2 focus-visible:ring-coral focus:outline-none shadow-lg"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.hoverBorder
                    e.currentTarget.style.boxShadow = item.hoverShadow
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(244, 237, 224, 0.20)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.28)'
                  }}
                >
                  <div
                    style={{ color: item.brandColor }}
                    className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>

                  {/* Minimal Label Pill Underneath */}
                  <span
                    className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-[11px] font-mono tracking-tight text-cream bg-[#14213D]/95 backdrop-blur-md border border-cream/15 px-2.5 py-0.5 rounded-full shadow-md pointer-events-none z-30 group-hover:border-coral/60 transition-colors duration-200"
                  >
                    {item.name}
                  </span>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-caption-mono text-cream/45 text-[11px] mt-6 tracking-wider uppercase select-none font-mono">
        // Core Stack · Pop-out Orbital Matrix
      </p>
    </section>
  )
}
