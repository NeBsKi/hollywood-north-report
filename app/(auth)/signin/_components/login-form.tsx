'use client'

import { useActionState } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/submit-button'
import { signInAction, type AuthFormState } from '../_lib/actions'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [state, formAction] = useActionState<AuthFormState, FormData>(signInAction, {})

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to your account</p>
              </div>
              {state.formError && <FieldError>{state.formError}</FieldError>}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  aria-invalid={!!state.fieldErrors?.email}
                />
                {state.fieldErrors?.email && <FieldError>{state.fieldErrors.email[0]}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  aria-invalid={!!state.fieldErrors?.password}
                />
                {state.fieldErrors?.password && (
                  <FieldError>{state.fieldErrors.password[0]}</FieldError>
                )}
              </Field>
              <Field>
                <SubmitButton>Sign in</SubmitButton>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://cdn.pixabay.com/photo/2016/08/16/17/32/hollywood-sign-1598473_1280.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
