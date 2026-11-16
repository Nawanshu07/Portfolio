import { Cpu, Globe, Zap } from 'lucide-react'
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
  { name: 'C Language', category: 'Low-Level', icon: CIcon },
  { name: 'C++', category: 'OOP & Systems', icon: CppIcon },
  { name: 'Python', category: 'Scripting & CLI', icon: PythonIcon },
  { name: 'DSA', category: 'Algorithms', icon: DsaIcon },
  { name: 'JavaScript', category: 'Frontend Logic', icon: JavaScriptIcon },
  { name: 'React', category: 'UI Framework', icon: ReactIcon },
  { name: 'SQL & DBMS', category: 'Relational DB', icon: SqlIcon },
  { name: 'Git', category: 'Version Control', icon: GitIcon },
  { name: 'GitHub', category: 'Repositories', icon: GithubIcon },
  { name: 'HTML5 & CSS3', category: 'Web Standards', icon: Globe },
  { name: 'Pygame', category: 'Audio & DSP', icon: Zap },
  { name: 'VS Code', category: 'Environment', icon: Cpu },
]

export default function LogoCarousel() {
  return (
    <section
      aria-label="Technologies Marquee"
      className="relative w-full border-b border-zinc-800 bg-[#050505] py-4 overflow-hidden select-none"
    >
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex items-center gap-2 py-1">
          {/* First sequence */}
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={`a-${tech.name}`}
                className="inline-flex items-center gap-2 rounded-sm border border-zinc-800 bg-[#080808] px-3 py-1.5 text-zinc-300 transition-colors duration-150 hover:border-zinc-500 hover:text-white whitespace-nowrap cursor-default"
              >
                <Icon className="h-3.5 w-3.5 text-zinc-400" />
                <span className="font-mono text-xs font-medium text-zinc-200">
                  {tech.name}
                </span>
                <span className="font-mono text-[10px] text-zinc-600">
                  [{tech.category}]
                </span>
              </div>
            )
          })}

          {/* Duplicate sequence for seamless loop */}
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={`b-${tech.name}`}
                aria-hidden="true"
                className="inline-flex items-center gap-2 rounded-sm border border-zinc-800 bg-[#080808] px-3 py-1.5 text-zinc-300 transition-colors duration-150 hover:border-zinc-500 hover:text-white whitespace-nowrap cursor-default"
              >
                <Icon className="h-3.5 w-3.5 text-zinc-400" />
                <span className="font-mono text-xs font-medium text-zinc-200">
                  {tech.name}
                </span>
                <span className="font-mono text-[10px] text-zinc-600">
                  [{tech.category}]
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
