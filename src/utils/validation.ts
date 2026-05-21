import type { ClientFormData } from '../types/client'
import { isValidBrazilianPhone } from './phone'

export type ClientFormErrors = Partial<Record<keyof ClientFormData, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateClientForm(data: ClientFormData): ClientFormErrors {
  const errors: ClientFormErrors = {}

  if (!data.companyName.trim()) {
    errors.companyName = 'Informe o nome da empresa'
  }

  if (!data.contactName.trim()) {
    errors.contactName = 'Informe o responsável de contato'
  }

  if (!data.email.trim()) {
    errors.email = 'Informe o e-mail'
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'E-mail inválido'
  }

  if (!data.phone.trim()) {
    errors.phone = 'Informe o telefone'
  } else if (!isValidBrazilianPhone(data.phone)) {
    errors.phone = 'Telefone incompleto. Use DDD + número (10 ou 11 dígitos)'
  }

  if (!data.startDate) {
    errors.startDate = 'Informe a data de início'
  }

  if (!data.consultant.trim()) {
    errors.consultant = 'Selecione o consultor responsável'
  }

  return errors
}

export function hasFormErrors(errors: ClientFormErrors): boolean {
  return Object.keys(errors).length > 0
}
