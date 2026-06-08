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
    title: 'Student Management System',
    category: 'C Programming',
    year: 'Project 01',
    description:
      'A console-based application for adding, updating, searching, and deleting student records using file handling.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
    alt: 'Laptop with programming workspace and student project files',
    tags: ['C', 'File Handling'],
    accent: 'from-teal-300/30 to-transparent',
    layout: 'md:col-span-4 md:row-span-2',
  },
  {
    title: 'Library Management System',
    category: 'C++ Application',
    year: 'Project 02',
    description:
      'A simple library management application for issuing, returning, and managing books with OOP concepts.',
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
    alt: 'Library shelves representing a book management application',
    tags: ['C++', 'OOP'],
    accent: 'from-sky-300/30 to-transparent',
    layout: 'md:col-span-2',
  },
  {
    title: 'Personal Portfolio Website',
    category: 'Web Development',
    year: 'Project 03',
    description:
      'A modern responsive portfolio website showcasing skills, projects, and contact information with smooth animations.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    alt: 'Code editor displaying a responsive website project',
    tags: ['HTML', 'CSS', 'JavaScript'],
    accent: 'from-amber-200/30 to-transparent',
    layout: 'md:col-span-2',
  },
  {
    title: 'Python Expense Tracker',
    category: 'Python CLI',
    year: 'Project 04',
    description:
      'A command-line application to track daily expenses, categorize spending, and calculate monthly summaries.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
    alt: 'Notebook and calculator for expense tracking and summaries',
    tags: ['Python', 'CLI'],
    accent: 'from-rose-300/30 to-transparent',
    layout: 'md:col-span-3',
  },
  {
    title: 'DSA Visualizer',
    category: 'Upcoming',
    year: 'Project 05',
    description:
      'A learning-focused project to visualize common data structures and algorithms, including sorting and searching operations.',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
    alt: 'Algorithm and data visualization code displayed on a monitor',
    tags: ['C', 'Algorithms'],
    accent: 'from-violet-200/25 to-transparent',
    layout: 'md:col-span-3',
  },
]

export const skills: IconCard[] = [
  {
    title: 'C',
    description: 'Console applications, file handling, core syntax, functions, arrays, pointers, and structured logic.',
    icon: Code2,
    level: 'Language',
  },
  {
    title: 'C++',
    description: 'Object-oriented programming concepts, classes, basic project structure, and problem solving.',
    icon: Braces,
    level: 'Language',
  },
  {
    title: 'Python',
    description: 'Command-line tools, scripting, clean logic, expense tracking, and practical automation basics.',
    icon: Terminal,
    level: 'Language',
  },
  {
    title: 'DSA in C',
    description: 'Learning arrays, linked lists, stacks, queues, sorting, searching, and algorithmic thinking.',
    icon: Layers3,
    level: 'Core',
  },
  {
    title: 'Problem Solving',
    description: 'Consistent coding practice, logical thinking, debugging, and breaking problems into steps.',
    icon: Search,
    level: 'Core',
  },
  {
    title: 'OOP',
    description: 'Basic object-oriented programming with classes, objects, encapsulation, and reusable code.',
    icon: Boxes,
    level: 'Core',
  },
  {
    title: 'Database Basics',
    description: 'Foundational database concepts, records, tables, and data organization for applications.',
    icon: Database,
    level: 'Core',
  },
  {
    title: 'HTML, CSS, JavaScript',
    description: 'Responsive web pages, clean layouts, interactive behavior, and browser-based projects.',
    icon: FileCode2,
    level: 'Web',
  },
  {
    title: 'Responsive Design',
    description: 'Mobile-first layouts that adapt cleanly across phones, tablets, and desktop screens.',
    icon: Monitor,
    level: 'Web',
  },
  {
    title: 'Git and GitHub',
    description: 'Version control, repositories, commits, project hosting, and collaboration workflows.',
    icon: GitBranch,
    level: 'Tool',
  },
  {
    title: 'VS Code',
    description: 'Daily development environment for writing, organizing, debugging, and running code.',
    icon: Frame,
    level: 'Tool',
  },
  {
    title: 'Linux Ubuntu',
    description: 'Basic terminal usage, development setup, package commands, and coding practice on Linux.',
    icon: Terminal,
    level: 'Tool',
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
  { label: 'Projects featured', suffix: '', value: 5 },
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
