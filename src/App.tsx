import { AppShell } from '@/components/layout/AppShell'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageTransition } from '@/components/layout/PageTransition'
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton'
import { Toast } from '@/components/ui/Toast'
import { useHydrateStore } from '@/hooks/useHydrateStore'
import { ClientDetailPage } from '@/pages/ClientDetailPage'
import { ClientFormPage } from '@/pages/ClientFormPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { useOnboardingStore } from '@/store/onboardingStore'

function App() {
  const hydrated = useHydrateStore()
  const currentView = useOnboardingStore((s) => s.currentView)
  const clientsCount = useOnboardingStore((s) => s.clients.length)
  const setView = useOnboardingStore((s) => s.setView)

  const selectedClientId = useOnboardingStore((s) => s.selectedClientId)
  const pageKey =
    currentView === 'client-detail'
      ? `detail-${selectedClientId ?? ''}`
      : currentView

  const page = !hydrated ? (
    <DashboardSkeleton />
  ) : currentView === 'new-client' ? (
    <ClientFormPage />
  ) : currentView === 'client-detail' ? (
    <ClientDetailPage />
  ) : (
    <DashboardPage />
  )

  return (
    <>
      <AppShell
        currentView={currentView}
        clientsCount={hydrated ? clientsCount : 0}
        onNavigateDashboard={() => setView('dashboard')}
        onNavigateNewClient={() => setView('new-client')}
      >
        <PageContainer>
          <PageTransition pageKey={hydrated ? pageKey : 'loading'}>
            {page}
          </PageTransition>
        </PageContainer>
      </AppShell>
      <Toast />
    </>
  )
}

export default App
