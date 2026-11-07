import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, ChevronDown } from 'lucide-react'
import { skillCategories, type SkillItem } from '../data/portfolio'

export default function InteractiveRoadmap() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null)

  // Calculate learning metrics
  const allSkills = skillCategories.flatMap((cat) => cat.skills)
  const totalSkills = allSkills.length
  const learnedCount = allSkills.filter((s) => s.status === 'learned').length
  const progressPercent = Math.round((learnedCount / totalSkills) * 100)

  return (
    <div className="w-full select-none">
      {/* 
        ============================================================
        MINIMAL TOP PROGRESS BAR
        Clean, uncluttered, high-contrast status strip
        ============================================================
      */}
      <div className="mb-8 rounded-2xl border border-cream/15 bg-[#14213D]/60 backdrop-blur-xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-coral" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-cream tracking-tight">
              Curriculum &amp; Technical Competencies
            </h3>
            <p className="text-[11px] text-cream/55 font-mono">
              Systems · Web Architecture · Core CS · Tooling
            </p>
          </div>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col sm:items-end">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-cream">
                {learnedCount} / {totalSkills}
              </span>
              <span className="text-[11px] text-cream/60">mastered</span>
            </div>
            <div className="w-36 h-1.5 bg-cream/10 rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-coral rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-mono font-medium text-coral bg-coral/10 border border-coral/20 px-2 py-1 rounded-md">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* 
        ============================================================
        MINIMAL 4-PILLAR CATEGORY GRID (Zero glitchy SVG lines)
        Clean, responsive, frosted glass cards with clear hierarchy
        ============================================================
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skillCategories.map((category) => {
          const CategoryIcon = category.icon

          return (
            <div
              key={category.title}
              className="flex flex-col rounded-2xl border border-cream/15 bg-[#14213D]/50 backdrop-blur-xl p-5 shadow-md transition-all duration-300 hover:border-cream/30 hover:bg-[#14213D]/70"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-cream/10">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.06] text-coral border border-cream/10">
                    <CategoryIcon className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-cream tracking-tight">
                    {category.title}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-cream/50 uppercase">
                  {category.skills.length} skills
                </span>
              </div>

              {/* Skills List */}
              <div className="flex flex-col gap-2">
                {category.skills.map((skill) => {
                  const SkillIcon = skill.icon
                  const isLearned = skill.status === 'learned'
                  const isSelected = selectedSkill?.name === skill.name

                  return (
                    <div key={skill.name} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedSkill(isSelected ? null : skill)
                        }
                        className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl border text-left text-xs transition duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-white/[0.10] border-coral/60 text-cream shadow-sm'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.05] hover:border-cream/20 text-cream/90'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <SkillIcon
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isLearned ? 'text-coral' : 'text-cream/50'
                            }`}
                          />
                          <span className="font-medium truncate text-xs text-cream">
                            {skill.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isLearned ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-cream/80 font-mono">
                              <CheckCircle2 className="h-3.5 w-3.5 text-coral" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-coral font-mono bg-coral/15 px-1.5 py-0.5 rounded">
                              <Clock className="h-3 w-3" />
                              <span>Active</span>
                            </span>
                          )}
                          <ChevronDown
                            className={`h-3 w-3 text-cream/40 transition-transform duration-200 ${
                              isSelected ? 'rotate-180 text-coral' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Expandable Topics Drawer */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mt-1.5 px-3 py-2.5 rounded-lg bg-black/30 border border-cream/10 text-[11px]"
                          >
                            <span className="text-[10px] font-mono uppercase text-coral block mb-1.5">
                              Topics Covered:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {skill.topics.map((t) => (
                                <span
                                  key={t}
                                  className="px-1.5 py-0.5 rounded bg-white/[0.05] text-cream/70 text-[10px]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
