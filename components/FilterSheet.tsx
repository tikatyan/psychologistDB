'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface FilterSheetProps {
  kotaList: string[]
  currentKota?: string
  currentOnline?: boolean
  currentOffline?: boolean
  currentBpjs?: boolean
  currentFocus?: string
  currentQ?: string
  totalResults: number
}

const SPECIALIZATIONS = [
  'Kecemasan', 'Depresi', 'Trauma', 'PTSD', 'Hubungan', 'Burnout', 'Anak', 'Remaja',
]

export default function FilterSheet({
  kotaList,
  currentKota,
  currentOnline,
  currentOffline,
  currentBpjs,
  currentFocus,
  currentQ,
  totalResults,
}: FilterSheetProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [kota, setKota] = useState(currentKota ?? '')
  const [online, setOnline] = useState(currentOnline ?? false)
  const [offline, setOffline] = useState(currentOffline ?? false)
  const [bpjs, setBpjs] = useState(currentBpjs ?? false)
  const [focus, setFocus] = useState(currentFocus ?? '')

  const activeCount = [
    kota ? 1 : 0,
    online || offline ? 1 : 0,
    bpjs ? 1 : 0,
    focus ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  function apply() {
    const params = new URLSearchParams()
    if (currentQ) params.set('q', currentQ)
    if (kota) params.set('kota', kota)
    if (online) params.set('online', 'true')
    if (offline) params.set('offline', 'true')
    if (bpjs) params.set('bpjs', 'true')
    if (focus) params.set('focus', focus)
    router.push(`/cari?${params.toString()}`)
    setOpen(false)
  }

  function reset() {
    setKota('')
    setOnline(false)
    setOffline(false)
    setBpjs(false)
    setFocus('')
  }

  const chipBase = 'rounded-full border-[1.5px] px-[14px] py-[6px] text-[13px] font-semibold transition-all cursor-pointer'
  const chipActive = 'border-[#1e3d12] bg-[#1e3d12] text-white'
  const chipInactive = 'border-[#e5d9c2] bg-[#faf7f0] text-[#19290f]'

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-[6px] text-[13px] font-bold text-[#1e3d12]"
      >
        Filter
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1e3d12] px-[5px] text-[11px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-[rgba(10,20,8,0.5)]"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-[1] max-h-[82vh] overflow-y-auto rounded-t-[24px] bg-[#faf7f0] pb-8">
            <div className="mx-auto mt-3 mb-4 h-1 w-10 rounded-full bg-[#e5d9c2]" />

            <div className="flex items-center justify-between border-b border-[#e5d9c2] px-5 pb-4">
              <h2 className="font-serif text-[22px] tracking-tight text-[#1e3d12]">Filter</h2>
              <button
                onClick={reset}
                className="text-[13px] font-semibold text-[#7b6e5c]"
              >
                Reset
              </button>
            </div>

            <div className="border-b border-[#e5d9c2] px-5 py-[18px]">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">Kota</div>
              <div className="flex flex-wrap gap-[7px]">
                {kotaList.slice(0, 12).map((k) => (
                  <button
                    key={k}
                    onClick={() => setKota(kota === k ? '' : k)}
                    className={`${chipBase} ${kota === k ? chipActive : chipInactive}`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-[#e5d9c2] px-5 py-[18px]">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">Format Sesi</div>
              <div className="flex flex-wrap gap-[7px]">
                {(
                  [
                    { label: 'Online', id: 'online' as const },
                    { label: 'Offline', id: 'offline' as const },
                    { label: 'Keduanya', id: 'both' as const },
                  ] as const
                ).map(({ label, id }) => {
                  const active =
                    (id === 'online' && online && !offline) ||
                    (id === 'offline' && offline && !online) ||
                    (id === 'both' && online && offline)
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        if (id === 'online') { setOnline(true); setOffline(false) }
                        else if (id === 'offline') { setOffline(true); setOnline(false) }
                        else { setOnline(true); setOffline(true) }
                      }}
                      className={`${chipBase} ${active ? chipActive : chipInactive}`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-b border-[#e5d9c2] px-5 py-[18px]">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">Spesialisasi</div>
              <div className="flex flex-wrap gap-[7px]">
                {SPECIALIZATIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFocus(focus === s ? '' : s)}
                    className={`${chipBase} ${focus === s ? chipActive : chipInactive}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 py-[18px]">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">Asuransi</div>
              <div className="flex flex-wrap gap-[7px]">
                <button
                  onClick={() => setBpjs(!bpjs)}
                  className={`${chipBase} ${bpjs ? chipActive : chipInactive}`}
                >
                  Ditanggung BPJS
                </button>
              </div>
            </div>

            <div className="px-5">
              <button
                onClick={apply}
                className="w-full rounded-full bg-[#1e3d12] py-4 text-[15px] font-bold tracking-tight text-white transition hover:bg-[#396025]"
              >
                Tampilkan {totalResults} hasil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
