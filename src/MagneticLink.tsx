import type { PointerEvent, ReactNode } from 'react'

type BaseProps = {
  variant: 'scroll' | 'mail-button' | 'about-button' | 'contact-method' | 'touch-button' | 'submit-button' | 'floating-btn'
  label?: string
  className?: string
  children: ReactNode
}

type AnchorProps = BaseProps & {
  as?: 'a'
  href: string
  target?: HTMLAnchorElement['target']
  type?: never
  onClick?: () => void
}

type ButtonProps = BaseProps & {
  as: 'button'
  href?: never
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

export type MagneticProps = AnchorProps | ButtonProps

const canTrack = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

function followPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch' || !window.matchMedia(canTrack).matches) return
  const el = event.currentTarget
  const bounds = el.getBoundingClientRect()
  const pull = (offset: number, size: number) => {
    // Slightly reduced magnetic pull as requested
    const limit = Math.min(18, size * 0.16)
    return Math.max(-limit, Math.min(limit, offset * 0.25))
  }
  el.style.setProperty('--pull-x', `${pull(event.clientX - bounds.left - bounds.width / 2, bounds.width)}px`)
  el.style.setProperty('--pull-y', `${pull(event.clientY - bounds.top - bounds.height / 2, bounds.height)}px`)
}

function releasePointer(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty('--pull-x')
  event.currentTarget.style.removeProperty('--pull-y')
}

export function MagneticLink(props: MagneticProps) {
  const { variant, label, className = '', children, onClick } = props
  const fullClassName = `magnetic-link ${variant} ${className}`.trim()

  const innerContent = (
    <span className="button-face">
      <span className="button-skin"><span className="button-content">{children}</span></span>
      <span className="button-skin button-fill" aria-hidden="true"><span className="button-content">{children}</span></span>
    </span>
  )

  if (props.as === 'button') {
    return (
      <button
        type={props.type ?? 'button'}
        disabled={props.disabled}
        className={fullClassName}
        aria-label={label}
        onClick={onClick}
        onPointerMove={followPointer}
        onPointerLeave={releasePointer}
        onPointerCancel={releasePointer}
      >
        {innerContent}
      </button>
    )
  }

  return (
    <a
      href={props.href}
      target={props.target}
      rel={props.target === '_blank' ? 'noreferrer' : undefined}
      className={fullClassName}
      aria-label={label}
      onClick={onClick}
      onPointerMove={followPointer}
      onPointerLeave={releasePointer}
      onPointerCancel={releasePointer}
    >
      {innerContent}
    </a>
  )
}
