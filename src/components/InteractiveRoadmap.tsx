import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Circle, BookOpen } from 'lucide-react'
import { skillCategories } from '../data/portfolio'

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
      })
    })
    return defaults
  })

  // Calculate coordinates of all nodes relative to container
  const updateCoords = useCallback(() => {
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
    })
    setCoords(newCoords)
  }, [])

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
    const timeout = setTimeout(updateCoords, 400)
    
    window.addEventListener('resize', updateCoords)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      window.removeEventListener('resize', updateCoords)
    }
  }, [updateCoords])

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

    return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`
  }

  // Determine path style classes based on learning state
  const getPathStyles = (fromId: string, toId: string) => {
    const isCategoryConnection = fromId.startsWith('cat-')
    const skillName = toId.startsWith('skill-') ? toId.replace('skill-', '') : ''
    
    let status: 'learned' | 'in-progress' | 'future' = 'future'
    if (skillName) {
      const matchingKey = Object.keys(skillStatuses).find(
        (k) => k.replace(/\s+/g, '-').toLowerCase() === skillName
      )
      if (matchingKey) {
        status = skillStatuses[matchingKey]
      }
    } else if (isCategoryConnection) {
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
    
    let strokeColor = '#e7e5e4' // hairline
    let isDashed = false
    
    if (status === 'learned') {
      strokeColor = '#292524' // primary ink path
    } else if (status === 'in-progress') {
      strokeColor = '#777169' // muted ink path
      isDashed = true
    }

    if (isHovered) {
      strokeColor = '#0c0a09'
    }

    return {
      stroke: strokeColor,
      strokeWidth: isHovered ? 2 : 1.25,
      strokeDasharray: isDashed ? '4,4' : undefined,
    }
  }

  // Calculate learning stats to display at the top
  const totalSkills = Object.keys(skillStatuses).length
  const learnedSkills = Object.values(skillStatuses).filter((s) => s === 'learned').length
  const progressPercent = totalSkills > 0 ? Math.round((learnedSkills / totalSkills) * 100) : 0

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Roadmap Metrics Bar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-hairline bg-surface-card p-5 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="grid h-10 w-10 place-items-center rounded-pill border border-hairline bg-canvas-soft text-ink">
            <BookOpen className="h-5 w-5 text-ink" />
          </div>
          <div>
            <h4 className="text-body-strong font-medium text-ink">Curriculum Tracking</h4>
            <p className="text-[11px] text-muted font-mono uppercase tracking-wider mt-0.5">
              Structured Developer Roadmap
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-right">
            <span className="font-display text-2xl font-light text-ink">{learnedSkills} / {totalSkills}</span>
            <span className="text-caption text-muted ml-2">skills mastered</span>
          </div>
          <div className="h-8 w-px bg-hairline" />
          <div className="relative flex h-12 w-12 items-center justify-center">
            {/* Circular Progress SVG */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-hairline fill-none"
                strokeWidth="3"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-primary fill-none"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 20}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - progressPercent / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <span className="text-[11px] font-mono font-medium text-ink">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas overlay for connecting lines */}
      <svg className="absolute inset-0 pointer-events-none z-0 h-full w-full">
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
      <div className="relative z-10 flex flex-col items-center gap-14">
        
        {/* Root Node */}
        <div
          id="roadmap-root"
          data-roadmap-node
          className="flex flex-col items-center justify-center px-6 py-3.5 rounded-pill border border-hairline-strong bg-surface-card text-ink text-center select-none shadow-sm hover:shadow-soft-drop transition-all duration-200"
        >
          <span className="text-caption-mono font-mono text-[10px] uppercase tracking-widest text-muted mb-0.5">
            Core Curriculum
          </span>
          <h3 className="text-body-strong font-medium text-ink">
            Technical Stack Architecture
          </h3>
        </div>

        {/* Categories Grid (2 Cols on Desktop/Tablet, 1 Col on Mobile) */}
        <div className="grid w-full gap-x-10 gap-y-14 grid-cols-1 md:grid-cols-2">
          {skillCategories.map((category) => {
            const catId = `cat-${category.title.replace(/\s+/g, '-').toLowerCase()}`
            const CategoryIcon = category.icon

            return (
              <div key={category.title} className="flex flex-col items-center gap-8">
                {/* Category Node Header */}
                <div
                  id={catId}
                  data-roadmap-node
                  onMouseEnter={() => setHoveredNode(catId)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-pill border border-hairline bg-surface-card text-ink font-medium hover:border-hairline-strong shadow-sm hover:shadow-soft-drop transition-all duration-200 cursor-default"
                >
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-surface-strong text-ink">
                    <CategoryIcon className="h-3.5 w-3.5" />
                  </div>
                  <h4 className="text-body-sm-strong font-medium tracking-tight text-ink">{category.title}</h4>
                </div>

                {/* Sub-skills grid (2 columns) */}
                <div className="grid w-full gap-3 grid-cols-2">
                  {category.skills.map((skill) => {
                    const skillId = `skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`
                    const skillStatus = skillStatuses[skill.name] || 'future'
                    const SkillIcon = skill.icon

                    let statusClasses = 'bg-surface-card border-hairline text-ink hover:border-hairline-strong shadow-sm hover:shadow-soft-drop'
                    let StatusIcon = Circle

                    if (skillStatus === 'learned') {
                      statusClasses = 'bg-surface-card border-hairline-strong text-ink hover:border-primary shadow-sm hover:shadow-soft-drop'
                      StatusIcon = CheckCircle2
                    } else if (skillStatus === 'in-progress') {
                      statusClasses = 'bg-canvas-soft border-hairline-strong text-ink'
                      StatusIcon = Clock
                    }

                    return (
                      <div
                        key={skill.name}
                        id={skillId}
                        data-roadmap-node
                        onMouseEnter={() => setHoveredNode(skillId)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs gap-2.5 transition-all duration-200 cursor-default ${statusClasses}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <SkillIcon className={`h-4 w-4 shrink-0 ${skillStatus === 'learned' ? 'text-primary' : 'text-muted'}`} />
                          <span className="font-medium truncate text-[13px]">{skill.name}</span>
                        </div>
                        <StatusIcon className={`h-3.5 w-3.5 shrink-0 ${skillStatus === 'learned' ? 'text-primary' : 'text-muted-soft'}`} />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
