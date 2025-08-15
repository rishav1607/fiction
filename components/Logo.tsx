type Props = { size?: number; className?: string }

export function Logo({ size = 24, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Fiction Realm">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4" ry="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 6h9v2h-7v3h6v2h-6v5H8z" fill="currentColor" />
    </svg>
  )
}


