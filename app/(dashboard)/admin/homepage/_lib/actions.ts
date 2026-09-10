'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-role'
import { isForeignKeyViolation } from '@/lib/prisma-errors'
import { HOME_SECTIONS_CACHE_TAG } from '@/lib/homepage-sections/homepage-sections.constants'
import { sectionInput, toSectionData } from './schemas'

export type SectionActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

const parse = (formData: FormData) => sectionInput.safeParse(Object.fromEntries(formData))

/** Refresh the admin list plus the public homepage that reads these sections. */
function revalidateHomepage() {
  revalidateTag(HOME_SECTIONS_CACHE_TAG, 'max')
  revalidatePath('/admin/homepage')
  revalidatePath('/')
}

export async function createHomePageSectionAction(
  _prev: SectionActionState,
  formData: FormData,
): Promise<SectionActionState> {
  await requireAdmin()

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.homePageSection.create({ data: toSectionData(parsed.data) })
  } catch (e) {
    if (isForeignKeyViolation(e, 'categoryId')) {
      return { fieldErrors: { categoryId: ['Selected category no longer exists'] } }
    }
    return { formError: 'Could not create section' }
  }

  revalidateHomepage()
  redirect('/admin/homepage')
}

export async function updateHomePageSectionAction(
  id: string,
  _prev: SectionActionState,
  formData: FormData,
): Promise<SectionActionState> {
  await requireAdmin()

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.homePageSection.update({ where: { id }, data: toSectionData(parsed.data) })
  } catch (e) {
    if (isForeignKeyViolation(e, 'categoryId')) {
      return { fieldErrors: { categoryId: ['Selected category no longer exists'] } }
    }
    return { formError: 'Could not update section' }
  }

  revalidateHomepage()
  redirect('/admin/homepage')
}

export async function deleteHomePageSectionAction(id: string) {
  await requireAdmin()
  try {
    await prisma.homePageSection.delete({ where: { id } })
  } catch {
    // swallow: deleting a non-existent row is a no-op from the user's POV
  }
  revalidateHomepage()
}
