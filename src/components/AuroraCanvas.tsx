import { useEffect, useRef } from 'react'

/**
 * AuroraCanvas — a full-bleed canvas that renders smooth organic coral/navy
 * plasma blobs using layered sine-wave metaball-style gradients.
 * Zero external deps — pure canvas requestAnimationFrame.
 * GPU-friendly: uses only radial gradients, no pixel-level ops.
 */
export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0, h = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    // ── Blob definitions ──────────────────────────────────────────────
    // Each blob has: speed, phase offsets, size multiplier, color stops
    const blobs = [
      {
        // Large coral bloom — slightly right of center
        ax: 0.55, ay: 0.42,
        rx: 0.30, ry: 0.28,
        speedX: 0.00031, speedY: 0.00024,
        phaseX: 0, phaseY: 1.1,
        radius: 0.52,
        colorA: 'rgba(255,107,91,0.28)',
        colorB: 'rgba(255,107,91,0.00)',
      },
      {
        // Medium coral — upper left
        ax: 0.22, ay: 0.30,
        rx: 0.16, ry: 0.14,
        speedX: 0.00044, speedY: 0.00038,
        phaseX: 2.1, phaseY: 0.7,
        radius: 0.32,
        colorA: 'rgba(255,107,91,0.14)',
        colorB: 'rgba(255,107,91,0.00)',
      },
      {
        // Deep navy-indigo orb — lower right
        ax: 0.78, ay: 0.68,
        rx: 0.22, ry: 0.18,
        speedX: 0.00028, speedY: 0.00035,
        phaseX: 4.5, phaseY: 3.2,
        radius: 0.42,
        colorA: 'rgba(97,120,210,0.18)',
        colorB: 'rgba(97,120,210,0.00)',
      },
      {
        // Faint coral whisper — far left
        ax: 0.08, ay: 0.60,
        rx: 0.14, ry: 0.20,
        speedX: 0.00050, speedY: 0.00022,
        phaseX: 1.4, phaseY: 2.8,
        radius: 0.28,
        colorA: 'rgba(255,107,91,0.10)',
        colorB: 'rgba(255,107,91,0.00)',
      },
      {
        // Large ambient navy bloom — center
        ax: 0.50, ay: 0.50,
        rx: 0.12, ry: 0.10,
        speedX: 0.00018, speedY: 0.00020,
        phaseX: 3.3, phaseY: 5.1,
        radius: 0.72,
        colorA: 'rgba(28,45,82,0.70)',
        colorB: 'rgba(28,45,82,0.00)',
      },
    ]

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const blob of blobs) {
        const cx = (blob.ax + Math.sin(t * blob.speedX * 1000 + blob.phaseX) * blob.rx) * w
        const cy = (blob.ay + Math.cos(t * blob.speedY * 1000 + blob.phaseY) * blob.ry) * h
        const r  = blob.radius * Math.min(w, h)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0, blob.colorA)
        grad.addColorStop(1, blob.colorB)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      t++
      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

