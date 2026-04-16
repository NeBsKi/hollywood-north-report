'use client'

import Link from 'next/link'
import { Logo } from './shared/logo'
import { useSidebar } from './ui/sidebar'

export const AdminLogo = () => {
  const { isMobile } = useSidebar()

  return (
    <Link href="/admin" className="flex items-center gap-2">
      <Logo className="h-8 max-w-8" />
      {!isMobile && <span className="text-accent-500 text-base/6">Hollywood North Report</span>}
    </Link>
  )
}
