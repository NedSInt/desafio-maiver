import { CheckCircle2 } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'
import { cn } from '@/lib/utils'
import { Button } from './Button'

export function Toast() {
  const message = useToastStore((s) => s.message)
  const clearToast = useToastStore((s) => s.clearToast)

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        'fixed bottom-4 right-4 z-50 flex max-w-sm items-center gap-3',
        'rounded-lg border border-border bg-card px-4 py-3 shadow-lg transition-opacity',
      )}
    >
      <CheckCircle2
        className="size-5 shrink-0 text-success"
        strokeWidth={2}
        aria-hidden
      />
      <p className="flex-1 text-sm font-medium text-foreground">{message}</p>
      <Button
        variant="ghost"
        size="sm"
        className="size-7 px-0 text-muted-foreground"
        onClick={clearToast}
        aria-label="Fechar notificação"
      >
        ×
      </Button>
    </div>
  )
}
