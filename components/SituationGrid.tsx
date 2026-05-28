'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SITUATIONS = [
  { label: 'Kecemasan & stres', focus: 'kecemasan' },
  { label: 'Depresi & kesedihan', focus: 'depresi' },
  { label: 'Trauma & PTSD', focus: 'trauma' },
  { label: 'Masalah hubungan', focus: 'relasi romantis' },
  { label: 'Saya belum yakin', focus: null },
]

export default function SituationGrid() {
  const router = useRouter()
  const [selected, setSelected] = useState<number | null>(null)

  function handleClick(idx: number, focus: string | null) {
    setSelected(idx)
    const url = focus ? `/cari?focus=${encodeURIComponent(focus)}` : '/cari'
    router.push(url)
  }

  return (
    <div className="grid grid-cols-2 gap-[9px]">
      {SITUATIONS.map((s, i) => (
        <button
          key={s.label}
          onClick={() => handleClick(i, s.focus)}
          className={`rounded-[14px] border-[1.5px] px-4 py-[15px] text-left text-[14px] font-semibold leading-snug tracking-tight transition-colors${
            i === SITUATIONS.length - 1 ? ' col-span-2' : ''
          } ${
            selected === i
              ? 'border-[#1e3d12] bg-[#1e3d12] text-white'
              : 'border-[#cdd5c5] bg-[#e6ece0] text-[#19290f] hover:bg-[#dde5d7] active:opacity-80'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
