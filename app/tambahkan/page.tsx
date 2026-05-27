import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tambahkan Psikolog – Temukan Psikolog',
  description: 'Tambahkan psikolog baru atau klaim profil psikologmu di direktori Temukan Psikolog.',
}

export default function TambahkanPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#2c2c2c]">Tambahkan ke Direktori</h1>
        <p className="mt-3 text-[#6b6568]">
          Bantu lebih banyak orang menemukan bantuan yang mereka butuhkan.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card flex flex-col">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f3ee]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4d8b6f" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h2 className="mb-2 text-lg font-semibold text-[#2c2c2c]">
            Tambahkan psikolog baru
          </h2>
          <p className="mb-6 flex-1 text-sm text-[#6b6568]">
            Apakah kamu tahu seorang psikolog yang belum terdaftar di sini? Bantu kami
            melengkapi direktori ini agar lebih banyak orang dapat menemukan bantuan yang
            tepat. Kamu bisa mengirimkan informasi dari sumber publik.
          </p>
          <a
            href="#todo-gform-tambah"
            className="btn-primary justify-center"
          >
            Isi formulir penambahan
          </a>
        </div>

        <div className="card flex flex-col">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fdf0eb]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97454" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="M16 11l2 2 4-4" />
            </svg>
          </div>
          <h2 className="mb-2 text-lg font-semibold text-[#2c2c2c]">
            Saya psikolog, klaim profil saya
          </h2>
          <p className="mb-6 flex-1 text-sm text-[#6b6568]">
            Apakah profilmu sudah ada di direktori ini tapi informasinya belum lengkap atau
            tidak akurat? Klaim profilmu untuk memperbarui informasi kontak, biaya, dan
            spesialisasi secara langsung.
          </p>
          <a
            href="#todo-gform-klaim"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d97454] bg-white px-4 py-2.5 text-sm font-semibold text-[#d97454] transition hover:bg-[#fdf0eb] active:scale-95"
          >
            Klaim profilmu
          </a>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#e8e3dc] bg-[#faf9f7] p-6">
        <h3 className="mb-2 font-semibold text-[#2c2c2c]">Proses peninjauan</h3>
        <p className="text-sm text-[#6b6568]">
          Setiap pengajuan akan kami tinjau secara manual sebelum ditampilkan di direktori.
          Biasanya proses ini membutuhkan waktu 2–5 hari kerja.
        </p>
      </div>
    </main>
  )
}
