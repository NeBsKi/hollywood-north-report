import { z } from 'zod'
import { ABOUT_BLOCK_TYPE, type AboutBlockDraft } from './types'

const requiredTitle = z.string().trim().min(1, 'Title is required')

/** Optional body fields: may be omitted, null, or empty string. */
const optionalText = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => (v == null ? '' : String(v)))

const subCardSchema = z.object({
  title: optionalText,
  content: optionalText,
})

const aboutBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(ABOUT_BLOCK_TYPE.CONTENT),
    title: requiredTitle,
    content: optionalText,
  }),
  z.object({
    type: z.literal(ABOUT_BLOCK_TYPE.CONTENT_WITH_QUOTE),
    title: requiredTitle,
    content: optionalText,
    quote: optionalText,
  }),
  z.object({
    type: z.literal(ABOUT_BLOCK_TYPE.NESTED_CARDS),
    title: requiredTitle,
    cards: z.array(subCardSchema).default([]),
  }),
])

export const aboutPagePayloadSchema = z.object({
  blocks: z.array(aboutBlockSchema).default([]),
})

export type AboutBlockPayload = z.infer<typeof aboutBlockSchema>
export type AboutPagePayload = z.infer<typeof aboutPagePayloadSchema>

type AboutBlockRow = {
  id: string
  type: string
  title: string
  content: string | null
  quote: string | null
  cards: unknown
}

function cardsFromDb(v: unknown): { title: string; content: string }[] {
  if (!Array.isArray(v)) return []
  return v.map((item) => {
    const o = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}
    return {
      title: typeof o.title === 'string' ? o.title : '',
      content: typeof o.content === 'string' ? o.content : '',
    }
  })
}

export function toAboutBlockDrafts(rows: AboutBlockRow[]): AboutBlockDraft[] {
  return rows.map((row) => {
    const clientId = row.id
    switch (row.type) {
      case ABOUT_BLOCK_TYPE.CONTENT:
        return {
          clientId,
          type: 'CONTENT',
          title: row.title,
          content: row.content ?? '',
        }
      case ABOUT_BLOCK_TYPE.CONTENT_WITH_QUOTE:
        return {
          clientId,
          type: 'CONTENT_WITH_QUOTE',
          title: row.title,
          content: row.content ?? '',
          quote: row.quote ?? '',
        }
      case ABOUT_BLOCK_TYPE.NESTED_CARDS: {
        const cards = cardsFromDb(row.cards)
        return {
          clientId,
          type: 'NESTED_CARDS',
          title: row.title,
          cards: cards.length > 0 ? cards : [],
        }
      }
      default:
        return {
          clientId,
          type: 'CONTENT',
          title: row.title,
          content: row.content ?? '',
        }
    }
  })
}

export function parseAboutPageFormPayload(formData: FormData): unknown {
  const raw = formData.get('blocks')
  if (typeof raw !== 'string') {
    return { blocks: [] }
  }
  try {
    return JSON.parse(raw)
  } catch {
    return { blocks: [] }
  }
}
