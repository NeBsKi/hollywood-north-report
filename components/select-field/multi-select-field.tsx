'use client'

import { useMemo, useState } from 'react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { normalizeSelectorOptions, type SelectorOption } from './select-field-types'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface MultiSelectFieldProps {
  id: string
  name: string
  label: string
  options: SelectorOption[]
  defaultValues?: string[]
  helper?: string
  wrapperClassName?: string
}

export function MultiSelectField({
  id,
  name,
  label,
  options,
  defaultValues,
  helper,
  wrapperClassName = 'space-y-1.5',
}: MultiSelectFieldProps) {
  const normalizedOptions = useMemo(() => normalizeSelectorOptions(options), [options])
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<string[]>(defaultValues ?? [])

  const summaryLabel = useMemo(() => {
    if (!values.length) return `Select ${label.toLowerCase()}`
    return normalizedOptions
      .filter((option) => values.includes(option.value))
      .map((option) => option.label)
      .join(', ')
  }, [label, normalizedOptions, values])

  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id}>{label}</Label>
      <input type="hidden" id={id} name={name} value={values.join(',')} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-9 w-full justify-between"
          >
            <span className="truncate text-left">{summaryLabel}</span>
            <ChevronsUpDownIcon className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {normalizedOptions.map((option) => {
                  const selected = values.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        setValues((prev) =>
                          selected
                            ? prev.filter((value) => value !== option.value)
                            : [...prev, option.value],
                        )
                      }}
                    >
                      <CheckIcon className={cn('size-4', selected ? 'opacity-100' : 'opacity-0')} />
                      {option.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {helper && <p className="text-muted-foreground text-xs">{helper}</p>}
    </div>
  )
}
