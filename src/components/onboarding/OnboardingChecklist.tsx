import { ListChecks } from 'lucide-react'
import { ChecklistStepItem } from '@/components/checklist/ChecklistStepItem'
import { Card } from '@/components/ui/Card'
import type { ChecklistStep, ChecklistStepId } from '@/types/client'
import { cn } from '@/lib/utils'

interface OnboardingChecklistProps {
  checklist: ChecklistStep[]
  completed: number
  total: number
  onToggle: (stepId: ChecklistStepId, completed: boolean) => void
  onNoteChange: (stepId: ChecklistStepId, note: string) => void
  className?: string
}

export function OnboardingChecklist({
  checklist,
  completed,
  total,
  onToggle,
  onNoteChange,
  className,
}: OnboardingChecklistProps) {
  const allDone = completed === total && total > 0

  return (
    <Card padding="md" className={cn(className)}>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <ListChecks className="size-4 text-primary" strokeWidth={2} />
          </div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Etapas de onboarding
          </h3>
        </div>
        <div
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium tabular-nums',
            allDone
              ? 'bg-success/10 text-success'
              : 'bg-muted text-muted-foreground',
          )}
        >
          {completed}/{total} concluídas
        </div>
      </div>

      <ul className="space-y-0" aria-label="Etapas de onboarding">
        {checklist.map((step, index) => (
          <ChecklistStepItem
            key={step.id}
            step={step}
            stepNumber={index + 1}
            isLast={index === checklist.length - 1}
            onToggle={onToggle}
            onNoteChange={onNoteChange}
          />
        ))}
      </ul>
    </Card>
  )
}
