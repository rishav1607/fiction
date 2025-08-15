interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: boolean
}

export function Skeleton({ 
  className = '', 
  width, 
  height, 
  rounded = true 
}: SkeletonProps) {
  return (
    <div
      className={`bg-complimentary/50 shimmer ${rounded ? 'rounded-lg' : ''} ${className}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden ring-1 ring-border bg-complimentary/20 p-4 space-y-3">
      <Skeleton height={200} className="w-full" />
      <Skeleton height={20} className="w-3/4" />
      <Skeleton height={16} className="w-1/2" />
    </div>
  )
}

export function ListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-complimentary/20">
          <Skeleton width={60} height={80} />
          <div className="flex-1 space-y-2">
            <Skeleton height={20} className="w-3/4" />
            <Skeleton height={16} className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}