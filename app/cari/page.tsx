import { searchDirectory, getKotaList } from '@/lib/queries'
import PsikologCard from '@/components/PsikologCard'
import ClinicCard from '@/components/ClinicCard'

interface SearchParams {
  q?: string
  kota?: string
  online?: string
  offline?: string
  bpjs?: string
  focus?: string
  approach?: string
  ageRange?: string
  format?: string
  feeMax?: string
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
  const feeMax = sp.feeMax ? parseInt(sp.feeMax) : undefined

  const { psikolog, clinics } = await searchDirectory({
    q: sp.q,
    kota: sp.kota,
    online: online || undefined,
    offline: offline || undefined,
    bpjs: bpjs || undefined,
    focus: sp.focus,
    approach: sp.approach,
    ageRange: sp.ageRange,
    format: sp.format,
    feeMax,
    type,
  })

  const showPsikolog = type === 'psikolog' || type === 'semua'
  const showKlinik = type === 'klinik' || type === 'semua'
  const totalResults = (showPsikolog ? psikolog.length : 0) + (showKlinik ? clinics.length : 0)

  function buildParams(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams()
    const base: Record<string, string | undefined> = {
      q: sp.q,
      kota: sp.kota,
      online: sp.online,
      offline: sp.offline,
      bpjs: sp.bpjs,
      focus: sp.focus,
      approach: sp.approach,
      ageRange: sp.ageRange,
      format: sp.format,
      feeMax: sp.feeMax,
      type: sp.type,
      ...overrides,
    }
    for (const [k, v] of Object.entries(base)) {
      if (v) params.set(k, v)
    }
    return params.toString()
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <form action="/cari" method="GET" className="mb-6">
        {sp.kota && <input type="hidden" name="kota" value={sp.kota} />}
        {sp.online && <input type="hidden" name="online" value={sp.online} />}
        {sp.offline && <input type="hidden" name="offline" value={sp.offline} />}
        {sp.bpjs && <input type="hidden" name="bpjs" value={sp.bpjs} />}
        {sp.type && <input type="hidden" name="type" value={sp.type} />}
        <div className="flex overflow-hidden rounded-2xl border border-[#e8e3dc] bg-white shadow-sm focus-within:border-[#4d8b6f] focus-within:ring-2 focus-within:ring-[#4d8b6f]/20">
          <input
            name="q"
            type="text"
            defaultValue={sp.q}
            placeholder="Cari psikolog, kota, atau spesialisasi..."
            className="flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-[#6b6568]"
          />
          <button
            type="submit"
            className="m-1.5 rounded-xl bg-[#4d8b6f] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3a6e57]"
          >
            Cari
          </button>
        </div>
      </form>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border border-[#e8e3dc] bg-white overflow-hidden">
          {(['semua', 'psikolog', 'klinik'] as const).map((t) => (
            <a
              key={t}
              href={`/cari?${buildParams({ type: t })}`}
              className={`px-4 py-2 text-sm font-medium capitalize transition ${
                (sp.type ?? 'semua') === t
                  ? 'bg-[#4d8b6f] text-white'
                  : 'text-[#6b6568] hover:text-[#2c2c2c]'
              }`}
            >
              {t === 'semua' ? 'Semua' : t === 'psikolog' ? 'Psikolog' : 'Klinik'}
            </a>
          ))}
        </div>

        <form action="/cari" method="GET" className="flex items-center gap-2">
          {sp.q && <input type="hidden" name="q" value={sp.q} />}
          {sp.online && <input type="hidden" name="online" value={sp.online} />}
          {sp.offline && <input type="hidden" name="offline" value={sp.offline} />}
          {sp.bpjs && <input type="hidden" name="bpjs" value={sp.bpjs} />}
          {sp.type && <input type="hidden" name="type" value={sp.type} />}
          <select
            name="kota"
            defaultValue={sp.kota ?? ''}
            className="rounded-xl border border-[#e8e3dc] bg-white px-3 py-2 text-sm text-[#2c2c2c] outline-none focus:border-[#4d8b6f]"
            onChange={undefined}
          >
            <option value="">Semua kota</option>
            {kotaList.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-xl border border-[#e8e3dc] bg-white px-3 py-2 text-sm text-[#6b6568] hover:text-[#2c2c2c]">
            Terapkan
          </button>
        </form>

        <div className="flex gap-2">
          <a
            href={`/cari?${buildParams({ online: online ? undefined : 'true' })}`}
            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
              online
                ? 'border-[#4d8b6f] bg-[#e8f3ee] text-[#4d8b6f]'
                : 'border-[#e8e3dc] bg-white text-[#6b6568] hover:text-[#2c2c2c]'
            }`}
          >
            Online
          </a>
          <a
            href={`/cari?${buildParams({ offline: offline ? undefined : 'true' })}`}
            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
              offline
                ? 'border-[#4d8b6f] bg-[#e8f3ee] text-[#4d8b6f]'
                : 'border-[#e8e3dc] bg-white text-[#6b6568] hover:text-[#2c2c2c]'
            }`}
          >
            Offline
          </a>
          <a
            href={`/cari?${buildParams({ bpjs: bpjs ? undefined : 'true' })}`}
            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
              bpjs
                ? 'border-[#4d8b6f] bg-[#e8f3ee] text-[#4d8b6f]'
                : 'border-[#e8e3dc] bg-white text-[#6b6568] hover:text-[#2c2c2c]'
            }`}
          >
            BPJS
          </a>
        </div>
      </div>

      <p className="mb-4 text-sm text-[#6b6568]">
        {totalResults > 0
          ? `${totalResults} hasil ditemukan`
          : 'Belum ada hasil ditemukan'}
      </p>

      {totalResults === 0 ? (
        <div className="rounded-2xl border border-[#e8e3dc] bg-white py-16 text-center">
          <div className="mb-3 text-4xl">🔍</div>
          <h3 className="mb-2 font-semibold text-[#2c2c2c]">
            Belum ada hasil untuk pencarianmu
          </h3>
          <p className="mb-6 text-sm text-[#6b6568]">
            Coba ubah filter atau tambahkan psikolog baru ke direktori ini.
          </p>
          <a href="/tambahkan" className="btn-primary">
            Tambahkan psikolog baru
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {showPsikolog && psikolog.length > 0 && (
            <div>
              {type === 'semua' && (
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#6b6568]">
                  Psikolog ({psikolog.length})
                </h2>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {psikolog.map((p) => (
                  <PsikologCard key={p.id} psikolog={p} />
                ))}
              </div>
            </div>
          )}

          {showKlinik && clinics.length > 0 && (
            <div>
              {type === 'semua' && (
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#6b6568]">
                  Klinik & Layanan ({clinics.length})
                </h2>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {clinics.map((c) => (
                  <ClinicCard key={c.id} clinic={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
