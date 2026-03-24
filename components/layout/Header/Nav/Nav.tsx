'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navMock } from './Nav.mock'
import { SearchInput } from '../SearchInput'

export const Nav = () => {
  const pathname = usePathname()
  const isActive = (path: string) => (pathname === path ? 'bg-[#B8ADA229]' : '')

  return (
    <nav className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
      {/* Left spacer — keeps nav links truly centered */}
      <div />

      {/* Center — nav links */}
      <ul className="flex items-center justify-center gap-14">
        {navMock.map(({ href, children }) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                'text-white-500 lora-body-large-medium rounded-lg px-4 py-2',
                isActive(href),
              )}
            >
              {children}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right — search button */}
      <div className="flex justify-end">
        <SearchInput />
      </div>
    </nav>
  )
}
