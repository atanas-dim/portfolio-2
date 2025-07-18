import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { twJoin } from 'tailwind-merge'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

const souvenirBold = localFont({
  variable: '--font-souvenir',
  src: '../assets/fonts/SouvenirB.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portfolio - Atanas Dimitrov',
  description: 'React Developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={twJoin(montserrat.variable, souvenirBold.variable)}>{children}</body>
    </html>
  )
}
