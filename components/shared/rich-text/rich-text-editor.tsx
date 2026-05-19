'use client'

import { useEffect } from 'react'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { cn } from '@/lib/utils'
import { Toolbar } from './toolbar'

const EDITOR_CONTENT_CLASS =
  'w-full resize-none px-3 py-2 text-base outline-none md:text-sm [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-muted-foreground [&_blockquote]:pl-3 [&_blockquote]:italic [&_h1]:my-4 [&_h1]:text-[2.5rem] [&_h1]:leading-tight [&_h1]:font-semibold [&_h2]:my-3 [&_h2]:text-[2rem] [&_h2]:leading-tight [&_h2]:font-semibold [&_h3]:my-3 [&_h3]:text-[1.75rem] [&_h3]:leading-snug [&_h3]:font-semibold [&_h4]:my-2 [&_h4]:text-[1.5rem] [&_h4]:leading-snug [&_h4]:font-semibold [&_h5]:my-2 [&_h5]:text-[1.25rem] [&_h5]:leading-normal [&_h5]:font-semibold [&_h6]:my-2 [&_h6]:text-[1.125rem] [&_h6]:leading-normal [&_h6]:font-semibold [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5'

export type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  ariaLabel?: string
  ariaInvalid?: boolean
  minHeightClass?: string
  maxHeightClass?: string
  namespace?: string
}

export function RichTextEditor({
  value,
  onChange,
  ariaLabel,
  ariaInvalid,
  minHeightClass = 'min-h-40',
  maxHeightClass = 'max-h-96',
  namespace = 'RichText',
}: RichTextEditorProps) {
  const editor = useEditor(
    {
      editorProps: {
        attributes: {
          class: EDITOR_CONTENT_CLASS,
        },
      },
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3, 4, 5, 6] },
        }),
        Underline,
        TextStyle,
        Color,
        Link.configure({
          openOnClick: false,
          autolink: true,
        }),
        Image.configure({
          inline: false,
          allowBase64: false,
        }),
      ],
      content: value || '',
      immediatelyRender: false,
      onUpdate: ({ editor: currentEditor }) => {
        const html = currentEditor.getHTML()
        onChange(html === '<p></p>' ? '' : html)
      },
    },
    [namespace],
  )

  useEffect(() => {
    if (!editor) return

    const currentHtml = editor.getHTML()
    const normalizedCurrent = currentHtml === '<p></p>' ? '' : currentHtml
    const normalizedValue = value || ''
    if (normalizedCurrent === normalizedValue) return

    editor.commands.setContent(normalizedValue, { emitUpdate: false })
  }, [editor, value])

  return (
    <div
      aria-invalid={ariaInvalid || undefined}
      className={cn(
        'border-input focus-within:border-ring focus-within:ring-ring/50 rounded-lg border shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]',
        ariaInvalid &&
          'border-destructive ring-destructive/20 dark:ring-destructive/40 dark:border-destructive/50',
      )}
    >
      <Toolbar editor={editor} />
      <div
        className={cn(
          'w-full overflow-y-auto',
          minHeightClass,
          maxHeightClass,
          '[&_.ProseMirror]:min-h-full',
        )}
      >
        <EditorContent
          editor={editor}
          aria-label={ariaLabel}
          aria-invalid={ariaInvalid || undefined}
          className="w-full"
        />
      </div>
    </div>
  )
}
