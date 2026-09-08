import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './Icons'
import SectionHeading from './SectionHeading'
import { projects } from '../data/portfolio'

export default function FeaturedWork() {
  return (
    <section id="work" className="section-padding bg-canvas border-b border-hairline">
      <div className="container-shell">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected Works"
            title="Practical applications shaped with editorial discipline."
            description="A focused series of Python applications, systems tools, and web development projects demonstrating real coding craftsmanship."
            compact
          />

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group inline-flex w-fit items-center gap-1.5 border-b border-hairline-strong pb-1 text-body-sm-strong text-ink transition hover:border-ink hover:text-ink/80 select-none"
          >
            <span>Have a project in mind?</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        {/* 
          Grid layout matching DESIGN.md feature-card specs:
          Background surface-card (#ffffff), rounded.xl (16px), 1px hairline border, soft drop on hover.
        */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const hasLive = Boolean(project.liveUrl)
            const hasGithub = Boolean(project.githubUrl)
            const primaryUrl = project.liveUrl || project.githubUrl || '#contact'

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -5 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col overflow-hidden bg-surface-card border border-hairline rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-hairline-strong hover:shadow-soft-hover transition-[border-color,box-shadow] duration-300"
              >
                {/* 16:9 Thumbnail Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-soft border-b border-hairline">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={800}
                    height={450}
                    className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105 ${
                      project.objectFit === 'contain'
                        ? 'object-contain p-8 bg-canvas-soft'
                        : 'object-cover'
                    }`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />

                  {/* Category Pill Tag */}
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center text-caption-mono bg-surface-card/90 text-ink border border-hairline px-2.5 py-0.5 rounded-pill backdrop-blur-sm uppercase text-[10px] shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Corner Link Indicator */}
                  <div className="absolute right-3 top-3 flex items-center gap-1.5">
                    {hasLive && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live demo of ${project.title}`}
                        className="grid h-7 w-7 place-items-center rounded-full border border-hairline bg-surface-card text-ink opacity-90 shadow-sm transition hover:scale-105 hover:bg-primary hover:text-on-primary"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View GitHub source code for ${project.title}`}
                        className="grid h-7 w-7 place-items-center rounded-full border border-hairline bg-surface-card text-ink opacity-90 shadow-sm transition hover:scale-105 hover:bg-primary hover:text-on-primary"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <span className="text-caption-mono text-muted text-[11px] block mb-1.5">
                      {project.year}
                    </span>

                    {/* Headline: EB Garamond weight 300 */}
                    <h3 className="font-display font-light text-display-sm text-ink tracking-tight transition group-hover:text-primary">
                      <a href={primaryUrl} target={primaryUrl.startsWith('http') ? '_blank' : undefined} rel={primaryUrl.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        {project.title}
                      </a>
                    </h3>

                    <p className="mt-2.5 text-body-sm text-body line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-hairline-soft">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-pill bg-surface-strong border border-hairline px-2.5 py-0.5 text-caption-mono text-[10px] text-body uppercase font-mono tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
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
