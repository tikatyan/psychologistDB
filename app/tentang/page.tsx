import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang – Temukan Psikolog',
  description: 'Tentang Temukan Psikolog: direktori psikolog dan klinik kesehatan mental Indonesia yang terbuka dan gratis.',
}

export default function TentangPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#2c2c2c]">Tentang Temukan Psikolog</h1>
      <p className="mb-10 text-[#6b6568]">
        Direktori psikolog dan klinik kesehatan mental Indonesia yang terbuka, gratis, dan
        mudah diakses oleh siapa saja.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-[#2c2c2c]">Apa itu Temukan Psikolog?</h2>
          <p className="text-sm leading-relaxed text-[#6b6568]">
            Temukan Psikolog adalah direktori daring yang mengumpulkan informasi psikolog
            klinis dan klinik kesehatan mental di seluruh Indonesia. Kami menyediakan
            informasi tentang spesialisasi, biaya, format layanan, dan cara menghubungi,
            sehingga kamu bisa membuat keputusan yang tepat sebelum memulai perjalanan
            kesehatan mentalmu.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[#2c2c2c]">Mengapa ini ada?</h2>
          <p className="text-sm leading-relaxed text-[#6b6568]">
            Menemukan psikolog yang tepat di Indonesia tidak selalu mudah. Informasi tersebar
            di berbagai platform, biaya tidak transparan, dan tidak semua orang tahu harus
            mulai dari mana. Kami percaya bahwa informasi yang mudah diakses bisa menjadi
            langkah pertama yang berarti bagi seseorang yang sedang membutuhkan bantuan.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[#2c2c2c]">Sumber data</h2>
          <p className="mb-3 text-sm leading-relaxed text-[#6b6568]">
            Data dikumpulkan dari berbagai sumber publik yang tersedia secara daring,
            di antaranya:
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-[#6b6568]">
            <li>Situs web resmi psikolog dan klinik</li>
            <li>Profil Instagram dan media sosial profesional</li>
            <li>Platform kesehatan mental online Indonesia</li>
            <li>Direktori HIMPSI dan organisasi profesi terkait</li>
            <li>Kontribusi dari komunitas dan psikolog yang mendaftar langsung</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[#2c2c2c]">Cara berkontribusi</h2>
          <p className="mb-4 text-sm leading-relaxed text-[#6b6568]">
            Direktori ini tumbuh berkat kontribusi komunitas. Kamu bisa membantu dengan:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-1.5 text-sm text-[#6b6568]">
            <li>Menambahkan psikolog yang belum terdaftar</li>
            <li>Melaporkan informasi yang tidak akurat atau sudah kedaluwarsa</li>
            <li>Mengklaim dan memperbarui profil psikologmu sendiri</li>
          </ul>
          <Link href="/tambahkan" className="btn-primary">
            Mulai berkontribusi
          </Link>
        </section>

        <section className="rounded-2xl border border-[#e8e3dc] bg-[#faf9f7] p-5">
          <h2 className="mb-2 font-semibold text-[#2c2c2c]">Disclaimer data</h2>
          <p className="text-sm leading-relaxed text-[#6b6568]">
            Data dikumpulkan dari sumber publik dan mungkin tidak selalu mutakhir atau
            lengkap. Selalu verifikasi langsung dengan psikolog atau klinik sebelum
            membuat keputusan terkait layanan kesehatan mental. Temukan Psikolog tidak
            bertanggung jawab atas akurasi informasi yang ditampilkan.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[#2c2c2c]">Hubungi kami</h2>
          <p className="text-sm text-[#6b6568]">
            Ada pertanyaan, laporan, atau ingin berkolaborasi? Hubungi kami di{' '}
            <a
              href="mailto:halo@temukanpsikolog.id"
              className="text-[#4d8b6f] hover:underline"
            >
              halo@temukanpsikolog.id
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
