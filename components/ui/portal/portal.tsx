'use client'

import * as React from 'react'

import { createPortal } from 'react-dom'
import { isBrowser } from '@/lib/utils'

export interface PortalProps {
  children: React.ReactNode
  container?: Element | null
  disablePortal?: boolean
}

export const Portal = ({ children, container, disablePortal = false }: PortalProps) => {
  if (disablePortal || !isBrowser()) {
    if (React.isValidElement(children)) {
      return children
    }
    return null
  }

  const mountNode = container || document.body
  return createPortal(children, mountNode)
}
