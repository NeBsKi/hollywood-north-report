import { ChevronRight } from '@/components/ui/icons'
import { Logo } from '@/components/ui/Logo/Logo'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface MobileNavProps {
  isOpen: boolean
}

export const MobileNav = ({ isOpen }: MobileNavProps) => {
  return (
    <div
      className={cn(
        'absolute top-full left-0 w-full origin-top transition-all duration-300 ease-out',
        isOpen
          ? 'pointer-events-auto visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-25 opacity-0',
      )}
      aria-hidden={!isOpen}
    >
      <nav className="bg-background-light px-4 py-10">
        <ul className="text-accent-500 font-lora flex flex-col gap-6 text-base/normal font-medium">
          <li>
            <Link
              href="/news"
              className="border-accent-500/10 flex items-center justify-between border-b pb-6"
            >
              Home
              <ChevronRight />
            </Link>
          </li>
          <li>
            <Link
              href="/filming-locations"
              className="border-accent-500/10 flex items-center justify-between border-b pb-6"
            >
              Reviews
              <ChevronRight />
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="border-accent-500/10 flex items-center justify-between border-b pb-6"
            >
              Industries & Awards
              <ChevronRight />
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="border-accent-500/10 flex items-center justify-between border-b pb-6"
            >
              About Us
              <ChevronRight />
            </Link>
          </li>
          <li>
            <Link href="/contact" className="flex items-center justify-between">
              Contact
              <ChevronRight />
            </Link>
          </li>
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
    </div>
  )
}
