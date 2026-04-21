'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { requireAdmin } from '@/lib/require-role'
import { isUniqueViolation } from '@/lib/prisma-errors'
import { createUserInput, updateUserInput } from './schemas'

export type UserActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

export async function createUserAction(
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  await requireAdmin()

  const parsed = createUserInput.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }
  const { name, email, password, role } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { fieldErrors: { email: ['Email already in use'] } }
  }

  try {
    await auth.api.signUpEmail({ body: { name, email, password } })
  } catch {
    return { formError: 'Could not create user' }
  }

  if (role !== 'USER') {
    try {
      await prisma.user.update({ where: { email }, data: { role } })
    } catch {
      // User was created but role elevation failed. Surface a soft warning
      // rather than blocking — admin can re-edit the user to retry.
      return { formError: 'User created, but role could not be set' }
    }
  }

  revalidatePath('/admin/users')
  redirect('/admin/users')
}

export async function updateUserAction(
  id: string,
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const session = await requireAdmin()

  const parsed = updateUserInput.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  if (session.user.id === id && parsed.data.role !== 'ADMIN') {
    return { formError: 'You cannot demote yourself' }
  }

  try {
    await prisma.user.update({ where: { id }, data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'email')) {
      return { fieldErrors: { email: ['Email already in use'] } }
    }
    return { formError: 'Could not update user' }
  }

  revalidatePath('/admin/users')
  revalidatePath(`/admin/users/${id}/edit`)
  redirect('/admin/users')
}

export async function deleteUserAction(id: string) {
  const session = await requireAdmin()
  if (session.user.id === id) {
    throw new Error('You cannot delete your own account')
  }
  try {
    await prisma.user.delete({ where: { id } })
  } catch {
    // swallow: deleting a non-existent row is a no-op from the user's POV
  }
  revalidatePath('/admin/users')
}
