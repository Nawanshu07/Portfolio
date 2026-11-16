import { useRef, useCallback, useState, useEffect, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type MagneticProps = {
  children: ReactNode
  strength?: number
  className?: string
}

export default function MagneticWrap({ children, strength = 0.35, className }: MagneticProps) {
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsFinePointer(hasFinePointer && !prefersReducedMotion)
  }, [])

  if (!isFinePointer) {
    return <div className={className}>{children}</div>
  }

  return (
    <MagneticWrapActive strength={strength} className={className}>
      {children}
    </MagneticWrapActive>
  )
}

function MagneticWrapActive({ children, strength, className }: MagneticProps & { strength: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 280, damping: 24, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 280, damping: 24, mass: 0.5 })

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
