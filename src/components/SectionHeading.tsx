import { motion } from 'framer-motion'

type SectionHeadingProps = {
  compact?: boolean
  description: string
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={compact ? 'max-w-3xl' : 'mb-14 max-w-5xl md:mb-20'}
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
        {description}
      </p>
    </motion.div>
  )
}
