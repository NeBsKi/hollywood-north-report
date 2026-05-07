'use client'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import { FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND, type TextFormatType } from 'lexical'
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from 'lucide-react'

import { ToolbarButton, ToolbarDivider } from './toolbar-button'
import { useToolbarState } from './use-toolbar-state'
import ImagePlugin from './plugins/ImagePlugin'

export function Toolbar() {
  const [editor] = useLexicalComposerContext()
  const state = useToolbarState()

  const toggleFormat = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const insertList = (kind: 'ul' | 'ol') => {
    editor.dispatchCommand(
      kind === 'ul' ? INSERT_UNORDERED_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND,
      undefined,
    )
  }

  const removeList = () => {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
  }

  const toggleLink = () => {
    if (state.isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
      return
    }
    const url = window.prompt('Enter URL')
    if (!url) return
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url)
  }

  return (
    <div className="border-input bg-muted/40 flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 px-1 py-1">
      <ToolbarButton
        label="Undo"
        disabled={!state.canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <UndoIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={!state.canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <RedoIcon className="size-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton label="Bold" active={state.isBold} onClick={() => toggleFormat('bold')}>
        <BoldIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Italic" active={state.isItalic} onClick={() => toggleFormat('italic')}>
        <ItalicIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={state.isUnderline}
        onClick={() => toggleFormat('underline')}
      >
        <UnderlineIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={state.isStrikethrough}
        onClick={() => toggleFormat('strikethrough')}
      >
        <StrikethroughIcon className="size-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton label="Bulleted list" onClick={() => insertList('ul')}>
        <ListIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" onClick={() => insertList('ol')}>
        <ListOrderedIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Remove list" onClick={removeList}>
        <span aria-hidden className="text-xs font-medium">
          ✕
        </span>
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        label={state.isLink ? 'Remove link' : 'Insert link'}
        active={state.isLink}
        onClick={toggleLink}
      >
        <LinkIcon className="size-4" />
      </ToolbarButton>
      <ImagePlugin />
    </div>
  )
}
