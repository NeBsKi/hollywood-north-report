'use client'

import { ImagePlus, Loader2, UploadCloud, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaUploader } from '../_lib/hooks/use-media-uploader'
import { MEDIA_ACCEPT, formatFileSize } from '../_lib/utils'

export function MediaUploader() {
  const {
    inputRef,
    file,
    previewUrl,
    stage,
    progress,
    error,
    busy,
    onSelect,
    onUpload,
    reset,
    maxFileSizeLabel,
  } = useMediaUploader()

  return (
    <div className="max-w-xl space-y-4">
      <label
        htmlFor="media-file"
        className="bg-muted/30 hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-8 text-center transition"
      >
        <ImagePlus className="text-muted-foreground h-8 w-8" />
        <div className="text-sm">
          <span className="font-medium">Click to choose a file</span>
          <span className="text-muted-foreground"> or drag and drop</span>
        </div>
        <p className="text-muted-foreground text-xs">
          JPG, PNG, WEBP or AVIF. Up to {maxFileSizeLabel}.
        </p>
        <input
          id="media-file"
          ref={inputRef}
          type="file"
          accept={MEDIA_ACCEPT}
          className="sr-only"
          disabled={busy}
          onChange={(e) => onSelect(e.target.files?.[0] ?? null)}
        />
      </label>

      {file && previewUrl && (
        <div className="space-y-3 rounded-md border p-3">
          <div className="flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={file.name}
              className="bg-muted h-20 w-20 rounded object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-muted-foreground text-xs">
                {file.type} · {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={reset}
              disabled={busy}
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {(stage === 'uploading' || stage === 'finalizing') && (
            <div className="space-y-1">
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full transition-[width] duration-200"
                  style={{
                    width: `${stage === 'finalizing' ? 100 : progress}%`,
                  }}
                />
              </div>
              <p className="text-muted-foreground text-xs">
                {stage === 'uploading'
                  ? `Uploading… ${progress}%`
                  : 'Finalizing…'}
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-destructive text-sm">{error}</p>}

      <div className="flex items-center gap-2">
        <Button onClick={onUpload} disabled={!file || busy}>
          {busy ? (
            <>
              <Loader2 className="animate-spin" />
              {stage === 'preparing' && 'Preparing…'}
              {stage === 'uploading' && 'Uploading…'}
              {stage === 'finalizing' && 'Saving…'}
              {stage === 'idle' && 'Loading…'}
            </>
          ) : (
            <>
              <UploadCloud />
              Upload
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={reset}
          disabled={busy || !file}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
