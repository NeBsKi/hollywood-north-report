'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/require-role'
import { isUniqueViolation } from '@/lib/prisma-errors'
import { postFormInput } from './schemas'

export type PostActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

function parseIdList(formData: FormData, key: string): string[] {
  const raw = formData.get(key)
  if (typeof raw !== 'string' || !raw.trim()) return []

  return Array.from(
    new Set(
      raw
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  )
}

function parsePostFormData(formData: FormData) {
  const raw = Object.fromEntries(formData)
  return postFormInput.safeParse({
    ...raw,
    categoryIds: parseIdList(formData, 'categoryIds'),
    genreIds: parseIdList(formData, 'genreIds'),
    festivalIds: parseIdList(formData, 'festivalIds'),
    yearIds: parseIdList(formData, 'yearIds'),
  })
}

export async function createPostAction(
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = parsePostFormData(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  const {
    title,
    slug,
    content,
    author,
    status,
    publishDate,
    coverImageId,
    metaTitle,
    metaDescription,
    categoryIds = [],
    genreIds = [],
    festivalIds = [],
    yearIds = [],
  } = parsed.data

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        author,
        status,
        publishDate,
        coverImageId,
        metaTitle: metaTitle || title,
        metaDescription,
        categories: {
          create: categoryIds.map((categoryId) => ({ categoryId })),
        },
        genres: {
          create: genreIds.map((genreId) => ({ genreId })),
        },
        festivals: {
          create: festivalIds.map((festivalId) => ({ festivalId })),
        },
        years: {
          create: yearIds.map((yearId) => ({ yearId })),
        },
        // TODO: wire cover image uploading / media picker and set coverImageId.
      },
    })
  } catch (e) {
    if (isUniqueViolation(e, 'slug')) {
      return { fieldErrors: { slug: ['Slug already in use'] } }
    }
    return { formError: 'Could not create post' }
  }

  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export async function updatePostAction(
  id: string,
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = parsePostFormData(formData)
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  const {
    title,
    slug,
    content,
    author,
    status,
    publishDate,
    coverImageId,
    metaTitle,
    metaDescription,
    categoryIds = [],
    genreIds = [],
    festivalIds = [],
    yearIds = [],
  } = parsed.data

  try {
    await prisma.$transaction(async (tx) => {
      await tx.post.update({
        where: { id },
        data: {
          title,
          slug,
          content,
          author,
          status,
          publishDate,
          coverImageId,
          metaTitle: metaTitle || title,
          metaDescription,
          categories: {
            deleteMany: {},
            create: categoryIds.map((categoryId) => ({ categoryId })),
          },
          genres: {
            deleteMany: {},
            create: genreIds.map((genreId) => ({ genreId })),
          },
          festivals: {
            deleteMany: {},
            create: festivalIds.map((festivalId) => ({ festivalId })),
          },
          years: {
            deleteMany: {},
            create: yearIds.map((yearId) => ({ yearId })),
          },
          // TODO: wire cover image uploading / media picker and set coverImageId.
        },
      })
    })
  } catch (e) {
    if (isUniqueViolation(e, 'slug')) {
      return { fieldErrors: { slug: ['Slug already in use'] } }
    }
    return { formError: 'Could not update post' }
  }

  revalidatePath('/admin/posts')
  revalidatePath(`/admin/posts/${id}/edit`)
  redirect('/admin/posts')
}

export async function deletePostAction(id: string) {
  await requireRole(['ADMIN', 'USER'])

  try {
    await prisma.post.delete({ where: { id } })
  } catch {
    // swallow: deleting a non-existent row is a no-op from the user's POV
  }

  revalidatePath('/admin/posts')
}
