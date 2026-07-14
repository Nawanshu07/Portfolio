import type { ReactNode } from 'react'
import clsx from 'clsx'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href: string
  variant?: 'primary' | 'ghost'
  target?: string
  rel?: string
  darkBg?: boolean
}

export default function MagneticButton({
  children,
  className,
  href,
  variant = 'primary',
  target,
  rel,
  darkBg = false,
}: MagneticButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={clsx(
        'group inline-flex h-12 items-center justify-center gap-2 rounded-pill px-6 text-button-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-link select-none',
        
        // Light Background Variants
        !darkBg && variant === 'primary' && 'bg-primary text-on-primary border border-primary hover:bg-canvas hover:text-ink hover:border-hairline-strong shadow-level2',
        !darkBg && variant === 'ghost' && 'bg-canvas text-ink border border-hairline hover:bg-canvas-soft-2 hover:border-hairline-strong shadow-level1',
        
        // Dark Background Variants
        darkBg && variant === 'primary' && 'bg-canvas text-ink border border-canvas hover:bg-primary hover:text-on-primary',
        darkBg && variant === 'ghost' && 'bg-transparent text-white border border-hairline-dark hover:bg-white/5',
        
        className
      )}
    >
      {children}
    </a>
  )
}