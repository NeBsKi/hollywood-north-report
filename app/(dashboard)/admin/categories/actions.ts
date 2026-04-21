'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/roles'
import { isUniqueViolation } from '@/lib/prisma-errors'
import { categoryInput } from './schemas'

export type CategoryActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

const parse = (formData: FormData) =>
  categoryInput.safeParse(Object.fromEntries(formData))

export async function createCategoryAction(
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  await requireAdmin()

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.category.create({ data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'slug')) {
      return { fieldErrors: { slug: ['Slug already in use'] } }
    }
    return { formError: 'Could not create category' }
  }

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateCategoryAction(
  id: string,
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  await requireAdmin()

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.category.update({ where: { id }, data: parsed.data })
  } catch (e) {
    if (isUniqueViolation(e, 'slug')) {
      return { fieldErrors: { slug: ['Slug already in use'] } }
    }
    return { formError: 'Could not update category' }
  }

  revalidatePath('/admin/categories')
  revalidatePath(`/admin/categories/${id}/edit`)
  redirect('/admin/categories')
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin()
  try {
    await prisma.category.delete({ where: { id } })
  } catch {
    // swallow: deleting a non-existent row is a no-op from the user's POV
  }
  revalidatePath('/admin/categories')
}
