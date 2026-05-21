import { ONBOARDING_DELAY_DAYS } from '../constants/onboarding'
import type { ChecklistStep, OnboardingStatus } from '../types/client'
import { daysSince } from './dates'
import { isOnboardingComplete } from './progress'

export function getOnboardingStatus(
  startDate: string,
  checklist: ChecklistStep[],
): OnboardingStatus {
  if (isOnboardingComplete(checklist)) return 'concluido'
  if (daysSince(startDate) > ONBOARDING_DELAY_DAYS) return 'atrasado'
  return 'em_andamento'
}

export const STATUS_LABELS: Record<OnboardingStatus, string> = {
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
  atrasado: 'Atrasado',
}
