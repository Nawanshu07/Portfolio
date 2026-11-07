import { motion } from 'framer-motion'

type SectionHeadingProps = {
  compact?: boolean
  description: string
  eyebrow: string
  title: string
  dark?: boolean
}

export default function SectionHeading({
  compact = false,
  description,
  eyebrow,
  title,
  dark = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={compact ? 'max-w-3xl' : 'mb-12 max-w-4xl md:mb-16'}
    >
      <p
        className={`text-caption-mono uppercase tracking-widest text-[11px] select-none ${
          dark ? 'text-muted-soft' : 'text-muted'
        }`}
      >
        // {eyebrow}
      </p>

      {/* Modern architectural sans headline matching Tidewell specification */}
      <h2
        className={`mt-3 font-sans font-medium text-2xl sm:text-3xl md:text-4xl tracking-tight text-pretty ${
          dark ? 'text-on-dark' : 'text-cream'
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-4 text-body-md md:text-body-lg leading-relaxed text-pretty ${
          dark ? 'text-on-dark-soft' : 'text-body'
        }`}
      >
        {description}
      </p>
    </motion.div>
  )
}
