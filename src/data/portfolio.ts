import {
  BadgeCheck,
  Boxes,
  Braces,
  Brush,
  ChartNoAxesColumnIncreasing,
  Code2,
  Database,
  FileCode2,
  Frame,
  GitBranch,
  Layers3,
  Monitor,
  Rocket,
  Search,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GithubIcon } from '../components/Icons'

export type Project = {
  accent: string
  alt: string
  category: string
  description: string
  image: string
  layout: string
  tags: string[]
  title: string
  year: string
  githubUrl?: string
  liveUrl?: string
  objectFit?: 'cover' | 'contain'
}

export type IconCard = {
  description: string
  icon: LucideIcon
  level?: string
  outcome?: string
  title: string
}

export const projects: Project[] = [
  {
    title: 'Virtual Voice Assistant',
    category: 'Python Application',
    year: 'Project 01',
    description:
      'Desktop voice automation CLI with speech recognition, web search, and local command dispatch.',
    image:
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop',
    alt: 'Voice assistant project preview',
    tags: ['Python', 'Speech Recognition', 'Automation'],
    accent: 'from-teal-300/30 to-transparent',
    layout: 'md:col-span-1',
    githubUrl: 'https://github.com/Nawanshu07/Voice-Assistant',
  },
  {
    title: 'Python Music Player',
    category: 'Python Application',
    year: 'Project 02',
    description:
      'Terminal audio player built with Python and Pygame supporting queue management and audio playback.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    alt: 'Terminal music player preview',
    tags: ['Python', 'Pygame', 'CLI Audio'],
    accent: 'from-sky-300/30 to-transparent',
    layout: 'md:col-span-1',
    githubUrl: 'https://github.com/Nawanshu07/Music-Player',
  },
  {
    title: 'Netflix Clone',
    category: 'Web Development',
    year: 'Project 03',
    description:
      'Responsive dark-theme landing page clone built with semantic HTML5 and modern responsive CSS.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    alt: 'Netflix wordmark preview',
    tags: ['HTML5', 'CSS3', 'Responsive UI'],
    accent: 'from-rose-300/30 to-transparent',
    layout: 'md:col-span-1',
    githubUrl: 'https://github.com/Nawanshu07/Netfilx-Website-clone',
    liveUrl: 'https://netflix-clone.nawanshu.dpdns.org/',
    objectFit: 'contain',
  },
]

export type SkillItem = {
  name: string
  icon: LucideIcon
  topics: string[]
  projects?: string[]
  status: 'learned' | 'in-progress' | 'future'
}

