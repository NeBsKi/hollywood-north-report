'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { signInSchema } from './schemas'

export type AuthFormState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return { fieldErrors: z.flattenError(result.error).fieldErrors }
  }

  try {
    await auth.api.signInEmail({
      body: result.data,
    })
  } catch {
    return { formError: 'Email or password is incorrect' }
  }

  return redirect('/admin')
}
