import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, PlayCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  
  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center bg-[#030005] p-2 sm:p-4 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div 

        className="relative z-10 flex w-full flex-1 flex-col items-center justify-center text-center rounded-[28px] sm:rounded-[36px] bg-[#030005] px-4 py-20 shadow-[0_0_80px_rgba(147,51,234,0.1)] overflow-hidden border border-purple-900/20"
      >
        {/* Background Video */}
        {/* Using a grayscale fluid video and tinting it deeply with CSS for maximum flexibility */}
<img
  src="/hero-bg-opt.jpg"
  alt="Purple Abstract Background"
  className="absolute inset-0 h-full w-full object-cover opacity-70 pointer-events-none"
  style={{
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  }}
  decoding="async"
  fetchPriority="high"
/>

        {/* Deep Black & Purple Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-purple-950/40 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030005] via-purple-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.08)_0%,transparent_100%)] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center max-w-4xl"
        >
          <motion.p 
            variants={itemVariants}
            className="mb-8 text-sm font-semibold tracking-[0.2em] text-purple-300/50 uppercase"
          >
            Nawanshu
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl font-black leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-2xl"
          >
            I build software
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500/60">that feels clear.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-10 max-w-2xl text-base leading-relaxed text-purple-100/50 md:text-lg"
          >
            Practical projects, strong fundamentals, and clean interfaces
            shaped through C, C++, Python, DSA, and modern web development.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="#work">
              <PlayCircle className="h-4 w-4 text-purple-950" />
              <span className="text-purple-950">View Projects</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <ArrowRight className="h-4 w-4 text-purple-200" />
              <span className="text-purple-100">Connect</span>
            </MagneticButton>
            <MagneticButton href="https://github.com/nawanshu07" target="_blank" rel="noopener noreferrer" variant="ghost">
              <GithubIcon className="h-4 w-4 text-purple-200" />
              <span className="text-purple-100">GitHub</span>
            </MagneticButton>
            <MagneticButton href="https://www.linkedin.com/in/nawanshu-sharma-104619351?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" variant="ghost">
              <LinkedinIcon className="h-4 w-4 text-purple-200" />
              <span className="text-purple-100">LinkedIn</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <p className="text-[10px] font-bold tracking-widest text-purple-400/30 uppercase">
          Scroll Down
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-purple-400/50"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
