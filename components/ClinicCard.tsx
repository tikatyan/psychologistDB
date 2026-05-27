import Link from 'next/link'
import type { Clinic } from '@/lib/types'

function formatRupiah(n: number): string {
  return 'Rp' + n.toLocaleString('id-ID')
}

function getFee(c: Clinic): { label: string; serif: boolean } {
  const min = c.fee_online_idr_min ?? c.fee_offline_idr_min
  const max = c.fee_online_idr_max ?? c.fee_offline_idr_max
  if (min == null && max == null) return { label: 'Hubungi untuk info biaya', serif: false }
  if (min != null && max != null) return { label: `${formatRupiah(min)} – ${formatRupiah(max)}`, serif: true }
  if (min != null) return { label: `Mulai ${formatRupiah(min)}`, serif: true }
  return { label: `Mulai ${formatRupiah(max!)}`, serif: true }
}

function getAbbr(nama: string | null): string {
  if (!nama) return '?'
  const words = nama.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/)
  return words.slice(0, 3).map((w) => w[0]).join('').toUpperCase()
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

export default function ClinicCard({ clinic: c }: { clinic: Clinic }) {
  const tags = (c.focus ?? []).slice(0, 3)
  const fee = getFee(c)
  const abbr = getAbbr(c.nama)
  const tipe = c.tipe ? (TIPE_LABELS[c.tipe] ?? c.tipe) : 'Klinik'
  const bothMode = c.online_available && c.offline_available
  const modeLabel = bothMode ? 'Online & Offline' : c.online_available ? 'Online' : c.offline_available ? 'Offline' : null

  return (
    <Link
      href={`/klinik/${c.id}`}
      className="block rounded-[20px] border border-[#e5d9c2] bg-white no-underline transition hover:border-[#d4c5a8] hover:shadow-[0_4px_24px_rgba(30,61,18,0.12)] active:opacity-90"
    >
      <div className="p-4 pb-[14px]">
        <div className="mb-[11px] flex items-start gap-[13px]">
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] border-[1.5px] border-[#e5d9c2] bg-[#f3ede0]">
            <span className="text-[13px] font-extrabold leading-none text-[#1e3d12]">
              {abbr}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-[2px] text-[15px] font-bold leading-snug tracking-tight text-[#19290f]">
              {c.nama ?? 'Nama tidak tersedia'}
            </div>
            <div className="mb-2 text-[12px] leading-snug text-[#7b6e5c]">
              {[tipe, c.kota].filter(Boolean).join(' · ')}
            </div>
            <div className="flex flex-wrap gap-[5px]">
              {modeLabel && (
                <span className="inline-flex items-center rounded-full bg-[#e0eef5] px-[9px] py-[3px] text-[11px] font-bold text-[#5a89a0]">
                  {modeLabel}
                </span>
              )}
              {c.bpjs_accepted === true && (
                <span className="inline-flex items-center rounded-full bg-[#eaf3e5] px-[9px] py-[3px] text-[11px] font-bold text-[#396025]">
                  Ditanggung BPJS ✓
                </span>
              )}
              {c.bpjs_accepted === null && (
                <span className="inline-flex items-center rounded-full bg-[#ede8de] px-[9px] py-[3px] text-[11px] font-bold text-[#7b6e5c]">
                  BPJS belum diketahui
                </span>
              )}
            </div>
          </div>
          <span className="mt-[3px] shrink-0 text-[15px] text-[#d4c5a8]">›</span>
        </div>

        {tags.length > 0 && (
          <div className="mb-[11px] flex flex-wrap gap-[5px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[8px] border border-[#e5d9c2] bg-[#f3ede0] px-[10px] py-[4px] text-[12px] font-semibold text-[#396025]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {fee.serif ? (
          <div className="font-serif text-[18px] leading-none tracking-tight text-[#1e3d12]">
            {fee.label}
          </div>
        ) : (
          <div className="text-[13px] italic text-[#7b6e5c]">{fee.label}</div>
        )}
      </div>
    </Link>
  )
}
