import { ChevronRight } from 'lucide-react'
import { ONBOARDING_DELAY_DAYS } from '@/constants/onboarding'
import type { Client } from '@/types/client'
import { daysSince, formatDateBr } from '@/utils/dates'
import { getCompletedCount } from '@/utils/progress'
import { getOnboardingStatus, STATUS_LABELS } from '@/utils/status'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { StatusBadge } from '@/components/ui/StatusBadge'

interface ClientCardProps {
  client: Client
  onOpen: () => void
}

export function ClientCard({ client, onOpen }: ClientCardProps) {
  const completed = getCompletedCount(client.checklist)
  const total = client.checklist.length
  const status = getOnboardingStatus(client.startDate, client.checklist)
  const days = daysSince(client.startDate)
  const daysOverdue =
    status === 'atrasado' ? days - ONBOARDING_DELAY_DAYS : 0

  const ariaLabel = `${client.companyName}, ${completed} de ${total} etapas, ${STATUS_LABELS[status]}`

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={ariaLabel}
      className="group w-full rounded-xl text-left focus-visible:outline-none"
    >
      <Card
        padding="sm"
        className={cn(
          'interactive-card',
          status === 'atrasado' && 'border-warning/40 bg-warning/[0.02]',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-foreground">
                {client.companyName}
              </h3>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {client.contactName} · {client.consultant}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>

        {status === 'atrasado' && (
          <p className="mt-2 text-xs font-medium text-warning">
            {daysOverdue > 0
              ? `${daysOverdue} dia(s) além do prazo`
              : `Iniciado há ${days} dias`}
          </p>
        )}

        <div className="mt-4">
          <ProgressBar
            completed={completed}
            total={total}
            status={status}
            size="sm"
          />
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-xs">
          <div>
            <dt className="text-muted-foreground">Plano</dt>
            <dd className="mt-0.5 font-medium text-foreground">{client.plan}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Início</dt>
            <dd className="mt-0.5 font-medium text-foreground">
              {formatDateBr(client.startDate)}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-muted-foreground">E-mail</dt>
            <dd className="mt-0.5 truncate font-medium text-foreground">
              {client.email}
            </dd>
          </div>
        </dl>
      </Card>
    </button>
  )
}
