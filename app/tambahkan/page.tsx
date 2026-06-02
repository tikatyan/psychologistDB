import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tambahkan – Temukan Psikolog',
  description: 'Tambahkan psikolog baru atau klaim profilmu di direktori TemukanPsikolog.',
}

export default function TambahkanPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl text-[#19290f]">Bantu lengkapi direktori</h1>
        <p className="mt-3 text-[#7b6e5c]">
          Semakin banyak info yang akurat, semakin mudah orang menemukan bantuan yang pas.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card flex flex-col">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf3e5]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#396025" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h2 className="mb-2 text-[17px] font-semibold text-[#19290f]">
            Tambahkan psikolog baru
          </h2>
          <p className="mb-6 flex-1 text-[14px] text-[#7b6e5c]">
            Tahu psikolog yang bagus tapi belum ada di sini? Bantu daftarkan — kamu bisa kirim dari sumber publik manapun.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd0xE5LUTu4gdniw1xWUSyZXflPeupn-6O95pCGlwgAKUrLRg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary justify-center"
          >
            Isi formulir
          </a>
        </div>

        <div className="card flex flex-col">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3ede0]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8c6d4f" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="M16 11l2 2 4-4" />
            </svg>
          </div>
          <h2 className="mb-2 text-[17px] font-semibold text-[#19290f]">
            Saya psikolog — klaim profil saya
          </h2>
          <p className="mb-6 flex-1 text-[14px] text-[#7b6e5c]">
            Profilmu sudah ada tapi info-nya belum lengkap atau ada yang keliru? Klaim dan perbarui langsung — biaya, spesialisasi, dan kontak.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeEnBk4bWs1Z7yIM-7OmPXvGQn2ED5PvfREyNKISkl0deN-Xw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#e5d9c2] bg-white px-5 py-3 text-[14px] font-semibold text-[#19290f] transition hover:border-[#1e3d12]"
          >
            Klaim profilmu
          </a>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#e5d9c2] bg-[#f3ede0] p-6">
        <h3 className="mb-2 text-[15px] font-semibold text-[#19290f]">Proses review</h3>
        <p className="text-[13px] text-[#7b6e5c]">
          Setiap pengajuan kami tinjau manual sebelum ditampilkan. Biasanya butuh 2–5 hari kerja.
        </p>
      </div>
    </main>
  )
}
