'use client'

import dynamic from 'next/dynamic'
import { Label } from '@/components/ui/label'
import type { RichTextEditorProps } from './rich-text-editor'

const RichTextEditor = dynamic(
  () => import('./rich-text-editor').then((m) => m.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="border-input bg-muted/30 text-muted-foreground rounded-lg border px-3 py-2 text-sm">
        Loading editor…
      </div>
    ),
  },
)

type RichTextFieldProps = {
  id: string
  label: string
  value: string
  onChange: (html: string) => void
  description?: string
  error?: string
  minHeightClass?: RichTextEditorProps['minHeightClass']
  namespace?: RichTextEditorProps['namespace']
}

export function RichTextField({
  id,
  label,
  value,
  onChange,
  description,
  error,
  minHeightClass,
  namespace,
}: RichTextFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div id={id}>
        <RichTextEditor
          value={value}
          onChange={onChange}
          ariaLabel={label}
          ariaInvalid={!!error}
          minHeightClass={minHeightClass}
          namespace={namespace}
        />
      </div>
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
