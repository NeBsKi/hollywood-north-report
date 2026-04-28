'use client'

import { useCallback, useEffect, useRef } from 'react'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { $getRoot, $insertNodes, type EditorState, type LexicalEditor } from 'lexical'

import { EXTERNAL_VALUE_TAG } from './config'

export function HtmlValuePlugin({ value }: { value: string }) {
  const [editor] = useLexicalComposerContext()
  const lastApplied = useRef<string | null>(null)

  useEffect(() => {
    if (value === lastApplied.current) return
    lastApplied.current = value

    editor.update(
      () => {
        const root = $getRoot()
        root.clear()
        if (!value || value.trim() === '') return

        const dom = new DOMParser().parseFromString(value, 'text/html')
        const nodes = $generateNodesFromDOM(editor, dom)
        $getRoot().selectStart()
        $insertNodes(nodes)
      },
      { tag: EXTERNAL_VALUE_TAG },
    )
  }, [editor, value])

  return null
}

export function HtmlOnChangePlugin({ onChange }: { onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext()
  const lastEmitted = useRef<string | null>(null)

  const handleChange = useCallback(
    (state: EditorState, _editor: LexicalEditor, tags: Set<string>) => {
      if (tags.has(EXTERNAL_VALUE_TAG)) return
      state.read(() => {
        const html = $generateHtmlFromNodes(editor, null)
        if (html === lastEmitted.current) return
        lastEmitted.current = html
        onChange(html)
      })
    },
    [editor, onChange],
  )

  return <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
}
