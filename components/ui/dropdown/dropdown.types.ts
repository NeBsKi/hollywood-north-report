import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface DropdownGTMActions {
  dropdownSelect: string
}

export type Value = string | number | null

export type SelectedValue = Value | Value[]

export type DropdownValue = string | number | Value[] | null

export type SelectedOption = DropdownOption[] | DropdownOption | null

export interface DropdownOption {
  label: string
  value: Value
  disabled?: boolean
  gtmSort?: string
}

export interface DropdownProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'className' | 'defaultValue'
> {
  options?: DropdownOption[]
  selectedValue?: SelectedValue
  defaultValue?: SelectedValue
  onChange?: (selectedValue: SelectedValue) => void
  renderButtonLabel?: (selectedValue: SelectedOption) => ReactNode
  renderOption?: (option: DropdownOption, selectedValue?: SelectedValue) => ReactNode
  toggleButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  listProps?: DropdownListProps
  disablePortal?: boolean
  label?: string
  noBorder?: boolean
  variation?: 'standalone' | 'form'
  multiple?: boolean
  valid?: boolean
  error?: string
  readOnly?: boolean
  disabled?: boolean
  required?: boolean
  downshiftId?: string
  footnote?: string
}

export type ListAlignment = 'left' | 'right'

export interface DropdownListProps extends HTMLAttributes<HTMLUListElement> {
  alignment?: ListAlignment
  matchWidth?: boolean
  rootClassName?: string
}
