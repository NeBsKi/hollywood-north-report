'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import * as motion from 'motion/react-client'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import type { PostsFilters as PostsFiltersData } from '@/lib/posts/posts.types'

const FILTER_PARAMS = ['categories', 'genres', 'years', 'festivals'] as const

type FilterKey = (typeof FILTER_PARAMS)[number]

type FilterOption = { value: string; label: string }

interface PostFiltersProps {
  filters: PostsFiltersData
}

const parseParam = (value: string | null): string[] => {
  if (!value) return []
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

interface MultiComboboxProps {
  label: string
  options: FilterOption[]
  selected: string[]
  onChange: (next: string[]) => void
  disabled?: boolean
}

function MultiCombobox({ label, options, selected, onChange, disabled }: MultiComboboxProps) {
  const [open, setOpen] = useState(false)

  const summary = useMemo(() => {
    if (selected.length === 0) return label
    if (selected.length === 1) {
      const match = options.find((option) => option.value === selected[0])
      return match?.label ?? label
    }
    return `${label} (${selected.length})`
  }, [label, options, selected])

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((current) => current !== value)
        : [...selected, value],
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-label={label}
          aria-expanded={open}
          disabled={disabled}
          className="bg-white-500/50 border-secondary-200 hover:bg-white-500 h-10 justify-between gap-2"
        >
          <span
            className={cn('truncate text-left', selected.length === 0 && 'text-muted-foreground')}
          >
            {summary}
          </span>
          <ChevronDown className="text-accent-300 size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-48 p-0">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => toggle(option.value)}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox
                      checked={isSelected}
                      tabIndex={-1}
                      aria-hidden
                      className="data-[state=checked]:bg-secondary-500 data-[state=checked]:border-secondary-500 data-[state=checked]:text-white-500 pointer-events-none size-5"
                    />
                    <span className="text-accent-500 text-sm">{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function PostFilters({ filters }: PostFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const updateParam = (key: FilterKey, values: string[]) => {
    const sp = new URLSearchParams(searchParams.toString())
    sp.delete('page')

    if (values.length > 0) {
      sp.set(key, values.join(','))
    } else {
      sp.delete(key)
    }

    const query = sp.toString()
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname)
    })
  }

  const items: Array<{ key: FilterKey; label: string; options: FilterOption[] }> = [
    { key: 'categories', label: 'Category', options: filters.categories },
    { key: 'genres', label: 'Genre', options: filters.genres },
    { key: 'years', label: 'Year', options: filters.years },
    { key: 'festivals', label: 'Festival', options: filters.festivals },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-wrap gap-3"
      aria-busy={isPending}
      data-pending={isPending ? 'true' : undefined}
    >
      {items.map(({ key, label, options }) => (
        <MultiCombobox
          key={key}
          label={label}
          options={options}
          selected={parseParam(searchParams.get(key))}
          onChange={(values) => updateParam(key, values)}
          disabled={isPending}
        />
      ))}
    </motion.div>
  )
}
