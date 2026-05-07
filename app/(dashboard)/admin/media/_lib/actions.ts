'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import sharp from 'sharp'
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/require-role'
import { isUniqueViolation } from '@/lib/prisma-errors'
import { S3_BUCKET, assertS3Configured, publicUrlFor, s3 } from './s3'
import { listMedia } from './queries'
import {
  confirmUploadInput,
  listParams,
  uploadUrlInput,
  updateMediaInput,
  type AllowedMime,
} from './schemas'

export type MediaActionState = {
  fieldErrors?: Record<string, string[]>
  formError?: string
}

const EXT_BY_MIME: Record<AllowedMime, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

const VARIANT_WIDTHS = {
  thumb: 320,
  card: 640,
  content: 960,
} as const

function buildKey(contentType: AllowedMime) {
  const now = new Date()
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  const ext = EXT_BY_MIME[contentType]
  return `media/${yyyy}/${mm}/${randomUUID()}.${ext}`
}

function toVariantKey(sourceKey: string, variant: keyof typeof VARIANT_WIDTHS) {
  const dot = sourceKey.lastIndexOf('.')
  if (dot === -1) return `${sourceKey}-${variant}.webp`
  return `${sourceKey.slice(0, dot)}-${variant}.webp`
}

async function buildAndUploadVariants(key: string) {
  const original = await s3.send(
    new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    }),
  )

  if (!original.Body) {
    throw new Error('Uploaded object is missing body')
  }

  const source = Buffer.from(await original.Body.transformToByteArray())
  const meta = await sharp(source).metadata()

  if (!meta.width || !meta.height) {
    throw new Error('Could not read image dimensions')
  }

  const variants = await Promise.all(
    (Object.entries(VARIANT_WIDTHS) as Array<[keyof typeof VARIANT_WIDTHS, number]>).map(
      async ([name, width]) => {
        const variantKey = toVariantKey(key, name)
        const body = await sharp(source)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer()

        await s3.send(
          new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: variantKey,
            Body: body,
            ContentType: 'image/webp',
            CacheControl: 'public, max-age=31536000, immutable',
          }),
        )

        return {
          key: variantKey,
          url: publicUrlFor(variantKey),
          name,
        }
      },
    ),
  )

  return {
    width: meta.width,
    height: meta.height,
    thumb: variants.find((v) => v.name === 'thumb')!,
    card: variants.find((v) => v.name === 'card')!,
    content: variants.find((v) => v.name === 'content')!,
  }
}

export async function createUploadUrlAction(input: unknown) {
  await requireRole(['ADMIN', 'USER'])
  assertS3Configured()

  const parsed = uploadUrlInput.safeParse(input)
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error)
    const message = Object.values(flat.fieldErrors).flat()[0] ?? 'Invalid input'
    throw new Error(message)
  }
  const { contentType, size } = parsed.data

  const key = buildKey(contentType)

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: contentType,
    ContentLength: size,
  })

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 })

  return {
    uploadUrl,
    key,
    publicUrl: publicUrlFor(key),
  }
}

export async function confirmUploadAction(input: unknown) {
  await requireRole(['ADMIN', 'USER'])
  assertS3Configured()

  const parsed = confirmUploadInput.safeParse(input)
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error)
    const message = Object.values(flat.fieldErrors).flat()[0] ?? 'Invalid input'
    throw new Error(message)
  }
  const data = parsed.data

  try {
    const variants = await buildAndUploadVariants(data.key)

    const created = await prisma.media.create({
      data: {
        key: data.key,
        url: publicUrlFor(data.key),
        thumbKey: variants.thumb.key,
        thumbUrl: variants.thumb.url,
        cardKey: variants.card.key,
        cardUrl: variants.card.url,
        contentKey: variants.content.key,
        contentUrl: variants.content.url,
        fileName: data.fileName,
        contentType: data.contentType,
        size: data.size,
        width: variants.width,
        height: variants.height,
        alt: data.alt || null,
        title: data.title || null,
        caption: data.caption || null,
        status: 'READY',
      },
      select: { id: true, url: true, thumbUrl: true, fileName: true },
    })
    revalidatePath('/admin/media')
    return created
  } catch (e) {
    if (isUniqueViolation(e, 'key')) {
      throw new Error('Object key already registered')
    }
    throw new Error('Could not save media record')
  }
}

export async function searchMediaAction(input: unknown) {
  await requireRole(['ADMIN', 'USER'])

  const parsed = listParams.safeParse(input)
  if (!parsed.success) {
    throw new Error('Invalid input')
  }

  return listMedia(parsed.data)
}

export async function updateMediaAction(
  id: string,
  _prev: MediaActionState,
  formData: FormData,
): Promise<MediaActionState> {
  await requireRole(['ADMIN', 'USER'])

  const parsed = updateMediaInput.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.media.update({
      where: { id },
      data: {
        alt: parsed.data.alt ? parsed.data.alt : null,
        title: parsed.data.title ? parsed.data.title : null,
        caption: parsed.data.caption ? parsed.data.caption : null,
      },
    })
  } catch {
    return { formError: 'Could not update media' }
  }

  revalidatePath('/admin/media')
  revalidatePath(`/admin/media/${id}/edit`)
  redirect('/admin/media')
}

export async function deleteMediaAction(id: string) {
  await requireRole(['ADMIN', 'USER'])

  const media = await prisma.media.findUnique({
    where: { id },
    select: {
      key: true,
      thumbKey: true,
      cardKey: true,
      contentKey: true,
    },
  })
  if (!media) {
    revalidatePath('/admin/media')
    return
  }

  try {
    assertS3Configured()
    const keys = [media.key, media.thumbKey, media.cardKey, media.contentKey].filter(
      (k): k is string => !!k,
    )
    await Promise.all(
      keys.map((key) => s3.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key }))),
    )
  } catch {
    console.error(
      'Could not delete media from S3',
      media.key,
      media.thumbKey,
      media.cardKey,
      media.contentKey,
    )
  }

  try {
    await prisma.media.delete({ where: { id } })
  } catch {
    console.error('Could not delete media from database', id)
  }

  revalidatePath('/admin/media')
}
