import { useEffect } from 'react'
import { useOnboardingStore } from '../store/onboardingStore'

export function useHydrateStore(): boolean {
  const hydrate = useOnboardingStore((s) => s.hydrate)
  const hydrated = useOnboardingStore((s) => s.hydrated)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return hydrated
}
