import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowRight, Code2, PlayCircle, Sparkles } from 'lucide-react'
import type { MouseEvent } from 'react'
import MagneticButton from './MagneticButton'

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
}

const smoothEase = [0.16, 1, 0.3, 1] as const

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: smoothEase },
  },
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 22 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 22 })
  const mediaX = useTransform(smoothX, [-0.5, 0.5], [-22, 22])
  const mediaY = useTransform(smoothY, [-0.5, 0.5], [-16, 16])

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      className="relative overflow-hidden bg-background px-3 pb-20 pt-3 sm:px-4"
      onMouseMove={handleMouseMove}
    >
      <div className="relative min-h-[88svh] overflow-hidden rounded-[24px] border border-white/10 bg-[#120906] shadow-[0_36px_120px_rgba(0,0,0,0.48)] sm:rounded-[34px]">
        <motion.div
          className="absolute inset-0 scale-[1.06] bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-90 brightness-[0.62] contrast-[1.1] saturate-[0.78] sepia"
          style={{ x: mediaX, y: mediaY }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.22)_45%,rgba(0,0,0,0.92)),linear-gradient(90deg,rgba(248,105,52,0.35),transparent_36%,rgba(0,0,0,0.28)_82%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="container-shell relative z-10 grid min-h-[88svh] place-items-center py-28 text-center"
        >
          <motion.div
            variants={item}
            className="absolute left-5 top-28 hidden items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/80 backdrop-blur-xl md:flex"
          >
            <Sparkles className="h-4 w-4 text-[#ff7a3d]" />
            BCA Student | Software Developer
          </motion.div>

          <motion.div
            variants={item}
            className="absolute right-5 top-28 hidden items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/80 backdrop-blur-xl md:flex"
          >
            <Code2 className="h-4 w-4 text-cyan-200" />
            C / C++ / Python / Web
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <motion.h1
              variants={item}
              className="mb-6 text-2xl font-black leading-none text-white sm:text-3xl"
            >
              Nawanshu
            </motion.h1>

            <motion.p
              variants={item}
              className="text-5xl font-black leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl"
            >
              I build software
              <br />
              <span className="text-white/50">that feels clear.</span>
            </motion.p>

            <motion.p
              variants={item}
              className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/75 md:text-lg"
            >
              Practical projects, strong fundamentals, and clean interfaces
              shaped through C, C++, Python, DSA, and modern web development.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <MagneticButton href="#work">
                <PlayCircle className="h-4 w-4" />
                View Projects
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                <ArrowRight className="h-4 w-4" />
                Connect
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="absolute bottom-7 left-5 right-5 grid gap-4 text-left text-sm text-white/65 md:grid-cols-[1fr_auto_1fr] md:items-end"
          >
            <p className="hidden max-w-xs leading-6 md:block">
              Currently turning learning into polished, internship-ready
              software projects.
            </p>
            <a
              href="#work"
              className="mx-auto flex w-fit items-center gap-3 text-white/75 transition hover:text-white"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.07] backdrop-blur-md">
                <ArrowDown className="h-4 w-4" />
              </span>
              Scroll Down
            </a>
            <p className="hidden justify-self-end text-right leading-6 md:block">
              Focused on logic, usability, and steady growth.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.75, ease: smoothEase }}
        className="container-shell pointer-events-none relative z-10 -mt-4 overflow-hidden"
        aria-hidden="true"
      >
        <p className="select-none text-6xl font-black leading-none text-white/10 sm:text-8xl md:text-9xl lg:text-[10rem]">
          PROJECTS
        </p>
      </motion.div>
    </section>
  )
}
