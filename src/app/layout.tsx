import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import '@/app/globals.css'
import { twJoin } from 'tailwind-merge'
import GSAPPlugins from '@/components/GSAPPlugins'
import { DeviceOrientationProvider } from '@/components/DeviceOrientationContext'

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
  title: 'Atanas Dimitrov - Senior Frontend Engineer',
  description: 'Building engaging web experiences using React, Next.js, and modern tools.',
  icons: {
    icon: '/favicon.png',
  },
  metadataBase: new URL('https://adimitrov.com'),
  keywords: [
    'Atanas Dimitrov',
    'Software Developer',
    'Web Developer',
    'React Developer',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'Full-Stack Developer',
    'Front-End Developer',
    'Node.js',
    'Supabase',
    'Firebase',
    'SQL',
    'Portfolio',
    'UI Development',
  ],
  openGraph: {
    title: 'Atanas Dimitrov - Senior Frontend Engineer',
    description: 'Creating modern, efficient, and user-friendly web applications using React and Next.js.',
    url: 'https://adimitrov.com',
    siteName: 'Atanas Dimitrov - Portfolio',
    images: [
      {
        url: 'https://www.adimitrov.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Atanas Dimitrov - Developer Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atanas Dimitrov - Senior Frontend Engineer',
    description: 'Creating modern, efficient, and user-friendly web applications using React and Next.js.',
    images: ['https://www.adimitrov.com/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: 'rgb(255, 226, 226)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={twJoin(montserrat.variable, souvenirBold.variable)}>
        <DeviceOrientationProvider>
          <GSAPPlugins />
          {children}
        </DeviceOrientationProvider>
      </body>
    </html>
  )
}
