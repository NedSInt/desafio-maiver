import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import type { DashboardStats as Stats } from '@/utils/dashboardStats'
import { STATUS_LABELS } from '@/utils/status'
import { MetricCard } from './MetricCard'

interface DashboardStatsProps {
  stats: Stats
}

const metrics = [
  {
    key: 'em_andamento' as const,
    label: STATUS_LABELS.em_andamento,
    icon: Clock,
    variant: 'info' as const,
  },
  {
    key: 'concluido' as const,
    label: STATUS_LABELS.concluido,
    icon: CheckCircle2,
    variant: 'success' as const,
  },
  {
    key: 'atrasado' as const,
    label: STATUS_LABELS.atrasado,
    icon: AlertTriangle,
    variant: 'warning' as const,
  },
]

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {metrics.map(({ key, label, icon, variant }) => (
        <MetricCard
          key={key}
          label={label}
          value={stats[key]}
          icon={icon}
          variant={variant}
        />
      ))}
    </div>
  )
}
