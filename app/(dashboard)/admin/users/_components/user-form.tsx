'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ROLES, type Role } from '@/lib/roles'
import {
  createUserAction,
  updateUserAction,
  type UserActionState,
} from '../_lib/actions'

type Initial = {
  id: string
  name: string
  email: string
  role: Role
}

export function UserForm({ initial }: { initial?: Initial }) {
  const isEdit = !!initial
  const action = isEdit
    ? updateUserAction.bind(null, initial!.id)
    : createUserAction

  const [state, formAction] = useActionState<UserActionState, FormData>(
    action,
    {},
  )

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
        label="Email"
        name="email"
        type="email"
        defaultValue={initial?.email}
        error={state.fieldErrors?.email?.[0]}
      />
      {!isEdit && (
        <Field
          label="Password"
          name="password"
          type="password"
          error={state.fieldErrors?.password?.[0]}
          placeholder="At least 8 characters"
        />
      )}
      <RoleField
        defaultValue={initial?.role ?? 'USER'}
        error={state.fieldErrors?.role?.[0]}
      />
      {state.formError && (
        <p className="text-destructive text-sm">{state.formError}</p>
      )}
      <div className="flex items-center gap-2">
        <SubmitButton>{isEdit ? 'Save changes' : 'Create user'}</SubmitButton>
        <Button asChild variant="ghost">
          <Link href="/admin/users">Cancel</Link>
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

function RoleField({
  defaultValue,
  error,
}: {
  defaultValue: Role
  error?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="role">Role</Label>
      <select
        id="role"
        name="role"
        defaultValue={defaultValue}
        aria-invalid={!!error || undefined}
        className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:text-sm"
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return <Button disabled={pending}>{pending ? 'Saving…' : children}</Button>
}
