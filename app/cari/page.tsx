import Link from 'next/link'
import { searchDirectory, getKotaList } from '@/lib/queries'
import PsikologCard from '@/components/PsikologCard'
import ClinicCard from '@/components/ClinicCard'
import FilterSidebar from '@/components/FilterSidebar'

interface SearchParams {
  q?: string
  kota?: string
  online?: string
  offline?: string
  bpjs?: string
  focus?: string
}

export default async function CariPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const kotaList = await getKotaList()

  const kota = sp.kota ? sp.kota.split(',').map((k) => k.trim()).filter(Boolean) : []
  const focus = sp.focus ? sp.focus.split(',').map((f) => f.trim()).filter(Boolean) : []
  const online = sp.online === 'true'
  const offline = sp.offline === 'true'
  const bpjs = sp.bpjs === 'true'

  const { psikolog, clinics } = await searchDirectory({
    q: sp.q,
    kota: kota.length > 0 ? kota : undefined,
    online: online || undefined,
    offline: offline || undefined,
    bpjs: bpjs || undefined,
    focus: focus.length > 0 ? focus : undefined,
  })

  const totalResults = psikolog.length + clinics.length

  function urlWithout(key: string, value?: string) {
    const p = new URLSearchParams()
    if (sp.q) p.set('q', sp.q)
    if (key !== 'kota') {
      if (kota.length > 0) p.set('kota', kota.join(','))
    } else if (value) {
      const remaining = kota.filter((k) => k !== value)
      if (remaining.length > 0) p.set('kota', remaining.join(','))
    }
    if (sp.online && key !== 'online') p.set('online', sp.online)
    if (sp.offline && key !== 'offline') p.set('offline', sp.offline)
    if (sp.bpjs && key !== 'bpjs') p.set('bpjs', sp.bpjs)
    if (key !== 'focus') {
      if (focus.length > 0) p.set('focus', focus.join(','))
    } else if (value) {
      const remaining = focus.filter((f) => f !== value)
      if (remaining.length > 0) p.set('focus', remaining.join(','))
    }
    const qs = p.toString()
    return `/cari${qs ? '?' + qs : ''}`
  }

  const activeChips: { label: string; removeUrl: string }[] = [
    ...kota.map((k) => ({ label: k, removeUrl: urlWithout('kota', k) })),
    ...(online && !offline ? [{ label: 'Online', removeUrl: urlWithout('online') }] : []),
    ...(offline && !online ? [{ label: 'Offline', removeUrl: urlWithout('offline') }] : []),
    ...(online && offline ? [{ label: 'Online + Offline', removeUrl: urlWithout('online') }] : []),
    ...(bpjs ? [{ label: 'Ditanggung BPJS', removeUrl: urlWithout('bpjs') }] : []),
    ...focus.map((f) => ({ label: f, removeUrl: urlWithout('focus', f) })),
  ]

  return (
    <div className="min-h-screen bg-[#faf7f0]">
      {/* Sticky header */}
      <div className="sticky top-[53px] z-40 border-b border-[#e5d9c2] bg-[#f3ede0]">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center gap-[10px] pb-2 pt-[10px]">
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
            {/* Mobile filter trigger */}
            <FilterSidebar
              kotaList={kotaList}
              currentKota={kota}
              currentFocus={focus}
              currentOnline={online}
              currentOffline={offline}
              currentBpjs={bpjs}
              currentQ={sp.q}
              totalResults={totalResults}
            />
          </div>

          {/* Search */}
          <div className="pb-[10px]">
            <form action="/cari" method="GET" className="relative">
              {kota.length > 0 && <input type="hidden" name="kota" value={kota.join(',')} />}
              {sp.online && <input type="hidden" name="online" value={sp.online} />}
              {sp.offline && <input type="hidden" name="offline" value={sp.offline} />}
              {sp.bpjs && <input type="hidden" name="bpjs" value={sp.bpjs} />}
              {focus.length > 0 && <input type="hidden" name="focus" value={focus.join(',')} />}
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

          {/* Active chips */}
          {activeChips.length > 0 && (
            <div className="flex gap-[7px] overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
      </div>

      {/* Body: sidebar + results */}
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="flex gap-6">
          {/* Sidebar — desktop only */}
          <aside className="hidden w-[240px] shrink-0 md:block">
            <FilterSidebar
              kotaList={kotaList}
              currentKota={kota}
              currentFocus={focus}
              currentOnline={online}
              currentOffline={offline}
              currentBpjs={bpjs}
              currentQ={sp.q}
              totalResults={totalResults}
            />
          </aside>

          {/* Results */}
          <div className="min-w-0 flex-1">
            <p className="mb-4 px-1 text-[13px] font-medium text-[#7b6e5c]">
              {totalResults > 0
                ? `${totalResults} hasil ditemukan`
                : 'Belum ada hasil ditemukan'}
            </p>

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
              <div className="space-y-8">
                {psikolog.length > 0 && (
                  <section>
                    <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">
                      Psikolog <span className="ml-1 font-serif text-[16px] normal-case tracking-normal text-[#1e3d12]">{psikolog.length}</span>
                    </h2>
                    <div className="grid gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
                      {psikolog.map((p) => (
                        <PsikologCard key={p.id} psikolog={p} />
                      ))}
                    </div>
                  </section>
                )}

                {clinics.length > 0 && (
                  <section>
                    <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">
                      Klinik <span className="ml-1 font-serif text-[16px] normal-case tracking-normal text-[#1e3d12]">{clinics.length}</span>
                    </h2>
                    <div className="grid gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
                      {clinics.map((c) => (
                        <ClinicCard key={c.id} clinic={c} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
