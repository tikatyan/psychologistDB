import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getClinic, getPsikologByClinic } from '@/lib/queries'
import CollapsibleSection from '@/components/CollapsibleSection'
import type { Psikolog } from '@/lib/types'

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

function getClinicInitials(name: string | null): string {
  if (!name) return '?'
  const words = name.split(' ').filter((w) => w.length > 2)
  if (words.length >= 2) return words.slice(0, 3).map((w) => w[0]).join('').toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function getPsiInitials(name: string | null): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatFeeRange(min: number | null, max: number | null): string | null {
  if (!min && !max) return null
  const fmt = (n: number) => `Rp${Math.round(n / 1000)}rb`
  if (min && max && min !== max) return `${fmt(min)}–${fmt(max)}`
  return fmt(min ?? max!)
}

function getPsiFee(p: Psikolog): string | null {
  return (
    formatFeeRange(p.fee_online_idr_min, p.fee_online_idr_max) ??
    formatFeeRange(p.fee_offline_idr_min, p.fee_offline_idr_max)
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const c = await getClinic(id)
  if (!c) return { title: 'Klinik tidak ditemukan' }
  return {
    title: `${c.nama ?? 'Klinik'} – PsikologDB`,
    description: `${getTipeLabel(c.tipe)}${c.kota ? ` di ${c.kota}` : ''}. ${c.focus?.slice(0, 3).join(', ') ?? ''}`,
  }
}

export default async function KlinikProfilePage({ params }: Props) {
  const { id } = await params
  const c = await getClinic(id)

  if (!c) notFound()

  const psikologList = await getPsikologByClinic([id])
  const initials = getClinicInitials(c.nama)

  const facilities: { icon: string; label: string }[] = []
  if (c.online_available) facilities.push({ icon: '💻', label: 'Sesi Online' })
  if (c.offline_available) facilities.push({ icon: '🏥', label: 'Tatap Muka' })
  if (c.bpjs_accepted) facilities.push({ icon: '🏷️', label: 'Menerima BPJS' })
  if (c.subsidi_silang) facilities.push({ icon: '🤝', label: 'Subsidi Silang' })
  if (c.session_duration_minutes)
    facilities.push({ icon: '⏱️', label: `${c.session_duration_minutes} menit/sesi` })

  const hasContact =
    c.telepon || c.wa_number || c.instagram || c.email || c.website || c.gmaps_link

  return (
    <main className="mx-auto max-w-[430px]">
      {/* Sticky header */}
      <div className="sticky top-[53px] z-20 flex items-center gap-3 bg-[#faf7f0] px-4 py-3 shadow-sm">
        <Link
          href="/cari"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3ede0] text-[#19290f] transition hover:bg-[#e5d9c2]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="flex-1 text-[15px] font-bold text-[#19290f]">Profil Klinik</h1>
      </div>

      {/* Map hero */}
      <div style={{ height: '172px', background: '#d8e4d0', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(180,200,170,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(180,200,170,0.5) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Horizontal road */}
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: 0,
            right: 0,
            height: '8px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '3px',
          }}
        />
        {/* Vertical road */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '35%',
            width: '7px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '3px',
          }}
        />
        {/* Pin bubble */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '35%',
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div
            style={{
              background: '#1e3d12',
              borderRadius: '10px',
              padding: '5px 12px',
              maxWidth: '160px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#9ec485',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
              }}
            >
              {c.nama ?? 'Klinik'}
            </span>
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '7px solid #1e3d12',
              margin: '0 auto',
            }}
          />
        </div>
        {c.gmaps_link && (
          <a
            href={c.gmaps_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: 'absolute', bottom: '12px', right: '14px' }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#19290f] shadow-sm"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Buka di Maps
          </a>
        )}
      </div>

      {/* Identity card */}
      <div className="border-b border-[#e5d9c2] bg-[#faf7f0] px-[22px] py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[14px] bg-[#1e3d12]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#9ec485" strokeWidth="1.5" />
              <path d="M12 7v10M7 12h10" stroke="#9ec485" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-[22px] leading-tight text-[#19290f]">
              {c.nama ?? 'Nama tidak tersedia'}
            </h1>
            <p className="mt-0.5 text-[13px] text-[#7b6e5c]">{getTipeLabel(c.tipe)}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {c.kota && (
                <span className="badge bg-[#eaf3e5] text-[#396025]">{c.kota}</span>
              )}
              {c.area && (
                <span className="badge bg-[#ede8de] text-[#7b6e5c]">{c.area}</span>
              )}
              {c.online_available && (
                <span className="badge bg-[#e0eef5] text-[#5a89a0]">Online</span>
              )}
              {c.bpjs_accepted && (
                <span className="badge bg-[#eaf3e5] text-[#396025]">BPJS</span>
              )}
              {c.subsidi_silang && (
                <span className="badge bg-[#eaf3e5] text-[#396025]">Subsidi Silang</span>
              )}
            </div>
          </div>
        </div>

        {c.alamat && (
          <div className="mt-3 flex items-start gap-3 border-t border-[#e5d9c2] pt-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f3ede0] text-[15px]">
              📍
            </div>
            <p className="text-[13px] text-[#19290f]">{c.alamat}</p>
          </div>
        )}
      </div>

      {/* Collapsible sections */}
      {c.jam_operasional && (
        <CollapsibleSection label="Jam Operasional" defaultOpen>
          <p className="text-[14px] text-[#19290f]">{c.jam_operasional}</p>
        </CollapsibleSection>
      )}

      {(c.fee_offline_idr_min || c.fee_online_idr_min || c.fee_notes) && (
        <CollapsibleSection label="Biaya Sesi" defaultOpen>
          <div className="space-y-2">
            {c.fee_online_idr_min && (
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-[#7b6e5c]">Online</span>
                <span className="font-serif text-[16px] text-[#1e3d12]">
                  {formatFeeRange(c.fee_online_idr_min, c.fee_online_idr_max) ?? '—'}
                </span>
              </div>
            )}
            {c.fee_offline_idr_min && (
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-[#7b6e5c]">Tatap Muka</span>
                <span className="font-serif text-[16px] text-[#1e3d12]">
                  {formatFeeRange(c.fee_offline_idr_min, c.fee_offline_idr_max) ?? '—'}
                </span>
              </div>
            )}
            {c.fee_notes && (
              <p className="mt-2 text-[12px] text-[#7b6e5c]">{c.fee_notes}</p>
            )}
          </div>
        </CollapsibleSection>
      )}

      {psikologList.length > 0 && (
        <CollapsibleSection label={`Psikolog di Klinik Ini (${psikologList.length})`} defaultOpen sand>
          <div className="space-y-2">
            {psikologList.map((p) => {
              const fee = getPsiFee(p)
              return (
                <Link
                  key={p.id}
                  href={`/psikolog/${p.id}`}
                  className="flex items-center gap-3 rounded-[14px] border-[1.5px] border-[#e5d9c2] bg-[#f3ede0] p-[13px] transition hover:border-[#1e3d12]"
                >
                  <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#396025]">
                    <span className="font-serif text-[17px] italic text-[#9ec485]">
                      {getPsiInitials(p.nama)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-[#19290f]">
                      {p.nama ?? 'Psikolog'}
                    </p>
                    {p.gelar && (
                      <p className="text-[12px] text-[#7b6e5c]">{p.gelar}</p>
                    )}
                  </div>
                  {fee && (
                    <span className="shrink-0 font-serif text-[15px] text-[#1e3d12]">{fee}</span>
                  )}
                </Link>
              )
            })}
          </div>
        </CollapsibleSection>
      )}

      {facilities.length > 0 && (
        <CollapsibleSection label="Fasilitas & Layanan" sand>
          <div className="grid grid-cols-2 gap-2">
            {facilities.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-[#e5d9c2] bg-[#f3ede0] px-3 py-[11px]"
              >
                <span className="text-[16px]">{f.icon}</span>
                <span className="text-[13px] font-medium text-[#19290f]">{f.label}</span>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {c.focus && c.focus.length > 0 && (
        <CollapsibleSection label="Fokus Layanan">
          <div className="flex flex-wrap gap-1.5">
            {c.focus.map((tag) => (
              <span
                key={tag}
                className="rounded-[8px] bg-[#f3ede0] px-2.5 py-1 text-[12px] font-medium text-[#396025]"
              >
                {tag}
              </span>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {hasContact && (
        <CollapsibleSection label="Kontak" defaultOpen>
          <div className="divide-y divide-[#e5d9c2]">
            {c.telepon && (
              <div className="flex items-center gap-3 py-[10px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f3ede0] text-[15px]">
                  📞
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#7b6e5c]">Telepon</p>
                  <a href={`tel:${c.telepon}`} className="text-[14px] font-medium text-[#1e3d12]">
                    {c.telepon}
                  </a>
                </div>
              </div>
            )}
            {c.wa_number && (
              <div className="flex items-center gap-3 py-[10px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f3ede0] text-[15px]">
                  💬
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#7b6e5c]">WhatsApp</p>
                  <a
                    href={`https://wa.me/${c.wa_number.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-[#1e3d12]"
                  >
                    {c.wa_number}
                  </a>
                </div>
              </div>
            )}
            {c.instagram && (
              <div className="flex items-center gap-3 py-[10px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f3ede0] text-[15px]">
                  📸
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#7b6e5c]">Instagram</p>
                  <a
                    href={`https://instagram.com/${c.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-[#1e3d12]"
                  >
                    {c.instagram.startsWith('@') ? c.instagram : `@${c.instagram}`}
                  </a>
                </div>
              </div>
            )}
            {c.email && (
              <div className="flex items-center gap-3 py-[10px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f3ede0] text-[15px]">
                  ✉️
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#7b6e5c]">Email</p>
                  <a href={`mailto:${c.email}`} className="text-[14px] font-medium text-[#1e3d12]">
                    {c.email}
                  </a>
                </div>
              </div>
            )}
            {c.website && (
              <div className="flex items-center gap-3 py-[10px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f3ede0] text-[15px]">
                  🌐
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#7b6e5c]">Website</p>
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-[14px] font-medium text-[#1e3d12]"
                  >
                    {c.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
            )}
            {c.gmaps_link && (
              <div className="flex items-center gap-3 py-[10px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f3ede0] text-[15px]">
                  🗺️
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#7b6e5c]">Lokasi</p>
                  <a
                    href={c.gmaps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-[#1e3d12]"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* Data completeness note */}
      <div className="px-[22px] py-5">
        <p className="text-center text-[12px] text-[#7b6e5c]">
          Data klinik ini dikumpulkan dari sumber publik.{' '}
          <Link href="/tambahkan" className="font-semibold text-[#1e3d12] hover:underline">
            Perbarui informasi
          </Link>{' '}
          jika ada yang tidak akurat.
        </p>
      </div>
    </main>
  )
}
