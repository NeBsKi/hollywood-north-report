'use client'

import { useState } from 'react'
import type { Editor } from '@tiptap/react'
import {
  BoldIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from 'lucide-react'
import { MediaPickerDialog } from '@/app/(dashboard)/admin/media/_components/media-picker-dialog'
import { ColorPicker } from './color-picker'

import { ToolbarButton, ToolbarDivider } from './toolbar-button'

type ToolbarProps = {
  editor: Editor | null
}

export function Toolbar({ editor }: ToolbarProps) {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)

  const toggleLink = () => {
    if (!editor) return
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }

    const url = window.prompt('Enter URL')
    if (!url) return
    editor.chain().focus().setLink({ href: url }).run()
  }

  const removeList = () => {
    if (!editor) return
    if (editor.isActive('bulletList')) {
      editor.chain().focus().toggleBulletList().run()
      return
    }
    if (editor.isActive('orderedList')) {
      editor.chain().focus().toggleOrderedList().run()
    }
  }

  const setTextColor = (color: string) => {
    if (!editor) return
    editor.chain().focus().setColor(color).run()
  }

  const resetTextColor = () => {
    if (!editor) return
    editor.chain().focus().unsetColor().run()
  }

  return (
    <>
      <div className="border-input bg-muted/40 flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 px-1 py-1">
        <ToolbarButton
          label="Undo"
          disabled={!editor?.can().chain().focus().undo().run()}
          onClick={() => editor?.chain().focus().undo().run()}
        >
          <UndoIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          disabled={!editor?.can().chain().focus().redo().run()}
          onClick={() => editor?.chain().focus().redo().run()}
        >
          <RedoIcon className="size-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Bold"
          active={editor?.isActive('bold')}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor?.isActive('italic')}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor?.isActive('underline')}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={editor?.isActive('strike')}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon className="size-4" />
        </ToolbarButton>
        <ColorPicker
          value={(editor?.getAttributes('textStyle').color as string | null) ?? null}
          onChange={setTextColor}
          onReset={resetTextColor}
        />

        <ToolbarDivider />

        <ToolbarButton
          label="Paragraph"
          active={editor?.isActive('paragraph')}
          onClick={() => editor?.chain().focus().setParagraph().run()}
        >
          <span aria-hidden className="text-xs font-semibold">
            P
          </span>
        </ToolbarButton>
        <ToolbarButton
          label="Heading 1"
          active={editor?.isActive('heading', { level: 1 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <span aria-hidden className="text-xs font-semibold">
            H1
          </span>
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          active={editor?.isActive('heading', { level: 2 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <span aria-hidden className="text-xs font-semibold">
            H2
          </span>
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor?.isActive('heading', { level: 3 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <span aria-hidden className="text-xs font-semibold">
            H3
          </span>
        </ToolbarButton>
        <ToolbarButton
          label="Heading 4"
          active={editor?.isActive('heading', { level: 4 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          <span aria-hidden className="text-xs font-semibold">
            H4
          </span>
        </ToolbarButton>
        <ToolbarButton
          label="Heading 5"
          active={editor?.isActive('heading', { level: 5 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
        >
          <span aria-hidden className="text-xs font-semibold">
            H5
          </span>
        </ToolbarButton>
        <ToolbarButton
          label="Heading 6"
          active={editor?.isActive('heading', { level: 6 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}
        >
          <span aria-hidden className="text-xs font-semibold">
            H6
          </span>
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Bulleted list"
          active={editor?.isActive('bulletList')}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <ListIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor?.isActive('orderedList')}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Remove list" onClick={removeList}>
          <span aria-hidden className="text-xs font-medium">
            ✕
          </span>
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label={editor?.isActive('link') ? 'Remove link' : 'Insert link'}
          active={editor?.isActive('link')}
          onClick={toggleLink}
        >
          <LinkIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Insert image" onClick={() => setIsImagePickerOpen(true)}>
          <ImageIcon className="size-4" />
        </ToolbarButton>
      </div>
      <MediaPickerDialog
        open={isImagePickerOpen}
        onOpenChange={setIsImagePickerOpen}
        title="Insert image"
        description="Pick an image from the media library to insert into the post content."
        onSelect={(media) => {
          editor?.chain().focus().setImage({ src: media.url, alt: media.fileName }).run()
        }}
      />
    </>
  )
}
