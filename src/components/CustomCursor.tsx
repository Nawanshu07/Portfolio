import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return hasFinePointer && !prefersReducedMotion
  })

  // Track hover/press/visible via refs
  const isHoveredRef = useRef(false)
  const isTextHoveredRef = useRef(false)
  const isPressedRef = useRef(false)
  const isVisibleRef = useRef(false)

  // Reactive state for cursor appearance
  const [cursorState, setCursorState] = useState({
    isHovered: false,
    isTextHovered: false,
    isPressed: false,
    isVisible: false,
  })

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Cursor pointer tracking: ultra-fast, responsive tracking
  const cursorX = useSpring(mouseX, { stiffness: 950, damping: 50, mass: 0.15 })
  const cursorY = useSpring(mouseY, { stiffness: 950, damping: 50, mass: 0.15 })

  // Trailing ambient halo: smooth lag
  const haloX = useSpring(mouseX, { stiffness: 240, damping: 25, mass: 0.6 })
  const haloY = useSpring(mouseY, { stiffness: 240, damping: 25, mass: 0.6 })

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
  }, [enabled, mouseX, mouseY])

  if (!enabled || !cursorState.isVisible) return null

  const { isHovered, isPressed } = cursorState

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* Soft trailing coral halo that expands on interactive hover */}
      <motion.div
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 0.7 : isHovered ? 1.6 : 0.9,
          opacity: isHovered ? 0.35 : 0.15,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 h-8 w-8 rounded-full bg-coral blur-[6px] pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* 
        Sleek Curvy Arrow Cursor in Coral Color (#FF6B5B)
        Features smooth rounded corners, curved joints, and subtle white boundary outline
      */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-3px',
          translateY: '-3px',
        }}
        animate={{
          scale: isPressed ? 0.88 : isHovered ? 1.15 : 1,
          rotate: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 pointer-events-none will-change-transform drop-shadow-[0_2px_8px_rgba(255,107,91,0.55)]"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Smooth Curvy Pointer Path */}
          <path
            d="M3.8 2.2C2.9 1.4 1.5 2.1 1.5 3.3V19.7C1.5 20.8 2.9 21.4 3.7 20.6L8.4 15.9C8.7 15.6 9.2 15.4 9.6 15.4H17.8C18.9 15.4 19.5 14 18.7 13.2L3.8 2.2Z"
            fill="#FF6B5B"
            stroke="#FFFFFF"
            strokeWidth="1.25"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
