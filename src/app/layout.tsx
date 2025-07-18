import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { twJoin } from 'tailwind-merge'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio - Atanas Dimitrov',
  description: 'React Developer',
}

export const souvenirBold = localFont({
  src: '../assets/fonts/SouvenirB.ttf',
  display: 'swap',
  variable: '--font-souvenir',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={twJoin(montserrat.className, souvenirBold.variable)}>{children}</body>
    </html>
  )
}
