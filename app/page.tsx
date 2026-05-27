import Link from 'next/link'
import { getStats } from '@/lib/queries'
import SituationGrid from '@/components/SituationGrid'

export default async function HomePage() {
  const stats = await getStats()

  return (
    <main>
      {/* Hero */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          minHeight: 420,
          background: 'linear-gradient(160deg, #2a5a1a 0%, #1e3d12 40%, #0d2208 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse at 25% 30%, rgba(82,122,58,0.35) 0%, transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(30,61,18,0.6) 0%, transparent 55%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(to top, rgba(8,22,4,0.85) 0%, rgba(8,22,4,0.3) 50%, rgba(8,22,4,0) 80%)',
          }}
        />
        <div className="relative z-[3] mx-auto w-full max-w-5xl px-6 pb-12 pt-20 sm:px-8 sm:pb-16">
          <h1 className="mb-3 font-serif text-5xl leading-none tracking-tight text-white sm:text-6xl">
            Kamu tidak harus
            <br />
            <em className="text-[#9ec485]">sendirian.</em>
          </h1>
          <p className="max-w-xs text-[14px] leading-relaxed text-white/70 sm:max-w-sm">
            Direktori psikolog dan klinik kesehatan mental di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* Content block */}
      <div style={{ background: '#f0f4eb' }}>

        {/* Situation selector */}
        <section className="border-b border-[#cdd5c5] px-6 py-7 sm:px-8">
          <div className="mx-auto max-w-xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b6e5c]">
              Apa yang sedang kamu rasakan?
            </p>
            <SituationGrid />
          </div>
        </section>

        {/* Divider + search */}
        <section className="px-6 py-6 sm:px-8">
          <div className="mx-auto max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#cdd5c5]" />
              <span className="text-[12px] font-medium text-[#7b6e5c]">atau cari langsung</span>
              <div className="h-px flex-1 bg-[#cdd5c5]" />
            </div>
            <form action="/cari" method="GET">
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-[18px] text-[#7b6e5c]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </span>
                <input
                  name="q"
                  type="search"
                  placeholder="Nama, kota, atau spesialisasi..."
                  className="w-full rounded-full border-[1.5px] border-[#cdd5c5] bg-[#e6ece0] py-[13px] pl-[46px] pr-5 font-sans text-[15px] text-[#19290f] outline-none transition placeholder:text-[#7b6e5c] focus:border-[#396025] focus:bg-[#faf7f0]"
                />
              </div>
            </form>
          </div>
        </section>

        {/* Stats bar */}
        <div className="flex border-y border-[#cdd5c5] bg-[#dde4d7]">
          <div className="flex flex-1 flex-col items-center border-r border-[#cdd5c5] py-[22px]">
            <span className="font-serif text-[34px] leading-none tracking-tight text-[#1e3d12]">
              {stats.totalPsikolog}
            </span>
            <span className="mt-[5px] text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">
              Psikolog
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center border-r border-[#cdd5c5] py-[22px]">
            <span className="font-serif text-[34px] leading-none tracking-tight text-[#1e3d12]">
              {stats.totalKota}
            </span>
            <span className="mt-[5px] text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">
              Kota
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center py-[22px]">
            <span className="font-serif text-[34px] leading-none tracking-tight text-[#1e3d12]">
              {stats.totalKliniks}
            </span>
            <span className="mt-[5px] text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b6e5c]">
              Klinik
            </span>
          </div>
        </div>

        {/* CTA text link */}
        <div className="border-b border-[#cdd5c5] px-6 py-[22px] text-center">
          <p className="text-[13px] leading-relaxed text-[#7b6e5c]">
            Bantu kami lengkapi direktori ini —{' '}
            <Link
              href="/tambahkan"
              className="border-b border-[#527a3a] pb-px font-bold text-[#396025] transition hover:text-[#1e3d12]"
            >
              tambahkan psikolog
            </Link>
          </p>
        </div>

        {/* About section */}
        <section className="bg-[#1e3d12] px-6 py-8 sm:px-8">
          <div className="mx-auto max-w-xl">
            <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[0.12em] text-[#9ec485]/70">
              Tentang PsikologDB
            </p>
            <h2 className="mb-4 font-serif text-[28px] leading-tight tracking-tight text-white">
              Dibuat bersama,
              <br />
              <em className="text-[#9ec485]">untuk semua.</em>
            </h2>
            <p className="text-[13.5px] leading-[1.72] text-white/60">
              PsikologDB lahir dari keyakinan bahwa menemukan psikolog yang tepat tidak seharusnya
              sulit. Kami membangun direktori ini secara terbuka dan bersama komunitas, agar setiap
              orang di Indonesia bisa menemukan bantuan profesional yang sesuai dengan kebutuhan
              dan kondisinya.
            </p>
            <p className="mt-[10px] text-[13.5px] leading-[1.72] text-white/60">
              Kami tidak menjual layanan konseling. Kami hanya membantu kamu menemukan bantuan.
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}
