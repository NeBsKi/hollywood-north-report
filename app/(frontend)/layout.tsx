import { Header, Footer } from '@/components/layout'

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="pt-25 lg:pt-0">{children}</main>
      <Footer />
    </>
  )
}
