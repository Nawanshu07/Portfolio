import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'
import {
  Terminal,
  Braces,
  Code2,
  Layers,
  FileCode2,
  Blocks,
  GitBranch,
  Database,
} from 'lucide-react'

type OrbitItem = {
  id: string
  name: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
}

const orbitItems: OrbitItem[] = [
  { id: 'python', name: 'Python', category: 'Automation & Scripting', icon: Terminal, badge: 'Proficient' },
  { id: 'cpp', name: 'C++', category: 'OOP & Systems', icon: Braces, badge: 'Core' },
  { id: 'dsa', name: 'DSA', category: 'Algorithms & Logic', icon: Layers, badge: 'In Progress' },
  { id: 'c', name: 'C Language', category: 'Pointers & Memory', icon: Code2, badge: 'Fundamentals' },
  { id: 'js', name: 'JavaScript', category: 'Modern ES6+ Logic', icon: FileCode2, badge: 'Web Logic' },
  { id: 'react', name: 'React', category: 'Component Interfaces', icon: Blocks, badge: 'UI & State' },
  { id: 'git', name: 'Git / GitHub', category: 'Version Control', icon: GitBranch, badge: 'Workflow' },
  { id: 'dbms', name: 'DBMS / SQL', category: 'Relational Models', icon: Database, badge: 'Data' },
]

