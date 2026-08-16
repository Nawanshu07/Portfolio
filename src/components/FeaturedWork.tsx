import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { projects } from '../data/portfolio'

export default function FeaturedWork() {
  return (
    <section id="work" className="section-padding bg-transparent border-b border-hairline">
      <div className="container-shell">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Practical applications, shaped with a sharper visual edge."
            description="A focused set of Python applications and frontend web development projects showing steady hands-on growth."
            compact
          />

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group inline-flex w-fit items-center gap-1.5 border-b border-ink/20 pb-1 text-body-sm-strong text-ink transition hover:border-ink hover:text-ink/80 select-none"
          >
            Connect
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        {/* 
          Grid layout matching DESIGN.md column patterns:
          Multi-column responsive grid utilizing Level 3 stacked shadows.
        */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            return (
              <motion.a
                key={project.title}
                href={project.liveUrl || project.githubUrl || '#contact'}
                target={project.liveUrl || project.githubUrl ? '_blank' : undefined}
                rel={project.liveUrl || project.githubUrl ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col overflow-hidden bg-[#0f0f11] border-2 border-white/10 rounded-md shadow-[4px_4px_0px_rgba(255,255,255,0.05)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#f9cb28] hover:border-[#f9cb28] transition-all duration-300 outline-none"
              >
                {/* 16:9 Thumbnail Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-soft-2 border-b border-hairline">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={800}
                    height={450}
                    className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-102 ${
                      project.objectFit === 'contain' ? 'object-contain p-8 bg-black' : 'object-cover'
                    }`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  {/* Subtle overlay hover effect */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.015] transition duration-300" />
                  
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center text-caption-mono bg-canvas/90 text-ink border border-hairline px-2 py-0.5 rounded-sm backdrop-blur-sm uppercase font-mono tracking-wider text-[10px]">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute right-3 top-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-hairline bg-canvas text-ink opacity-0 shadow-level2 transition duration-200 group-hover:opacity-100">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <span className="text-caption-mono text-mute font-mono text-[11px] block mb-1">
                      {project.year}
                    </span>
                    <h3 className="text-display-sm text-ink font-semibold tracking-tight transition group-hover:text-link">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-body line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-sm bg-canvas-soft-2 border border-hairline px-2 py-0.5 text-caption-mono text-[10px] text-body uppercase font-mono tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
