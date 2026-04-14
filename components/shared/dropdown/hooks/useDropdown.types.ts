import type { UseSelectReturnValue as DownshiftUseSelectReturnValue } from 'downshift'

import type {
  DropdownOption,
  DropdownProps,
  SelectedOption,
  SelectedValue,
} from '../dropdown.types'

export interface UseDropdownParams {
  options: DropdownOption[]
  defaultValue?: SelectedValue
  onChange?: (selectedValue: SelectedValue) => void
  selectedValue?: SelectedValue
  multiple: DropdownProps['multiple']
  id?: string
}

type UseSelectReturnValue = DownshiftUseSelectReturnValue<DropdownOption>

export interface UseDropdownResult {
  isOpen: boolean
  getToggleButtonProps: UseSelectReturnValue['getToggleButtonProps']
  getLabelProps: UseSelectReturnValue['getLabelProps']
  getMenuProps: UseSelectReturnValue['getMenuProps']
  highlightedIndex: UseSelectReturnValue['highlightedIndex']
  getItemProps: UseSelectReturnValue['getItemProps']
  selectedValue?: SelectedValue
  setSelectedValue: (value: SelectedValue) => void
  selectedOption: SelectedOption
}
