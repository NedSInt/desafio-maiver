import { ClientCard } from '@/components/clients/ClientCard'
import { ConsultantFilter } from '@/components/clients/ConsultantFilter'
import { ClientCardSkeleton } from '@/components/dashboard/ClientCardSkeleton'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { EmptyState } from '@/components/ui'
import { useFilteredClients } from '@/hooks/useFilteredClients'
import { useFilterTransition } from '@/hooks/useFilterTransition'
import { useOnboardingStore } from '@/store/onboardingStore'
import { getDashboardStats } from '@/utils/dashboardStats'

const STAGGER_MS = 40

export function DashboardPage() {
  const clients = useOnboardingStore((s) => s.clients)
  const consultantFilter = useOnboardingStore((s) => s.consultantFilter)
  const setView = useOnboardingStore((s) => s.setView)
  const filteredClients = useFilteredClients()
  const stats = getDashboardStats(clients)
  const isFilterPending = useFilterTransition(consultantFilter)

  return (
    <>
      <SectionHeader title="Painel de acompanhamento" />

      {clients.length === 0 ? (
        <EmptyState
          title="Nenhum cliente cadastrado"
          description="Cadastre o primeiro cliente para iniciar o acompanhamento do onboarding."
          action={{
            label: 'Cadastrar cliente',
            onClick: () => setView('new-client'),
          }}
        />
      ) : (
        <div className="space-y-8">
          <div className="animate-stagger-in" style={{ animationDelay: '0ms' }}>
            <DashboardStats stats={stats} />
          </div>

          <ConsultantFilter />

          {isFilterPending ? (
            <ul
              className="grid gap-4 lg:grid-cols-2"
              aria-busy="true"
              aria-label="Atualizando lista"
            >
              {Array.from({ length: Math.min(filteredClients.length || 2, 4) }).map(
                (_, i) => (
                  <li key={i}>
                    <ClientCardSkeleton />
                  </li>
                ),
              )}
            </ul>
          ) : filteredClients.length === 0 ? (
            <EmptyState
              title="Nenhum cliente neste filtro"
              description="Não há clientes atribuídos ao consultor selecionado."
              action={{
                label: 'Cadastrar cliente',
                onClick: () => setView('new-client'),
              }}
            />
          ) : (
            <ul className="grid gap-4 lg:grid-cols-2">
              {filteredClients.map((client, index) => (
                <li
                  key={client.id}
                  className="animate-stagger-in"
                  style={{
                    animationDelay: `${(index + 2) * STAGGER_MS}ms`,
                  }}
                >
                  <ClientCard
                    client={client}
                    onOpen={() => setView('client-detail', client.id)}
                  />
                </li>
              ))}
            </ul>
          )}

          <p
            className="animate-stagger-in text-center text-xs text-muted-foreground"
            style={{ animationDelay: `${(filteredClients.length + 3) * STAGGER_MS}ms` }}
          >
            Exibindo {filteredClients.length} de {clients.length} cliente(s)
            {consultantFilter !== 'todos' ? ' · filtro ativo' : ''}
          </p>
        </div>
      )}
    </>
  )
}
