import clsx from 'clsx'
import type { HamburgerBtnProps } from './hamburger-btn.types'

export const HamburgerBtn = ({
  className,
  isOpen = false,
  lineClassName,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}: HamburgerBtnProps) => {
  return (
    <button
      type={type}
      aria-label={ariaLabel ?? (isOpen ? 'Close menu' : 'Open menu')}
      aria-pressed={isOpen}
      className={clsx(
        'bg-accent-500/60 relative h-9 w-9 cursor-pointer rounded-lg transition-colors sm:h-10 sm:w-10',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={clsx(
          'bg-white-500 absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 rounded-full transition-all duration-200 ease-out',
          isOpen ? '-translate-y-1/2 rotate-45' : '-translate-y-1.5',
          lineClassName,
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          'bg-white-500 absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out',
          isOpen && 'scale-x-0 opacity-0',
          lineClassName,
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          'bg-white-500 absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 rounded-full transition-all duration-200 ease-out',
          isOpen ? '-translate-y-1/2 -rotate-45' : 'translate-y-1.25',
          lineClassName,
        )}
      />
    </button>
  )
}
