'use client'

import type { ChangeEvent, HTMLAttributes } from 'react'

import clsx from 'clsx'

export interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  inputProps?: HTMLAttributes<HTMLInputElement>
}

export const Checkbox = ({
  checked = false,
  disabled = false,
  onChange,
  error,
  inputProps,
}: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }

  return (
    <span
      className={clsx(
        'border-accent-100 bg-white-500 relative inline-flex items-center justify-center rounded-sm border p-1',
        error && 'border-error-100 bg-error-50',
        disabled && 'border-accent-100 bg-accent-50',
      )}
    >
      <input
        className="absolute top-0 left-0 h-full w-full opacity-0"
        type="checkbox"
        disabled={disabled}
        onChange={handleChange}
        checked={checked}
        {...inputProps}
      />
      <span className="bg-accent-100 h-4 w-4 rounded-sm" />
    </span>
  )
}
