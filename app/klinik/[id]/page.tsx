import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getClinic, getPsikologByClinic } from '@/lib/queries'
import BpjsBadge from '@/components/BpjsBadge'
import FeeDisplay from '@/components/FeeDisplay'
import TagList from '@/components/TagList'
import ContactButtons from '@/components/ContactButtons'
import PsikologCard from '@/components/PsikologCard'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

const TIPE_LABELS: Record<string, string> = {
  biro_psikologi: 'Biro Psikologi',
  platform_online: 'Platform Online',
  rumah_sakit_umum: 'Rumah Sakit Umum',
  rumah_sakit_jiwa: 'Rumah Sakit Jiwa',
  klinik_swasta: 'Klinik Swasta',
  klinik_akademik: 'Klinik Akademik',
  yayasan: 'Yayasan',
}

function getTipeLabel(tipe: string | null): string {
  if (!tipe) return 'Klinik'
  return TIPE_LABELS[tipe] ?? tipe
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const c = await getClinic(id)
  if (!c) return { title: 'Klinik tidak ditemukan' }
  return {
    title: `${c.nama ?? 'Klinik'} – Temukan Psikolog`,
    description: `${getTipeLabel(c.tipe)}${c.kota ? ` di ${c.kota}` : ''}. ${c.focus?.slice(0, 3).join(', ') ?? ''}`,
  }
}

export default async function KlinikProfilePage({ params }: Props) {
  const { id } = await params
  const c = await getClinic(id)

  if (!c) notFound()

  const psikologList = await getPsikologByClinic([id])
  const initial = c.nama ? c.nama.charAt(0).toUpperCase() : '?'

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#fdf0eb] text-2xl font-bold text-[#d97454]">
          {initial}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2c2c2c]">
            {c.nama ?? 'Nama tidak tersedia'}
          </h1>
          <p className="text-[#6b6568]">{getTipeLabel(c.tipe)}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {c.kota && (
              <span className="badge bg-[#fdf0eb] text-[#d97454]">{c.kota}</span>
            )}
            {c.area && (
              <span className="badge bg-[#f0ede8] text-[#6b6568]">{c.area}</span>
            )}
            {c.online_available && (
              <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">Online</span>
            )}
            {c.offline_available && (
              <span className="badge bg-[#f0ede8] text-[#6b6568]">Offline</span>
            )}
            {c.subsidi_silang && (
              <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">Subsidi Silang</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="card">
            <h2 className="section-label mb-3">Informasi Kontak</h2>
            <div className="space-y-2 text-sm">
              {c.alamat && (
                <div>
                  <span className="text-[#6b6568]">Alamat:</span>
                  <p className="mt-0.5 text-[#2c2c2c]">{c.alamat}</p>
                </div>
              )}
              {c.jam_operasional && (
                <div className="flex items-start gap-2">
                  <span className="shrink-0 text-[#6b6568]">Jam operasional:</span>
                  <span className="text-[#2c2c2c]">{c.jam_operasional}</span>
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-2">
                  <span className="text-[#6b6568]">Email:</span>
                  <a href={`mailto:${c.email}`} className="text-[#4d8b6f] hover:underline">
                    {c.email}
                  </a>
                </div>
              )}
            </div>
            <div className="mt-4">
              <ContactButtons
                wa={c.wa_number}
                instagram={c.instagram}
                website={c.website}
                telepon={c.telepon}
              />
            </div>
          </div>

          <div className="card">
            <h2 className="section-label mb-3">Biaya</h2>
            <FeeDisplay
              onlineMin={c.fee_online_idr_min}
              onlineMax={c.fee_online_idr_max}
              offlineMin={c.fee_offline_idr_min}
              offlineMax={c.fee_offline_idr_max}
            />
            {c.fee_notes && (
              <p className="mt-2 text-xs text-[#6b6568]">{c.fee_notes}</p>
            )}
            {c.session_duration_minutes && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="text-[#6b6568]">Durasi sesi:</span>
                <span className="font-medium">{c.session_duration_minutes} menit</span>
              </div>
            )}
            <div className="mt-3">
              <BpjsBadge accepted={c.bpjs_accepted} />
            </div>
          </div>

          {c.gmaps_link && (
            <div className="card">
              <h2 className="section-label mb-3">Lokasi</h2>
              <a
                href={c.gmaps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Lihat di Google Maps
              </a>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {c.focus && c.focus.length > 0 && (
            <div className="card">
              <h2 className="section-label mb-3">Fokus Layanan</h2>
              <TagList tags={c.focus} maxShow={10} />
            </div>
          )}

          {c.instagram_followers && (
            <div className="card">
              <h2 className="section-label mb-3">Media Sosial</h2>
              <p className="text-sm text-[#6b6568]">
                {c.instagram_followers} pengikut Instagram
              </p>
            </div>
          )}

          {c.notes && (
            <div className="rounded-2xl border border-[#e8e3dc] bg-[#faf9f7] p-5">
              <p className="section-label mb-2">Catatan</p>
              <p className="text-sm text-[#6b6568]">{c.notes}</p>
            </div>
          )}
        </div>
      </div>

      {psikologList.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-[#2c2c2c]">
            Psikolog di {c.nama ?? 'klinik ini'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {psikologList.map((p) => (
              <PsikologCard key={p.id} psikolog={p} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e8e3dc] bg-white p-5">
        <p className="text-sm text-[#6b6568]">
          Apakah kamu mengelola klinik ini? Klaim dan perbarui informasinya.
        </p>
        <Link href="/tambahkan" className="btn-outline text-sm">
          Klaim profil ini
        </Link>
      </div>
    </main>
  )
}
