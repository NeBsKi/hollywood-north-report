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

const toCategoryHref = (slug: string) => `/category/${slug}`

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

  const baseData = toSectionData(parsed.data)
  let viewMoreHref: string | null = null

  if (parsed.data.useCategoryViewMore) {
    if (!parsed.data.categoryId) {
      return { fieldErrors: { categoryId: ['Select a category to enable View more'] } }
    }

    const category = await prisma.category.findUnique({
      where: { id: parsed.data.categoryId },
      select: { slug: true },
    })

    if (!category) {
      return { fieldErrors: { categoryId: ['Selected category no longer exists'] } }
    }

    viewMoreHref = toCategoryHref(category.slug)
  }

  try {
    await prisma.homePageSection.create({ data: { ...baseData, viewMoreHref } })
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

  const baseData = toSectionData(parsed.data)
  let viewMoreHref: string | null = null

  if (parsed.data.useCategoryViewMore) {
    if (!parsed.data.categoryId) {
      return { fieldErrors: { categoryId: ['Select a category to enable View more'] } }
    }

    const category = await prisma.category.findUnique({
      where: { id: parsed.data.categoryId },
      select: { slug: true },
    })

    if (!category) {
      return { fieldErrors: { categoryId: ['Selected category no longer exists'] } }
    }

    viewMoreHref = toCategoryHref(category.slug)
  }

  try {
    await prisma.homePageSection.update({
      where: { id },
      data: { ...baseData, viewMoreHref },
    })
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
