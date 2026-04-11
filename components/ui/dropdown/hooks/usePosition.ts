import { useMemo, useState } from 'react'

import { usePopper } from 'react-popper'

import type { ListAlignment } from '../dropdown.types'

export const usePosition = (dropdownBtnEl: Element | null, alignment: ListAlignment = 'left') => {
  const [optionsListEl, setOptionsListEl] = useState<HTMLDivElement | null>(null)

  const {
    styles: { popper: popperStyles },
    attributes: { popper: popperAttributes },
  } = usePopper(dropdownBtnEl, optionsListEl, {
    placement: alignment === 'right' ? 'bottom-end' : 'bottom-start',
  })

  return useMemo(
    () => ({
      setOptionsListEl,
      popperStyles,
      popperAttributes,
    }),
    [popperAttributes, popperStyles],
  )
}
