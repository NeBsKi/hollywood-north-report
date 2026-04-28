'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import { AboutBlockType, Prisma } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-role'
import {
  aboutPagePayloadSchema,
  parseAboutPageFormPayload,
  type AboutBlockPayload,
} from './schemas'

export type AboutPageActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

const buildFieldErrors = (error: z.ZodError): Record<string, string[]> => {
  const fieldErrors: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = issue.path.map(String).join('.')
    fieldErrors[key] ??= []
    fieldErrors[key].push(issue.message)
  }
  return fieldErrors
}

function optionalDbText(s: string | undefined): string | null {
  const t = s?.trim()
  return t ? t : null
}

function blockToCreateData(
  block: AboutBlockPayload,
  sortOrder: number,
): Prisma.AboutPageBlockCreateInput {
  const base = { sortOrder, isPublished: true as const }
  switch (block.type) {
    case AboutBlockType.CONTENT:
      return {
        ...base,
        type: block.type,
        title: block.title,
        content: optionalDbText(block.content),
        quote: null,
        cards: Prisma.DbNull,
      }
    case AboutBlockType.CONTENT_WITH_QUOTE:
      return {
        ...base,
        type: block.type,
        title: block.title,
        content: optionalDbText(block.content),
        quote: optionalDbText(block.quote),
        cards: Prisma.DbNull,
      }
    case AboutBlockType.NESTED_CARDS:
      return {
        ...base,
        type: block.type,
        title: block.title,
        content: null,
        quote: null,
        cards: block.cards,
      }
  }
}

export async function saveAboutPageAction(
  _prev: AboutPageActionState,
  formData: FormData,
): Promise<AboutPageActionState> {
  await requireAdmin()

  const parsed = aboutPagePayloadSchema.safeParse(parseAboutPageFormPayload(formData))
  if (!parsed.success) {
    return {
      fieldErrors: buildFieldErrors(parsed.error),
      formError: 'Please fix the errors in your blocks below.',
    }
  }

  const { blocks } = parsed.data

  try {
    await prisma.$transaction(async (tx) => {
      await tx.aboutPageBlock.deleteMany()
      for (let i = 0; i < blocks.length; i++) {
        await tx.aboutPageBlock.create({
          data: blockToCreateData(blocks[i]!, i),
        })
      }
    })
  } catch {
    return { formError: 'Could not save the About Us page.' }
  }

  revalidatePath('/admin/about-us', 'page')
  revalidatePath('/admin', 'layout')
  redirect('/admin/about-us')
}
