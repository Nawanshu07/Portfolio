export function SectionCurve({ className }: { className: string }) {
  return (
    <svg className={`section-curve ${className}`} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0H100Q50 20 0 0Z" />
    </svg>
  )
}
