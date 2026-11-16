import { motion } from 'framer-motion'

type SectionHeadingProps = {
  compact?: boolean
  description?: string
  eyebrow: string
  title: string
}

export default function SectionHeading({
  compact = false,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={compact ? 'max-w-2xl' : 'mb-8 max-w-3xl md:mb-10'}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500 select-none">
        // {eyebrow}
      </p>
      <h2 className="mt-2 font-sans font-medium text-xl sm:text-2xl md:text-3xl tracking-tight text-zinc-50">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </motion.div>
  )
}
