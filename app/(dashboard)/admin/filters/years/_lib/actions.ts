'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/require-role'
import { isUniqueViolation } from '@/lib/prisma-errors'
import { yearInput } from './schemas'

export type YearActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

const parse = (formData: FormData) => yearInput.safeParse(Object.fromEntries(formData))

export async function createYearAction(
  _prev: YearActionState,
  formData: FormData,
): Promise<YearActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.year.create({ data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'value')) {
      return { fieldErrors: { value: ['Year already in use'] } }
    }
    return { formError: 'Could not create year' }
  }

  revalidatePath('/admin/filters/years')
  redirect('/admin/filters/years')
}

export async function updateYearAction(
  id: string,
  _prev: YearActionState,
  formData: FormData,
): Promise<YearActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.year.update({ where: { id }, data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'value')) {
      return { fieldErrors: { value: ['Year already in use'] } }
    }
    return { formError: 'Could not update year' }
  }

  revalidatePath('/admin/filters/years')
  revalidatePath(`/admin/filters/years/${id}/edit`)
  redirect('/admin/filters/years')
}

export async function deleteYearAction(id: string) {
  await requireRole(['ADMIN', 'USER'])
  try {
    await prisma.year.delete({ where: { id } })
  } catch {
    // swallow: deleting a non-existent row is a no-op from the user's POV
  }
  revalidatePath('/admin/filters/years')
}
