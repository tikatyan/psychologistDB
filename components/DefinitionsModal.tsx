'use client'

import { useState } from 'react'
import type { TermDef } from '@/lib/definitions'

interface Props {
  items: string[]
  definitions: Record<string, TermDef>
  tint?: 'green' | 'sand'
}

export default function DefinitionsModal({ items, definitions }: Props) {
  const [open, setOpen] = useState(false)

  const defined = items.filter((item) => definitions[item])
  if (defined.length === 0) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-[#e5d9c2] bg-white text-[12px] font-bold text-[#7b6e5c] transition hover:border-[#396025] hover:text-[#396025]"
        aria-label="Lihat penjelasan istilah"
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />

          <div
            className="relative z-10 w-full max-w-sm rounded-t-[24px] bg-[#faf7f0] shadow-xl sm:rounded-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e5d9c2] px-5 py-4">
              <span className="text-[14px] font-bold text-[#19290f]">Penjelasan istilah</span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e5d9c2] text-[13px] font-bold text-[#19290f] transition hover:bg-[#cdd5c5]"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
              <div className="space-y-5">
                {defined.map((item) => {
                  const def = definitions[item]
                  return (
                    <div key={item}>
                      <p className="mb-[5px] text-[13px] font-bold text-[#19290f]">
                        {item}{def.fullName ? ` (${def.fullName})` : ''}
                      </p>
                      <p className="text-[13px] leading-relaxed text-[#7b6e5c]">
                        {def.definition}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
