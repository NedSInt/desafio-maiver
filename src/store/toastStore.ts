import { create } from 'zustand'

const TOAST_DURATION_MS = 3200

interface ToastStore {
  message: string | null
  showToast: (message: string) => void
  clearToast: () => void
}

let hideTimer: ReturnType<typeof setTimeout> | null = null

export const useToastStore = create<ToastStore>((set) => ({
  message: null,

  showToast: (message) => {
    if (hideTimer) clearTimeout(hideTimer)
    set({ message })
    hideTimer = setTimeout(() => {
      set({ message: null })
      hideTimer = null
    }, TOAST_DURATION_MS)
  },

  clearToast: () => {
    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = null
    set({ message: null })
  },
}))
