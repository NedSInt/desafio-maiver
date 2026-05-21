import { create } from 'zustand'
import { CONSULTANT_FILTER_ALL } from '../constants/consultants'
import { createEmptyChecklist } from '../constants/checklist'
import { loadClients, saveClients } from '../services/storage'
import type { AppView } from '../types/app'
import type { ChecklistStepId, Client, ClientFormData } from '../types/client'
import { generateId } from '../utils/id'
import { useToastStore } from './toastStore'

interface OnboardingStore {
  clients: Client[]
  currentView: AppView
  selectedClientId: string | null
  consultantFilter: string
  hydrated: boolean

  hydrate: () => void
  setView: (view: AppView, clientId?: string | null) => void
  setConsultantFilter: (consultant: string) => void
  addClient: (data: ClientFormData) => string
  updateClient: (id: string, updater: (client: Client) => Client) => void
  updateChecklistStep: (
    clientId: string,
    stepId: ChecklistStepId,
    patch: Partial<Pick<Client['checklist'][number], 'completed' | 'note'>>,
  ) => void
  getClientById: (id: string) => Client | undefined
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  clients: [],
  currentView: 'dashboard',
  selectedClientId: null,
  consultantFilter: CONSULTANT_FILTER_ALL,
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return
    set({ clients: loadClients(), hydrated: true })
  },

  setView: (view, clientId = null) => {
    set({ currentView: view, selectedClientId: clientId })
  },

  setConsultantFilter: (consultant) => {
    set({ consultantFilter: consultant })
  },

  addClient: (data) => {
    const now = new Date().toISOString()
    const client: Client = {
      id: generateId(),
      ...data,
      checklist: createEmptyChecklist(),
      createdAt: now,
      updatedAt: now,
    }
    const clients = [...get().clients, client]
    saveClients(clients)
    set({ clients })
    useToastStore.getState().showToast('Cliente cadastrado com sucesso')
    return client.id
  },

  getClientById: (id) => get().clients.find((c) => c.id === id),

  updateChecklistStep: (clientId, stepId, patch) => {
    get().updateClient(clientId, (client) => ({
      ...client,
      checklist: client.checklist.map((step) =>
        step.id === stepId ? { ...step, ...patch } : step,
      ),
    }))
    if (patch.completed !== undefined) {
      useToastStore.getState().showToast(
        patch.completed ? 'Etapa concluída' : 'Etapa reaberta',
      )
    }
  },

  updateClient: (id, updater) => {
    const clients = get().clients.map((client) => {
      if (client.id !== id) return client
      const updated = updater(client)
      return { ...updated, updatedAt: new Date().toISOString() }
    })
    saveClients(clients)
    set({ clients })
  },
}))
