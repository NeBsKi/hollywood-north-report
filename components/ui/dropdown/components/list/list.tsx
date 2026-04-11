import { cn } from '@/lib/utils'

import type { DropdownListProps, DropdownProps, SelectedValue } from '../../dropdown.types'
import type { UseDropdownResult } from '../../hooks/useDropdown.types'
import { ListItem } from '../list-item'
import { usePosition } from '../../hooks/usePosition'

import { useAnimatedAppearing } from './useAnimatedAppearing'

interface ListProps extends DropdownListProps {
  listProps: any
  dropdownBtnEl: Element | null
  options: NonNullable<DropdownProps['options']>
  selectedValue?: SelectedValue
  highlightedIndex: number
  rootWidth: number
  isOpen: boolean
  getItemProps: UseDropdownResult['getItemProps']
  renderOption?: DropdownProps['renderOption']
  multiple: DropdownProps['multiple']
  variation: NonNullable<DropdownProps['variation']>
}

export const List = ({
  options,
  rootWidth,
  isOpen,
  highlightedIndex,
  getItemProps,
  listProps,
  renderOption,
  selectedValue,
  style,
  dropdownBtnEl,
  alignment = 'left',
  matchWidth = false,
  multiple,
  variation,
  className,
  rootClassName,
  ...otherProps
}: ListProps) => {
  const { popperStyles, popperAttributes, setOptionsListEl } = usePosition(dropdownBtnEl, alignment)
  const listRef = useAnimatedAppearing({ isOpen })

  return (
    <div
      ref={setOptionsListEl}
      {...(isOpen ? popperAttributes : {})}
      key={`${isOpen}`}
      className={cn('z-50', !isOpen && 'hidden', rootClassName)}
      style={{
        ...(matchWidth ? { width: rootWidth } : {}),
        minWidth: 120,
        ...style,
        ...popperStyles,
      }}
    >
      <ul
        className={cn(
          'border-accent-100 bg-white-500 max-w-100 overflow-hidden rounded-md border py-1 shadow-lg transition-opacity duration-150',
          variation === 'form' && 'rounded-lg',
          multiple && 'py-2',
          className,
        )}
        {...listProps}
        ref={listProps.ref ? listProps.ref(listRef) : listRef}
        {...otherProps}
      >
        {isOpen &&
          options.map((option, index) => (
            <ListItem
              key={option.value}
              item={option}
              highlightedIndex={highlightedIndex}
              index={index}
              getItemProps={getItemProps}
              selectedValue={selectedValue}
              renderOption={renderOption}
              multiple={multiple}
              variation={variation}
            />
          ))}
      </ul>
    </div>
  )
}
