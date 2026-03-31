import type { ButtonHTMLAttributes } from 'react'

export interface HamburgerBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean
  lineClassName?: string
}
