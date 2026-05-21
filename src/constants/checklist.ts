import type { ChecklistStep, ChecklistStepId } from '../types/client'

export const CHECKLIST_TEMPLATE: ReadonlyArray<{
  id: ChecklistStepId
  label: string
}> = [
  { id: 'kickoff', label: 'Reunião de kickoff realizada' },
  { id: 'plataforma', label: 'Acesso à plataforma configurado' },
  { id: 'sms', label: 'Integração de SMS ativada' },
  { id: 'fluxo_recuperacao', label: 'Primeiro fluxo de recuperação criado' },
  { id: 'treinamento', label: 'Treinamento do time do cliente concluído' },
  { id: 'go_live', label: 'Go-live aprovado' },
] as const

export function createEmptyChecklist(): ChecklistStep[] {
  return CHECKLIST_TEMPLATE.map((step) => ({
    ...step,
    completed: false,
    note: '',
  }))
}
