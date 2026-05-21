export type Theme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'maiver-theme'

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
}

export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage indisponível */
  }
  return 'dark'
}

export function initTheme() {
  applyTheme(getStoredTheme())
}
