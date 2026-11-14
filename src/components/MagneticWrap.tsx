import { useRef, useCallback, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type MagneticProps = {
  children: ReactNode
  strength?: number   // 0–1, how much the element moves toward cursor (default 0.35)
  className?: string
}

/**
 * MagneticWrap — wraps any child and makes it magnetically follow the cursor
 * when hovering near it, using Framer Motion spring physics.
 * Resets smoothly to origin on mouse leave.
 */
export default function MagneticWrap({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.6 })

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) * strength)
    rawY.set((e.clientY - cy) * strength)
  }, [rawX, rawY, strength])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

