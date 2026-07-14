import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Circle, Clock, ArrowUpRight } from 'lucide-react'
import type { SkillItem } from '../data/portfolio'
import { projects as portfolioProjects } from '../data/portfolio'
import { GithubIcon } from './Icons'

type RoadmapNodeDetailProps = {
  isOpen: boolean
  onClose: () => void
  skill: SkillItem | null
  status: 'learned' | 'in-progress' | 'future'
  onStatusChange: (status: 'learned' | 'in-progress' | 'future') => void
}

export default function RoadmapNodeDetail({
  isOpen,
  onClose,
  skill,
  status,
  onStatusChange,
}: RoadmapNodeDetailProps) {
  if (!skill) return null

  const Icon = skill.icon
  
  // Find linked projects in portfolio
  const linkedProjects = portfolioProjects.filter((proj) =>
    skill.projects?.includes(proj.title)
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black backdrop-blur-[2px]"
          />

          {/* Side Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full flex-col border-l border-hairline bg-canvas p-6 shadow-level5 sm:max-w-md md:max-w-lg overflow-y-auto text-ink"
            role="dialog"
            aria-modal="true"
            aria-label={`${skill.name} details`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-sm border border-hairline bg-canvas-soft-2 text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-display-md text-ink font-semibold tracking-tight">
                    {skill.name}
                  </h2>
                  <span className="text-[10px] text-caption-mono font-mono text-mute uppercase tracking-widest">
                    Skill Node Details
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full border border-hairline bg-canvas-soft-2 text-mute hover:text-ink hover:border-hairline-strong transition duration-150"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Status Selector */}
            <div className="mt-6">
              <h3 className="text-caption-mono font-mono text-[10px] text-mute uppercase tracking-wider mb-3">
                // Learning Status
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(['learned', 'in-progress', 'future'] as const).map((s) => {
                  const isActive = status === s
                  let statusLabel = 'To Learn'
                  let StatusIcon = Circle
                  let activeClasses = 'bg-canvas-soft-2 border-hairline text-mute'

                  if (s === 'learned') {
                    statusLabel = 'Learned'
                    StatusIcon = CheckCircle2
                    activeClasses = isActive
                      ? 'bg-[#ffd300]/10 border-[#ffd300] text-[#ffd300] font-semibold'
                      : 'border-hairline hover:border-[#ffd300]/40 text-body hover:text-[#ffd300]'
                  } else if (s === 'in-progress') {
                    statusLabel = 'In Progress'
                    StatusIcon = Clock
                    activeClasses = isActive
                      ? 'bg-link/20 border-link text-link font-medium'
                      : 'border-hairline hover:border-link/50 text-body hover:text-link'
                  } else {
                    activeClasses = isActive
                      ? 'bg-canvas-soft-2 border-hairline-strong text-ink font-medium'
                      : 'border-hairline text-body/60 hover:text-ink hover:border-hairline-strong'
                  }

                  return (
                    <button
                      key={s}
                      onClick={() => onStatusChange(s)}
                      className={`flex flex-col items-center justify-center py-3 px-2 rounded-sm border text-xs gap-1.5 transition-all duration-200 ${activeClasses}`}
                    >
                      <StatusIcon className="h-4 w-4" />
                      <span className="font-medium">{statusLabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Topics Section */}
            <div className="mt-8">
              <h3 className="text-caption-mono font-mono text-[10px] text-mute uppercase tracking-wider mb-3">
                // Topics Handled
              </h3>
              <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                {skill.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2.5 rounded-sm border border-hairline bg-canvas-soft-2 p-3 text-body-sm leading-relaxed"
                  >
                    <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${status === 'learned' ? 'text-[#ffd300]' : status === 'in-progress' ? 'text-link' : 'text-mute'}`} />
                    <span className="text-ink/90 font-light">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Linked Projects Section */}
            {linkedProjects.length > 0 && (
              <div className="mt-8">
                <h3 className="text-caption-mono font-mono text-[10px] text-mute uppercase tracking-wider mb-3">
                  // Portfolio Projects Using This
                </h3>
                <div className="grid gap-4">
                  {linkedProjects.map((project) => (
                    <a
                      key={project.title}
                      href={project.githubUrl || '#contact'}
                      target={project.githubUrl ? '_blank' : undefined}
                      rel={project.githubUrl ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between rounded-sm border border-hairline bg-canvas-soft-2 p-4 shadow-level2 hover:border-hairline-strong hover:shadow-level3 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-hairline bg-black">
                          <img
                            src={project.image}
                            alt={project.alt}
                            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="text-body-sm-strong text-ink font-semibold group-hover:text-link transition">
                            {project.title}
                          </h4>
                          <p className="text-[11px] text-mute font-mono uppercase tracking-wider mt-0.5">
                            {project.category}
                          </p>
                        </div>
                      </div>
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-hairline bg-canvas text-ink opacity-60 group-hover:opacity-100 group-hover:bg-canvas-soft-2 transition">
                        {project.githubUrl ? <GithubIcon className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
