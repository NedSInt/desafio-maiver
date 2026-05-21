import { MessageSquarePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ChecklistStep, ChecklistStepId } from '@/types/client'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface ChecklistStepItemProps {
  step: ChecklistStep
  stepNumber: number
  isLast: boolean
  onToggle: (stepId: ChecklistStepId, completed: boolean) => void
  onNoteChange: (stepId: ChecklistStepId, note: string) => void
}

export function ChecklistStepItem({
  step,
  stepNumber,
  isLast,
  onToggle,
  onNoteChange,
}: ChecklistStepItemProps) {
  const [localNote, setLocalNote] = useState(step.note)
  const [noteOpen, setNoteOpen] = useState(Boolean(step.note))

  useEffect(() => {
    setLocalNote(step.note)
    if (step.note) setNoteOpen(true)
  }, [step.id, step.note])

  const handleNoteBlur = () => {
    if (localNote !== step.note) {
      onNoteChange(step.id, localNote)
    }
  }

  return (
    <li className="relative flex gap-5">
      {!isLast && (
        <span
          className="absolute left-[1.125rem] top-10 bottom-0 w-px bg-border"
          aria-hidden
        />
      )}

      <div
        className={cn(
          'relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums transition-colors',
          step.completed
            ? 'border-success/30 bg-success/10 text-success'
            : 'border-border bg-muted text-muted-foreground',
        )}
      >
        {step.completed ? (
          <span className="text-[10px]">✓</span>
        ) : (
          stepNumber
        )}
      </div>

      <div
        className={cn(
          'interactive-card mb-3 min-w-0 flex-1 rounded-xl border p-4',
          step.completed
            ? 'border-success/25 bg-success/[0.03]'
            : 'bg-card',
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id={`step-${step.id}`}
              checked={step.completed}
              onCheckedChange={(checked) =>
                onToggle(step.id, checked === true)
              }
              className="mt-0.5 shrink-0"
            />
            <Label
              htmlFor={`step-${step.id}`}
              className={cn(
                'min-w-0 flex-1 cursor-pointer text-sm font-medium leading-snug',
                step.completed
                  ? 'text-muted-foreground line-through'
                  : 'text-foreground',
              )}
            >
              {step.label}
            </Label>
          </div>

          {!noteOpen ? (
            <div className="flex items-center gap-3">
              <span className="size-4 shrink-0" aria-hidden />
              <button
                type="button"
                onClick={() => setNoteOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <MessageSquarePlus className="size-3.5 shrink-0" />
                Adicionar nota
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <span className="size-4 shrink-0" aria-hidden />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Label
                  htmlFor={`note-${step.id}`}
                  className="text-xs text-muted-foreground"
                >
                  Nota (opcional)
                </Label>
                <Textarea
                  id={`note-${step.id}`}
                  placeholder="Observações sobre esta etapa..."
                  value={localNote}
                  onChange={(e) => setLocalNote(e.target.value)}
                  onBlur={handleNoteBlur}
                  rows={2}
                  className="min-h-[72px] resize-y text-sm"
                />
                <p className="text-[11px] text-muted-foreground">
                  Salva ao sair do campo
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
