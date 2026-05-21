export type Plan = 'Básico' | 'Pro' | 'Enterprise'

export type OnboardingStatus = 'em_andamento' | 'concluido' | 'atrasado'

export type ChecklistStepId =
  | 'kickoff'
  | 'plataforma'
  | 'sms'
  | 'fluxo_recuperacao'
  | 'treinamento'
  | 'go_live'

export interface ChecklistStep {
  id: ChecklistStepId
  label: string
  completed: boolean
  note: string
}

export interface Client {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  plan: Plan
  startDate: string
  consultant: string
  checklist: ChecklistStep[]
  createdAt: string
  updatedAt: string
}

export interface ClientFormData {
  companyName: string
  contactName: string
  email: string
  phone: string
  plan: Plan
  startDate: string
  consultant: string
}
