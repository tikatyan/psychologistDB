'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface FilterSidebarProps {
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
  'kecemasan', 'depresi', 'trauma', 'OCD',
  'relasi romantis', 'burnout', 'psikologi anak', 'remaja',
]

export default function FilterSidebar({
  kotaList,
  currentKota,
  currentFocus,
  currentOnline,
  currentOffline,
  currentBpjs,
  currentQ,
  totalResults,
}: FilterSidebarProps) {
  const router = useRouter()
  const [kota, setKota] = useState<string[]>(currentKota)
  const [focus, setFocus] = useState<string[]>(currentFocus)
  const [online, setOnline] = useState(currentOnline)
  const [offline, setOffline] = useState(currentOffline)
  const [bpjs, setBpjs] = useState(currentBpjs)
  const [mobileOpen, setMobileOpen] = useState(false)

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
    setMobileOpen(false)
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

  const SectionLabel = ({ children }: { children: string }) => (
    <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">
      {children}
    </div>
  )

  const body = (
    <div className="space-y-5">
      {/* Kota */}
      <div>
        <SectionLabel>Kota</SectionLabel>
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
        <SectionLabel>Format Sesi</SectionLabel>
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
        <SectionLabel>Spesialisasi</SectionLabel>
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
        <SectionLabel>Asuransi</SectionLabel>
        <button onClick={() => setBpjs(!bpjs)} className={chip(bpjs)}>
          Ditanggung BPJS
        </button>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-1">
        <button
          onClick={apply}
          className="w-full rounded-full bg-[#1e3d12] py-3 text-[14px] font-bold text-white transition hover:bg-[#396025]"
        >
          Tampilkan {totalResults} hasil
        </button>
        {activeCount > 0 && (
          <button
            onClick={reset}
            className="w-full rounded-full border border-[#e5d9c2] py-3 text-[13px] font-semibold text-[#7b6e5c] transition hover:border-[#d4c5a8]"
          >
            Reset filter
          </button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex items-center gap-[6px] text-[13px] font-bold text-[#1e3d12] md:hidden"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="12" y1="18" x2="20" y2="18" />
        </svg>
        Filter
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1e3d12] px-[5px] text-[11px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[300] flex flex-col justify-end md:hidden">
          <div className="absolute inset-0 bg-[rgba(10,20,8,0.5)]" onClick={() => setMobileOpen(false)} />
          <div className="relative z-[1] max-h-[86vh] overflow-y-auto rounded-t-[24px] bg-[#faf7f0] px-5 pb-8 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-[22px] tracking-tight text-[#1e3d12]">Filter</h2>
              <button onClick={reset} className="text-[13px] font-semibold text-[#7b6e5c]">Reset</button>
            </div>
            {body}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <div className="sticky top-[120px] rounded-2xl border border-[#e5d9c2] bg-[#faf7f0] p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-serif text-[18px] text-[#1e3d12]">Filter</span>
            {activeCount > 0 && (
              <button onClick={reset} className="text-[13px] font-semibold text-[#7b6e5c]">
                Reset
              </button>
            )}
          </div>
          {body}
        </div>
      </div>
    </>
  )
}
