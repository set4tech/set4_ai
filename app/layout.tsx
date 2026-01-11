import type { Metadata } from 'next'
import { Instrument_Sans, Hedvig_Letters_Serif } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const hedvigLettersSerif = Hedvig_Letters_Serif({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Read the drawings',
  description: 'set4 helps your permit better and faster.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${hedvigLettersSerif.variable}`}>
      <body className={instrumentSans.className}>{children}</body>
    </html>
  )
}