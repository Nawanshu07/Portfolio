export const navigation = [
  { path: '/work', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export const projects = [
  {
    title: 'Virtual Voice Assistant',
    path: '/work/virtual-voice-assistant',
    type: 'Interaction & Automation',
    description: 'Desktop voice automation CLI with speech recognition, web search, and local command dispatch.',
    href: 'https://github.com/Nawanshu07/Voice-Assistant',
  },
  {
    title: 'Python Music Player',
    path: '/work/python-music-player',
    type: 'Software & Application',
    description: 'Terminal audio player with queue management and playback.',
    href: 'https://github.com/Nawanshu07/Music-Player',
  },
  {
    title: 'Netflix Clone',
    path: '/work/netflix-clone',
    type: 'Design & Development',
    description: 'Responsive dark-theme interface built with semantic HTML and modern CSS.',
    href: 'https://github.com/Nawanshu07/Netfilx-Website-clone',
    liveHref: 'https://netflix-clone.nawanshu.dpdns.org/',
  },
]

export const pages = [
  { path: '/', label: 'Home' },
  ...navigation,
  ...projects.map(({ path, title }) => ({ path, label: title })),
]

export function findPage(pathname: string) {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/'
  return pages.find(page => page.path === path)
}

export function pageTitle(label: string) {
  return label === 'Home' ? 'Nawanshu — Student Developer' : `${label} — Nawanshu`
}
