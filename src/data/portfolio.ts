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
      'A hands-free desktop voice assistant written in Python that executes local commands, performs web searches, and handles speech-to-text instructions dynamically.',
    image:
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop',
    alt: 'Modern workspace demonstrating robotic and AI voice command concept',
    tags: ['Python', 'Speech Recognition', 'Speech Synthesis', 'Automation'],
    accent: 'from-teal-300/30 to-transparent',
    layout: 'md:col-span-1',
    githubUrl: 'https://github.com/Nawanshu07/Voice-Assistant',
  },
  {
    title: 'Python Music Player',
    category: 'Python Application',
    year: 'Project 02',
    description:
      'A console-based terminal music player built using Python and Pygame, featuring support for playing, pausing, resuming, stopping, and managing playlist tracks.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    alt: 'A clean dark-themed text editor displaying organized code files',
    tags: ['Python', 'Pygame', 'Audio Playback', 'CLI'],
    accent: 'from-sky-300/30 to-transparent',
    layout: 'md:col-span-1',
    githubUrl: 'https://github.com/Nawanshu07/Music-Player',
  },
  {
    title: 'Netflix Clone',
    category: 'Web Development',
    year: 'Project 03',
    description:
      'A pixel-perfect responsive clone of the Netflix landing page, focusing on sleek dark interfaces, custom layout structures, and pure HTML/CSS hover state animations.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    alt: 'Netflix red wordmark logo on transparent background',
    tags: ['HTML5', 'CSS3', 'Responsive Design', 'Vercel Aesthetics'],
    accent: 'from-rose-300/30 to-transparent',
    layout: 'md:col-span-1',
    githubUrl: 'https://github.com/Nawanshu07/Netfilx-Website-clone',
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
    title: 'Strengthen DSA Skills',
    description:
      'Practice data structures and algorithms in C with a focus on sorting, searching, and clean problem-solving patterns.',
    outcome: 'Better logic for technical interviews.',
    icon: Layers3,
  },
  {
    title: 'Build Real-World Projects',
    description:
      'Create practical applications that solve clear problems and show growth across C, C++, Python, and the web.',
    outcome: 'A stronger project portfolio.',
    icon: Workflow,
  },
  {
    title: 'Learn Advanced Web Development',
    description:
      'Move beyond basics into stronger JavaScript, responsive UI, animations, and modern frontend development.',
    outcome: 'More polished web applications.',
    icon: Rocket,
  },
  {
    title: 'Contribute to Open Source',
    description:
      'Learn collaboration through GitHub issues, pull requests, documentation, and beginner-friendly repositories.',
    outcome: 'Real collaboration experience.',
    icon: GitBranch,
  },
  {
    title: 'Secure Internships',
    description:
      'Prepare for software development internships by improving skills, projects, coding practice, and communication.',
    outcome: 'Ready for professional opportunities.',
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
    role: 'BCA Student',
    company: 'Computer Applications',
    description:
      'Studying core programming concepts while building a foundation in software development, databases, and problem solving.',
  },
  {
    period: 'Focus Area',
    role: 'C, C++, Python, and DSA',
    company: 'Programming Practice',
    description:
      'Practicing programming fundamentals, object-oriented programming, file handling, data structures, and algorithms.',
  },
  {
    period: 'Building',
    role: 'Practical Software Projects',
    company: 'Portfolio Development',
    description:
      'Creating console applications, command-line tools, and responsive websites to strengthen hands-on development skills.',
  },
  {
    period: 'Next',
    role: 'Internship and Open Source Readiness',
    company: 'Professional Growth',
    description:
      'Preparing for internships, advanced web development, open-source contributions, and real-world software opportunities.',
  },
]

export const principles = [
  { icon: BadgeCheck, label: 'Consistent practice' },
  { icon: Sparkles, label: 'Curious learner' },
  { icon: Brush, label: 'Clean interface mindset' },
  { icon: ChartNoAxesColumnIncreasing, label: 'Steady skill growth' },
]
