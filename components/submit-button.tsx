'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import type { ButtonHTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const SubmitButton = ({ children, className, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit" className={className} {...props}>
      {children}
      {pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}
