import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPsikolog } from '@/lib/queries'
import type { Psikolog } from '@/lib/types'
import Link from 'next/link'
import { FOCUS_DEFINITIONS, APPROACH_DEFINITIONS } from '@/lib/definitions'
import DefinitionsModal from '@/components/DefinitionsModal'

interface Props {
  params: Promise<{ id: string }>
}

function formatRp(n: number) {
  return 'Rp' + n.toLocaleString('id-ID')
}

function getFee(p: Psikolog): string | null {
  const min = p.fee_online_idr_min ?? p.fee_offline_idr_min
  const max = p.fee_online_idr_max ?? p.fee_offline_idr_max
  if (min == null && max == null) return null
  if (min != null && max != null) return `${formatRp(min)} – ${formatRp(max)}`
  if (min != null) return `Mulai ${formatRp(min)}`
  return `Mulai ${formatRp(max!)}`
}

function getInitials(nama: string | null): string {
  if (!nama) return '?'
  const words = nama.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return (words[0]?.[0] ?? '?').toUpperCase()
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

function SecLabel({ children }: { children: string }) {
  return (
    <div className="mb-[13px] text-[11px] font-bold uppercase tracking-[0.1em] text-[#7b6e5c]">
      {children}
    </div>
  )
}

function Tag({ children, approach = false }: { children: string; approach?: boolean }) {
  return (
    <span
      className={`rounded-[14px] border px-[13px] py-[6px] text-[13px] font-semibold ${
        approach
          ? 'border-transparent bg-[#eaf3e5] text-[#396025]'
          : 'border-[#e5d9c2] bg-[#f3ede0] text-[#19290f]'
      }`}
    >
      {children}
    </span>
  )
}

export default async function PsikologProfilePage({ params }: Props) {
  const { id } = await params
  const p = await getPsikolog(id)
  if (!p) notFound()

  const initials = getInitials(p.nama)
  const fee = getFee(p)
  const bothMode = p.online_available && p.offline_available
  const modeLabel = bothMode
    ? 'Online & Offline'
    : p.online_available
    ? 'Online'
    : p.offline_available
    ? 'Offline'
    : null

  const ctaHref = p.profile_url ?? (p.instagram_handle ? `https://instagram.com/${p.instagram_handle}` : null)
  const ctaLabel = p.profile_url ? 'Kunjungi Profil' : p.instagram_handle ? 'Lihat di Instagram' : null
  const hasCta = !!ctaHref

  return (
    <div className={`min-h-screen bg-[#faf7f0]${hasCta ? ' pb-[84px]' : ''}`}>

      {/* Forest green header + hero */}
      <div className="bg-[#1e3d12]">
        <div className="mx-auto flex max-w-5xl items-center gap-[10px] px-5 py-[10px]">
          <Link
            href="/cari"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white/15 text-[16px] font-semibold text-white no-underline transition hover:bg-white/25"
            aria-label="Kembali ke pencarian"
          >
            ←
          </Link>
          <span className="flex-1 text-[14px] font-semibold text-white/70">Profil Psikolog</span>
        </div>

        {/* Cream hero card */}
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-t-[24px] bg-[#faf7f0] px-6 pb-6 pt-0 text-center">
            {/* Avatar — pulled up */}
            <div className="flex justify-center">
              {p.photo_url ? (
                <img
                  src={p.photo_url}
                  alt={p.nama ?? ''}
                  className="mt-[-48px] h-24 w-24 rounded-full border-4 border-[#faf7f0] object-cover"
                />
              ) : (
                <div className="mt-[-48px] flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#faf7f0] bg-[#396025]">
                  <span className="font-serif text-[28px] italic leading-none tracking-tight text-[#9ec485]">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            <h1 className="mb-[2px] mt-[14px] font-serif text-[26px] leading-snug tracking-tight text-[#19290f]">
              {p.nama ?? 'Nama tidak tersedia'}
            </h1>
            {p.gelar && (
              <p className="mb-[8px] text-[13px] font-medium text-[#7b6e5c]">{p.gelar}</p>
            )}

            {/* Social links */}
            {(p.instagram_handle || p.profile_url) && (
              <div className="mb-[14px] flex items-center justify-center gap-1">
                {p.instagram_handle && (
                  <a
                    href={`https://instagram.com/${p.instagram_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[5px] rounded-full bg-[#eaf3e5] px-[10px] py-[3px] text-[12px] font-semibold text-[#396025] no-underline transition hover:bg-[#e5d9c2]"
                  >
                    Instagram
                  </a>
                )}
                {p.instagram_handle && p.profile_url && (
                  <span className="text-[11px] text-[#d4c5a8]">·</span>
                )}
                {p.profile_url && (
                  <a
                    href={p.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[5px] rounded-full bg-[#eaf3e5] px-[10px] py-[3px] text-[12px] font-semibold text-[#396025] no-underline transition hover:bg-[#e5d9c2]"
                  >
                    Website
                  </a>
                )}
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-[6px]">
              {p.kota && (
                <span className="rounded-full border border-[#e5d9c2] bg-[#f3ede0] px-[11px] py-[4px] text-[12px] font-bold text-[#8c6d4f]">
                  {p.kota}
                </span>
              )}
              {modeLabel && (
                <span className="rounded-full bg-[#e0eef5] px-[11px] py-[4px] text-[12px] font-bold text-[#5a89a0]">
                  {modeLabel}
                </span>
              )}
              {p.bpjs_accepted === true && (
                <span className="rounded-full bg-[#eaf3e5] px-[11px] py-[4px] text-[12px] font-bold text-[#396025]">
                  Ditanggung BPJS ✓
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable sections */}
      <div className="mx-auto max-w-5xl">

        {/* Spesialisasi */}
        {p.case_focus && p.case_focus.length > 0 && (
          <div className="border-t border-[#e5d9c2] bg-[#faf7f0] px-6 py-5">
            <SecLabel>Spesialisasi</SecLabel>
            <div className="flex flex-wrap items-center gap-[7px]">
              {p.case_focus.map((t) => <Tag key={t}>{t}</Tag>)}
              <DefinitionsModal items={p.case_focus} definitions={FOCUS_DEFINITIONS} />
            </div>
          </div>
        )}

        {/* Pendekatan Terapi */}
        {p.therapeutic_approach && p.therapeutic_approach.length > 0 && (
          <div className="border-t border-[#e5d9c2] bg-[#faf7f0] px-6 py-5">
            <SecLabel>Pendekatan Terapi</SecLabel>
            <div className="flex flex-wrap items-center gap-[7px]">
              {p.therapeutic_approach.map((t) => <Tag key={t} approach>{t}</Tag>)}
              <DefinitionsModal items={p.therapeutic_approach} definitions={APPROACH_DEFINITIONS} tint="green" />
            </div>
          </div>
        )}

        {/* Info Sesi */}
        {(fee || modeLabel || p.session_format || p.age_range_handled || p.session_duration_minutes) && (
          <div className="border-t border-[#e5d9c2] bg-[#f3ede0] px-6 py-5">
            <SecLabel>Info Sesi</SecLabel>
            <div>
              {fee && (
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e5d9c2] py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">Biaya</span>
                  <span className="font-serif text-[18px] leading-none tracking-tight text-[#1e3d12]">{fee}</span>
                </div>
              )}
              {modeLabel && (
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e5d9c2] py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">Format sesi</span>
                  <span className="text-[14px] font-semibold text-[#19290f]">{modeLabel}</span>
                </div>
              )}
              {p.session_format && p.session_format.length > 0 && (
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e5d9c2] py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">Tipe konseling</span>
                  <span className="text-[14px] font-semibold text-[#19290f] text-right">{p.session_format.join(' · ')}</span>
                </div>
              )}
              {p.age_range_handled && p.age_range_handled.length > 0 && (
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e5d9c2] py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">Rentang usia</span>
                  <span className="text-[14px] font-semibold text-[#19290f] text-right">{p.age_range_handled.join(', ')}</span>
                </div>
              )}
              {p.session_duration_minutes && (
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e5d9c2] py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">Durasi sesi</span>
                  <span className="text-[14px] font-semibold text-[#19290f]">{p.session_duration_minutes} menit</span>
                </div>
              )}
              {p.first_timer_welcome && (
                <div className="flex items-baseline justify-between gap-4 py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">Klien baru</span>
                  <span className="rounded-full bg-[#eaf3e5] px-[9px] py-[2px] text-[12px] font-bold text-[#396025]">✓ Ya</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pengalaman & Kredensial */}
        {(p.years_of_experience || p.sippk_status || p.himpsi_member || p.ipk_member || p.education?.length) && (
          <div className="border-t border-[#e5d9c2] bg-[#faf7f0] px-6 py-5">
            <SecLabel>Pengalaman & Kredensial</SecLabel>
            <div>
              {p.years_of_experience && (
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e5d9c2] py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">Pengalaman</span>
                  <span className="text-[14px] font-semibold text-[#19290f]">{p.years_of_experience} tahun</span>
                </div>
              )}
              {p.sippk_status && (
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e5d9c2] py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">SIPPK</span>
                  <span className="text-[14px] font-semibold text-[#19290f]">{p.sippk_status}</span>
                </div>
              )}
              {(p.himpsi_member || p.ipk_member) && (
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e5d9c2] py-[9px]">
                  <span className="shrink-0 text-[13px] text-[#7b6e5c]">Keanggotaan</span>
                  <div className="flex gap-[5px]">
                    {p.himpsi_member && <span className="rounded-full bg-[#eaf3e5] px-[9px] py-[2px] text-[12px] font-bold text-[#396025]">HIMPSI</span>}
                    {p.ipk_member && <span className="rounded-full bg-[#eaf3e5] px-[9px] py-[2px] text-[12px] font-bold text-[#396025]">IPK</span>}
                  </div>
                </div>
              )}
              {p.education && p.education.length > 0 && (
                <div className="py-[9px]">
                  <span className="mb-2 block text-[13px] text-[#7b6e5c]">Pendidikan</span>
                  <ul className="space-y-1">
                    {p.education.map((edu, i) => (
                      <li key={i} className="text-[13px] text-[#19290f]">{edu}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tempat Praktik */}
        {p.clinic_ids && p.clinic_ids.length > 0 && (
          <div className="border-t border-[#e5d9c2] bg-[#faf7f0] px-6 py-5">
            <SecLabel>Tempat Praktik</SecLabel>
            <div className="space-y-[10px]">
              {p.clinic_ids.map((cid, i) => (
                <div key={cid} className="rounded-[14px] border-[1.5px] border-[#e5d9c2] bg-[#f3ede0] p-4">
                  <div className="mb-2 text-[15px] font-bold text-[#19290f]">
                    {p.clinic_names?.[i] ?? 'Klinik'}
                  </div>
                  <Link
                    href={`/klinik/${cid}`}
                    className="rounded-full border-[1.5px] border-[#e5d9c2] bg-[#faf7f0] px-[14px] py-[6px] text-[12px] font-bold text-[#1e3d12] no-underline transition hover:bg-[#1e3d12] hover:text-white"
                  >
                    Lihat Klinik →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform */}
        {p.platform_presence && p.platform_presence.length > 0 && (
          <div className="border-t border-[#e5d9c2] bg-[#faf7f0] px-6 py-5">
            <SecLabel>Tersedia di Platform</SecLabel>
            <div>
              {p.platform_presence.map((platform) => (
                <div
                  key={platform}
                  className="flex items-center gap-[13px] border-b border-[#e5d9c2] py-[11px] last:border-b-0 last:pb-0"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#e5d9c2] text-[11px] font-extrabold text-[#7b6e5c]">
                    {platform.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="flex-1 text-[14px] font-bold text-[#19290f]">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completeness note */}
        <div className="border-t border-[#e5d9c2] bg-[#f3ede0] px-6 py-4 text-center">
          <p className="text-[13px] leading-relaxed text-[#7b6e5c]">
            Profil ini belum lengkap atau perlu diperbarui?{' '}
            <Link
              href="/tambahkan"
              className="border-b border-[#527a3a] pb-px font-bold text-[#396025] no-underline transition hover:text-[#1e3d12]"
            >
              Bantu lengkapi
            </Link>
          </p>
        </div>

      </div>

      {/* Fixed bottom CTA */}
      {hasCta && ctaHref && ctaLabel && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e5d9c2] bg-[#faf7f0] px-5 py-3">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-[#1e3d12] py-[15px] text-center text-[15px] font-bold text-white no-underline transition hover:bg-[#396025]"
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </div>
  )
}
