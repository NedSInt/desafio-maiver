import { Badge } from './badge'
import { STATUS_BADGE_VARIANT } from '@/constants/statusStyles'
import type { OnboardingStatus } from '@/types/client'
import { STATUS_LABELS } from '@/utils/status'
import { cn } from '@/lib/utils'

type BadgeSize = 'sm' | 'md'

interface StatusBadgeProps {
  status: OnboardingStatus
  size?: BadgeSize
  className?: string
}

export function StatusBadge({
  status,
  size = 'sm',
  className,
}: StatusBadgeProps) {
  return (
    <Badge
      role="status"
      variant={STATUS_BADGE_VARIANT[status]}
      className={cn(
        'rounded-full font-medium',
        size === 'md' && 'px-2.5 py-1 text-sm',
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </Badge>
  )
}
