import { cn } from '@/lib/utils'

import { renderLabel } from '../../dropdown.utils'
import type { DropdownProps, SelectedOption } from '../../dropdown.types'

interface ToggleButtonLabelProps {
  renderButtonLabel?: DropdownProps['renderButtonLabel']
  label?: string
  selectedOption: SelectedOption
  variation: NonNullable<DropdownProps['variation']>
  shouldShowAsterisk?: boolean
}

export const ToggleButtonLabel = ({
  renderButtonLabel,
  label,
  selectedOption,
  variation,
  shouldShowAsterisk,
}: ToggleButtonLabelProps) => {
  const isStandalone = variation === 'standalone'

  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col items-start',
        variation === 'form' && 'gap-0.5',
      )}
    >
      {renderButtonLabel?.(selectedOption) || (
        <>
          {label && isStandalone && (
            <div className="text-xs font-medium text-accent-300">{label}</div>
          )}
          <div
            className={cn(
              'truncate text-accent-500',
              variation === 'form' && 'text-sm',
            )}
          >
            {renderLabel(selectedOption, label, isStandalone)}
          </div>
          {shouldShowAsterisk && <div className="ml-0.5 text-primary-500">*</div>}
        </>
      )}
    </div>
  )
}
