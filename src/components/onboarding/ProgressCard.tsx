import { Calendar, Mail, Phone, User } from 'lucide-react'
import type { OnboardingStatus } from '@/types/client'
import { formatDateBr } from '@/utils/dates'
import { formatPhoneDisplay } from '@/utils/phone'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { cn } from '@/lib/utils'

interface ProgressCardProps {
  completed: number
  total: number
  status: OnboardingStatus
  contactName: string
  email: string
  phone: string
  consultant: string
  plan: string
  startDate: string
  className?: string
}

function ProgressRing({
  percent,
  label,
}: {
  percent: number
  label: string
}) {
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div
      className="relative size-[4.5rem] shrink-0"
      role="img"
      aria-label={label}
    >
      <svg className="size-full -rotate-90" viewBox="0 0 36 36" aria-hidden>
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          className="stroke-primary transition-all duration-500 ease-out"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums text-foreground">
        {percent}%
      </span>
    </div>
  )
}

export function ProgressCard({
  completed,
  total,
  status,
  contactName,
  email,
  phone,
  consultant,
  plan,
  startDate,
  className,
}: ProgressCardProps) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  const meta = [
    { icon: User, label: 'Contato', value: contactName },
    { icon: Mail, label: 'E-mail', value: email },
    { icon: Phone, label: 'Telefone', value: formatPhoneDisplay(phone) },
    { icon: Calendar, label: 'Início', value: formatDateBr(startDate) },
  ]

  return (
    <Card padding="md" className={cn('transition-shadow duration-200 hover:shadow-sm', className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex items-center gap-5">
          <ProgressRing
            percent={percent}
            label={`Progresso ${percent} por cento`}
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Progresso do onboarding
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-foreground">
              {completed}
              <span className="text-lg font-normal text-muted-foreground">
                /{total} etapas
              </span>
            </p>
            <div className="mt-2">
              <StatusBadge status={status} size="md" />
            </div>
          </div>
        </div>

        <div className="hidden h-16 w-px bg-border lg:block" />

        <div className="min-w-0 flex-1">
          <ProgressBar
            completed={completed}
            total={total}
            status={status}
            showLabel={false}
            size="md"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {plan} · Consultor {consultant}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
        {meta.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex gap-2.5 min-w-0">
            <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-0.5 truncate text-sm font-medium text-foreground">
                {value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </Card>
  )
}
