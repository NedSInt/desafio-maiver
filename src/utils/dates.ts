export function daysSince(dateIso: string): number {
  const start = new Date(dateIso)
  const today = new Date()
  start.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  const diffMs = today.getTime() - start.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

export function formatDateBr(dateIso: string): string {
  return new Date(dateIso + 'T12:00:00').toLocaleDateString('pt-BR')
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}
