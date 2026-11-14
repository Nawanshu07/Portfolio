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
  const isPressedRef = useRef(false)
  const isVisibleRef = useRef(false)

  // Velocity tracking for tilt
  const prevX = useRef(-100)
  const prevY = useRef(-100)
  const velocityX = useRef(0)
  const velocityY = useRef(0)

  // Reactive state for cursor appearance
  const [cursorState, setCursorState] = useState({
    isHovered: false,
    isPressed: false,
    isVisible: false,
    tiltDeg: 0,
  })

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Cursor pointer: ultra-fast tracking
  const cursorX = useSpring(mouseX, { stiffness: 1200, damping: 60, mass: 0.1 })
  const cursorY = useSpring(mouseY, { stiffness: 1200, damping: 60, mass: 0.1 })

  // Inner halo: fast follow
  const haloX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.4 })
  const haloY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.4 })

  // Outer ambient ring: slow dreamy lag
  const outerX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 1.2 })
  const outerY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 1.2 })

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('cursor-active')

    let raf = 0
    let pendingUpdate = false

    const sync = (tilt = cursorState.tiltDeg) => {
      if (pendingUpdate) return
      pendingUpdate = true
      raf = requestAnimationFrame(() => {
        pendingUpdate = false
        setCursorState({
          isHovered: isHoveredRef.current,
          isPressed: isPressedRef.current,
          isVisible: isVisibleRef.current,
          tiltDeg: tilt,
        })
      })
    }

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - prevX.current
      const dy = e.clientY - prevY.current
      velocityX.current = dx
      velocityY.current = dy
      prevX.current = e.clientX
      prevY.current = e.clientY

      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Tilt based on horizontal velocity: clamp ±28°
      const rawTilt = Math.max(-28, Math.min(28, dx * 1.8))
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
      }
      sync(rawTilt)
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

    const handleMouseDown = () => { isPressedRef.current = true; sync() }
    const handleMouseUp = () => { isPressedRef.current = false; sync() }
    const handleMouseLeave = () => { isVisibleRef.current = false; sync() }
    const handleMouseEnter = () => { isVisibleRef.current = true; sync() }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mouseover', handlePointerOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, mouseX, mouseY])

  if (!enabled || !cursorState.isVisible) return null

  const { isHovered, isPressed, tiltDeg } = cursorState

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">

      {/* ── Outer ambient ring: dreamy slow trail ── */}
      <motion.div
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 0.6 : isHovered ? 2.0 : 1.0,
          opacity: isHovered ? 0.18 : 0.08,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 h-14 w-14 rounded-full border border-coral/60 pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* ── Inner soft halo ── */}
      <motion.div
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 0.65 : isHovered ? 1.8 : 1.0,
          opacity: isHovered ? 0.4 : 0.18,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 h-7 w-7 rounded-full bg-coral blur-[8px] pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* ── Coral Arrow Cursor ── */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-3px',
          translateY: '-3px',
        }}
        animate={{
          scale: isPressed ? 0.82 : isHovered ? 1.2 : 1,
          rotate: isHovered ? 15 : tiltDeg,
        }}
        transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 pointer-events-none will-change-transform drop-shadow-[0_2px_10px_rgba(255,107,91,0.65)]"
        aria-hidden="true"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Premium curvy pointer path */}
          <path
            d="M3.8 2.2C2.9 1.4 1.5 2.1 1.5 3.3V19.7C1.5 20.8 2.9 21.4 3.7 20.6L8.4 15.9C8.7 15.6 9.2 15.4 9.6 15.4H17.8C18.9 15.4 19.5 14 18.7 13.2L3.8 2.2Z"
            fill="#FF6B5B"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
