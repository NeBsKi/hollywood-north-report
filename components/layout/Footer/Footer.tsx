import Link from 'next/link'

import { Pin, Send } from '@/components/ui/icons'
import { Logo } from '@/components/ui/Logo'

export const Footer = () => {
  return (
    <footer className="bg-accent-500 pt-14 pb-10">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-auto lg:max-w-[50%]">
            <h3 className="text-white-500 font-fell text-[22px] lg:text-3xl lg:leading-10">
              Hollywood North Report
            </h3>
            <p className="text-accent-100 font-brandon mt-2 text-sm/normal md:text-base/normal">
              Canadian film magazine spotlighting local talent, industry news, and in-depth reviews.
              Based in Vancouver, we cover festivals, films, and trends shaping Canadian and
              international cinema.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-white-500 font-lora text-base/normal font-medium">Navigation</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/"
                  className="text-accent-100 font-brandon hover:text-white-500 text-base/normal"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-accent-100 font-brandon hover:text-white-500 text-base/normal"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/industries-awards"
                  className="text-accent-100 font-brandon hover:text-white-500 text-base/normal"
                >
                  Industries & Awards
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-accent-100 font-brandon hover:text-white-500 text-base/normal"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-white-500 font-lora text-base/normal font-medium">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/contact"
                  className="text-accent-100 font-brandon hover:text-white-500 text-base/normal"
                >
                  Contact Us
                </Link>
              </li>
              <li className="flex gap-2">
                <Send className="text-accent-100" />
                <div>
                  <a
                    href="mailto:contact@hollywoodnorthreport.com"
                    className="text-accent-100 font-brandon hover:text-white-500 block text-base/normal"
                  >
                    contact@hollywoodnorthreport.com
                  </a>
                  <a
                    href="mailto:press@hollywoodnorthreport.com"
                    className="text-accent-100 font-brandon hover:text-white-500 block text-base/normal"
                  >
                    press@hollywoodnorthreport.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Pin className="text-accent-100" />
                <div className="text-accent-100 font-brandon text-base/normal">
                  Vancouver, Canada
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
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
                <Link href="/privacy-policy" className="text-accent-100 font-brandon text-xs/tight">
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
                <Link href="/cookie-policy" className="text-accent-100 font-brandon text-xs/tight">
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
