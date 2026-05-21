import type { OnboardingStatus } from '../types/client'

export type StatusBadgeVariant = 'info' | 'success' | 'warning'

export const STATUS_BADGE_VARIANT: Record<OnboardingStatus, StatusBadgeVariant> = {
  em_andamento: 'info',
  concluido: 'success',
  atrasado: 'warning',
}

export const STATUS_PROGRESS_CLASS: Record<OnboardingStatus, string> = {
  em_andamento: 'bg-primary',
  concluido: 'bg-success',
  atrasado: 'bg-warning',
}
