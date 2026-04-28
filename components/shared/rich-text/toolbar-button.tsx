'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ToolbarButtonProps = {
  label: string
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: ReactNode
}

export function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active || undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'hover:bg-accent hover:text-accent-foreground inline-flex h-7 w-7 items-center justify-center rounded-md text-sm transition-colors',
        active && 'bg-accent text-accent-foreground',
        disabled && 'opacity-40 hover:bg-transparent',
      )}
    >
      {children}
    </button>
  )
}

export function ToolbarDivider() {
  return <span className="bg-border mx-1 inline-block h-5 w-px" aria-hidden />
}
