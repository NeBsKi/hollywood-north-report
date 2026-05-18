'use client'

import { useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isHeadingNode } from '@lexical/rich-text'
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
  blockType: 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'quote'
  isBold: boolean
  isItalic: boolean
  isUnderline: boolean
  isStrikethrough: boolean
  isLink: boolean
  canUndo: boolean
  canRedo: boolean
}

const initialState: ToolbarState = {
  blockType: 'paragraph',
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
      const topLevelElement = node.getTopLevelElementOrThrow()
      let blockType: ToolbarState['blockType'] = 'paragraph'
      if (topLevelElement.getType() === 'quote') {
        blockType = 'quote'
      } else if ($isHeadingNode(topLevelElement)) {
        const headingTag = topLevelElement.getTag()
        if (
          headingTag === 'h1' ||
          headingTag === 'h2' ||
          headingTag === 'h3' ||
          headingTag === 'h4' ||
          headingTag === 'h5' ||
          headingTag === 'h6'
        ) {
          blockType = headingTag
        }
      }

      setState((prev) => ({
        ...prev,
        blockType,
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
