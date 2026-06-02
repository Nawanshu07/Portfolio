import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import clsx from 'clsx'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href: string
  variant?: 'primary' | 'ghost'
  target?: string
  rel?: string
}

export default function MagneticButton({
  children,
  className,
  href,
  variant = 'primary',
  target,
  rel,
}: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 })
  const smoothY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 })

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const moveX = event.clientX - rect.left - rect.width / 2
    const moveY = event.clientY - rect.top - rect.height / 2

    x.set(moveX * 0.18)
    y.set(moveY * 0.18)
  }

  const resetPosition = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      whileTap={{ scale: 0.96 }}
      style={{ x: smoothX, y: smoothY }}
      className={clsx(
        'group inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
        variant === 'primary' &&
          'bg-white text-black shadow-[0_0_34px_rgba(255,255,255,0.18)] hover:bg-zinc-200',
        variant === 'ghost' &&
          'border border-white/15 bg-white/[0.04] text-white backdrop-blur-md hover:border-white/40 hover:bg-white/10',
        className,
      )}
    >
      {children}
    </motion.a>
  )
}
