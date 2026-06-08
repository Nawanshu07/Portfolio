import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
      className="fixed inset-0 z-[120] grid place-items-center bg-canvas-soft"
      role="status"
      aria-live="polite"
    >
      <div className="w-[min(320px,80vw)]">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-caption-mono text-mute tracking-widest font-mono uppercase"
        >
          Nawanshu…
        </motion.p>
        <div className="mt-6 h-[2px] overflow-hidden bg-white/10 rounded-full">
          <motion.div
            className="h-full bg-white"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
