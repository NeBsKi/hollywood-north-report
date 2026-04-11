import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import type { DropdownProps, DropdownOption, SelectedValue } from '../../dropdown.types'
import type { UseDropdownResult } from '../../hooks/useDropdown.types'
import { Checkbox } from '@/components/ui/checkbox'

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  item: DropdownOption
  highlightedIndex: number
  index: number
  getItemProps: UseDropdownResult['getItemProps']
  selectedValue?: SelectedValue
  renderOption?: DropdownProps['renderOption']
  multiple: DropdownProps['multiple']
  variation: NonNullable<DropdownProps['variation']>
}

export const ListItem = ({
  item,
  highlightedIndex,
  getItemProps,
  index,
  selectedValue,
  multiple,
  variation,
  className,
  renderOption,
  ...rest
}: ListItemProps) => {
  const isMultiple = multiple && Array.isArray(selectedValue)

  const isSelected = isMultiple ? selectedValue.includes(item.value) : selectedValue === item.value

  return (
    <li
      className={cn(
        'flex cursor-pointer items-center px-3 py-2 text-sm transition-colors',
        highlightedIndex === index && 'bg-background-light',
        className,
      )}
      {...getItemProps({
        item,
        index,
        disabled: item.disabled,
        'aria-selected': isSelected,
      })}
      {...rest}
    >
      {renderOption?.(item, selectedValue) ?? (
        <>
          {isMultiple && (
            <div className="mr-2 shrink-0">
              <Checkbox />
            </div>
          )}
          <div
            className={cn(
              'text-accent-500 truncate',
              variation === 'form' && 'text-sm',
              item.disabled && 'text-accent-200 pointer-events-none',
            )}
          >
            {item.label}
          </div>
        </>
      )}
    </li>
  )
}