export type SkillCategory = {
  title: string
  description: string
  icon: LucideIcon
  skills: SkillItem[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    description: 'Core languages used for scripting, systems programming, and web logic.',
    icon: Code2,
    skills: [
      {
        name: 'C',
        icon: Code2,
        status: 'learned',
        topics: ['Basic Syntax', 'Data Types & Variables', 'Control Statements', 'Functions & Scope', 'Arrays & Strings', 'Pointers & Memory'],
      },
      {
        name: 'C++',
        icon: Braces,
        status: 'learned',
        topics: ['OOP Principles', 'Classes & Objects', 'Inheritance & Polymorphism', 'Templates & STL', 'Exception Handling', 'File Handling'],
      },
      {
        name: 'Python',
        icon: Terminal,
        status: 'learned',
        topics: ['Syntax & Lists/Dicts', 'Functions & Lambdas', 'Modules & Packages', 'File I/O', 'Pygame library', 'Speech Recognition'],
        projects: ['Virtual Voice Assistant', 'Python Music Player'],
      },
      {
        name: 'JavaScript',
        icon: FileCode2,
        status: 'learned',
        topics: ['Variables & ES6+ Syntax', 'DOM Manipulation', 'Event Listeners', 'Async/Await & Promises', 'Fetch API', 'JSON Handling'],
        projects: ['Netflix Clone'],
      },
    ],
  },
  {
    title: 'Web Development',
    description: 'Structuring, styling, and building modern, responsive layouts for the browser.',
    icon: Monitor,
    skills: [
      {
        name: 'HTML',
        icon: FileCode2,
        status: 'learned',
        topics: ['Semantic Elements', 'Forms & Validations', 'Document Structure', 'SEO Meta Tags', 'Accessibility (ARIA)', 'DOM Hierarchy'],
        projects: ['Netflix Clone'],
      },
      {
        name: 'CSS',
        icon: Brush,
        status: 'learned',
        topics: ['Flexbox Layouts', 'Grid Layouts', 'Media Queries (Responsive)', 'Transitions & Transforms', 'CSS Variables', 'Hover & Active States'],
        projects: ['Netflix Clone'],
      },
    ],
  },
  {
    title: 'Core CS',
    description: 'Fundamental computer science principles, algorithmic problem solving, and database management.',
    icon: Layers3,
    skills: [
      {
        name: 'DSA in C++',
        icon: Layers3,
        status: 'in-progress',
        topics: ['Time & Space Complexity', 'Arrays & Linked Lists', 'Stacks & Queues', 'Trees & BSTs', 'Recursion & Backtracking', 'Sorting & Searching'],
      },
      {
        name: 'OOP',
        icon: Boxes,
        status: 'learned',
        topics: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism', 'Interfaces & Abstract Classes', 'Constructor/Destructor'],
      },
      {
        name: 'Problem Solving',
        icon: Search,
        status: 'learned',
        topics: ['Logic Formulation', 'Debugging & dry-runs', 'Optimization', 'Pattern Matching', 'Algorithmic Thinking'],
      },
      {
        name: 'DBMS',
        icon: Database,
        status: 'learned',
        topics: ['Relational Database Design', 'SQL Queries (SELECT, JOIN)', 'Normalization (1NF, 2NF, 3NF)', 'Transactions & ACID', 'Keys (Primary, Foreign)', 'Indexing'],
      },
    ],
  },
  {
    title: 'Tools',
    description: 'Version control, code editors, and environments that power my daily developer workflow.',
    icon: Frame,
    skills: [
      {
        name: 'Git',
        icon: GitBranch,
        status: 'learned',
        topics: ['Repository Initialization', 'Staging & Commits', 'Branching & Merging', 'Resolving Conflicts', 'Stashing', 'Diff & Logs'],
      },
      {
        name: 'GitHub',
        icon: GithubIcon as unknown as LucideIcon,
        status: 'learned',
        topics: ['Remote Repositories', 'Pushing & Pulling', 'Pull Requests', 'Forking & Cloning', 'GitHub Pages (Hosting)', 'Issues & Projects'],
        projects: ['Virtual Voice Assistant', 'Python Music Player', 'Netflix Clone'],
      },
      {
        name: 'VS Code',
        icon: Frame,
        status: 'learned',
        topics: ['Keyboard Shortcuts', 'Extensions & Themes', 'Integrated Terminal', 'Multi-file Search', 'Workspace Settings', 'Debugging Tools'],
      },
    ],
  },
]

export const goals: Required<Pick<IconCard, 'description' | 'icon' | 'outcome' | 'title'>>[] = [
  {
    title: 'DSA in C++',
    description: 'Algorithmic problem-solving: trees, graphs, dynamic programming, and complexity.',
    outcome: 'Technical interviews',
    icon: Layers3,
  },
  {
    title: 'Systems & CLI Tools',
    description: 'Practical utilities written in C, C++, and Python with clear interfaces.',
    outcome: 'Production codebases',
    icon: Workflow,
  },
  {
    title: 'Modern Web Frontends',
    description: 'Component architecture, responsive state handling, and accessible UI in React.',
    outcome: 'Web applications',
    icon: Rocket,
  },
  {
    title: 'Open Source',
    description: 'Public Git repositories, code reviews, documentation, and PR workflows.',
    outcome: 'Team collaboration',
    icon: GitBranch,
  },
  {
    title: '2026 Internships',
    description: 'Software engineering internship applications and technical assessments.',
    outcome: 'Industry role',
    icon: BadgeCheck,
  },
]

export const stats = [
  { label: 'Projects featured', suffix: '', value: 3 },
  { label: 'Current goals', suffix: '', value: 5 },
  { label: 'Skill areas', suffix: '', value: 4 },
]

export const experience = [
  {
    period: 'Current',
    role: 'BCA Undergraduate',
    company: 'Computer Applications',
    description: 'Data structures, object-oriented programming, databases, and computer systems.',
  },
  {
    period: 'Active Focus',
    role: 'C, C++, Python & DSA',
    company: 'Independent Study',
    description: 'Algorithm practice, memory management, and terminal automation tools.',
  },
  {
    period: 'Building',
    role: 'CLI & Web Projects',
    company: 'Personal Work',
    description: 'Voice automation tools, Pygame media player, and responsive React web pages.',
  },
  {
    period: 'Target',
    role: 'Software Engineering Intern',
    company: '2026 Roles',
    description: 'Seeking software development internship opportunities and production team work.',
  },
]

export const principles = [
  { icon: BadgeCheck, label: 'Consistent practice' },
  { icon: Sparkles, label: 'Curious learner' },
  { icon: Brush, label: 'Clean interface mindset' },
  { icon: ChartNoAxesColumnIncreasing, label: 'Steady skill growth' },
]
