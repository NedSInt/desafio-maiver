const PHONE_DIGITS_MAX = 11

/** Remove tudo exceto dígitos (máx. 11 — DDD + número BR) */
export function extractPhoneDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, PHONE_DIGITS_MAX)
}

/**
 * Formata telefone brasileiro enquanto digita:
 * - 10 dígitos: (11) 9999-9999
 * - 11 dígitos: (11) 99999-9999
 */
export function formatPhoneMask(value: string): string {
  const digits = extractPhoneDigits(value)
  if (digits.length === 0) return ''

  if (digits.length <= 2) {
    return `(${digits}`
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

/** Exibe telefone armazenado sempre no formato padrão */
export function formatPhoneDisplay(value: string): string {
  const digits = extractPhoneDigits(value)
  if (digits.length === 0) return value
  return formatPhoneMask(digits)
}

export function isValidBrazilianPhone(value: string): boolean {
  const digits = extractPhoneDigits(value)
  return digits.length === 10 || digits.length === 11
}
