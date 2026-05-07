'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { MediaUploader } from './media-uploader'
import type { MediaSelection } from '../_lib/types'

export type MediaUploadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploaded: (media: MediaSelection) => void
  title?: string
  description?: string
}

export function MediaUploadDialog({
  open,
  onOpenChange,
  onUploaded,
  title = 'Upload image',
  description = 'Choose an image to upload. It will be added to the media library.',
}: MediaUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <MediaUploader
          className="w-full max-w-none"
          onUploaded={(media) => {
            onUploaded(media)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
