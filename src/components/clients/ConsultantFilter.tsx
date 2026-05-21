import { CONSULTANT_FILTER_ALL, CONSULTANTS } from '@/constants/consultants'
import { Label } from '@/components/ui/label'
import { SelectInput } from '@/components/ui/FormField'
import { useOnboardingStore } from '@/store/onboardingStore'

export function ConsultantFilter() {
  const consultantFilter = useOnboardingStore((s) => s.consultantFilter)
  const setConsultantFilter = useOnboardingStore((s) => s.setConsultantFilter)

  return (
    <fieldset className="w-full max-w-xs space-y-2">
      <Label htmlFor="consultant-filter">Consultor responsável</Label>
      <SelectInput
        id="consultant-filter"
        value={consultantFilter}
        onChange={(e) => setConsultantFilter(e.target.value)}
        aria-label="Filtrar clientes por consultor"
      >
        <option value={CONSULTANT_FILTER_ALL}>Todos os consultores</option>
        {CONSULTANTS.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </SelectInput>
    </fieldset>
  )
}
