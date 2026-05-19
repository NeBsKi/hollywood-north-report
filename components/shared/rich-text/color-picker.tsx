'use client'

import { PipetteIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const PRESET_COLORS = [
  '#111827',
  '#374151',
  '#6b7280',
  '#dc2626',
  '#ea580c',
  '#ca8a04',
  '#16a34a',
  '#0891b2',
  '#2563eb',
  '#7c3aed',
]

type ColorPickerProps = {
  value: string | null
  onChange: (nextColor: string) => void
  onReset: () => void
}

export function ColorPicker({ value, onChange, onReset }: ColorPickerProps) {
  const triggerColor = value || '#111827'
  const pickerColor = /^#[0-9a-f]{6}$/i.test(triggerColor) ? triggerColor : '#111827'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Text color"
          title="Text color"
          className="hover:bg-accent hover:text-accent-foreground inline-flex h-7 w-7 items-center justify-center rounded-md text-sm transition-colors"
        >
          <span className="relative inline-flex h-4 w-4 items-center justify-center">
            <PipetteIcon className="size-3.5" />
            <span
              className={cn(
                'absolute -bottom-0.5 left-0.5 h-0.5 w-3 rounded-full',
                !value && 'opacity-50',
              )}
              style={{ backgroundColor: triggerColor }}
            />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 space-y-3 p-3" align="start">
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={pickerColor}
            onChange={(event) => onChange(event.target.value)}
            className="h-8 w-10 cursor-pointer p-1"
            aria-label="Choose text color"
          />
          <Input
            type="text"
            value={value || ''}
            placeholder="#111827"
            onChange={(event) => onChange(event.target.value)}
            className="h-8"
            aria-label="Text color hex value"
          />
        </div>

        <div className="grid grid-cols-5 gap-2">
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={cn(
                'border-border h-6 w-6 rounded border transition-transform hover:scale-105',
                value === preset && 'ring-ring ring-2 ring-offset-1',
              )}
              style={{ backgroundColor: preset }}
              onClick={() => onChange(preset)}
              aria-label={`Use ${preset} text color`}
              title={preset}
            />
          ))}
        </div>

        <Button type="button" variant="ghost" size="sm" className="h-7 w-full" onClick={onReset}>
          Reset color
        </Button>
      </PopoverContent>
    </Popover>
  )
}
