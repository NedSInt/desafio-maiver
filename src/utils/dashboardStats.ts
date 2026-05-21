import type { Client, OnboardingStatus } from '../types/client'
import { getOnboardingStatus } from './status'

export interface DashboardStats {
  total: number
  em_andamento: number
  concluido: number
  atrasado: number
}

const emptyStats = (): DashboardStats => ({
  total: 0,
  em_andamento: 0,
  concluido: 0,
  atrasado: 0,
})

export function getDashboardStats(clients: Client[]): DashboardStats {
  if (clients.length === 0) return emptyStats()

  const stats = emptyStats()
  stats.total = clients.length

  for (const client of clients) {
    const status = getOnboardingStatus(client.startDate, client.checklist)
    stats[status as OnboardingStatus]++
  }

  return stats
}
