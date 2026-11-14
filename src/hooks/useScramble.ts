import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

/**
 * useScramble — decodes text from random chars into the real string.
 * @param text   Final resolved text
 * @param trigger  When true, starts the animation
 * @param speed  ms between frames (default 28ms ≈ 36fps)
 * @param stagger  Extra delay (ms) per character to stagger reveals
 */
export function useScramble(
  text: string,
  trigger: boolean,
  speed = 28,
  stagger = 38
) {
  const [display, setDisplay] = useState(() => text.replace(/\S/g, () => rand()))
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startedRef = useRef(false)

  function rand() {
    return CHARS[Math.floor(Math.random() * CHARS.length)]
  }

  useEffect(() => {
    if (!trigger || startedRef.current) return
    startedRef.current = true

    const chars = text.split('')
    const resolved = new Array(chars.length).fill(false)
    let frame = 0

    function tick() {
      // Resolve characters one by one with stagger
      chars.forEach((_, i) => {
        if (!resolved[i] && frame >= Math.floor(i * stagger / speed)) {
          resolved[i] = true
        }
      })

      const scrambled = chars.map((ch, i) => {
        if (ch === ' ') return ' '
        if (resolved[i]) return ch
        return rand()
      })

      setDisplay(scrambled.join(''))

      frame++

      if (!resolved.every(Boolean)) {
        frameRef.current = setTimeout(tick, speed)
      } else {
        setDisplay(text)
      }
    }

    frameRef.current = setTimeout(tick, 100) // slight delay before start

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current)
    }
  }, [trigger, text, speed, stagger])

  return display
}

