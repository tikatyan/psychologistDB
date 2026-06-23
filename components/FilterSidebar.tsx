'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

interface FilterSidebarProps {
  kotaList: string[]
  currentKota: string[]
  currentFocus: string[]
  currentOnline: boolean
  currentOffline: boolean
  currentBpjs: boolean
  currentClientType?: 'anak' | 'dewasa'
  currentQ?: string
  totalResults: number
}

const SPECIALIZATIONS = [
  'Kecemasan', 'Depresi', 'Trauma', 'OCD',
  'Relasi Romantis', 'Burnout', 'Stres', 'Regulasi Emosi',
  'Keluarga', 'Pernikahan', 'Karier', 'Pengembangan Diri',
]

const selectCls = 'w-full appearance-none rounded-[10px] border border-[#e5d9c2] bg-[#faf7f0] px-3 py-[9px] pr-8 text-[13px] text-[#19290f] outline-none transition focus:border-[#396025] cursor-pointer'

function ChevronDown() {
  return (
    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7b6e5c" strokeWidth="2.5">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function MultiDropdown({
  label,
  options,
  selected,
  onToggle,
  searchable = false,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
  searchable?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const filtered = searchable && search.trim()
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options

  const buttonLabel = selected.length === 0
    ? label
    : selected.length === 1
    ? selected[0]
    : `${selected.length} dipilih`

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-[10px] border px-3 py-[9px] text-[13px] transition ${
          selected.length > 0
            ? 'border-[#1e3d12] bg-[#eaf3e5] font-semibold text-[#1e3d12]'
            : 'border-[#e5d9c2] bg-[#faf7f0] text-[#19290f]'
        }`}
      >
        <span className="truncate">{buttonLabel}</span>
        <svg className={`ml-2 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-[50] rounded-[12px] border border-[#e5d9c2] bg-white shadow-lg">
          {searchable && (
            <div className="border-b border-[#e5d9c2] px-3 py-2">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kota..."
                className="w-full bg-transparent text-[13px] text-[#19290f] outline-none placeholder:text-[#7b6e5c]"
              />
            </div>
          )}
          <div className="max-h-[360px] overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-center text-[12px] text-[#7b6e5c]">Kota tidak ditemukan</p>
            ) : (
              filtered.map((opt) => (
                <label
                  key={opt}
                  className="flex cursor-pointer items-center gap-[10px] px-3 py-[9px] text-[13px] text-[#19290f] hover:bg-[#f3ede0]"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() => onToggle(opt)}
                    className="h-4 w-4 accent-[#1e3d12]"
                  />
                  {opt}
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FilterSidebar({
  kotaList,
  currentKota,
  currentFocus,
  currentOnline,
  currentOffline,
  currentBpjs,
  currentClientType,
  currentQ,
  totalResults,
}: FilterSidebarProps) {
  const router = useRouter()
  const [kota, setKota] = useState<string[]>(currentKota)
  const [focus, setFocus] = useState<string[]>(currentFocus)
  const [online, setOnline] = useState(currentOnline)
  const [offline, setOffline] = useState(currentOffline)
  const [bpjs, setBpjs] = useState(currentBpjs)
  const [clientType, setClientType] = useState<'anak' | 'dewasa' | ''>(currentClientType ?? '')
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggleKota(k: string) {
    setKota((prev) => prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k])
  }
  function toggleFocus(f: string) {
    setFocus((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f])
  }

  function handleFormatChange(val: string) {
    if (val === 'online') { setOnline(true); setOffline(false) }
    else if (val === 'offline') { setOnline(false); setOffline(true) }
    else if (val === 'keduanya') { setOnline(true); setOffline(true) }
    else { setOnline(false); setOffline(false) }
  }

  const formatValue = online && offline ? 'keduanya' : online ? 'online' : offline ? 'offline' : ''

  function apply() {
    const params = new URLSearchParams()
    if (currentQ) params.set('q', currentQ)
    if (kota.length > 0) params.set('kota', kota.join(','))
    if (online) params.set('online', 'true')
    if (offline) params.set('offline', 'true')
    if (bpjs) params.set('bpjs', 'true')
    if (focus.length > 0) params.set('focus', focus.join(','))
    if (clientType) params.set('klien', clientType)
    router.push(`/cari?${params.toString()}`)
    setMobileOpen(false)
  }

  function reset() {
    setKota([]); setFocus([]); setOnline(false); setOffline(false); setBpjs(false); setClientType('')
  }

  const activeCount = [
    kota.length > 0 ? 1 : 0,
    online || offline ? 1 : 0,
    bpjs ? 1 : 0,
    focus.length > 0 ? 1 : 0,
    clientType ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const SectionLabel = ({ children }: { children: string }) => (
    <div className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">
      {children}
    </div>
  )

  const body = (
    <div className="space-y-4">
      {/* Untuk Siapa */}
      <div>
        <SectionLabel>Untuk Siapa</SectionLabel>
        <div className="relative">
          <select
            value={clientType}
            onChange={(e) => setClientType(e.target.value as 'anak' | 'dewasa' | '')}
            className={selectCls}
          >
            <option value="">Semua</option>
            <option value="anak">Psikolog Anak</option>
            <option value="dewasa">Psikolog Dewasa</option>
          </select>
          <ChevronDown />
        </div>
      </div>

      {/* Kota */}
      <div>
        <SectionLabel>Kota</SectionLabel>
        {kotaList.length === 0 ? (
          <p className="text-[12px] text-[#7b6e5c]">Belum tersedia.</p>
        ) : (
          <MultiDropdown
            label="Pilih kota..."
            options={kotaList}
            selected={kota}
            onToggle={toggleKota}
            searchable
          />
        )}
      </div>

      {/* Format Sesi */}
      <div>
        <SectionLabel>Format Sesi</SectionLabel>
        <div className="relative">
          <select value={formatValue} onChange={(e) => handleFormatChange(e.target.value)} className={selectCls}>
            <option value="">Semua</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="keduanya">Online & Offline</option>
          </select>
          <ChevronDown />
        </div>
      </div>

      {/* Spesialisasi */}
      <div>
        <SectionLabel>Spesialisasi</SectionLabel>
        <MultiDropdown
          label="Pilih spesialisasi..."
          options={SPECIALIZATIONS}
          selected={focus}
          onToggle={toggleFocus}
        />
      </div>

      {/* Asuransi */}
      <div>
        <SectionLabel>Asuransi</SectionLabel>
        <label className="flex cursor-pointer items-center gap-[10px] rounded-[10px] border border-[#e5d9c2] bg-[#faf7f0] px-3 py-[9px] text-[13px] text-[#19290f]">
          <input
            type="checkbox"
            checked={bpjs}
            onChange={() => setBpjs((v) => !v)}
            className="h-4 w-4 accent-[#1e3d12]"
          />
          Ditanggung BPJS
        </label>
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
        className="flex items-center gap-[6px] rounded-full border-[1.5px] border-[#e5d9c2] bg-[#faf7f0] px-3 py-[6px] text-[13px] font-bold text-[#1e3d12] md:hidden"
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
        <div className="sticky top-[80px] max-h-[calc(100vh-100px)] overflow-y-auto rounded-2xl border border-[#e5d9c2] bg-[#faf7f0] p-5">
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
