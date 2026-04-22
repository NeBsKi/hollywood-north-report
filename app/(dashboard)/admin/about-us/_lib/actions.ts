'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-role'
import { aboutPageInput, buildAboutPageSections } from './schemas'

export type AboutPageActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

const parse = (formData: FormData) => aboutPageInput.safeParse(Object.fromEntries(formData))

export async function saveAboutPageAction(
  _prev: AboutPageActionState,
  formData: FormData,
): Promise<AboutPageActionState> {
  await requireAdmin()

  const parsed = parse(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  const input = parsed.data
  const sections = buildAboutPageSections(input)

  try {
    await prisma.$transaction(
      sections.map(({ sectionKey, title, sortOrder, body }) =>
        prisma.aboutPageSection.upsert({
          where: { sectionKey },
          update: {
            title,
            body,
            sortOrder,
            isPublished: true,
          },
          create: {
            sectionKey,
            title,
            body,
            sortOrder,
            isPublished: true,
          },
        }),
      ),
    )
  } catch {
    return { formError: 'Could not save the About Us page.' }
  }

  revalidatePath('/admin/about-us')
  redirect('/admin/about-us')
}
