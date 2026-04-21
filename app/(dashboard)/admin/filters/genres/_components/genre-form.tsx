'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  createGenreAction,
  updateGenreAction,
  type GenreActionState,
} from '../_lib/actions'

type Initial = { id: string; name: string; slug: string } | undefined

export function GenreForm({ initial }: { initial?: Initial }) {
  const action = initial ? updateGenreAction.bind(null, initial.id) : createGenreAction

  const [state, formAction] = useActionState<GenreActionState, FormData>(action, {})

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <Field
        label="Name"
        name="name"
        defaultValue={initial?.name}
        error={state.fieldErrors?.name?.[0]}
        autoFocus
      />
      <Field
        label="Slug"
        name="slug"
        defaultValue={initial?.slug}
        error={state.fieldErrors?.slug?.[0]}
        placeholder="e.g. psychological-thriller"
      />
      {state.formError && <p className="text-destructive text-sm">{state.formError}</p>}
      <div className="flex items-center gap-2">
        <SubmitButton>{initial ? 'Save changes' : 'Create genre'}</SubmitButton>
        <Button asChild variant="ghost">
          <Link href="/admin/filters/genres">Cancel</Link>
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
