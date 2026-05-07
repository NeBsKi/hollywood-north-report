'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { MediaPickerDialog } from '@/app/(dashboard)/admin/media/_components/media-picker-dialog'
import { MediaUploadDialog } from '@/app/(dashboard)/admin/media/_components/media-upload-dialog'
import type { MediaSelection } from '@/app/(dashboard)/admin/media/_lib/types'

export function PostCoverImageField({
  defaultValue,
}: {
  defaultValue?: MediaSelection | null
}) {
  const [selected, setSelected] = useState<MediaSelection | null>(defaultValue ?? null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)

  const previewUrl = selected ? (selected.thumbUrl ?? selected.url) : null

  return (
    <div className="space-y-2 rounded-lg border p-4">
      <Label htmlFor="cover-image-area">Cover image</Label>
      <input type="hidden" name="coverImageId" value={selected?.id ?? ''} />

      <div id="cover-image-area" className="space-y-3 rounded-lg border p-3">
        {selected && (
          <div className="flex items-start gap-3">
            <div className="bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded">
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt={selected.fileName}
                  fill
                  sizes="80px"
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" title={selected.fileName}>
                {selected.fileName}
              </p>
              <p className="text-muted-foreground text-xs">Selected as cover image</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSelected(null)}
              aria-label="Remove cover image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div
          className={cn('flex flex-wrap items-center gap-2', !selected && 'justify-center py-4')}
        >
          <Button type="button" variant="secondary" size="sm" onClick={() => setUploadOpen(true)}>
            Create new
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={() => setPickerOpen(true)}>
            Choose from existing
          </Button>
        </div>
      </div>

      <MediaUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUploaded={(media) => setSelected(media)}
        title="Upload cover image"
        description="Choose an image to upload. It will be added to the media library and used as the cover for this post."
      />
      <MediaPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={(media) => setSelected(media)}
        title="Choose cover image"
        description="Pick an image from the media library to use as the cover for this post."
      />
    </div>
  )
}
