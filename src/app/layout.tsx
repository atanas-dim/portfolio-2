import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import '@/app/globals.css'
import { twJoin } from 'tailwind-merge'
import GSAPPlugins from '@/components/GSAPPlugins'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
})

const souvenirBold = localFont({
  variable: '--font-souvenir',
  src: '../../public/fonts/SouvenirB.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atanas Dimitrov',
  description: 'React Developer',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={twJoin(montserrat.variable, souvenirBold.variable)}>
        <GSAPPlugins />
        {children}
      </body>
    </html>
  )
}
