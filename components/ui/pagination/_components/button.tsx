import { tv } from 'tailwind-variants'

import type { ButtonProps } from '../pagination.types'

const buttonVariants = tv({
  base: [
    'flex items-center justify-center text-accent-500 rounded-full w-8 h-8 cursor-pointer',
    'text-base/6 font-medium font-brandon',
  ],
  variants: {
    selected: {
      true: [
        'bg-secondary-300 border border-secondary-100',
        'active:bg-secondary-500 active:text-secondary-900',
      ],
      false: 'bg-transparent',
    },
    variant: {
      page: '',
      icon: '',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
  },
})

export const Button = ({
  selected = false,
  disabled = false,
  variant = 'page',
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={buttonVariants({ selected, disabled, variant })}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <span>{children}</span>
    </button>
  )
}