export default function SkillOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  
  // Continuous smooth angle ticker for fluid perpetual revolution
  const [timeAngle, setTimeAngle] = useState(0)

  // Track scroll through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Smooth out scroll progress with high-damping spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  })

  // Calculate emergence factor:
  // 0.0 -> 0.18: 0 (hidden behind center)
  // 0.18 -> 0.38: 0 -> 1 (smooth emergence outward)
  // 0.38 -> 0.68: 1 (fully revealed in circular orbit)
  // 0.68 -> 0.88: 1 -> 0 (smooth retraction behind center)
  // 0.88 -> 1.0: 0 (hidden)
  const emergence = useTransform(
    smoothProgress,
    [0.12, 0.32, 0.68, 0.88],
    [0, 1, 1, 0]
  )

  // Gentle scroll rotation contribution without erratic spinning
  const scrollRotation = useTransform(
    smoothProgress,
    [0.15, 0.85],
    [0, Math.PI * 0.35]
  )

  // Smooth continuous animation frame loop calibrated to 1 revolution per 5 seconds
  useEffect(() => {
    if (shouldReduceMotion) return

    let animationFrameId: number
    let lastTimestamp = performance.now()

    const step = (now: number) => {
      const delta = (now - lastTimestamp) / 1000
      lastTimestamp = now

      // Exact calibrated speed: 1 full revolution (2 * PI) every 5 seconds
      // On hover, gently slows down to 1 revolution in 16 seconds for effortless interaction
      const speed = isHovered ? (Math.PI * 2) / 16 : (Math.PI * 2) / 5
      setTimeAngle((prev) => (prev + delta * speed) % (Math.PI * 2))

      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered, shouldReduceMotion])

  // Responsive radius calculation
  const [orbitRadius, setOrbitRadius] = useState(210)

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

  return (
    <section
      ref={containerRef}
      id="ecosystem"
      aria-label="Interactive Skill Orbit Ecosystem"
      className="relative min-h-[90vh] md:min-h-[105vh] flex flex-col items-center justify-center bg-canvas py-24 overflow-hidden border-b border-hairline"
    >
      {/* Editorial Section Heading */}
      <div className="container-shell text-center mb-12 sm:mb-16 relative z-30">
        <p className="text-caption-mono uppercase tracking-widest text-muted text-[11px]">
          // Interactive Arsenal
        </p>
        <h2 className="mt-3 text-display-lg md:text-display-xl font-light text-ink tracking-tight text-pretty">
          Core Tech Stack
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-body-md text-body leading-relaxed text-pretty">
          Foundational tools and languages revolving around modern software engineering and computer science principles.
        </p>
      </div>

      {/* Atmospheric Pastel Glow Orbs behind the orbit system */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center" aria-hidden="true">
        <div className="orb-mint absolute h-[450px] w-[450px] -translate-x-32 -translate-y-20 rounded-full blur-[70px] opacity-70" />
        <div className="orb-lavender absolute h-[480px] w-[480px] translate-x-32 translate-y-16 rounded-full blur-[80px] opacity-60" />
        <div className="orb-peach absolute h-[360px] w-[360px] translate-y-24 rounded-full blur-[65px] opacity-50" />
      </div>

      {/* Main Orbit Stage Container */}
      <div
        className="relative flex items-center justify-center w-full max-w-[650px] h-[480px] sm:h-[560px] md:h-[620px] select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Visual Orbit Guide Ring (Dashed hairline) */}
        <motion.div
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
            opacity: emergence,
          }}
          className="absolute rounded-full border border-hairline-strong border-dashed pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer subtle secondary ring */}
        <motion.div
          style={{
            width: orbitRadius * 2 + 40,
            height: orbitRadius * 2 + 40,
            opacity: useTransform(emergence, [0, 1], [0, 0.4]),
          }}
          className="absolute rounded-full border border-hairline/60 pointer-events-none hidden sm:block"
          aria-hidden="true"
        />

        {/* 
          CENTRAL OBJECT
          Higher z-index so icons emerge physically from behind it!
        */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          {/* Central Medallion */}
          <div className="relative group grid h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 place-items-center rounded-full bg-surface-card border border-hairline shadow-level2 transition-all duration-300">
            {/* Soft inner halo */}
            <div className="absolute inset-1.5 rounded-full border border-hairline-soft bg-canvas-soft flex flex-col items-center justify-center text-center p-2 shadow-inner">
              <span className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
                N
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted mt-0.5">
                Core
              </span>
            </div>

            {/* Pulsing indicator pill */}
            <div className="absolute -bottom-3 rounded-pill bg-primary px-3 py-1 text-[10px] font-medium text-on-primary shadow-sm flex items-center gap-1.5 whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-mint animate-pulse" />
              <span>Developer Core</span>
            </div>
          </div>
        </div>

        {/* 
          ORBITING ICONS (SATELLITES)
          z-index: 10 so they are positioned behind the central object when radius is 0
        */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {orbitItems.map((item, index) => {
            const Icon = item.icon
            const baseAngle = (index / orbitItems.length) * 2 * Math.PI

            return (
              <OrbitingSatellite
                key={item.id}
                item={item}
                Icon={Icon}
                baseAngle={baseAngle}
                timeAngle={timeAngle}
                scrollRotation={scrollRotation}
                emergence={emergence}
                orbitRadius={orbitRadius}
              />
            )
          })}
        </div>
      </div>

      {/* Orbit Helper Hint */}
      <p className="text-caption-mono text-muted text-[11px] mt-6 tracking-wider uppercase select-none">
        // Scroll to expand &amp; revolve · Hover to inspect
      </p>
    </section>
  )
}

type SatelliteProps = {
  item: OrbitItem
  Icon: React.ComponentType<{ className?: string }>
  baseAngle: number
  timeAngle: number
  scrollRotation: MotionValue<number>
  emergence: MotionValue<number>
  orbitRadius: number
}

function OrbitingSatellite({
  item,
  Icon,
  baseAngle,
  timeAngle,
  scrollRotation,
  emergence,
  orbitRadius,
}: SatelliteProps) {
  // Compute total dynamic angle: base offset + scroll rotation + time continuous rotation
  const [currentScrollAngle, setCurrentScrollAngle] = useState(0)
  const [currentEmergence, setCurrentEmergence] = useState(0)

  useEffect(() => {
    const unsubScroll = scrollRotation.on('change', (val: number) => {
      setCurrentScrollAngle(val)
    })
    const unsubEmergence = emergence.on('change', (val: number) => {
      setCurrentEmergence(val)
    })
    return () => {
      unsubScroll()
      unsubEmergence()
    }
  }, [scrollRotation, emergence])

  // Total current angular position
  const totalAngle = baseAngle + currentScrollAngle + timeAngle

  // Current physical radius: emergence goes smoothly from 0 (behind center) to orbitRadius
  const currentR = orbitRadius * currentEmergence

  // Polar to Cartesian coordinate transformation
  const x = Math.cos(totalAngle) * currentR
  const y = Math.sin(totalAngle) * currentR

  // Satellite opacity & scale driven by emergence
  // At 0 emergence, it is scaled down and 0 opacity behind the center
  const scale = 0.2 + currentEmergence * 0.8
  const opacity = Math.min(1, Math.max(0, currentEmergence))

  return (
    <div
      style={{
        transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale})`,
        opacity,
        zIndex: 15,
      }}
      className="absolute pointer-events-auto transition-transform duration-75 will-change-transform"
    >
      <div
        aria-label={`${item.name} (${item.category})`}
        className="group relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border transition-all duration-200 bg-surface-card text-ink border-hairline hover:border-hairline-strong hover:bg-canvas-soft hover:shadow-soft-drop cursor-pointer"
      >
        {/* Icon stays upright because we translate instead of rotating parent coordinate system! */}
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-ink group-hover:text-primary transition-colors duration-200" />

        {/* Mini label indicator floating beneath each icon — visible by default */}
        <span
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-[11px] font-mono tracking-tight text-ink/90 bg-surface-card/95 border border-hairline px-2.5 py-0.5 rounded-pill shadow-sm pointer-events-none z-30 group-hover:border-hairline-strong group-hover:text-ink transition-all duration-200"
        >
          {item.name}
        </span>
      </div>
    </div>
  )
}
