import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

type MetricVariant = 'default' | 'info' | 'success' | 'warning'

interface MetricCardProps {
  label: string
  value: number
  icon: LucideIcon
  variant?: MetricVariant
}

const variantStyles: Record<
  MetricVariant,
  { icon: string; value: string; bg: string }
> = {
  default: {
    icon: 'text-muted-foreground',
    value: 'text-foreground',
    bg: 'bg-muted/50',
  },
  info: {
    icon: 'text-info',
    value: 'text-info',
    bg: 'bg-info/5',
  },
  success: {
    icon: 'text-success',
    value: 'text-success',
    bg: 'bg-success/5',
  },
  warning: {
    icon: 'text-warning',
    value: 'text-warning',
    bg: 'bg-warning/5',
  },
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  variant = 'default',
}: MetricCardProps) {
  const styles = variantStyles[variant]

  return (
    <Card
      padding="sm"
      className={cn(
        'interactive-card',
        styles.bg,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p
            className={cn(
              'mt-1 text-2xl font-semibold tabular-nums tracking-tight',
              styles.value,
            )}
          >
            {value}
          </p>
        </div>
        <div
          className={cn(
            'flex size-9 items-center justify-center rounded-lg bg-background/80 ring-1 ring-border',
            styles.icon,
          )}
        >
          <Icon className="size-4" strokeWidth={2} />
        </div>
      </div>
    </Card>
  )
}
