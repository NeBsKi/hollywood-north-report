'use client'

import { useMemo } from 'react'
import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

import { cn } from '@/lib/utils'
import { richTextNodes, richTextTheme } from './config'
import { HtmlOnChangePlugin, HtmlValuePlugin } from './plugins'
import { Toolbar } from './toolbar'

export type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  ariaLabel?: string
  ariaInvalid?: boolean
  minHeightClass?: string
  /** Lexical namespace - keep unique per editor type if you have multiple kinds. */
  namespace?: string
}

export function RichTextEditor({
  value,
  onChange,
  ariaLabel,
  ariaInvalid,
  minHeightClass = 'min-h-40',
  namespace = 'RichText',
}: RichTextEditorProps) {
  const initialConfig = useMemo<InitialConfigType>(
    () => ({
      namespace,
      theme: richTextTheme,
      nodes: richTextNodes,
      onError: (error: Error) => {
        console.error('Lexical editor error:', error)
      },
    }),
    [namespace],
  )

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        aria-invalid={ariaInvalid || undefined}
        className={cn(
          'border-input focus-within:border-ring focus-within:ring-ring/50 rounded-lg border shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]',
          ariaInvalid &&
            'border-destructive ring-destructive/20 dark:ring-destructive/40 dark:border-destructive/50',
        )}
      >
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              aria-label={ariaLabel}
              aria-invalid={ariaInvalid || undefined}
              className={cn(
                'w-full resize-none px-3 py-2 text-base outline-none md:text-sm',
                minHeightClass,
              )}
            />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <HtmlValuePlugin value={value} />
        <HtmlOnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  )
}
