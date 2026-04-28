'use client'

import { useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'

export type ToolbarState = {
  isBold: boolean
  isItalic: boolean
  isUnderline: boolean
  isStrikethrough: boolean
  isLink: boolean
  canUndo: boolean
  canRedo: boolean
}

const initialState: ToolbarState = {
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
  isLink: false,
  canUndo: false,
  canRedo: false,
}

export function useToolbarState(): ToolbarState {
  const [editor] = useLexicalComposerContext()
  const [state, setState] = useState<ToolbarState>(initialState)

  const sync = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) {
        setState((prev) => ({
          ...prev,
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isStrikethrough: false,
          isLink: false,
        }))
        return
      }

      const node = selection.anchor.getNode()
      const parent = node.getParent()
      const isLink = parent?.getType() === 'link' || node.getType() === 'link'

      setState((prev) => ({
        ...prev,
        isBold: selection.hasFormat('bold'),
        isItalic: selection.hasFormat('italic'),
        isUnderline: selection.hasFormat('underline'),
        isStrikethrough: selection.hasFormat('strikethrough'),
        isLink,
      }))
    })
  }, [editor])

  useEffect(() => {
    sync()
    return mergeRegister(
      editor.registerUpdateListener(() => sync()),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          sync()
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (canUndo) => {
          setState((prev) => ({ ...prev, canUndo }))
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (canRedo) => {
          setState((prev) => ({ ...prev, canRedo }))
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor, sync])

  return state
}
