import type { UseSelectState, UseSelectStateChangeOptions } from 'downshift'
import { useSelect } from 'downshift'

import type { DropdownOption, DropdownProps, DropdownValue, SelectedOption } from './dropdown.types'

export const stateReducer =
  (options: DropdownOption[], multiple?: boolean) =>
  (
    state: UseSelectState<DropdownOption>,
    { changes, type }: UseSelectStateChangeOptions<DropdownOption>,
  ) => {
    switch (type) {
      case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
      case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
      case useSelect.stateChangeTypes.ItemClick:
        return {
          ...changes,
          isOpen: multiple,
          highlightedIndex: state.highlightedIndex,
        }
      default:
        return changes
    }
  }

export const getSelectedOptionFromValue = (
  options: DropdownOption[],
  selectedValue?: DropdownValue,
): DropdownOption | null => {
  if (selectedValue === undefined) return null
  const option = options.find((o) => o.value?.toString() === selectedValue?.toString())

  return option ?? null
}

export const renderLabel = (
  selectedOption: SelectedOption,
  label: DropdownProps['label'],
  isStandalone: boolean,
) => {
  const isMultiSelect = Array.isArray(selectedOption)
  const selectedOptionsCounter =
    isMultiSelect && selectedOption.length > 0 ? `(${selectedOption.length})` : ''

  const resolvedLabel = isMultiSelect ? `${label} ${selectedOptionsCounter}` : selectedOption?.label

  if (isStandalone && !isMultiSelect) return selectedOption?.label

  return resolvedLabel || label
}
