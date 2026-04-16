'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/submit-button'
import { signUpAction, type AuthFormState } from '@/app/actions/auth'

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [state, formAction] = useActionState<AuthFormState, FormData>(signUpAction, {})

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your details below to create your account
                </p>
              </div>
              {state.formError && <FieldError>{state.formError}</FieldError>}
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={!!state.fieldErrors?.name}
                />
                {state.fieldErrors?.name && <FieldError>{state.fieldErrors.name[0]}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
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
                <SubmitButton>Create Account</SubmitButton>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/signin">Sign in</Link>
              </FieldDescription>
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
