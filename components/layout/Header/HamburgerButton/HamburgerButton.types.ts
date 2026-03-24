import { ButtonHTMLAttributes } from 'react'

export interface HamburgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean
  lineClassName?: string
}
