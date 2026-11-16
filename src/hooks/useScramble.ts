import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * useScramble — decodes text from random chars into the real string.
 * Optimized for zero CLS (Cumulative Layout Shift) and respect for reduced motion.
 */
export function useScramble(
  text: string,
  trigger: boolean,
  speed = 28,
  stagger = 32
) {
  // Start with final text to prevent layout shifts & improve initial paint
  const [display, setDisplay] = useState(text)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplay(text)
      return
    }

    if (!trigger || startedRef.current) return
    startedRef.current = true

    const chars = text.split('')
    const resolved = new Array(chars.length).fill(false)
    let frame = 0

    function rand() {
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    }

    function tick() {
      chars.forEach((_, i) => {
        if (!resolved[i] && frame >= Math.floor((i * stagger) / speed)) {
          resolved[i] = true
        }
      })

      const scrambled = chars.map((ch, i) => {
        if (ch === ' ' || ch === '.' || ch === ',' || ch === '/' || ch === '&') return ch
        if (resolved[i]) return ch
        return rand()
      })

      setDisplay(scrambled.join(''))
      frame++

      if (!resolved.every(Boolean)) {
        timerRef.current = setTimeout(tick, speed)
      } else {
        setDisplay(text)
      }
    }

    // Small delay before scramble begins
    timerRef.current = setTimeout(tick, 50)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [trigger, text, speed, stagger])

  return display
}
