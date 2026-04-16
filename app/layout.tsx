import type { Metadata } from 'next'
import { Lora, IM_Fell_Great_Primer_SC, Geist } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const brandon = localFont({
  src: [
    { path: '../public/fonts/brandon/HvDTrial_Brandon_Text_Regular.otf', weight: '400' },
    {
      path: '../public/fonts/brandon/HvDTrial_Brandon_Text_Regular_Italic.otf',
      style: 'italic',
      weight: '400',
    },
    { path: '../public/fonts/brandon/HvDTrial_Brandon_Text_Medium.otf', weight: '500' },
  ],
  variable: '--font-brandon',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-lora',
  display: 'swap',
})

const imFell = IM_Fell_Great_Primer_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fell',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hollywood North Report',
  description: 'Film reviews and industry coverage',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${brandon.variable} ${lora.variable} ${imFell.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
