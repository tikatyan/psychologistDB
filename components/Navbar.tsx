'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/cari', label: 'Cari' },
  { href: '/tambahkan', label: 'Tambahkan' },
  { href: '/tentang', label: 'Tentang' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e5d9c2] bg-[#f3ede0]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link
          href="/"
          className="font-serif text-xl leading-none text-[#1e3d12] transition-colors hover:text-[#396025]"
        >
          Temukan Psikolog
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                pathname.startsWith(link.href)
                  ? 'bg-[#1e3d12] text-white'
                  : 'text-[#7b6e5c] hover:text-[#19290f]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5d9c2] text-[#7b6e5c] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#e5d9c2] bg-[#f3ede0] px-5 pb-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                pathname.startsWith(link.href)
                  ? 'text-[#1e3d12]'
                  : 'text-[#7b6e5c] hover:text-[#19290f]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
