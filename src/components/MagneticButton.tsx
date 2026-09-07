import type { ReactNode } from 'react'
import clsx from 'clsx'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href: string
  variant?: 'primary' | 'outline' | 'ghost'
  target?: string
  rel?: string
}

export default function MagneticButton({
  children,
  className,
  href,
  variant = 'primary',
  target,
  rel,
}: MagneticButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={clsx(
        // Base Pill Geometry (DESIGN.md - rounded.pill, 40px height, 15px font)
        'group inline-flex h-10 items-center justify-center gap-2 rounded-pill px-5 text-[15px] font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary select-none whitespace-nowrap',
        
        // Primary Ink Pill ({component.button-primary})
        variant === 'primary' &&
          'bg-primary text-on-primary hover:bg-primary-active shadow-sm hover:shadow-soft-drop active:scale-[0.98]',
        
        // Secondary Outline Pill ({component.button-outline})
        variant === 'outline' &&
          'bg-transparent text-ink border border-hairline-strong hover:border-ink hover:bg-canvas-soft active:scale-[0.98]',

        // Ghost / Transparent Link
        variant === 'ghost' &&
          'bg-transparent text-body hover:text-ink hover:bg-canvas-soft border border-transparent hover:border-hairline',

        className
      )}
    >
      {children}
    </a>
  )
}