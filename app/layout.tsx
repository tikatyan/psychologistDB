import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PsikologDB',
  description:
    'Direktori psikolog dan klinik kesehatan mental Indonesia. Temukan psikolog yang tepat untukmu dengan mudah.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable}`}>
      <body className="min-h-screen bg-[#f0f4eb]">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
