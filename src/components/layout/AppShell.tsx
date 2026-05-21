import { LayoutDashboard, Plus, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { MaiverLogo } from '@/components/brand/MaiverLogo'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import type { AppView } from '@/types/app'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: ReactNode
  currentView: AppView
  clientsCount: number
  onNavigateDashboard: () => void
  onNavigateNewClient: () => void
}

const navItems = [
  {
    view: 'dashboard' as const,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    view: 'new-client' as const,
    label: 'Novo cliente',
    icon: Plus,
  },
]

export function AppShell({
  children,
  currentView,
  clientsCount,
  onNavigateDashboard,
  onNavigateNewClient,
}: AppShellProps) {
  const navigate = (view: AppView) => {
    if (view === 'dashboard') onNavigateDashboard()
    if (view === 'new-client') onNavigateNewClient()
  }

  const isDetail = currentView === 'client-detail'
  const clientsLabel =
    clientsCount === 1
      ? '1 cliente ativo'
      : `${clientsCount} clientes ativos`

  return (
    <div className="flex min-h-screen bg-shell/80">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Ir para o conteúdo principal
      </a>

      <aside
        className="hidden w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex"
        aria-label="Navegação principal"
      >
        <div className="flex h-14 flex-col justify-center gap-0.5 border-b border-sidebar-border px-4">
          <MaiverLogo className="h-5" />
          <p className="text-[11px] text-muted-foreground dark:text-sidebar-foreground/60">
            Onboarding
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Menu">
          {navItems.map(({ view, label, icon: Icon }) => {
            const active =
              currentView === view || (isDetail && view === 'dashboard')
            return (
              <button
                key={view}
                type="button"
                onClick={() => navigate(view)}
                className={cn(
                  'nav-item nav-item-sidebar flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium',
                  active && 'nav-item-sidebar-active',
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                {label}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-sidebar-border p-3">
          <div
            className="mb-2 flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2 text-xs text-muted-foreground dark:bg-sidebar-accent dark:text-sidebar-foreground/70"
            aria-live="polite"
          >
            <Users className="size-3.5 shrink-0" aria-hidden />
            <span>{clientsLabel}</span>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between gap-4 border-b border-border bg-background px-4 md:hidden">
          <button
            type="button"
            onClick={onNavigateDashboard}
            className="nav-item rounded-md text-left"
          >
            <MaiverLogo className="h-5" />
          </button>
          <div className="flex items-center gap-2" aria-label="Ações mobile">
            <ThemeToggle variant="icon" />
            {currentView === 'new-client' ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={onNavigateDashboard}
              >
                Voltar
              </Button>
            ) : (
              <Button size="sm" onClick={onNavigateNewClient}>
                Novo cliente
              </Button>
            )}
          </div>
        </header>

        <main
          id="main-content"
          className="flex-1 overflow-auto"
          tabIndex={-1}
        >
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>

        <footer className="border-t border-border bg-background">
          <p className="px-4 py-3 text-center text-xs text-muted-foreground sm:px-6">
            Dados persistidos localmente neste navegador
          </p>
        </footer>
      </div>
    </div>
  )
}
