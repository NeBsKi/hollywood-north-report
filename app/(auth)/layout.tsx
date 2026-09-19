import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authorization',
  description: 'Authorization',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      {children}
    </main>
  )
}
