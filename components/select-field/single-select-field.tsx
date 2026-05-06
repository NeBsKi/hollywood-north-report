'use client'

import { useMemo, useState } from 'react'
import { normalizeSelectorOptions, type SelectorOption } from './select-field-types'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface SingleSelectFieldProps {
  id: string
  name: string
  label: string
  options: SelectorOption[]
  helper?: string
  defaultValue?: string
  wrapperClassName?: string
}

export function SingleSelectField({
  id,
  name,
  label,
  options,
  helper,
  defaultValue,
  wrapperClassName = 'space-y-1.5',
}: SingleSelectFieldProps) {
  const normalizedOptions = useMemo(() => normalizeSelectorOptions(options), [options])
  const [value, setValue] = useState<string>(defaultValue ?? normalizedOptions[0]?.value ?? '')

  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id}>{label}</Label>
      <input type="hidden" id={id} name={name} value={value} />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {normalizedOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helper && <p className="text-muted-foreground text-xs">{helper}</p>}
    </div>
  )
}
