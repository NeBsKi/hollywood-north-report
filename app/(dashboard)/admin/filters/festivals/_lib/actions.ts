'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/require-role'
import { isUniqueViolation } from '@/lib/prisma-errors'
import { festivalInput } from './schemas'

export type FestivalActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

const parse = (formData: FormData) => festivalInput.safeParse(Object.fromEntries(formData))

export async function createFestivalAction(
  _prev: FestivalActionState,
  formData: FormData,
): Promise<FestivalActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.festival.create({ data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'slug')) {
      return { fieldErrors: { slug: ['Slug already in use'] } }
    }
    return { formError: 'Could not create festival' }
  }

  revalidatePath('/admin/filters/festivals')
  redirect('/admin/filters/festivals')
}

export async function updateFestivalAction(
  id: string,
  _prev: FestivalActionState,
  formData: FormData,
): Promise<FestivalActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.festival.update({ where: { id }, data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'slug')) {
      return { fieldErrors: { slug: ['Slug already in use'] } }
    }
    return { formError: 'Could not update festival' }
  }

  revalidatePath('/admin/filters/festivals')
  revalidatePath(`/admin/filters/festivals/${id}/edit`)
  redirect('/admin/filters/festivals')
}

export async function deleteFestivalAction(id: string) {
  await requireRole(['ADMIN', 'USER'])
  try {
    await prisma.festival.delete({ where: { id } })
  } catch {
    // swallow: deleting a non-existent row is a no-op from the user's POV
  }
  revalidatePath('/admin/filters/festivals')
}
