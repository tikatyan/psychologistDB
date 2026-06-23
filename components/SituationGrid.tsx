'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SITUATIONS = [
  { label: 'Cemas', focus: 'Kecemasan' },
  { label: 'Depresi', focus: 'Depresi' },
  { label: 'Trauma', focus: 'Trauma' },
  { label: 'Masalah Relasi Romantis', focus: 'Relasi Romantis' },
  { label: 'Burnout', focus: 'Burnout' },
  { label: 'Saya Belum Yakin', focus: null },
]

export default function SituationGrid() {
  const router = useRouter()
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null)

  function handleClick(idx: number, focus: string | null) {
    if (loadingIdx !== null) return
    setLoadingIdx(idx)
    const url = focus ? `/cari?focus=${encodeURIComponent(focus)}` : '/cari'
    router.push(url)
  }

  return (
    <div className="grid grid-cols-2 gap-[9px]">
      {SITUATIONS.map((s, i) => {
        const isLoading = loadingIdx === i
        const isDimmed = loadingIdx !== null && loadingIdx !== i
        return (
          <button
            key={s.label}
            onClick={() => handleClick(i, s.focus)}
            disabled={loadingIdx !== null}
            className={`rounded-[14px] border-[1.5px] px-4 py-[15px] text-left text-[14px] font-semibold leading-snug tracking-tight transition-all ${
              isLoading
                ? 'border-[#1e3d12] bg-[#1e3d12] text-white scale-[0.98]'
                : isDimmed
                ? 'border-[#cdd5c5] bg-[#e6ece0] text-[#19290f] opacity-40'
                : 'border-[#cdd5c5] bg-[#e6ece0] text-[#19290f] hover:bg-[#dde5d7] active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {s.label}
              </span>
            ) : s.label}
          </button>
        )
      })}
    </div>
  )
}
