export type AppView = 'dashboard' | 'new-client' | 'client-detail'

export interface AppState {
  currentView: AppView
  selectedClientId: string | null
  consultantFilter: string
}
