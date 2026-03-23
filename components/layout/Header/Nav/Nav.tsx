'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchInput } from '../SearchInput/SearchInput'

export const Nav = () => {
  const pathname = usePathname()
  const isActive = (path: string) => (pathname === path ? 'bg-[#B8ADA229]' : '')

  return (
    <nav className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
      {/* Left spacer — keeps nav links truly centered */}
      <div />

      {/* Center — nav links */}
      <ul className="flex items-center justify-center gap-14">
        <li>
          <Link
            href="/"
            className={clsx(
              'text-white-500 lora-body-large-medium rounded-lg px-4 py-2',
              isActive('/'),
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/reviews"
            className={clsx(
              'text-white-500 lora-body-large-medium rounded-lg px-4 py-2',
              isActive('/reviews'),
            )}
          >
            Reviews
          </Link>
        </li>
        <li>
          <Link
            href="/industries-awards"
            className={clsx(
              'text-white-500 lora-body-large-medium rounded-lg px-4 py-2',
              isActive('/industries-awards'),
            )}
          >
            Industries & Awards
          </Link>
        </li>
        <li>
          <Link
            href="/about-us"
            className={clsx(
              'text-white-500 lora-body-large-medium rounded-lg px-4 py-2',
              isActive('/about-us'),
            )}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={clsx(
              'text-white-500 lora-body-large-medium rounded-lg px-4 py-2',
              isActive('/contact'),
            )}
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Right — search button */}
      <div className="flex justify-end">
        <SearchInput />
      </div>
    </nav>
  )
}
