import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[120] grid place-items-center bg-canvas"
      role="status"
      aria-live="polite"
    >
      <div className="w-[min(320px,80vw)] text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-2xl text-ink tracking-tight"
        >
          Nawanshu
        </motion.p>
        <p className="mt-1 text-caption-mono text-muted uppercase tracking-widest text-[10px]">
          Loading editorial portfolio…
        </p>

        <div className="mt-5 h-[2px] overflow-hidden bg-hairline rounded-pill">
          <motion.div
            className="h-full bg-primary"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
