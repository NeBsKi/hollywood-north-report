export const ABOUT_BLOCK_TYPE = {
  CONTENT: 'CONTENT',
  CONTENT_WITH_QUOTE: 'CONTENT_WITH_QUOTE',
  NESTED_CARDS: 'NESTED_CARDS',
} as const

export type AboutBlockTypeValue = (typeof ABOUT_BLOCK_TYPE)[keyof typeof ABOUT_BLOCK_TYPE]

export const ABOUT_BLOCK_TYPE_LIST: AboutBlockTypeValue[] = [
  ABOUT_BLOCK_TYPE.CONTENT,
  ABOUT_BLOCK_TYPE.CONTENT_WITH_QUOTE,
  ABOUT_BLOCK_TYPE.NESTED_CARDS,
]

export const TYPE_LABELS: Record<AboutBlockTypeValue, string> = {
  [ABOUT_BLOCK_TYPE.CONTENT]: 'Title & HTML content',
  [ABOUT_BLOCK_TYPE.CONTENT_WITH_QUOTE]: 'Title, content & quote',
  [ABOUT_BLOCK_TYPE.NESTED_CARDS]: 'Title with sub-cards',
}

export type AboutBlockDraft =
  | { clientId: string; type: 'CONTENT'; title: string; content: string }
  | { clientId: string; type: 'CONTENT_WITH_QUOTE'; title: string; content: string; quote: string }
  | {
      clientId: string
      type: 'NESTED_CARDS'
      title: string
      cards: { title: string; content: string }[]
    }

export type AboutBlockJsonPayload =
  | { type: 'CONTENT'; title: string; content: string }
  | { type: 'CONTENT_WITH_QUOTE'; title: string; content: string; quote: string }
  | { type: 'NESTED_CARDS'; title: string; cards: { title: string; content: string }[] }

export function draftToPayload(draft: AboutBlockDraft): AboutBlockJsonPayload {
  switch (draft.type) {
    case 'CONTENT':
      return { type: 'CONTENT', title: draft.title, content: draft.content }
    case 'CONTENT_WITH_QUOTE':
      return {
        type: 'CONTENT_WITH_QUOTE',
        title: draft.title,
        content: draft.content,
        quote: draft.quote,
      }
    case 'NESTED_CARDS':
      return { type: 'NESTED_CARDS', title: draft.title, cards: draft.cards }
  }
}

export function defaultEmptyBlock(
  type: AboutBlockTypeValue = ABOUT_BLOCK_TYPE.CONTENT,
): AboutBlockDraft {
  const id = globalThis.crypto?.randomUUID?.() ?? String(Date.now())
  switch (type) {
    case ABOUT_BLOCK_TYPE.CONTENT:
      return { clientId: id, type: 'CONTENT', title: '', content: '' }
    case ABOUT_BLOCK_TYPE.CONTENT_WITH_QUOTE:
      return { clientId: id, type: 'CONTENT_WITH_QUOTE', title: '', content: '', quote: '' }
    case ABOUT_BLOCK_TYPE.NESTED_CARDS:
      return {
        clientId: id,
        type: 'NESTED_CARDS',
        title: '',
        cards: [],
      }
  }
}
