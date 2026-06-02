import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang – Temukan Psikolog',
  description: 'Tentang TemukanPsikolog: direktori psikolog dan klinik kesehatan mental Indonesia yang terbuka dan gratis.',
}

export default function TentangPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-2 font-serif text-3xl text-[#19290f]">Tentang TemukanPsikolog</h1>
      <p className="mb-10 text-[#7b6e5c]">
        Direktori psikolog dan klinik kesehatan mental Indonesia — gratis, terbuka, bisa diakses siapa saja.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-[#19290f]">Ini apa, sih?</h2>
          <p className="text-[14px] leading-relaxed text-[#7b6e5c]">
            TemukanPsikolog mengumpulkan info psikolog klinis dan klinik kesehatan mental dari seluruh Indonesia di satu tempat. Spesialisasi, biaya, format sesi, cara menghubungi — semua ada di sini supaya kamu bisa ambil keputusan yang tepat sebelum mulai.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-[#19290f]">Kenapa ini perlu ada?</h2>
          <p className="text-[14px] leading-relaxed text-[#7b6e5c]">
            Cari psikolog yang cocok di Indonesia itu susah. Informasinya tersebar di mana-mana, biayanya tidak transparan, dan tidak semua orang tahu harus mulai dari mana. Kami percaya bahwa informasi yang mudah dijangkau bisa jadi langkah pertama yang berarti.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-[#19290f]">Data dari mana?</h2>
          <p className="mb-3 text-[14px] leading-relaxed text-[#7b6e5c]">
            Dikumpulkan dari berbagai sumber publik:
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-[14px] text-[#7b6e5c]">
            <li>Website resmi psikolog dan klinik</li>
            <li>Instagram dan media sosial profesional</li>
            <li>Platform kesehatan mental online Indonesia</li>
            <li>Direktori HIMPSI dan organisasi profesi terkait</li>
            <li>Kontribusi langsung dari komunitas dan psikolog</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-[#19290f]">Bisa ikut bantu?</h2>
          <p className="mb-4 text-[14px] leading-relaxed text-[#7b6e5c]">
            Direktori ini tumbuh karena kontribusi komunitas. Kamu bisa:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-1.5 text-[14px] text-[#7b6e5c]">
            <li>Tambahkan psikolog yang belum terdaftar</li>
            <li>Laporkan info yang tidak akurat atau sudah basi</li>
            <li>Klaim dan perbarui profilmu sendiri (untuk psikolog)</li>
          </ul>
          <Link href="/tambahkan" className="btn-primary">
            Mulai berkontribusi
          </Link>
        </section>

        <section className="rounded-2xl border border-[#e5d9c2] bg-[#f3ede0] p-5">
          <h2 className="mb-2 text-[15px] font-semibold text-[#19290f]">Catatan penting</h2>
          <p className="text-[13px] leading-relaxed text-[#7b6e5c]">
            Data dikumpulkan dari sumber publik dan mungkin tidak selalu up-to-date atau lengkap. Selalu verifikasi langsung dengan psikolog atau klinik sebelum membuat keputusan. TemukanPsikolog tidak bertanggung jawab atas akurasi info yang ditampilkan.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-[#19290f]">Hubungi kami</h2>
          <p className="text-[14px] text-[#7b6e5c]">
            Ada pertanyaan, laporan, atau mau ngobrol?{' '}
            <a href="mailto:tikastyan@gmail.com" className="font-semibold text-[#396025] hover:underline">
              tikastyan@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
