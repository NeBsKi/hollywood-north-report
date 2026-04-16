'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { signInSchema, signUpSchema } from '@/lib/schemas/auth'

export type AuthFormState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return { fieldErrors: z.flattenError(result.error).fieldErrors }
  }

  try {
    await auth.api.signUpEmail({
      body: result.data,
    })
  } catch {
    return { formError: 'Something went wrong. Please try again.' }
  }

  return redirect('/admin')
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

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  })

  redirect('/signin')
}
