import { useMemo } from 'react'
import { CONSULTANT_FILTER_ALL } from '../constants/consultants'
import { useOnboardingStore } from '../store/onboardingStore'
import type { Client } from '../types/client'

export function useFilteredClients(): Client[] {
  const clients = useOnboardingStore((s) => s.clients)
  const consultantFilter = useOnboardingStore((s) => s.consultantFilter)

  return useMemo(() => {
    const filtered =
      consultantFilter === CONSULTANT_FILTER_ALL
        ? clients
        : clients.filter((c) => c.consultant === consultantFilter)

    return [...filtered].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
  }, [clients, consultantFilter])
}
