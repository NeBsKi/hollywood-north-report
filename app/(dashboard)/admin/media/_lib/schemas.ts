import { z } from 'zod'

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const

export type AllowedMime = (typeof ALLOWED_MIME_TYPES)[number]

export const uploadUrlInput = z.object({
  fileName: z.string().trim().min(1, 'File name is required').max(255),
  contentType: z
    .enum(ALLOWED_MIME_TYPES, 'Unsupported file type')
    .describe('MIME type returned by the browser'),
  size: z
    .number()
    .int()
    .min(1, 'File is empty')
    .max(MAX_UPLOAD_BYTES, 'File is too large (max 10MB)'),
})
export type UploadUrlInput = z.infer<typeof uploadUrlInput>

export const confirmUploadInput = z.object({
  key: z.string().trim().min(1).max(1024),
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(ALLOWED_MIME_TYPES, 'Unsupported file type'),
  size: z.number().int().min(1).max(MAX_UPLOAD_BYTES),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: z.string().trim().max(280).optional(),
  title: z.string().trim().max(160).optional(),
  caption: z.string().trim().max(2000).optional(),
})
export type ConfirmUploadInput = z.infer<typeof confirmUploadInput>

export const updateMediaInput = z.object({
  alt: z.string().trim().max(280).optional().or(z.literal('')),
  title: z.string().trim().max(160).optional().or(z.literal('')),
  caption: z.string().trim().max(2000).optional().or(z.literal('')),
})
export type UpdateMediaInput = z.infer<typeof updateMediaInput>

export const listParams = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
  q: z.string().trim().optional(),
  sort: z
    .enum(['createdAt:desc', 'createdAt:asc', 'fileName:asc', 'fileName:desc'])
    .default('createdAt:desc'),
})
export type ListParams = z.infer<typeof listParams>
