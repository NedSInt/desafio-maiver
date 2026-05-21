import { ArrowLeft } from 'lucide-react'
import { ClientForm } from '@/components/clients/ClientForm'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Button } from '@/components/ui'
import { useOnboardingStore } from '@/store/onboardingStore'
import type { ClientFormData } from '@/types/client'

export function ClientFormPage() {
  const addClient = useOnboardingStore((s) => s.addClient)
  const setView = useOnboardingStore((s) => s.setView)

  const handleSubmit = (data: ClientFormData) => {
    const clientId = addClient(data)
    setView('client-detail', clientId)
  }

  return (
    <>
      <SectionHeader
        title="Cadastro de cliente"
        action={
          <Button variant="ghost" onClick={() => setView('dashboard')}>
            <ArrowLeft className="size-4" />
            Voltar
          </Button>
        }
      />
      <ClientForm
        onSubmit={handleSubmit}
        onCancel={() => setView('dashboard')}
      />
    </>
  )
}
