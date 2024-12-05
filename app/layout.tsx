import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Analytics } from '@vercel/analytics/react'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Dangled My Stats',
  description: 'Phish stats',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full bg-neutral-100 antialiased`}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
        <Analytics />
      </body>
    </html>
  )
}
