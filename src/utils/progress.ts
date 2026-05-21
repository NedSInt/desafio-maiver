import type { ChecklistStep } from '../types/client'

export function getCompletedCount(checklist: ChecklistStep[]): number {
  return checklist.filter((step) => step.completed).length
}

export function getProgressPercent(checklist: ChecklistStep[]): number {
  if (checklist.length === 0) return 0
  return Math.round((getCompletedCount(checklist) / checklist.length) * 100)
}

export function isOnboardingComplete(checklist: ChecklistStep[]): boolean {
  return checklist.length > 0 && checklist.every((step) => step.completed)
}
