import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return hasFinePointer && !prefersReducedMotion
  })

  const isHoveredRef = useRef(false)
  const isPressedRef = useRef(false)
  const isVisibleRef = useRef(false)

  const [cursorState, setCursorState] = useState({
    isHovered: false,
    isPressed: false,
    isVisible: false,
  })

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Direct precision tracking
  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 60, mass: 0.1 })
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 60, mass: 0.1 })

  // Trailing precision reticle
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.3 })
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.3 })

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('cursor-active')

    let raf = 0
    let pendingUpdate = false

    const sync = () => {
      if (pendingUpdate) return
      pendingUpdate = true
      raf = requestAnimationFrame(() => {
        pendingUpdate = false
        setCursorState({
          isHovered: isHoveredRef.current,
          isPressed: isPressedRef.current,
          isVisible: isVisibleRef.current,
        })
      })
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        sync()
      }
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactiveEl = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]'
      )
      const newHovered = Boolean(interactiveEl)
      if (newHovered !== isHoveredRef.current) {
        isHoveredRef.current = newHovered
        sync()
      }
    }

    const handleMouseDown = () => {
      isPressedRef.current = true
      sync()
    }
    const handleMouseUp = () => {
      isPressedRef.current = false
      sync()
    }
    const handleMouseLeave = () => {
      isVisibleRef.current = false
      sync()
    }
    const handleMouseEnter = () => {
      isVisibleRef.current = true
      sync()
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mouseover', handlePointerOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mouseover', handlePointerOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.classList.remove('cursor-active')
    }
  }, [enabled, mouseX, mouseY])

  if (!enabled || !cursorState.isVisible) return null

  const { isHovered, isPressed } = cursorState

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* Precision Hairline Reticle */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 0.75 : isHovered ? 1.4 : 1,
          borderColor: isHovered ? 'rgba(250, 250, 250, 0.8)' : 'rgba(161, 161, 170, 0.35)',
        }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 h-6 w-6 rounded-full border border-zinc-600 pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Center Target Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 0.6 : isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-zinc-100 pointer-events-none will-change-transform"
        aria-hidden="true"
      />
    </div>
  )
}
