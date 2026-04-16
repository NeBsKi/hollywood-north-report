import { useMemo, useState } from 'react'

import type { UseSelectStateChange } from 'downshift'
import { useSelect } from 'downshift'

import { getSelectedOptionFromValue, stateReducer } from '../dropdown.utils'
import type { DropdownOption, Value, SelectedOption, SelectedValue } from '../dropdown.types'

import type { UseDropdownParams, UseDropdownResult } from './useDropdown.types'

export const useDropdown = ({
  multiple,
  options,
  selectedValue: controlledValue,
  defaultValue = multiple ? [] : undefined,
  onChange,
  id,
}: UseDropdownParams): UseDropdownResult => {
  const [selectedValue, setSelectedValue] = useState<SelectedValue>(
    controlledValue ?? defaultValue ?? [],
  )

  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const setSelectedValueWithOnChange = (value: SelectedValue) => {
    setSelectedValue(value)
    onChange?.(value)
  }

  const handleChange = ({ selectedItem }: UseSelectStateChange<DropdownOption>) => {
    if (!selectedItem) {
      return
    }

    const currentValue = selectedItem.value

    if (!multiple || !Array.isArray(selectedValue)) {
      setSelectedValueWithOnChange(currentValue)
      return
    }

    const selectedIndex = selectedValue.indexOf(currentValue)

    if (selectedIndex > 0) {
      setSelectedValueWithOnChange([
        ...selectedValue.slice(0, selectedIndex),
        ...selectedValue.slice(selectedIndex + 1),
      ])
    } else if (selectedIndex === 0) {
      setSelectedValueWithOnChange([...selectedValue.slice(1)])
    } else {
      setSelectedValueWithOnChange([...selectedValue, currentValue])
    }
  }

  const selectedOption = useMemo((): SelectedOption => {
    if (!selectedValue && selectedValue !== 0) return null

    if (Array.isArray(selectedValue)) {
      return selectedValue.map((v) => getSelectedOptionFromValue(options, v)!)
    }

    return getSelectedOptionFromValue(options, selectedValue)
  }, [options, selectedValue])

  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getItemProps } =
    useSelect<DropdownOption>({
      id: id ? `${id}__downshift` : undefined,
      selectedItem: multiple
        ? null
        : (getSelectedOptionFromValue(options, selectedValue as Value) ?? null),
      items: options,
      onHighlightedIndexChange: (option) => {
        setHighlightedIndex(option.highlightedIndex ?? 0)
      },
      onSelectedItemChange: handleChange,
      stateReducer: stateReducer(options, multiple),
      highlightedIndex,
    })

  return {
    isOpen,
    selectedValue,
    selectedOption,
    setSelectedValue: setSelectedValueWithOnChange,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  }
}
