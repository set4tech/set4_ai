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
  metadataBase: new URL('https://set4.ai'),
  title: 'Set4 AI - Read your floorplans. With AI.',
  description: 'AI-powered floorplan analysis for architects, developers, and building departments. Extract, measure, and analyze architectural drawings automatically.',
  keywords: ['AI floorplan analysis', 'architectural drawing analysis', 'building code compliance', 'plan review automation', 'construction AI'],
  authors: [{ name: 'Set4 AI' }],
  creator: 'Set4 AI',
  publisher: 'Set4 AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://set4.ai',
    siteName: 'Set4 AI',
    title: 'Set4 AI - Read your floorplans. With AI.',
    description: 'AI-powered floorplan analysis for architects, developers, and building departments. Extract, measure, and analyze architectural drawings automatically.',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Set4 AI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Set4 AI - Read your floorplans. With AI.',
    description: 'AI-powered floorplan analysis for architects, developers, and building departments.',
    images: ['/icon.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/icon.png',
  },
  manifest: '/site.webmanifest',
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