import { Building2, Calendar, ClipboardList, UserRound } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { CONSULTANTS } from '@/constants/consultants'
import { PLANS } from '@/constants/plans'
import { FormSection } from '@/components/ui/FormSection'
import { Button, Card, FormSelectField, FormTextField, Separator } from '@/components/ui'
import type { ClientFormData, Plan } from '@/types/client'
import { todayIso } from '@/utils/dates'
import { formatPhoneMask } from '@/utils/phone'
import {
  hasFormErrors,
  validateClientForm,
  type ClientFormErrors,
} from '@/utils/validation'

const initialForm = (): ClientFormData => ({
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  plan: 'Básico',
  startDate: todayIso(),
  consultant: '',
})

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void
  onCancel: () => void
}

export function ClientForm({ onSubmit, onCancel }: ClientFormProps) {
  const [form, setForm] = useState<ClientFormData>(initialForm)
  const [errors, setErrors] = useState<ClientFormErrors>({})

  const updateField = <K extends keyof ClientFormData>(
    key: K,
    value: ClientFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed: ClientFormData = {
      ...form,
      companyName: form.companyName.trim(),
      contactName: form.contactName.trim(),
      email: form.email.trim(),
      phone: formatPhoneMask(form.phone),
      consultant: form.consultant.trim(),
    }
    const validation = validateClientForm(trimmed)
    if (hasFormErrors(validation)) {
      setErrors(validation)
      return
    }
    onSubmit(trimmed)
  }

  return (
    <Card padding="md">
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <FormSection id="section-company" title="Empresa" icon={Building2}>
          <div className="sm:col-span-2">
            <FormTextField
            id="companyName"
            label="Nome da empresa"
            required
            value={form.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            error={errors.companyName}
            placeholder="Ex.: Loja Exemplo Ltda"
          />
          </div>
        </FormSection>

        <Separator />

        <FormSection id="section-contact" title="Contato" icon={UserRound}>
          <FormTextField
            id="contactName"
            label="Nome do responsável"
            required
            value={form.contactName}
            onChange={(e) => updateField('contactName', e.target.value)}
            error={errors.contactName}
            placeholder="Ex.: Maria Souza"
          />
          <FormTextField
            id="email"
            label="E-mail"
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            error={errors.email}
            placeholder="contato@empresa.com"
          />
          <div className="sm:col-span-2">
            <FormTextField
            id="phone"
            label="Telefone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => updateField('phone', formatPhoneMask(e.target.value))}
            error={errors.phone}
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
          </div>
        </FormSection>

        <Separator />

        <FormSection
          id="section-contract"
          title="Contrato e onboarding"
          icon={ClipboardList}
        >
          <FormSelectField
            id="plan"
            label="Plano contratado"
            required
            value={form.plan}
            onChange={(e) => updateField('plan', e.target.value as Plan)}
          >
            {PLANS.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </FormSelectField>
          <FormTextField
            id="startDate"
            label="Data de início"
            type="date"
            required
            value={form.startDate}
            onChange={(e) => updateField('startDate', e.target.value)}
            error={errors.startDate}
          />
          <div className="sm:col-span-2">
            <FormSelectField
            id="consultant"
            label="Consultor responsável"
            required
            value={form.consultant}
            onChange={(e) => updateField('consultant', e.target.value)}
            error={errors.consultant}
          >
            <option value="">Selecione o consultor...</option>
            {CONSULTANTS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </FormSelectField>
          </div>
        </FormSection>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            Campos com * são obrigatórios
          </p>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
