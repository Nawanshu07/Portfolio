import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[120] grid place-items-center bg-[#050505]"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-xs text-zinc-400 tracking-widest uppercase select-none"
        >
          nawanshu_
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-20 origin-left bg-zinc-600"
        />
      </div>
    </motion.div>
  )
}
