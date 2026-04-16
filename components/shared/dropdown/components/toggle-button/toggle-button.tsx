import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

import type { DropdownProps, DropdownOption } from '../../dropdown.types'
import { ToggleButtonLabel } from '../toggle-button-label'
import { ChevronRight } from '@/components/icons'

interface ToggleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  renderButtonLabel: DropdownProps['renderButtonLabel']
  label?: string
  isOpen: boolean
  noBorder: boolean
  selectedOption: DropdownOption[] | DropdownOption
  variation: NonNullable<DropdownProps['variation']>
  error?: NonNullable<DropdownProps['error']>
  valid: DropdownProps['valid']
  shouldShowAsterisk?: boolean
  readOnly: DropdownProps['readOnly']
  footnote?: DropdownProps['footnote']
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      isOpen,
      renderButtonLabel,
      label,
      selectedOption,
      noBorder,
      variation,
      error,
      valid,
      disabled,
      readOnly,
      shouldShowAsterisk,
      footnote,
      ...rest
    },
    ref,
  ) => {
    const isFormVariation = variation === 'form'
    const hasError = isFormVariation && Boolean(error)
    const isValid = isFormVariation && valid && !hasError

    return (
      <>
        <button
          type="button"
          className={cn(
            'bg-white-500 flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
            'border-accent-100 hover:border-accent-300',
            isOpen && 'border-primary-500 ring-primary-500/20 ring-1',
            noBorder && 'border-transparent',
            hasError && 'border-primary-500 ring-primary-500/20 ring-1',
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            readOnly && 'bg-background-light pointer-events-none',
            variation === 'form' && 'rounded-lg py-2.5',
          )}
          disabled={disabled || readOnly}
          ref={ref}
          {...rest}
        >
          <ToggleButtonLabel
            renderButtonLabel={renderButtonLabel}
            label={label}
            selectedOption={selectedOption}
            variation={variation}
            shouldShowAsterisk={shouldShowAsterisk}
          />
          {isValid && <div className="text-green-600">CheckCircle</div>}
          <div
            className={cn(
              'text-accent-400 shrink-0 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          >
            <ChevronRight className="h-4 w-4 rotate-90" />
          </div>
        </button>
        {footnote && <div className="text-accent-300 mt-1 text-xs">{footnote}</div>}
        {hasError && <div className="text-primary-500 mt-1 text-xs">{error}</div>}
      </>
    )
  },
)
