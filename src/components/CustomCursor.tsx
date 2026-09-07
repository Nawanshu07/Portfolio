import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isTextHovered, setIsTextHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // 1. Inner Dot Physics: High sensitivity, ultra-fast tracking (0.12s equivalent)
  const dotSpringConfig = { stiffness: 850, damping: 45, mass: 0.2 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  // 2. Outer Ring Physics: Lower sensitivity, smooth trailing inertia (0.40s equivalent)
  // When hovered over interactive elements, stiffness & damping adapt for a magnetic feel
  const ringSpringConfig = isHovered
    ? { stiffness: 320, damping: 32, mass: 0.6 } // Sticky / magnetic sensitivity
    : { stiffness: 220, damping: 24, mass: 0.8 } // Fluid trailing inertia
  const ringX = useSpring(mouseX, ringSpringConfig)
  const ringY = useSpring(mouseY, ringSpringConfig)

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad) and reduced motion is not preferred
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (hasFinePointer && !prefersReducedMotion) {
      setEnabled(true)
      document.documentElement.classList.add('cursor-active')
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) setIsVisible(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Interactive target detection (buttons, links, inputs, cards)
      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]')
      if (interactiveEl) {
        setIsHovered(true)
        setIsTextHovered(false)
        return
      }

      // Text target detection (headings, paragraphs)
      const textEl = target.closest('h1, h2, h3, h4, p, [data-cursor="text"]')
      if (textEl && !interactiveEl) {
        setIsTextHovered(true)
        setIsHovered(false)
        return
      }

      setIsHovered(false)
      setIsTextHovered(false)
    }

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('mouseover', handlePointerOver)
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
  }, [mouseX, mouseY, isVisible, isHovered])

  if (!enabled || !isVisible) return null

  // Determine dynamic ring size and shape based on element hover & click states
  let ringScale = 1
  let ringOpacity = 0.6
  let ringBorderColor = 'rgba(237, 232, 220, 0.4)'
  let ringBg = 'transparent'

  if (isPressed) {
    ringScale = 0.85
    ringOpacity = 1
    ringBorderColor = '#d9663d'
  } else if (isHovered) {
    ringScale = 1.85 // Expands significantly on interactive elements (Sunny Patel style)
    ringOpacity = 1
    ringBorderColor = '#d9663d'
    ringBg = 'rgba(217, 102, 61, 0.08)'
  } else if (isTextHovered) {
    ringScale = 1.35
    ringOpacity = 0.8
    ringBorderColor = 'rgba(237, 232, 220, 0.65)'
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* 
        Outer Cursor Ring (38px circle)
        Lags smoothly behind with trailing inertia, expands to 1.85x on hover
      */}
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
        transition={{
          duration: 0.22,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed top-0 left-0 h-[38px] w-[38px] rounded-full border border-solid pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* 
        Inner Cursor Dot (8px circle)
        Solid Ember (#d9663d), responds with tight, ultra-fast sensitivity
      */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 1.4 : isHovered ? 1.25 : 1,
          backgroundColor: isHovered || isPressed ? '#d9663d' : '#d9663d',
        }}
        transition={{
          duration: 0.15,
          ease: 'easeOut',
        }}
        className="fixed top-0 left-0 h-2 w-2 rounded-full pointer-events-none will-change-transform shadow-[0_0_8px_rgba(217,102,61,0.6)]"
        aria-hidden="true"
      />
    </div>
  )
}
