import type { ReactNode } from 'react'
import clsx from 'clsx'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href: string
  variant?: 'primary' | 'ghost'
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
        'group inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
        variant === 'primary' &&
          'bg-white text-black shadow-[0_0_34px_rgba(255,255,255,0.18)] hover:bg-zinc-200',
        variant === 'ghost' &&
          'border border-white/15 bg-white/[0.04] text-white backdrop-blur-md hover:border-white/40 hover:bg-white/10',
        className,
      )}
    >
      {children}
    </a>
  )
}