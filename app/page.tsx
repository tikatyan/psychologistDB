import Link from 'next/link'
import { getStats } from '@/lib/queries'
import SituationGrid from '@/components/SituationGrid'
import SymptomSearch from '@/components/SymptomSearch'

export default async function HomePage() {
  const stats = await getStats()

  return (
    <main className="bg-[#f5f8f2]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: 500,
          backgroundImage: 'url(/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
        }}
      >
        {/* Soft left-to-right fade so text stays crisp */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #f5f8f2 28%, rgba(245,248,242,0.88) 48%, rgba(245,248,242,0.15) 68%, transparent 85%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
          <div className="max-w-[480px]">
            {/* Decorative accent */}
            <div className="mb-5 flex gap-1.5">
              <span className="h-[6px] w-[6px] rounded-full bg-[#9ec485]" />
              <span className="h-[6px] w-[6px] rounded-full bg-[#396025]" />
              <span className="h-[6px] w-[6px] rounded-full bg-[#1e3d12]" />
            </div>
            <h1 className="mb-4 font-serif text-5xl leading-[1.08] tracking-tight text-[#19290f] sm:text-[58px]">
              Kamu tidak harus
              <br />
              <em className="text-[#1e3d12]">melaluinya sendirian.</em>
            </h1>
            <p className="text-[15px] leading-relaxed text-[#6b5f4f]">
              Temukan psikolog dan klinik kesehatan mental di seluruh Indonesia —
              gratis, terbuka, bisa diakses siapa saja.
            </p>
          </div>
        </div>
      </section>

      {/* ── "Lagi ngerasa apa?" ──────────────────────────────── */}
      <section className="px-6 pb-4 pt-12 sm:px-10">
        <div className="mx-auto max-w-xl">
          <p className="mb-1 font-serif text-[13px] italic text-[#7b6e5c]">lagi ngerasa apa?</p>
          <h2 className="mb-6 font-serif text-[28px] leading-tight tracking-tight text-[#19290f]">
            Mulai dari sini.
          </h2>
          <SituationGrid />
        </div>
      </section>

      {/* ── Free-text ────────────────────────────────────────── */}
      <section className="px-6 pb-14 pt-8 sm:px-10">
        <div className="mx-auto max-w-xl">
          <p className="mb-4 font-serif text-[18px] italic leading-snug text-[#7b6e5c]">
            atau ceritakan dengan kata-katamu sendiri
          </p>
          <SymptomSearch />
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="bg-[#1e3d12] px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-xl">
          <p className="mb-1 font-serif text-[13px] italic text-[#9ec485]/60">direktori kami</p>
          <h2 className="mb-10 font-serif text-[30px] leading-tight tracking-tight text-white">
            Ribuan pilihan, <em className="text-[#9ec485]">satu tempat.</em>
          </h2>

          <div className="flex gap-12">
            <div>
              <span className="block font-serif text-[54px] leading-none tracking-tight text-white">
                {stats.totalPsikolog}
              </span>
              <span className="mt-1.5 block font-serif text-[14px] italic text-[#9ec485]/70">
                psikolog
              </span>
            </div>
            <div>
              <span className="block font-serif text-[54px] leading-none tracking-tight text-white">
                {stats.totalKota}
              </span>
              <span className="mt-1.5 block font-serif text-[14px] italic text-[#9ec485]/70">
                kota
              </span>
            </div>
            <div>
              <span className="block font-serif text-[54px] leading-none tracking-tight text-white">
                {stats.totalKliniks}
              </span>
              <span className="mt-1.5 block font-serif text-[14px] italic text-[#9ec485]/70">
                klinik
              </span>
            </div>
          </div>

          <p className="mt-10 text-[13px] leading-relaxed text-white/40">
            Tahu psikolog yang belum ada di daftar ini?{' '}
            <Link
              href="/tambahkan"
              className="font-semibold text-[#9ec485] transition hover:text-white"
            >
              Bantu tambahkan →
            </Link>
          </p>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section className="px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-xl">
          <p className="mb-1 font-serif text-[13px] italic text-[#7b6e5c]">tentang kami</p>
          <h2 className="mb-5 font-serif text-[30px] leading-tight tracking-tight text-[#19290f]">
            Dibuat bersama, <em className="text-[#396025]">untuk semua.</em>
          </h2>
          <p className="text-[14px] leading-[1.8] text-[#7b6e5c]">
            TemukanPsikolog ada karena mencari psikolog yang tepat di Indonesia itu
            tidak semestinya serumit ini. Kami kumpulkan informasinya di satu tempat —
            terbuka, gratis, dan terus diperbarui bersama komunitas.
          </p>
          <p className="mt-3 text-[14px] leading-[1.8] text-[#7b6e5c]">
            Kami tidak menjual layanan konseling. Kami hanya mempermudah kamu
            menemukan orang yang bisa membantu.
          </p>
          <Link
            href="/tentang"
            className="mt-5 inline-block font-serif text-[15px] italic text-[#396025] transition hover:text-[#1e3d12]"
          >
            Selengkapnya →
          </Link>
        </div>
      </section>

    </main>
  )
}
