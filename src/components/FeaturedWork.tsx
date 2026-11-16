import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './Icons'
import SectionHeading from './SectionHeading'
import { projects } from '../data/portfolio'

export default function FeaturedWork() {
  return (
    <section id="work" className="section-padding bg-[#050505] text-zinc-200 border-b border-zinc-800">
      <div className="container-shell">
        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Work"
            title="Projects."
            description="CLI tools, audio applications, and web clones."
            compact
          />

          <a
            href="https://github.com/nawanshu07"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-400 hover:text-zinc-50 transition-colors inline-flex items-center gap-1.5 pb-0.5 border-b border-zinc-800 hover:border-zinc-500 w-fit"
          >
            <span>all repositories</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Minimalist Brutalist Project List — Compact & mobile-optimized */}
        <div className="border border-zinc-800 bg-[#080808] rounded-sm divide-y divide-zinc-800 overflow-hidden">
          {projects.map((project, index) => {
            const hasLive = Boolean(project.liveUrl)
            const hasGithub = Boolean(project.githubUrl)
            const primaryUrl = project.liveUrl || project.githubUrl || '#contact'

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group p-4 sm:p-5 hover:bg-[#0c0c0c] transition-colors duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  {/* Left: Index + Main Content */}
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <span className="font-mono text-xs text-zinc-600 pt-0.5 select-none shrink-0">
                      0{index + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 mb-1">
                        <span className="text-zinc-400">[{project.category}]</span>
                      </div>

                      <h3 className="font-sans font-medium text-base sm:text-lg text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                        <a
                          href={primaryUrl}
                          target={primaryUrl.startsWith('http') ? '_blank' : undefined}
                          rel={primaryUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {project.title}
                        </a>
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[10px]">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block rounded-sm bg-zinc-950 border border-zinc-800 text-zinc-400 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2 font-mono text-xs shrink-0 self-start sm:self-center pt-2 sm:pt-0">
                    {hasGithub && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-zinc-800 bg-[#050505] text-zinc-300 hover:text-white hover:border-zinc-500 px-3 py-1.5 rounded-sm transition-colors"
                        aria-label={`Source code for ${project.title}`}
                      >
                        <GithubIcon className="h-3 w-3" />
                        <span>code</span>
                        <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                      </a>
                    )}
                    {hasLive && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-zinc-700 bg-zinc-950 text-zinc-100 hover:text-white hover:border-zinc-400 px-3 py-1.5 rounded-sm transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <span>demo</span>
                        <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
