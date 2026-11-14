import { motion } from 'framer-motion'

const EASE = [0.76, 0, 0.24, 1] as const

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
      }}
      className="fixed inset-0 z-[120] overflow-hidden"
      role="status"
      aria-live="polite"
    >
      {/* ── Split curtain panels ─────────────────────────────────────── */}
      {/* Top panel slides up */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.85, ease: EASE }}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0B1222] origin-bottom"
      />
      {/* Bottom panel slides down */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.85, ease: EASE }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0B1222] origin-top"
      />

      {/* ── Centre content — fades out before curtains part ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        {/* Coral glow behind wordmark */}
        <div className="absolute h-32 w-64 rounded-full bg-coral/20 blur-[60px] pointer-events-none" aria-hidden="true" />

        {/* Wordmark */}
        <motion.p
          initial={{ opacity: 0, y: 12, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative font-sans font-medium text-3xl text-cream tracking-[0.08em] select-none"
        >
          nawanshu
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-2 text-[10px] font-mono uppercase tracking-[0.25em] text-cream/40 select-none"
        >
          Software Developer
        </motion.p>

        {/* Animated coral progress line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 h-[1.5px] w-32 origin-left bg-gradient-to-r from-coral via-coral/60 to-transparent rounded-full"
        />
      </motion.div>
    </motion.div>
  )
}
