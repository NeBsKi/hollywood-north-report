'use client'

import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodes } from 'lexical'

import { MediaPickerDialog } from '@/app/(dashboard)/admin/media/_components/media-picker-dialog'

import { $createImageNode } from '../nodes/ImageNode'
import { ToolbarButton } from '../toolbar-button'

export default function ImagePlugin() {
  const [editor] = useLexicalComposerContext()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ToolbarButton label="Insert image" onClick={() => setIsOpen(true)}>
        <ImageIcon className="size-4" />
      </ToolbarButton>
      <MediaPickerDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Insert image"
        description="Pick an image from the media library to insert into the post content."
        onSelect={(media) => {
          editor.update(() => {
            $insertNodes([
              $createImageNode({ src: media.url, altText: media.fileName }),
            ])
          })
        }}
      />
    </>
  )
}
