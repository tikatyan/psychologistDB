import Link from 'next/link'
import { getStats } from '@/lib/queries'
import SituationGrid from '@/components/SituationGrid'
import SymptomSearch from '@/components/SymptomSearch'

export default async function HomePage() {
  const stats = await getStats()

  return (
    <main>
      {/* Hero — illustration anchored right, text floats clearly on the left */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: 420,
          backgroundImage: 'url(/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
        }}
      >
        {/* Left-to-right gradient so text area stays clean */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to right, #f0f4eb 30%, rgba(240,244,235,0.85) 50%, rgba(240,244,235,0.2) 70%, transparent 90%)',
          }}
        />
        <div className="relative z-[3] mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
          <div className="max-w-md">
            <h1 className="mb-3 font-serif text-5xl leading-[1.05] tracking-tight text-[#19290f] sm:text-6xl">
              Kamu tidak harus
              <br />
              <em className="text-[#1e3d12]">melaluinya sendirian.</em>
            </h1>
            <p className="text-[14px] leading-relaxed text-[#7b6e5c]">
              Temukan psikolog dan klinik kesehatan mental di seluruh Indonesia — gratis, terbuka, bisa diakses siapa saja.
            </p>
          </div>
        </div>
      </section>

      {/* Content block */}
      <div style={{ background: '#f0f4eb' }}>

        {/* Situation selector — no bottom border so it flows into symptom search */}
        <section className="px-6 pt-8 pb-5 sm:px-8">
          <div className="mx-auto max-w-xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b6e5c]">
              Apa yang sedang kamu rasakan?
            </p>
            <SituationGrid />
          </div>
        </section>

        {/* Free-text symptom search — flows naturally after cards */}
        <section className="px-6 pb-8 sm:px-8">
          <div className="mx-auto max-w-xl">
            <p className="mb-3 text-center text-[12px] font-medium text-[#7b6e5c]">
              atau ceritakan dengan kata-katamu
            </p>
            <SymptomSearch />
          </div>
        </section>

        {/* Stats — floating editorial style */}
        <section className="bg-[#1e3d12] px-6 py-10 sm:px-8">
          <div className="mx-auto max-w-xl">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9ec485]/60">
              Direktori kami
            </p>
            <h2 className="mb-8 font-serif text-[26px] leading-tight tracking-tight text-white">
              Ribuan pilihan, <em className="text-[#9ec485]">satu tempat.</em>
            </h2>
            <div className="flex gap-10">
              <div>
                <span className="block font-serif text-[48px] leading-none tracking-tight text-white">
                  {stats.totalPsikolog}
                </span>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.08em] text-[#9ec485]/70">
                  Psikolog
                </span>
              </div>
              <div>
                <span className="block font-serif text-[48px] leading-none tracking-tight text-white">
                  {stats.totalKota}
                </span>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.08em] text-[#9ec485]/70">
                  Kota
                </span>
              </div>
              <div>
                <span className="block font-serif text-[48px] leading-none tracking-tight text-white">
                  {stats.totalKliniks}
                </span>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.08em] text-[#9ec485]/70">
                  Klinik
                </span>
              </div>
            </div>
            <p className="mt-8 text-[13px] text-white/50">
              Tahu psikolog yang belum ada di daftar ini?{' '}
              <Link
                href="/tambahkan"
                className="font-bold text-[#9ec485] transition hover:text-white"
              >
                Bantu tambahkan →
              </Link>
            </p>
          </div>
        </section>

        {/* About section */}
        <section className="bg-[#f0f4eb] px-6 py-10 sm:px-8">
          <div className="mx-auto max-w-xl">
            <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[0.12em] text-[#7b6e5c]">
              Tentang TemukanPsikolog
            </p>
            <h2 className="mb-4 font-serif text-[26px] leading-tight tracking-tight text-[#1e3d12]">
              Dibuat bersama,
              <br />
              <em>untuk semua.</em>
            </h2>
            <p className="text-[13.5px] leading-[1.72] text-[#7b6e5c]">
              TemukanPsikolog ada karena mencari psikolog yang tepat di Indonesia itu tidak semestinya serumit ini.
            </p>
            <p className="mt-[10px] text-[13.5px] leading-[1.72] text-[#7b6e5c]">
              Kami tidak menjual layanan konseling. Kami hanya mempermudah kamu menemukan orang yang bisa membantu.
            </p>
            <Link
              href="/tentang"
              className="mt-5 inline-block text-[13px] font-semibold text-[#396025] transition hover:text-[#1e3d12]"
            >
              Selengkapnya →
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
