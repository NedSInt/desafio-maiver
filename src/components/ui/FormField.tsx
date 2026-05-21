import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Label } from './label'
import { Input } from './input'
import { Textarea } from './textarea'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

export function FormField({
  id,
  label,
  required,
  error,
  hint,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function useFieldAria(id: string, error?: string, hint?: string) {
  return {
    'aria-invalid': !!error,
    'aria-describedby':
      [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
        .filter(Boolean)
        .join(' ') || undefined,
  }
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export function TextInput({ hasError, className, id, ...props }: TextInputProps) {
  const aria = id ? useFieldAria(id) : {}
  return (
    <Input
      id={id}
      className={cn(hasError && 'border-destructive focus-visible:ring-destructive', className)}
      {...aria}
      {...props}
    />
  )
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean
}

export function SelectInput({
  hasError,
  className,
  id,
  children,
  ...props
}: SelectInputProps) {
  const aria = id ? useFieldAria(id) : {}
  return (
    <select
      id={id}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-[border-color,box-shadow] duration-150',
        hasError && 'border-destructive focus-visible:ring-destructive',
        className,
      )}
      {...aria}
      {...props}
    >
      {children}
    </select>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export function TextArea({ hasError, className, id, ...props }: TextAreaProps) {
  const aria = id ? useFieldAria(id) : {}
  return (
    <Textarea
      id={id}
      className={cn(hasError && 'border-destructive focus-visible:ring-destructive', className)}
      {...aria}
      {...props}
    />
  )
}

type FieldWrapperProps = Omit<FormFieldProps, 'children'>

export function FormTextField({
  id,
  label,
  required,
  error,
  hint,
  ...inputProps
}: FieldWrapperProps & TextInputProps) {
  const aria = useFieldAria(id, error, hint)
  return (
    <FormField id={id} label={label} required={required} error={error} hint={hint}>
      <TextInput id={id} required={required} hasError={!!error} {...aria} {...inputProps} />
    </FormField>
  )
}

export function FormSelectField({
  id,
  label,
  required,
  error,
  hint,
  children,
  ...selectProps
}: FieldWrapperProps & SelectInputProps) {
  const aria = useFieldAria(id, error, hint)
  return (
    <FormField id={id} label={label} required={required} error={error} hint={hint}>
      <SelectInput id={id} required={required} hasError={!!error} {...aria} {...selectProps}>
        {children}
      </SelectInput>
    </FormField>
  )
}

export function FormTextAreaField({
  id,
  label,
  required,
  error,
  hint,
  ...textareaProps
}: FieldWrapperProps & TextAreaProps) {
  const aria = useFieldAria(id, error, hint)
  return (
    <FormField id={id} label={label} required={required} error={error} hint={hint}>
      <TextArea id={id} required={required} hasError={!!error} {...aria} {...textareaProps} />
    </FormField>
  )
}
