import Link from 'next/link'
import * as motion from 'motion/react-client'

import { ChevronRight } from '@/components/icons'
import { Logo } from '@/components/ui/logo/logo'

import { navbarMock } from './navbar-mobile.mock'
import { NavMobileProps } from './navbar-mobile.types'

export const NavMobile = ({ isOpen }: NavMobileProps) => {
  const springTransition = {
    type: 'spring' as const,
    stiffness: 700,
    damping: 20,
  }

  const menuVariants = {
    hidden: {
      y: '-100%',
      transition: springTransition,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: springTransition,
    },
    exit: {
      y: '0%',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      aria-hidden={!isOpen}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      exit="exit"
      variants={menuVariants}
    >
      <nav className="bg-background-light px-4 py-6">
        <ul className="text-accent-500 font-lora flex flex-col gap-4 text-base/normal font-medium">
          {navbarMock.map(({ href, children }) => (
            <li key={href} className="border-accent-500/10 border-b pb-4 last:border-0 last:pb-0">
              <Link href={href} className="flex items-center justify-between">
                {children}
                <ChevronRight />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-accent-500 py-6">
        <div className="container">
          <p className="text-accent-100 font-brandon mt-2 text-sm/normal md:text-base/normal">
            Canadian film magazine spotlighting local talent, industry news, and in-depth reviews.
            Based in Vancouver, we cover festivals, films, and trends shaping Canadian and
            international cinema.
          </p>
          <div className="mt-8">
            <div className="flex shrink-0 items-center justify-between gap-5">
              <div className="bg-secondary-500 h-px w-full"></div>
              <Logo className="h-10 max-w-10" />
              <div className="bg-secondary-500 h-px w-full"></div>
            </div>
            <div className="mt-4 flex flex-col items-center justify-between gap-6 md:flex-row">
              <span className="text-accent-100 text-xs/tight">
                © 2026 Hollywood North Report. All rights reserved.
              </span>
              <ul className="flex items-center gap-6 md:gap-10">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-accent-100 font-brandon text-xs/tight"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-accent-100 font-brandon text-xs/tight"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-accent-100 font-brandon text-xs/tight"
                  >
                    Cookie Preferences
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
