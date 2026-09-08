import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return hasFinePointer && !prefersReducedMotion
  })

  // Track hover/press/visible via refs so the effect never needs to re-run
  const isHoveredRef = useRef(false)
  const isTextHoveredRef = useRef(false)
  const isPressedRef = useRef(false)
  const isVisibleRef = useRef(false)

  // Reactive state only for rendering the cursor appearance
  const [cursorState, setCursorState] = useState({
    isHovered: false,
    isTextHovered: false,
    isPressed: false,
    isVisible: false,
  })

  // Raw mouse coordinates via motion values (never causes re-render)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Inner dot: ultra-fast, tight tracking
  const dotX = useSpring(mouseX, { stiffness: 850, damping: 45, mass: 0.2 })
  const dotY = useSpring(mouseY, { stiffness: 850, damping: 45, mass: 0.2 })

  // Outer ring: smooth trailing inertia (always same spring — the animate prop drives appearance)
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.8 })
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.8 })

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('cursor-active')

    const sync = () => {
      setCursorState({
        isHovered: isHoveredRef.current,
        isTextHovered: isTextHoveredRef.current,
        isPressed: isPressedRef.current,
        isVisible: isVisibleRef.current,
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
      const textEl = !newHovered && Boolean(target.closest('h1, h2, h3, h4, p, [data-cursor="text"]'))

      if (newHovered !== isHoveredRef.current || textEl !== isTextHoveredRef.current) {
        isHoveredRef.current = newHovered
        isTextHoveredRef.current = textEl
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
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mouseover', handlePointerOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.classList.remove('cursor-active')
    }
  }, [enabled, mouseX, mouseY]) // stable deps only — no isHovered/isVisible

  if (!enabled || !cursorState.isVisible) return null

  const { isHovered, isTextHovered, isPressed } = cursorState

  // Ring appearance based on state
  const ringScale = isPressed ? 0.8 : isHovered ? 1.9 : isTextHovered ? 1.35 : 1
  const ringOpacity = isHovered || isPressed ? 1 : isTextHovered ? 0.8 : 0.6
  const ringBorderColor = isPressed || isHovered ? '#d9663d' : isTextHovered ? 'rgba(237,232,220,0.65)' : 'rgba(237,232,220,0.4)'
  const ringBg = isHovered ? 'rgba(217,102,61,0.08)' : 'transparent'

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* Outer trailing ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: ringScale,
          opacity: ringOpacity,
          borderColor: ringBorderColor,
          backgroundColor: ringBg,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 h-[38px] w-[38px] rounded-full border border-solid pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Inner precise dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 1.5 : isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-ember pointer-events-none will-change-transform shadow-[0_0_8px_rgba(217,102,61,0.6)]"
        aria-hidden="true"
      />
    </div>
  )
}
