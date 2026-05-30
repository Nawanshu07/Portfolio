import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
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
      className="relative min-h-[100svh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 scale-[1.04] bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2200&auto=format&fit=crop')] bg-cover bg-center opacity-35"
        style={{ x: mediaX, y: mediaY }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0A0A0A_0%,rgba(10,10,10,0.9)_38%,rgba(10,10,10,0.54)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_32%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,transparent,rgba(10,10,10,0.94)_88%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-shell relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-28"
      >
        <motion.div
          variants={item}
          className="mb-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl"
        >
          <Sparkles className="h-4 w-4 text-amber-200" />
          BCA Student | Aspiring Software Developer
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-6xl text-6xl font-black leading-[0.94] text-white md:text-8xl lg:text-9xl"
        >
          Nawanshu
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-8 grid max-w-5xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end"
        >
          <p className="text-xl font-semibold leading-8 text-white md:text-3xl md:leading-tight">
            Building practical software projects while strengthening C, C++,
            Python, DSA, and web development.
          </p>

          <div className="max-w-xl">
            <p className="text-base leading-8 text-zinc-300 md:text-lg">
              I enjoy programming, problem-solving, and learning new
              technologies through consistent practice. My current focus is on
              practical applications, strong fundamentals, and internship-ready
              software development skills.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="#work">
                <ArrowRight className="h-4 w-4" />
                View Projects
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                <ArrowRight className="h-4 w-4" />
                Connect
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.65 }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-sm text-zinc-400 transition hover:text-white md:flex"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
          <ArrowDown className="h-4 w-4" />
        </span>
        Scroll
      </motion.a>
    </section>
  )
}
