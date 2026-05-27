import Link from 'next/link'
import { getStats } from '@/lib/queries'

export default async function HomePage() {
  const stats = await getStats()

  return (
    <main>
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e8f3ee] px-3 py-1 text-xs font-medium text-[#4d8b6f]">
          Direktori terbuka untuk semua
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight text-[#2c2c2c] sm:text-5xl">
          Temukan psikolog yang{' '}
          <span className="text-[#4d8b6f]">tepat untukmu</span>
        </h1>
        <p className="mb-8 text-lg text-[#6b6568]">
          Direktori psikolog dan klinik kesehatan mental Indonesia. Kamu tidak perlu
          mencarinya sendirian.
        </p>

        <form action="/cari" method="GET" className="mb-6">
          <div className="flex overflow-hidden rounded-2xl border border-[#e8e3dc] bg-white shadow-sm focus-within:border-[#4d8b6f] focus-within:ring-2 focus-within:ring-[#4d8b6f]/20">
            <input
              name="q"
              type="text"
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

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[#6b6568]">Cepat:</span>
          {[
            { label: 'Jakarta', href: '/cari?kota=Jakarta' },
            { label: 'Bandung', href: '/cari?kota=Bandung' },
            { label: 'Surabaya', href: '/cari?kota=Surabaya' },
            { label: 'Yogyakarta', href: '/cari?kota=Yogyakarta' },
            { label: 'Online', href: '/cari?online=true' },
          ].map((chip) => (
            <Link
              key={chip.label}
              href={chip.href}
              className="rounded-full border border-[#e8e3dc] bg-white px-3 py-1 text-xs font-medium text-[#2c2c2c] transition hover:border-[#4d8b6f] hover:text-[#4d8b6f]"
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e8e3dc] bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#4d8b6f]">
                {stats.totalPsikolog.toLocaleString('id-ID')}
              </div>
              <div className="mt-1 text-sm text-[#6b6568]">Psikolog terdaftar</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#4d8b6f]">
                {stats.totalKliniks.toLocaleString('id-ID')}
              </div>
              <div className="mt-1 text-sm text-[#6b6568]">Klinik & layanan</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#4d8b6f]">
                {stats.totalKota.toLocaleString('id-ID')}
              </div>
              <div className="mt-1 text-sm text-[#6b6568]">Kota terjangkau</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e8e3dc] bg-white p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f3ee] text-[#4d8b6f]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="mb-1 font-semibold text-[#2c2c2c]">Cari sesuai kebutuhanmu</h3>
            <p className="text-sm text-[#6b6568]">
              Filter berdasarkan kota, biaya, spesialisasi, dan format sesi.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e8e3dc] bg-white p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f3ee] text-[#4d8b6f]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="mb-1 font-semibold text-[#2c2c2c]">Profil lengkap</h3>
            <p className="text-sm text-[#6b6568]">
              Informasi pendekatan terapi, rentang biaya, dan cara menghubungi.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e8e3dc] bg-white p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f3ee] text-[#4d8b6f]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="mb-1 font-semibold text-[#2c2c2c]">Tanpa registrasi</h3>
            <p className="text-sm text-[#6b6568]">
              Akses semua informasi secara gratis, tanpa perlu membuat akun.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
        <div className="rounded-3xl bg-[#e8f3ee] px-8 py-12">
          <h2 className="mb-3 text-2xl font-bold text-[#2c2c2c]">
            Kamu seorang psikolog?
          </h2>
          <p className="mb-6 text-[#6b6568]">
            Tambahkan atau klaim profilmu agar lebih banyak orang bisa menemukanmu.
            Gratis, mudah, dan membantu mereka yang membutuhkan.
          </p>
          <Link href="/tambahkan" className="btn-primary">
            Tambahkan profilmu
          </Link>
        </div>
      </section>
    </main>
  )
}
