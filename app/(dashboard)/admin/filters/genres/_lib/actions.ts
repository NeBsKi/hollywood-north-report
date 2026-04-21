'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/require-role'
import { isUniqueViolation } from '@/lib/prisma-errors'
import { genreInput } from './schemas'

export type GenreActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

const parse = (formData: FormData) => genreInput.safeParse(Object.fromEntries(formData))

export async function createGenreAction(
  _prev: GenreActionState,
  formData: FormData,
): Promise<GenreActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.genre.create({ data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'slug')) {
      return { fieldErrors: { slug: ['Slug already in use'] } }
    }
    return { formError: 'Could not create genre' }
  }

  revalidatePath('/admin/filters/genres')
  redirect('/admin/filters/genres')
}

export async function updateGenreAction(
  id: string,
  _prev: GenreActionState,
  formData: FormData,
): Promise<GenreActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.genre.update({ where: { id }, data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'slug')) {
      return { fieldErrors: { slug: ['Slug already in use'] } }
    }
    return { formError: 'Could not update genre' }
  }

  revalidatePath('/admin/filters/genres')
  revalidatePath(`/admin/filters/genres/${id}/edit`)
  redirect('/admin/filters/genres')
}

export async function deleteGenreAction(id: string) {
  await requireRole(['ADMIN', 'USER'])
  try {
    await prisma.genre.delete({ where: { id } })
  } catch {
    // swallow: deleting a non-existent row is a no-op from the user's POV
  }
  revalidatePath('/admin/filters/genres')
}
