'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'motion/react'

import { Logo } from '@/components/ui/Logo'
import { Search } from '@/components/ui/icons/Search'

import { SearchInput } from './SearchInput'
import { HamburgerButton } from './HamburgerButton'
import { NavMobile } from './NavMobile'
import { SearchInputMobile } from './SearchInputMobile'
import { Nav } from './Nav'

export const Header = () => {
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
    <header
      className="fixed z-20 w-full lg:relative"
      data-mobile-menu-open={isMenuOpen ? 'true' : 'false'}
    >
      <div className="bg-primary-700 h-25 py-2">
        <div className="border-secondary-500/20 h-full border-y px-0 py-1">
          <div className="border-secondary-500/20 h-full border-y-2">
            <div className="container flex h-full items-center justify-between xl:justify-center">
              <Link className="flex items-center gap-2" href="/">
                <Logo loading="eager" priority="high" className="h-6 max-w-6 md:h-10 md:max-w-10" />
                <span className="text-white-500 font-fell text-lg/normal md:text-2xl/relaxed xl:text-3xl/loose">
                  Hollywood North Report
                </span>
              </Link>
              <div className="flex items-center gap-2 xl:hidden">
                <div className="hidden sm:block">
                  <SearchInput />
                </div>
                {!isSearchOpen && (
                  <div className="block sm:hidden">
                    <button
                      className="text-white-500 bg-accent-500/60 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-none"
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
      </div>
      <Nav />
      <AnimatePresence>{isMenuOpen && <NavMobile isOpen={isMenuOpen} />}</AnimatePresence>
      <AnimatePresence>
        {isSearchOpen && <SearchInputMobile isOpen={isSearchOpen} />}
      </AnimatePresence>
    </header>
  )
}
