import Link from 'next/link'
import { searchDirectory, getKotaList } from '@/lib/queries'
import PsikologCard from '@/components/PsikologCard'
import ClinicCard from '@/components/ClinicCard'
import FilterSheet from '@/components/FilterSheet'

interface SearchParams {
  q?: string
  kota?: string
  online?: string
  offline?: string
  bpjs?: string
  focus?: string
  type?: string
}

export default async function CariPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const kotaList = await getKotaList()

  const type = (sp.type as 'psikolog' | 'klinik' | 'semua') || 'semua'
  const online = sp.online === 'true'
  const offline = sp.offline === 'true'
  const bpjs = sp.bpjs === 'true'

  const { psikolog, clinics } = await searchDirectory({
    q: sp.q,
    kota: sp.kota,
    online: online || undefined,
    offline: offline || undefined,
    bpjs: bpjs || undefined,
    focus: sp.focus,
    type,
  })

  const showPsikolog = type === 'psikolog' || type === 'semua'
  const showKlinik = type === 'klinik' || type === 'semua'
  const totalResults =
    (showPsikolog ? psikolog.length : 0) + (showKlinik ? clinics.length : 0)

  function urlWithout(key: string) {
    const p = new URLSearchParams()
    if (sp.q && key !== 'q') p.set('q', sp.q)
    if (sp.kota && key !== 'kota') p.set('kota', sp.kota)
    if (sp.online && key !== 'online') p.set('online', sp.online)
    if (sp.offline && key !== 'offline') p.set('offline', sp.offline)
    if (sp.bpjs && key !== 'bpjs') p.set('bpjs', sp.bpjs)
    if (sp.focus && key !== 'focus') p.set('focus', sp.focus)
    if (sp.type && key !== 'type') p.set('type', sp.type)
    const qs = p.toString()
    return `/cari${qs ? '?' + qs : ''}`
  }

  const activeChips: { label: string; removeUrl: string }[] = []
  if (sp.kota) activeChips.push({ label: sp.kota, removeUrl: urlWithout('kota') })
  if (online) activeChips.push({ label: 'Online', removeUrl: urlWithout('online') })
  if (offline) activeChips.push({ label: 'Offline', removeUrl: urlWithout('offline') })
  if (bpjs) activeChips.push({ label: 'Ditanggung BPJS', removeUrl: urlWithout('bpjs') })
  if (sp.focus) activeChips.push({ label: sp.focus, removeUrl: urlWithout('focus') })

  return (
    <div className="min-h-screen bg-[#faf7f0]">
      {/* Directory header — sticks below the global Navbar */}
      <div className="sticky top-[53px] z-40 border-b border-[#e5d9c2] bg-[#f3ede0]">
        {/* Nav row */}
        <div className="mx-auto flex max-w-5xl items-center gap-[10px] px-5 pb-2 pt-[10px]">
          <Link
            href="/"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#e5d9c2] text-[16px] font-semibold text-[#1e3d12] no-underline transition hover:bg-[#d4c5a8]"
            aria-label="Kembali ke beranda"
          >
            ←
          </Link>
          <span className="flex-1 font-serif text-[20px] leading-none tracking-tight text-[#1e3d12]">
            Cari Psikolog
          </span>
          <FilterSheet
            kotaList={kotaList}
            currentKota={sp.kota}
            currentOnline={online}
            currentOffline={offline}
            currentBpjs={bpjs}
            currentFocus={sp.focus}
            currentQ={sp.q}
            totalResults={totalResults}
          />
        </div>

        {/* Search form */}
        <div className="mx-auto max-w-5xl px-5 pb-[10px]">
          <form action="/cari" method="GET" className="relative">
            {sp.kota && <input type="hidden" name="kota" value={sp.kota} />}
            {sp.online && <input type="hidden" name="online" value={sp.online} />}
            {sp.offline && <input type="hidden" name="offline" value={sp.offline} />}
            {sp.bpjs && <input type="hidden" name="bpjs" value={sp.bpjs} />}
            {sp.focus && <input type="hidden" name="focus" value={sp.focus} />}
            <span className="pointer-events-none absolute left-[16px] top-1/2 -translate-y-1/2 text-[#7b6e5c]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              name="q"
              type="search"
              defaultValue={sp.q}
              placeholder="Nama, kota, atau spesialisasi..."
              className="w-full rounded-full border-[1.5px] border-[#e5d9c2] bg-[#faf7f0] py-[11px] pl-[42px] pr-[18px] font-sans text-[14px] text-[#19290f] outline-none transition placeholder:text-[#7b6e5c] focus:border-[#396025]"
            />
          </form>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="mx-auto flex max-w-5xl gap-[7px] overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {activeChips.map((chip) => (
              <Link
                key={chip.label}
                href={chip.removeUrl}
                className="inline-flex shrink-0 items-center gap-[5px] rounded-full border-[1.5px] border-[#1e3d12] bg-[#1e3d12] px-3 py-[5px] text-[13px] font-semibold text-white no-underline"
              >
                {chip.label}
                <span className="text-[12px] opacity-75">✕</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="mb-3 px-1 text-[13px] font-medium text-[#7b6e5c]">
          {totalResults > 0
            ? `${totalResults} psikolog & klinik ditemukan`
            : 'Belum ada hasil ditemukan'}
        </div>

        {totalResults === 0 ? (
          <div className="rounded-[20px] border border-[#e5d9c2] bg-white px-6 py-16 text-center">
            <p className="mb-2 text-[15px] font-bold text-[#19290f]">Belum ada hasil</p>
            <p className="mb-6 text-[13px] text-[#7b6e5c]">
              Coba ubah filter atau tambahkan psikolog baru ke direktori.
            </p>
            <Link
              href="/tambahkan"
              className="inline-flex rounded-full bg-[#1e3d12] px-5 py-3 text-[14px] font-bold text-white no-underline transition hover:bg-[#396025]"
            >
              Tambahkan psikolog
            </Link>
          </div>
        ) : (
          <div className="grid gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
            {showPsikolog && psikolog.map((p) => (
              <PsikologCard key={p.id} psikolog={p} />
            ))}
            {showKlinik && clinics.map((c) => (
              <ClinicCard key={c.id} clinic={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
