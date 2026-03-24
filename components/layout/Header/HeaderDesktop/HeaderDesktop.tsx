import Link from 'next/link'

import { Logo } from '@/components/ui/Logo'
import { Nav } from '../Nav'

export const HeaderDesktop = () => {
  return (
    <header className="relative z-20 hidden xl:block">
      <div className="bg-primary-700 py-2">
        <div className="border-secondary-500/20 border-y py-1">
          <div className="border-secondary-500/20 flex items-center justify-center border-y-2 py-6">
            <Link className="flex items-center gap-2" href="/">
              <Logo loading="eager" priority="high" className="h-10 max-w-10" />
              <span className="text-white-500 fell-h1-regular">Hollywood North Report</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-accent-500 py-4">
        <div className="container">
          <Nav />
        </div>
      </div>
    </header>
  )
}
