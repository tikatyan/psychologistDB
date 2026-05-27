import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Temukan Psikolog',
  description:
    'Direktori psikolog dan klinik kesehatan mental Indonesia. Temukan psikolog yang tepat untukmu dengan mudah.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="bg-[#faf9f7] min-h-screen font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
