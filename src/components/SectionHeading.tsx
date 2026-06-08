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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={compact ? 'max-w-3xl' : 'mb-14 max-w-5xl md:mb-20'}
    >
      <p className={`text-caption-mono uppercase font-mono tracking-widest ${dark ? 'text-mute' : 'text-body'}`}>
        // {eyebrow}
      </p>
      <h2 className={`mt-4 text-display-lg md:text-[40px] md:leading-[44px] font-semibold tracking-tight text-pretty ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      <p className={`mt-4 max-w-2xl text-body-md md:text-body-lg leading-relaxed ${dark ? 'text-hairline-strong' : 'text-body'}`}>
        {description}
      </p>
    </motion.div>
  )
}
