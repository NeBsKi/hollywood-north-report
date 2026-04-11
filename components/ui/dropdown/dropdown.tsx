'use client'

import { useCallback, useMemo, useRef, useState } from 'react'

import { useResizeDetector } from 'react-resize-detector'

import { Portal } from '@/components/ui/portal'

import type { DropdownProps } from './dropdown.types'
import { useDropdown } from './hooks/useDropdown'
import { List, ToggleButton } from './components'
import { optionsMock } from './dropdown.mock'

export const Dropdown = ({
  label,
  options = optionsMock,
  defaultValue,
  selectedValue: selectedValueProp,
  onChange,
  toggleButtonProps: toggleButtonPropsProp,
  renderOption,
  renderButtonLabel,
  noBorder = false,
  listProps,
  disablePortal = false,
  variation = 'standalone',
  multiple = false,
  readOnly = false,
  error,
  valid = false,
  disabled = false,
  required = false,
  downshiftId,
  footnote,
  ...rest
}: DropdownProps) => {
  const {
    isOpen,
    selectedValue,
    selectedOption,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useDropdown({
    options,
    selectedValue: selectedValueProp,
    defaultValue,
    onChange,
    multiple,
    id: downshiftId,
  })

  const [dropdownBtnEl, setDropdownBtnEl] = useState<HTMLButtonElement | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)

  const { width: rootWidth = 0 } = useResizeDetector<HTMLDivElement>({
    observerOptions: { box: 'border-box' },
    targetRef: rootRef,
  })

  const toggleBtnProps = useMemo(
    () => ({
      ...getToggleButtonProps({
        'aria-labelledby': undefined,
        'aria-label': label,
      }),
      ...toggleButtonPropsProp,
    }),
    [getToggleButtonProps, label, toggleButtonPropsProp],
  )

  const handleToggleBtnRef = useCallback(
    (ref: HTMLButtonElement) => {
      setDropdownBtnEl(ref)
      toggleBtnProps.ref(ref)
    },
    [toggleBtnProps],
  )

  return (
    <div ref={rootRef} {...rest}>
      <ToggleButton
        isOpen={isOpen}
        selectedOption={selectedOption}
        renderButtonLabel={renderButtonLabel}
        label={label}
        noBorder={noBorder}
        variation={variation}
        error={error}
        valid={valid}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        footnote={footnote}
        {...toggleBtnProps}
        ref={handleToggleBtnRef}
      />

      <Portal disablePortal={disablePortal}>
        <List
          dropdownBtnEl={dropdownBtnEl}
          options={options}
          selectedValue={selectedValue}
          isOpen={isOpen}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
          listProps={getMenuProps()}
          rootWidth={rootWidth}
          renderOption={renderOption}
          multiple={multiple}
          variation={variation}
          {...listProps}
        />
      </Portal>
    </div>
  )
}
