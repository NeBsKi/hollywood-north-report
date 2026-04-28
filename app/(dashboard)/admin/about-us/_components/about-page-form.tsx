'use client'

import { useMemo, useState, useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { saveAboutPageAction, type AboutPageActionState } from '../_lib/actions'
import {
  ABOUT_BLOCK_TYPE,
  ABOUT_BLOCK_TYPE_LIST,
  type AboutBlockDraft,
  type AboutBlockTypeValue,
  defaultEmptyBlock,
  draftToPayload,
  TYPE_LABELS,
} from '../_lib/types'
import { RichTextField } from '@/components/shared/rich-text'
import { InputField } from './input-field'
import { SectionCard } from './section-card'
import { SubmitButton } from './submit-button'

const selectClassName =
  'border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:text-sm'

function contentFromDraft(b: AboutBlockDraft): string {
  return b.type === 'NESTED_CARDS' ? '' : b.content
}

function quoteFromDraft(b: AboutBlockDraft): string {
  return b.type === 'CONTENT_WITH_QUOTE' ? b.quote : ''
}

function changeBlockType(
  clientId: string,
  next: AboutBlockTypeValue,
  previous: AboutBlockDraft,
): AboutBlockDraft {
  const id = clientId
  if (previous.type === next) return previous
  if (next === ABOUT_BLOCK_TYPE.CONTENT) {
    return {
      clientId: id,
      type: 'CONTENT',
      title: previous.title,
      content: contentFromDraft(previous),
    }
  }
  if (next === ABOUT_BLOCK_TYPE.CONTENT_WITH_QUOTE) {
    return {
      clientId: id,
      type: 'CONTENT_WITH_QUOTE',
      title: previous.title,
      content: contentFromDraft(previous),
      quote: quoteFromDraft(previous),
    }
  }
  return {
    clientId: id,
    type: 'NESTED_CARDS',
    title: previous.title,
    cards: previous.type === 'NESTED_CARDS' ? previous.cards : [],
  }
}

export function AboutPageForm({ initial }: { initial: AboutBlockDraft[] }) {
  const [blocks, setBlocks] = useState<AboutBlockDraft[]>(initial)
  const [state, formAction] = useActionState<AboutPageActionState, FormData>(
    saveAboutPageAction,
    {},
  )
  const fieldError = (path: string) => state.fieldErrors?.[path]?.[0]

  const blocksPayload = useMemo(
    () => JSON.stringify({ blocks: blocks.map(draftToPayload) }),
    [blocks],
  )

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="blocks" value={blocksPayload} />
      {state.formError && (
        <p className="text-destructive text-sm" role="alert">
          {state.formError}
        </p>
      )}
      {blocks.length === 0 && (
        <p className="text-muted-foreground text-sm">No blocks yet. Add a block to get started.</p>
      )}
      {blocks.map((block, index) => {
        const base = `blocks.${index}`
        const typeKey = block.type
        return (
          <SectionCard
            key={block.clientId}
            title={block.title}
            description={TYPE_LABELS[typeKey]}
            defaultOpen={index === 0}
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-end gap-2">
                <div className="min-w-48 flex-1 space-y-1.5">
                  <Label htmlFor={`type-${block.clientId}`}>Block type</Label>
                  <select
                    id={`type-${block.clientId}`}
                    className={selectClassName}
                    value={typeKey}
                    onChange={(ev) => {
                      const v = ev.target.value as AboutBlockTypeValue
                      setBlocks((list) =>
                        list.map((b) =>
                          b.clientId === block.clientId ? changeBlockType(b.clientId, v, b) : b,
                        ),
                      )
                    }}
                  >
                    {ABOUT_BLOCK_TYPE_LIST.map((t) => (
                      <option key={t} value={t}>
                        {TYPE_LABELS[t]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ml-auto flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={index === 0}
                    onClick={() => {
                      setBlocks((list) => {
                        if (index === 0) return list
                        const next = [...list]
                        ;[next[index - 1]!, next[index]!] = [next[index]!, next[index - 1]!]
                        return next
                      })
                    }}
                  >
                    Up
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={index >= blocks.length - 1}
                    onClick={() => {
                      setBlocks((list) => {
                        if (index >= list.length - 1) return list
                        const next = [...list]
                        ;[next[index]!, next[index + 1]!] = [next[index + 1]!, next[index]!]
                        return next
                      })
                    }}
                  >
                    Down
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm('Remove this block?')) {
                        setBlocks((list) => list.filter((b) => b.clientId !== block.clientId))
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <InputField
                label="Title"
                name={`${base}.title`}
                value={block.title}
                onChange={(e) => {
                  const t = e.target.value
                  setBlocks((list) =>
                    list.map((b) => (b.clientId === block.clientId ? { ...b, title: t } : b)),
                  )
                }}
                error={fieldError(`${base}.title`)}
                autoFocus={index === 0}
              />

              {block.type === 'NESTED_CARDS' ? null : (
                <RichTextField
                  id={`content-${block.clientId}`}
                  label="Content (optional)"
                  value={'content' in block ? block.content : ''}
                  onChange={(html) => {
                    setBlocks((list) =>
                      list.map((b) => {
                        if (b.clientId !== block.clientId) return b
                        if (b.type === 'NESTED_CARDS') return b
                        return { ...b, content: html }
                      }),
                    )
                  }}
                  error={fieldError(`${base}.content`)}
                  minHeightClass={block.type === 'CONTENT_WITH_QUOTE' ? 'min-h-48' : 'min-h-56'}
                />
              )}

              {block.type === 'CONTENT_WITH_QUOTE' && (
                <InputField
                  label="Quote (optional)"
                  name={`${base}.quote`}
                  value={block.quote}
                  onChange={(e) => {
                    const v = e.target.value
                    setBlocks((list) =>
                      list.map((b) =>
                        b.clientId === block.clientId && b.type === 'CONTENT_WITH_QUOTE'
                          ? { ...b, quote: v }
                          : b,
                      ),
                    )
                  }}
                  error={fieldError(`${base}.quote`)}
                />
              )}

              {block.type === 'NESTED_CARDS' && (
                <div className="space-y-4">
                  {block.cards.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      No sub-cards yet. Add one below (optional).
                    </p>
                  )}
                  {block.cards.map((card, cardIndex) => {
                    const cardPath = `${base}.cards.${cardIndex}`
                    return (
                      <div key={cardIndex} className="space-y-3 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Card {cardIndex + 1}</span>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={cardIndex === 0}
                              onClick={() => {
                                setBlocks((list) =>
                                  list.map((b) => {
                                    if (
                                      b.clientId !== block.clientId ||
                                      b.type !== 'NESTED_CARDS'
                                    ) {
                                      return b
                                    }
                                    if (cardIndex === 0) return b
                                    const cards = [...b.cards]
                                    ;[cards[cardIndex - 1]!, cards[cardIndex]!] = [
                                      cards[cardIndex]!,
                                      cards[cardIndex - 1]!,
                                    ]
                                    return { ...b, cards }
                                  }),
                                )
                              }}
                            >
                              Up
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={cardIndex >= block.cards.length - 1}
                              onClick={() => {
                                setBlocks((list) =>
                                  list.map((b) => {
                                    if (
                                      b.clientId !== block.clientId ||
                                      b.type !== 'NESTED_CARDS'
                                    ) {
                                      return b
                                    }
                                    if (cardIndex >= b.cards.length - 1) return b
                                    const cards = [...b.cards]
                                    ;[cards[cardIndex]!, cards[cardIndex + 1]!] = [
                                      cards[cardIndex + 1]!,
                                      cards[cardIndex]!,
                                    ]
                                    return { ...b, cards }
                                  }),
                                )
                              }}
                            >
                              Down
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (confirm('Remove this card?')) {
                                  setBlocks((list) =>
                                    list.map((b) => {
                                      if (
                                        b.clientId !== block.clientId ||
                                        b.type !== 'NESTED_CARDS'
                                      ) {
                                        return b
                                      }
                                      return {
                                        ...b,
                                        cards: b.cards.filter((_, j) => j !== cardIndex),
                                      }
                                    }),
                                  )
                                }
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        <InputField
                          label="Card title (optional)"
                          name={`${cardPath}.title`}
                          value={card.title}
                          onChange={(e) => {
                            const v = e.target.value
                            setBlocks((list) =>
                              list.map((b) => {
                                if (b.clientId !== block.clientId || b.type !== 'NESTED_CARDS') {
                                  return b
                                }
                                const cards = b.cards.map((c, j) =>
                                  j === cardIndex ? { ...c, title: v } : c,
                                )
                                return { ...b, cards }
                              }),
                            )
                          }}
                          error={fieldError(`${cardPath}.title`)}
                        />
                        <RichTextField
                          id={`${cardPath}-content`}
                          label="Card content (optional)"
                          value={card.content}
                          onChange={(html) => {
                            setBlocks((list) =>
                              list.map((b) => {
                                if (b.clientId !== block.clientId || b.type !== 'NESTED_CARDS') {
                                  return b
                                }
                                const cards = b.cards.map((c, j) =>
                                  j === cardIndex ? { ...c, content: html } : c,
                                )
                                return { ...b, cards }
                              }),
                            )
                          }}
                          error={fieldError(`${cardPath}.content`)}
                          minHeightClass="min-h-32"
                        />
                      </div>
                    )
                  })}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setBlocks((list) =>
                        list.map((b) => {
                          if (b.clientId !== block.clientId || b.type !== 'NESTED_CARDS') {
                            return b
                          }
                          return { ...b, cards: [...b.cards, { title: '', content: '' }] }
                        }),
                      )
                    }}
                  >
                    Add card
                  </Button>
                </div>
              )}
            </div>
          </SectionCard>
        )
      })}

      <div className="flex flex-wrap items-center gap-2">
        <SubmitButton>Save About Us</SubmitButton>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setBlocks((b) => [...b, defaultEmptyBlock()])}
        >
          Add block
        </Button>
      </div>
    </form>
  )
}
