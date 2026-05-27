'use client'
import { useState } from 'react'

interface Props {
  label: string
  defaultOpen?: boolean
  sand?: boolean
  children: React.ReactNode
}

export default function CollapsibleSection({ label, defaultOpen = false, sand = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`border-b border-[#e5d9c2] ${sand ? 'bg-[#f3ede0]' : 'bg-[#faf7f0]'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-[22px] py-4"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b6e5c]">
          {label}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4c5a8"
          strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="px-[22px] pb-[18px]">{children}</div>}
    </div>
  )
}
