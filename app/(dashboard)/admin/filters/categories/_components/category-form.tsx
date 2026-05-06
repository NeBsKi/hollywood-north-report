'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { SubmitButton } from '@/components/submit-button'
import {
  createCategoryAction,
  updateCategoryAction,
  type CategoryActionState,
} from '../_lib/actions'
import type { Category } from '@/generated/prisma/client'

type CategoryFormProps = {
  category?: Pick<Category, 'id' | 'name' | 'slug'>
}

export function CategoryForm({ category }: CategoryFormProps) {
  const action = category ? updateCategoryAction.bind(null, category.id) : createCategoryAction

  const [state, formAction] = useActionState<CategoryActionState, FormData>(action, {})

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <Field
        label="Name"
        name="name"
        defaultValue={category?.name}
        error={state.fieldErrors?.name?.[0]}
        autoFocus
      />
      <Field
        label="Slug"
        name="slug"
        defaultValue={category?.slug}
        error={state.fieldErrors?.slug?.[0]}
        placeholder="e.g. film-industry"
      />
      {state.formError && <p className="text-destructive text-sm">{state.formError}</p>}
      <div className="flex items-center gap-2">
        <SubmitButton>{category ? 'Save changes' : 'Create category'}</SubmitButton>
        <Button asChild variant="ghost">
          <Link href="/admin/filters/categories">Cancel</Link>
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
