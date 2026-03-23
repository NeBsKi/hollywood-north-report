'use client'

import { useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import Link from 'next/link'
import { HamburgerButton } from '../HamburgerButton'
import { SearchInput } from '../SearchInput/SearchInput'
import { Search } from '@/components/ui/icons'
import { MobileNav } from '../MobileNav'
import { cn } from '@/lib/utils'

export const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearchClick = () => {
    setIsMenuOpen(false)
    setIsSearchOpen((currentValue) => !currentValue)
  }

  const handleHamburgerClick = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false)
      setIsMenuOpen(false)
      return
    }

    setIsSearchOpen(false)
    setIsMenuOpen((currentValue) => !currentValue)
  }

  return (
    <header className={cn('relative z-20 block w-full xl:hidden', isMenuOpen && 'fixed')}>
      <div className="bg-primary-700 py-1">
        <div className="border-secondary-500/20 border-y py-1">
          <div className="border-secondary-500/20 flex items-center justify-between border-y-2 px-4 py-4">
            <Link className="flex items-center gap-2" href="/">
              <Logo loading="eager" priority="high" className="h-6 max-w-6 md:h-10 md:max-w-10" />
              <span className="text-white-500 font-fell text-lg/normal md:text-3xl/loose">
                Hollywood North Report
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <SearchInput />
              </div>
              {!isSearchOpen && (
                <div className="block sm:hidden">
                  <button
                    className="text-white-500 bg-accent-500/60 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-none"
                    onClick={handleSearchClick}
                    aria-label="Toggle search input"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              )}
              <HamburgerButton
                isOpen={isMenuOpen || isSearchOpen}
                aria-expanded={isMenuOpen || isSearchOpen}
                onClick={handleHamburgerClick}
              />
            </div>
          </div>
        </div>
      </div>
      <MobileNav isOpen={isMenuOpen} />
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full px-4 py-4">
          <SearchInput />
        </div>
      )}
    </header>
  )
}
