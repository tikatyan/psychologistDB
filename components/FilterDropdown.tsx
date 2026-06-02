'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface FilterDropdownProps {
  kotaList: string[]
  currentKota: string[]
  currentFocus: string[]
  currentOnline: boolean
  currentOffline: boolean
  currentBpjs: boolean
  currentQ?: string
  totalResults: number
}

const SPECIALIZATIONS = [
  'Kecemasan', 'Depresi', 'Trauma', 'OCD',
  'Relasi Romantis', 'Burnout', 'Psikologi Anak', 'Remaja',
]

export default function FilterDropdown({
  kotaList,
  currentKota,
  currentFocus,
  currentOnline,
  currentOffline,
  currentBpjs,
  currentQ,
  totalResults,
}: FilterDropdownProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [kota, setKota] = useState<string[]>(currentKota)
  const [focus, setFocus] = useState<string[]>(currentFocus)
  const [online, setOnline] = useState(currentOnline)
  const [offline, setOffline] = useState(currentOffline)
  const [bpjs, setBpjs] = useState(currentBpjs)

  function toggleKota(k: string) {
    setKota((prev) => prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k])
  }
  function toggleFocus(f: string) {
    setFocus((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f])
  }

  function apply() {
    const params = new URLSearchParams()
    if (currentQ) params.set('q', currentQ)
    if (kota.length > 0) params.set('kota', kota.join(','))
    if (online) params.set('online', 'true')
    if (offline) params.set('offline', 'true')
    if (bpjs) params.set('bpjs', 'true')
    if (focus.length > 0) params.set('focus', focus.join(','))
    router.push(`/cari?${params.toString()}`)
    setOpen(false)
  }

  function reset() {
    setKota([])
    setFocus([])
    setOnline(false)
    setOffline(false)
    setBpjs(false)
  }

  const activeCount = [
    kota.length > 0 ? 1 : 0,
    online || offline ? 1 : 0,
    bpjs ? 1 : 0,
    focus.length > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const chip = (active: boolean) =>
    `rounded-full border-[1.5px] px-3 py-[5px] text-[13px] font-semibold cursor-pointer transition-all select-none ${
      active
        ? 'border-[#1e3d12] bg-[#1e3d12] text-white'
        : 'border-[#e5d9c2] bg-[#faf7f0] text-[#19290f] hover:border-[#396025]'
    }`

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">{label}</div>
  )

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-[6px] rounded-full border-[1.5px] px-3 py-[6px] text-[13px] font-bold transition-colors ${
          open || activeCount > 0
            ? 'border-[#1e3d12] bg-[#1e3d12] text-white'
            : 'border-[#e5d9c2] bg-[#faf7f0] text-[#1e3d12]'
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="12" y1="18" x2="20" y2="18" />
        </svg>
        Filter
        {activeCount > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-[4px] text-[10px] font-bold text-[#1e3d12]">
            {activeCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[200]"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div className="absolute right-0 top-[calc(100%+8px)] z-[201] w-[480px] max-w-[calc(100vw-32px)] rounded-2xl border border-[#e5d9c2] bg-[#faf7f0] p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-serif text-[18px] text-[#1e3d12]">Filter</span>
              {activeCount > 0 && (
                <button onClick={reset} className="text-[13px] font-semibold text-[#7b6e5c] hover:text-[#19290f]">
                  Reset
                </button>
              )}
            </div>

            <div className="space-y-5">
              {/* Kota */}
              <div>
                <SectionLabel label="Kota" />
                <div className="flex flex-wrap gap-[6px]">
                  {kotaList.map((k) => (
                    <button key={k} onClick={() => toggleKota(k)} className={chip(kota.includes(k))}>
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Sesi */}
              <div>
                <SectionLabel label="Format Sesi" />
                <div className="flex flex-wrap gap-[6px]">
                  {(
                    [
                      { label: 'Online', act: () => { setOnline(true); setOffline(false) }, active: online && !offline },
                      { label: 'Offline', act: () => { setOffline(true); setOnline(false) }, active: offline && !online },
                      { label: 'Keduanya', act: () => { setOnline(true); setOffline(true) }, active: online && offline },
                    ] as const
                  ).map(({ label, act, active }) => (
                    <button key={label} onClick={act} className={chip(active)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spesialisasi */}
              <div>
                <SectionLabel label="Spesialisasi" />
                <div className="flex flex-wrap gap-[6px]">
                  {SPECIALIZATIONS.map((s) => (
                    <button key={s} onClick={() => toggleFocus(s)} className={chip(focus.includes(s))}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asuransi */}
              <div>
                <SectionLabel label="Asuransi" />
                <button onClick={() => setBpjs(!bpjs)} className={chip(bpjs)}>
                  Ditanggung BPJS
                </button>
              </div>

              {/* Apply */}
              <button
                onClick={apply}
                className="w-full rounded-full bg-[#1e3d12] py-3 text-[14px] font-bold text-white transition hover:bg-[#396025]"
              >
                Tampilkan {totalResults} hasil
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
