'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { confirmUploadAction, createUploadUrlAction } from '../actions'
import { MAX_UPLOAD_BYTES } from '../schemas'
import {
  formatFileSize,
  isAllowedMime,
  readImageDimensions,
  uploadToS3,
} from '../utils'

type Stage = 'idle' | 'preparing' | 'uploading' | 'finalizing'

function getUnsupportedTypeMessage() {
  return 'Unsupported file type. Allowed: JPG, PNG, WEBP, AVIF.'
}

export function useMediaUploader() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [stage, setStage] = useState<Stage>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const clearSelection = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setPreviewUrl(null)
  }, [previewUrl])

  const reset = useCallback(() => {
    clearSelection()
    setStage('idle')
    setProgress(0)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }, [clearSelection])

  const onSelect = useCallback(
    (next: File | null) => {
      setError(null)
      setProgress(0)
      setStage('idle')

      if (!next) {
        clearSelection()
        return
      }

      if (!isAllowedMime(next.type)) {
        clearSelection()
        setError(getUnsupportedTypeMessage())
        return
      }

      if (next.size > MAX_UPLOAD_BYTES) {
        clearSelection()
        setError(
          `File is too large. Max size is ${formatFileSize(MAX_UPLOAD_BYTES)}.`,
        )
        return
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setFile(next)
      setPreviewUrl(URL.createObjectURL(next))
    },
    [clearSelection, previewUrl],
  )

  const onUpload = useCallback(async () => {
    if (!file) return
    setError(null)

    try {
      setStage('preparing')
      const contentType = file.type
      if (!isAllowedMime(contentType)) {
        throw new Error(getUnsupportedTypeMessage())
      }

      const presigned = await createUploadUrlAction({
        fileName: file.name,
        contentType,
        size: file.size,
      })

      setStage('uploading')
      await uploadToS3(presigned.uploadUrl, file, setProgress)

      setStage('finalizing')
      const dims = await readImageDimensions(file)
      await confirmUploadAction({
        key: presigned.key,
        fileName: file.name,
        contentType,
        size: file.size,
        width: dims.width,
        height: dims.height,
      })

      toast.success('Upload complete')
      startTransition(() => {
        router.push('/admin/media')
        router.refresh()
      })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Upload failed'
      setError(message)
      setStage('idle')
      setProgress(0)
      toast.error(message)
    }
  }, [file, router, startTransition])

  return {
    inputRef,
    file,
    previewUrl,
    stage,
    progress,
    error,
    busy: stage !== 'idle' || isPending,
    onSelect,
    onUpload,
    reset,
    maxFileSizeLabel: formatFileSize(MAX_UPLOAD_BYTES),
  }
}
