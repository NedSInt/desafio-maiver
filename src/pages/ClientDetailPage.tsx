import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { OnboardingChecklist } from '@/components/onboarding/OnboardingChecklist'
import { ProgressCard } from '@/components/onboarding/ProgressCard'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Button } from '@/components/ui'
import { useOnboardingStore } from '@/store/onboardingStore'
import { formatDateBr } from '@/utils/dates'
import { getCompletedCount } from '@/utils/progress'
import { getOnboardingStatus } from '@/utils/status'

export function ClientDetailPage() {
  const client = useOnboardingStore((s) =>
    s.selectedClientId
      ? s.clients.find((c) => c.id === s.selectedClientId)
      : undefined,
  )
  const updateChecklistStep = useOnboardingStore((s) => s.updateChecklistStep)
  const setView = useOnboardingStore((s) => s.setView)

  useEffect(() => {
    if (!client) setView('dashboard')
  }, [client, setView])

  if (!client) return null

  const completed = getCompletedCount(client.checklist)
  const total = client.checklist.length
  const status = getOnboardingStatus(client.startDate, client.checklist)

  return (
    <div className="space-y-8">
      <SectionHeader
        title={client.companyName}
        description={`${client.contactName} · ${client.plan} · início ${formatDateBr(client.startDate)}`}
        action={
          <Button variant="secondary" onClick={() => setView('dashboard')}>
            <ArrowLeft className="size-4" />
            Voltar ao painel
          </Button>
        }
      />

      <ProgressCard
        completed={completed}
        total={total}
        status={status}
        contactName={client.contactName}
        email={client.email}
        phone={client.phone}
        consultant={client.consultant}
        plan={client.plan}
        startDate={client.startDate}
      />

      <OnboardingChecklist
        checklist={client.checklist}
        completed={completed}
        total={total}
        onToggle={(stepId, done) =>
          updateChecklistStep(client.id, stepId, { completed: done })
        }
        onNoteChange={(stepId, note) =>
          updateChecklistStep(client.id, stepId, { note })
        }
      />
    </div>
  )
}
