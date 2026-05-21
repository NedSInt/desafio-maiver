import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FormSectionProps {
  id: string
  title: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
}

export function FormSection({
  id,
  title,
  icon: Icon,
  children,
  className,
}: FormSectionProps) {
  const titleId = `${id}-title`

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('space-y-5', className)}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted"
            aria-hidden
          >
            <Icon className="size-4 text-muted-foreground" strokeWidth={2} />
          </div>
        )}
        <h3 id={titleId} className="text-sm font-semibold text-foreground">
          {title}
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  )
}
