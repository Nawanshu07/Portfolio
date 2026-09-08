import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[120] grid place-items-center bg-canvas"
      role="status"
      aria-live="polite"
    >
      <div className="w-[min(320px,80vw)] text-center">
        {/* Brand wordmark entrance */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-2xl text-ink tracking-tight"
        >
          Nawanshu
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          className="mt-1 text-caption-mono text-muted uppercase tracking-widest text-[10px]"
        >
          Loading editorial portfolio…
        </motion.p>

        {/* Looping shimmer bar — repeats every 0.75s so it never cliffs before exit */}
        <div className="mt-5 h-[2px] overflow-hidden bg-hairline rounded-pill">
          <motion.div
            className="h-full w-1/3 rounded-pill bg-primary"
            initial={{ x: '-100%' }}
            animate={{ x: '400%' }}
            transition={{
              duration: 0.75,
              ease: [0.4, 0, 0.2, 1],
              repeat: Infinity,
              repeatDelay: 0.15,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
