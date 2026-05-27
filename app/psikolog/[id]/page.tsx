import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPsikolog } from '@/lib/queries'
import BpjsBadge from '@/components/BpjsBadge'
import FeeDisplay from '@/components/FeeDisplay'
import TagList from '@/components/TagList'
import ContactButtons from '@/components/ContactButtons'
import CompletenessScore from '@/components/CompletenessScore'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const p = await getPsikolog(id)
  if (!p) return { title: 'Psikolog tidak ditemukan' }
  return {
    title: `${p.nama ?? 'Psikolog'} – Temukan Psikolog`,
    description: `Profil psikolog ${p.nama ?? ''}${p.kota ? ` di ${p.kota}` : ''}. ${p.case_focus?.slice(0, 3).join(', ') ?? ''}`,
  }
}

export default async function PsikologProfilePage({ params }: Props) {
  const { id } = await params
  const p = await getPsikolog(id)

  if (!p) notFound()

  const initial = p.nama ? p.nama.charAt(0).toUpperCase() : '?'

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        {p.photo_url ? (
          <img
            src={p.photo_url}
            alt={p.nama ?? 'Foto psikolog'}
            className="h-20 w-20 shrink-0 rounded-full object-cover border-2 border-[#e8e3dc]"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e8f3ee] text-3xl font-bold text-[#4d8b6f]">
            {initial}
          </div>
        )}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-[#2c2c2c]">
              {p.nama ?? 'Nama tidak tersedia'}
            </h1>
            {p.gender === 'Perempuan' && (
              <span className="text-[#d97454]" title="Perempuan">♀</span>
            )}
            {p.gender === 'Laki-laki' && (
              <span className="text-[#6b6568]" title="Laki-laki">♂</span>
            )}
          </div>
          {p.gelar && <p className="text-[#6b6568]">{p.gelar}</p>}
          {p.kota && (
            <span className="mt-1 inline-block badge bg-[#fdf0eb] text-[#d97454]">
              {p.kota}
            </span>
          )}
          {p.data_completeness_score != null && (
            <div className="mt-2">
              <CompletenessScore score={p.data_completeness_score} />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="card">
            <h2 className="section-label mb-3">Kontak & Biaya</h2>
            <div className="space-y-4">
              <FeeDisplay
                onlineMin={p.fee_online_idr_min}
                onlineMax={p.fee_online_idr_max}
                offlineMin={p.fee_offline_idr_min}
                offlineMax={p.fee_offline_idr_max}
              />
              {p.session_duration_minutes && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#6b6568]">Durasi sesi:</span>
                  <span className="font-medium text-[#2c2c2c]">{p.session_duration_minutes} menit</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <BpjsBadge accepted={p.bpjs_accepted} />
                {p.first_timer_welcome && (
                  <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">
                    Ramah untuk pertama kali
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="section-label mb-3">Format Layanan</h2>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {p.online_available && (
                  <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">Tersedia Online</span>
                )}
                {p.offline_available && (
                  <span className="badge bg-[#f0ede8] text-[#6b6568]">Tersedia Offline</span>
                )}
              </div>
              {p.session_format && p.session_format.length > 0 && (
                <TagList tags={p.session_format} />
              )}
              {p.language && p.language.length > 0 && (
                <div>
                  <p className="mb-1 text-xs text-[#6b6568]">Bahasa</p>
                  <TagList tags={p.language} colorClass="bg-[#f0ede8] text-[#6b6568]" />
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="section-label mb-3">Pengalaman & Sertifikasi</h2>
            <div className="space-y-2 text-sm">
              {p.years_of_experience != null && (
                <div className="flex items-center gap-2">
                  <span className="text-[#6b6568]">Pengalaman:</span>
                  <span className="font-medium">{p.years_of_experience} tahun</span>
                </div>
              )}
              {p.hands_on_hours != null && (
                <div className="flex items-center gap-2">
                  <span className="text-[#6b6568]">Jam praktik:</span>
                  <span className="font-medium">{p.hands_on_hours.toLocaleString('id-ID')} jam</span>
                </div>
              )}
              {p.sippk_status && (
                <div className="flex items-center gap-2">
                  <span className="text-[#6b6568]">SIPPK:</span>
                  <span className="font-medium">{p.sippk_status}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.himpsi_member && (
                  <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">Anggota HIMPSI</span>
                )}
                {p.ipk_member && (
                  <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">Anggota IPK</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {p.case_focus && p.case_focus.length > 0 && (
            <div className="card">
              <h2 className="section-label mb-3">Fokus Kasus</h2>
              <TagList tags={p.case_focus} maxShow={10} />
            </div>
          )}

          {p.therapeutic_approach && p.therapeutic_approach.length > 0 && (
            <div className="card">
              <h2 className="section-label mb-3">Pendekatan Terapi</h2>
              <TagList tags={p.therapeutic_approach} colorClass="bg-[#fdf0eb] text-[#d97454]" maxShow={10} />
            </div>
          )}

          {p.age_range_handled && p.age_range_handled.length > 0 && (
            <div className="card">
              <h2 className="section-label mb-3">Rentang Usia yang Ditangani</h2>
              <TagList tags={p.age_range_handled} colorClass="bg-[#f0ede8] text-[#6b6568]" maxShow={10} />
            </div>
          )}

          {p.education && p.education.length > 0 && (
            <div className="card">
              <h2 className="section-label mb-3">Pendidikan</h2>
              <ul className="space-y-1">
                {p.education.map((edu, i) => (
                  <li key={i} className="text-sm text-[#2c2c2c]">
                    {edu}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {p.platform_presence && p.platform_presence.length > 0 && (
            <div className="card">
              <h2 className="section-label mb-3">Platform</h2>
              <TagList tags={p.platform_presence} colorClass="bg-[#f0ede8] text-[#6b6568]" />
            </div>
          )}
        </div>
      </div>

      {p.clinic_ids && p.clinic_ids.length > 0 && (
        <div className="mt-6 card">
          <h2 className="section-label mb-3">Klinik / Tempat Praktik</h2>
          <div className="flex flex-wrap gap-2">
            {p.clinic_ids.map((cid, i) => (
              <Link
                key={cid}
                href={`/klinik/${cid}`}
                className="rounded-xl border border-[#e8e3dc] bg-white px-3 py-1.5 text-sm font-medium text-[#4d8b6f] transition hover:border-[#4d8b6f]"
              >
                {p.clinic_names?.[i] ?? cid}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 card">
        <h2 className="section-label mb-3">Hubungi</h2>
        <ContactButtons
          wa={undefined}
          instagram={p.instagram_handle}
          website={p.profile_url}
          telepon={undefined}
        />
        {!p.instagram_handle && !p.profile_url && (
          <p className="text-sm text-[#6b6568]">
            Informasi kontak belum tersedia. Coba cari melalui klinik atau platform di atas.
          </p>
        )}
      </div>

      {p.notes && (
        <div className="mt-6 rounded-2xl border border-[#e8e3dc] bg-[#faf9f7] p-5">
          <p className="section-label mb-2">Catatan</p>
          <p className="text-sm text-[#6b6568]">{p.notes}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e8e3dc] bg-white p-5">
        <p className="text-sm text-[#6b6568]">
          Data ini belum lengkap atau perlu diperbarui?
        </p>
        <Link href="/tambahkan" className="btn-outline text-sm">
          Bantu lengkapi data ini
        </Link>
      </div>
    </main>
  )
}
