'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  createYearAction,
  updateYearAction,
  type YearActionState,
} from '../_lib/actions'

type Initial = { id: string; value: number } | undefined

export function YearForm({ initial }: { initial?: Initial }) {
  const action = initial ? updateYearAction.bind(null, initial.id) : createYearAction

  const [state, formAction] = useActionState<YearActionState, FormData>(action, {})

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <Field
        label="Year"
        name="value"
        type="number"
        defaultValue={initial?.value ? String(initial.value) : undefined}
        error={state.fieldErrors?.value?.[0]}
        min={1900}
        max={3000}
        autoFocus
      />
      {state.formError && <p className="text-destructive text-sm">{state.formError}</p>}
      <div className="flex items-center gap-2">
        <SubmitButton>{initial ? 'Save changes' : 'Create year'}</SubmitButton>
        <Button asChild variant="ghost">
          <Link href="/admin/filters/years">Cancel</Link>
        </Button>
      </div>
    </form>
  )
}

type FieldProps = {
  label: string
  name: string
  defaultValue?: string
  error?: string
} & React.ComponentProps<typeof Input>

function Field({ label, name, defaultValue, error, ...rest }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={!!error || undefined}
        {...rest}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return <Button disabled={pending}>{pending ? 'Saving…' : children}</Button>
}
