'use client'

import { useState } from 'react'
import { RichTextField } from '@/components/shared/rich-text'

export function PostContentEditor({ content }: { content: string }) {
  const [contentState, setContentState] = useState(content)

  return (
    <div className="space-y-1.5">
      <input type="hidden" name="content" value={contentState} />
      <RichTextField
        id="content"
        label="Content"
        value={contentState}
        onChange={setContentState}
        minHeightClass="min-h-64"
      />
    </div>
  )
}
