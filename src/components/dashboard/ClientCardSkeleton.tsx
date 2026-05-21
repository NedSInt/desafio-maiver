import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/skeleton'

export function ClientCardSkeleton() {
  return (
    <Card padding="sm" className="pointer-events-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 max-w-[200px]" />
          <Skeleton className="h-3 w-1/2 max-w-[140px]" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-1.5 w-full rounded-full" />
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </Card>
  )
}
