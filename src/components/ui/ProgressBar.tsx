import { STATUS_PROGRESS_CLASS } from '@/constants/statusStyles'
import type { OnboardingStatus } from '@/types/client'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  completed: number
  total: number
  status?: OnboardingStatus
  showLabel?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function ProgressBar({
  completed,
  total,
  status = 'em_andamento',
  showLabel = true,
  size = 'md',
  className,
}: ProgressBarProps) {
  const safeTotal = Math.max(total, 1)
  const safeCompleted = Math.min(Math.max(completed, 0), safeTotal)
  const percent = Math.round((safeCompleted / safeTotal) * 100)

  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            {safeCompleted}/{safeTotal} etapas
          </span>
          <span className="font-medium tabular-nums text-foreground">
            {percent}%
          </span>
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-muted',
          size === 'sm' ? 'h-1.5' : 'h-2',
        )}
        role="progressbar"
        aria-valuenow={safeCompleted}
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-label={`Progresso: ${safeCompleted} de ${safeTotal} etapas`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            STATUS_PROGRESS_CLASS[status],
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
