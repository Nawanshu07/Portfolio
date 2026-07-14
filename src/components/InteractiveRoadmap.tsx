import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Circle, BookOpen } from 'lucide-react'
import { skillCategories } from '../data/portfolio'
// import RoadmapNodeDetail from './RoadmapNodeDetail'

// Definition of roadmap connection paths
type Connection = {
  from: string
  to: string
}

export default function InteractiveRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track node coordinate positions for drawing connections
  const [coords, setCoords] = useState<Record<string, { x: number; y: number; w: number; h: number }>>({})
  
  // Track hovered node for highlighting connecting paths
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
  // Local storage state for tracking user progress dynamically
  const [skillStatuses] = useState<Record<string, 'learned' | 'in-progress' | 'future'>>(() => {
    const saved = localStorage.getItem('nawanshu_roadmap_statuses')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse roadmap statuses', e)
      }
    }
    
    // Default fallback values from data definitions
    const defaults: Record<string, 'learned' | 'in-progress' | 'future'> = {}
    skillCategories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        defaults[skill.name] = skill.status
      });
    });
    return defaults
  })

  // Calculate coordinates of all nodes relative to container
  const updateCoords = () => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const elements = containerRef.current.querySelectorAll('[data-roadmap-node]')
    const newCoords: typeof coords = {}
    
    elements.forEach((el) => {
      const id = el.getAttribute('id')
      if (id) {
        const rect = el.getBoundingClientRect()
        newCoords[id] = {
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top,
          w: rect.width,
          h: rect.height,
        }
      }
    });
    setCoords(newCoords)
  }

  // Monitor DOM resize to keep coordinates perfectly aligned
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(() => {
      updateCoords()
    })
    observer.observe(containerRef.current)

    // Initial positioning
    updateCoords()
    
    // Fallback for fonts or delayed layout shifts
    const timeout = setTimeout(updateCoords, 500)
    
    window.addEventListener('resize', updateCoords)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      window.removeEventListener('resize', updateCoords)
    }
  }, [])

  // Node hierarchy and connections definitions
  const connections: Connection[] = []
  
  // Connect root node to category headers
  skillCategories.forEach((cat) => {
    connections.push({ from: 'roadmap-root', to: `cat-${cat.title.replace(/\s+/g, '-').toLowerCase()}` })
    
    // Connect category header to its direct child skills
    cat.skills.forEach((skill) => {
      connections.push({
        from: `cat-${cat.title.replace(/\s+/g, '-').toLowerCase()}`,
        to: `skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`,
      })
    })
  })

  // Draw step paths (orthogonal paths with right angles)
  const drawStepPath = (fromId: string, toId: string) => {
    const from = coords[fromId]
    const to = coords[toId]
    
    if (!from || !to) return null

    // Compute start (center-bottom of parent) and end (center-top of child)
    const startX = from.x + from.w / 2
    const startY = from.y + from.h
    const endX = to.x + to.w / 2
    const endY = to.y

    // Calculate mid-point vertically
    const midY = startY + (endY - startY) / 2

    // Path command: Go down to midY, horizontal to endX, down to endY
    return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`
  }

  // Determine path style classes based on learning state
  const getPathStyles = (fromId: string, toId: string) => {
    const isCategoryConnection = fromId.startsWith('cat-')
    const skillName = toId.startsWith('skill-') ? toId.replace('skill-', '') : ''
    
    // Find skill status
    let status: 'learned' | 'in-progress' | 'future' = 'future'
    if (skillName) {
      // Find matching skill case-insensitively or matching spaces
      const matchingKey = Object.keys(skillStatuses).find(
        (k) => k.replace(/\s+/g, '-').toLowerCase() === skillName
      )
      if (matchingKey) {
        status = skillStatuses[matchingKey]
      }
    } else if (isCategoryConnection) {
      // For root-to-category paths, highlight if category contains any active/learned skill
      const catTitle = fromId.replace('cat-', '')
      const category = skillCategories.find(
        (c) => c.title.replace(/\s+/g, '-').toLowerCase() === catTitle
      )
      if (category) {
        const statuses = category.skills.map((s) => skillStatuses[s.name])
        if (statuses.includes('learned')) status = 'learned'
        else if (statuses.includes('in-progress')) status = 'in-progress'
      }
    }

    const isHovered = hoveredNode === fromId || hoveredNode === toId
    
    let strokeColor = 'rgba(255, 255, 255, 0.08)' // default hairline
    let isDashed = false
    
    if (status === 'learned') {
      strokeColor = '#0070f3' // solid blue path
    } else if (status === 'in-progress') {
      strokeColor = '#0070f3' // blue path
      isDashed = true
    }

    if (isHovered) {
      // Intensify path style on hover
      strokeColor = '#3291ff'
    }

    return {
      stroke: strokeColor,
      strokeWidth: isHovered ? 2.5 : 1.5,
      strokeDasharray: isDashed ? '4,4' : undefined,
      className: isHovered && !isDashed ? 'animate-[dash_1s_linear_infinite]' : '',
    }
  }

  // Calculate learning stats to display at the top
  const totalSkills = Object.keys(skillStatuses).length
  const learnedSkills = Object.values(skillStatuses).filter((s) => s === 'learned').length
  const progressPercent = totalSkills > 0 ? Math.round((learnedSkills / totalSkills) * 100) : 0

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Roadmap Metrics Bar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-md border border-hairline bg-canvas p-5 shadow-level2">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-sm border border-hairline bg-canvas-soft-2 text-link">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-body-sm-strong text-ink font-semibold">Learning Progress</h4>
            <p className="text-[11px] text-mute font-mono uppercase tracking-wider mt-0.5">
              Interactive Dev Roadmap
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-display-sm text-ink font-semibold">{learnedSkills} / {totalSkills}</span>
            <span className="text-caption text-mute ml-1.5">skills learned</span>
          </div>
          <div className="h-10 w-px bg-hairline" />
          <div className="relative flex h-12 w-12 items-center justify-center">
            {/* Circular Progress SVG */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-hairline fill-none"
                strokeWidth="3.5"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-link fill-none"
                strokeWidth="3.5"
                strokeDasharray={`${2 * Math.PI * 20}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - progressPercent / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <span className="text-[10px] font-mono font-medium text-ink">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas overlay for connecting lines */}
      <svg className="absolute inset-0 pointer-events-none z-0 h-full w-full">
        <defs>
          <linearGradient id="glowing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5a623" />
            <stop offset="100%" stopColor="#ff0080" />
          </linearGradient>
        </defs>
        {connections.map(({ from, to }) => {
          const pathD = drawStepPath(from, to)
          if (!pathD) return null
          
          const pathStyles = getPathStyles(from, to)
          return (
            <path
              key={`${from}-${to}`}
              d={pathD}
              fill="none"
              {...pathStyles}
              style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
            />
          )
        })}
      </svg>

      {/* Tree Node Structure */}
      <div className="relative z-10 flex flex-col items-center gap-16">
        
        {/* Root Node */}
        <div
          id="roadmap-root"
          data-roadmap-node
          className="flex flex-col items-center justify-center px-6 py-4 rounded-md border-2 border-black bg-white text-black text-center select-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#ffd300] transition-all duration-200"
        >
          <span className="text-caption-mono font-mono text-[9px] uppercase tracking-widest text-[#555] mb-1">
            Core Curriculum
          </span>
          <h3 className="text-body-md-strong font-bold">
            Nawanshu's Tech Stack
          </h3>
        </div>

        {/* Categories Grid (2 Cols on Desktop/Tablet, 1 Col on Mobile) */}
        <div className="grid w-full gap-x-12 gap-y-16 grid-cols-1 md:grid-cols-2">
          {skillCategories.map((category) => {
            const catId = `cat-${category.title.replace(/\s+/g, '-').toLowerCase()}`
            const CategoryIcon = category.icon

            return (
              <div key={category.title} className="flex flex-col items-center gap-10">
                {/* Category Node Header */}
                <div
                  id={catId}
                  data-roadmap-node
                  onMouseEnter={() => setHoveredNode(catId)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-md border-2 border-black bg-[#ffe8c5] text-black font-semibold hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#ffffff] transition-all duration-200 cursor-default"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-sm border border-black bg-white text-black">
                    <CategoryIcon className="h-4 w-4" />
                  </div>
                  <h4 className="text-body-md-strong font-bold tracking-tight">{category.title}</h4>
                </div>

                {/* Sub-skills grid (2 columns) */}
                <div className="grid w-full gap-4 grid-cols-2">
                  {category.skills.map((skill) => {
                    const skillId = `skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`
                    const skillStatus = skillStatuses[skill.name] || 'future'
                    const SkillIcon = skill.icon

                    // Decide styling classes based on learning state
                    let statusClasses = 'bg-[#161616] border border-hairline text-body/60 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(255,255,255,0.1)] hover:border-hairline-strong'
                    let StatusIcon = Circle

                    if (skillStatus === 'learned') {
                      statusClasses = 'bg-[#ffd300] text-black border-2 border-black font-bold hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#ffffff]'
                      StatusIcon = CheckCircle2
                    } else if (skillStatus === 'in-progress') {
                      statusClasses = 'bg-[#0070f3] text-white border-2 border-black font-bold hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#ffffff]'
                      StatusIcon = Clock
                    }

                    return (
                      <div
                        key={skill.name}
                        id={skillId}
                        data-roadmap-node
                        onMouseEnter={() => setHoveredNode(skillId)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`flex items-center justify-between p-4 rounded-md text-left text-xs gap-3 transition-all duration-200 cursor-default ${statusClasses}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <SkillIcon className={`h-4 w-4 shrink-0 ${skillStatus === 'learned' ? 'text-black' : skillStatus === 'in-progress' ? 'text-white' : 'text-mute'}`} />
                          <span className="font-medium truncate">{skill.name}</span>
                        </div>
                        <StatusIcon className={`h-4 w-4 shrink-0 ${skillStatus === 'learned' ? 'text-black' : skillStatus === 'in-progress' ? 'text-white' : 'text-body/40'}`} />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Drawer Detail Sheet is disabled as elements are now unclickable */}
    </div>
  )
}
