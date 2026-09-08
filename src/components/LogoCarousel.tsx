import {
  Cpu,
  Globe,
  Sparkles,
  Zap,
} from 'lucide-react'
import {
  GithubIcon,
  PythonIcon,
  CppIcon,
  CIcon,
  JavaScriptIcon,
  ReactIcon,
  GitIcon,
  SqlIcon,
  DsaIcon,
} from './Icons'

type TechItem = {
  name: string
  category: string
  icon: React.ComponentType<{ className?: string }>
}

const technologies: TechItem[] = [
  { name: 'Python', category: 'Language', icon: PythonIcon },
  { name: 'C++', category: 'Systems & OOP', icon: CppIcon },
  { name: 'C Language', category: 'Low-Level', icon: CIcon },
  { name: 'DSA & Algorithms', category: 'Computer Science', icon: DsaIcon },
  { name: 'JavaScript (ES6+)', category: 'Frontend & Logic', icon: JavaScriptIcon },
  { name: 'React', category: 'Web UI', icon: ReactIcon },
  { name: 'HTML5 & CSS3', category: 'Web Standards', icon: Globe },
  { name: 'Git', category: 'Version Control', icon: GitIcon },
  { name: 'GitHub', category: 'Collaboration', icon: GithubIcon },
  { name: 'SQL & DBMS', category: 'Databases', icon: SqlIcon },
  { name: 'Pygame', category: 'Game & Audio', icon: Zap },
  { name: 'VS Code', category: 'Editor & Tooling', icon: Cpu },
  { name: 'Responsive Design', category: 'UI Engineering', icon: Sparkles },
]

export default function LogoCarousel() {
  return (
    <section 
      aria-label="Technologies and Tooling Marquee"
      className="relative w-full border-y border-hairline bg-canvas-soft/80 py-8 overflow-hidden select-none"
    >
      <div className="container-shell mb-4 flex items-center justify-between">
        <p className="text-caption-uppercase text-muted text-[11px] tracking-[0.18em]">
          Technologies & Core Tooling
        </p>
        <span className="hidden sm:inline-block text-caption-mono text-muted-soft text-[11px]">
          Continuous Learning Stack
        </span>
      </div>

      {/* Gradient edge masks for seamless entry and exit */}
      <div 
        className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="animate-marquee flex items-center gap-3 py-2">
          {/* First sequence */}
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={`a-${tech.name}`}
                className="group inline-flex items-center gap-2.5 rounded-pill border border-hairline bg-surface-card px-4 py-2 text-ink shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-soft-drop whitespace-nowrap cursor-default"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-surface-strong text-ink group-hover:bg-primary group-hover:text-on-primary transition-colors duration-200">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[13px] font-medium leading-none text-ink">
                    {tech.name}
                  </span>
                  <span className="text-[10px] text-muted leading-tight mt-0.5">
                    {tech.category}
                  </span>
                </div>
              </div>
            )
          })}

          {/* Duplicate sequence for infinite loop */}
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={`b-${tech.name}`}
                aria-hidden="true"
                className="group inline-flex items-center gap-2.5 rounded-pill border border-hairline bg-surface-card px-4 py-2 text-ink shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-soft-drop whitespace-nowrap cursor-default"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-surface-strong text-ink group-hover:bg-primary group-hover:text-on-primary transition-colors duration-200">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[13px] font-medium leading-none text-ink">
                    {tech.name}
                  </span>
                  <span className="text-[10px] text-muted leading-tight mt-0.5">
                    {tech.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
