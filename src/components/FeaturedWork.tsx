import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { projects } from '../data/portfolio'

export default function FeaturedWork() {
  return (
    <section id="work" className="section-padding pt-4">
      <div className="container-shell">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Practical applications, shaped with a sharper visual edge."
            description="A focused set of C, C++, Python, web development, and upcoming DSA projects showing steady hands-on growth."
            compact
          />

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group inline-flex w-fit items-center gap-2 border-b border-white/20 pb-2 text-sm font-medium text-white transition hover:border-white hover:text-white"
          >
            Connect
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.a>
        </div>

        <div className="grid auto-rows-[300px] grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[260px]">
          {projects.map((project, index) => {
            const isFeature = project.layout.includes('row-span')

            return (
              <motion.a
                key={project.title}
                href="#contact"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-card outline-none transition duration-500 hover:-translate-y-1 hover:border-[#c084fc]/55 hover:shadow-[0_0_70px_rgba(192,132,252,0.13)] focus-visible:border-white ${project.layout}`}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[0.8] transition duration-700 group-hover:scale-105 group-hover:brightness-[0.82]"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10 transition duration-500 group-hover:from-black/90 group-hover:via-black/30" />
                <div
                  className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${project.accent} opacity-60`}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white text-black opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-white/75 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mb-2 text-sm text-[#c084fc]">
                      {project.year}
                    </p>
                    <h3
                      className={`font-semibold leading-tight text-white ${
                        isFeature
                          ? 'text-3xl md:text-4xl'
                          : 'text-2xl md:text-[1.7rem]'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-xl text-sm text-zinc-300 ${
                        isFeature
                          ? 'leading-6'
                          : 'line-clamp-1 text-xs leading-5'
                      }`}
                    >
                      {project.description}
                    </p>
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
