import Link from 'next/link'
import type { Psikolog } from '@/lib/types'

function formatRupiah(n: number): string {
  return 'Rp' + n.toLocaleString('id-ID')
}

function getFee(p: Psikolog): { label: string; serif: boolean } {
  const min = p.fee_online_idr_min ?? p.fee_offline_idr_min
  const max = p.fee_online_idr_max ?? p.fee_offline_idr_max
  if (min == null && max == null) return { label: 'Hubungi untuk info biaya', serif: false }
  if (min != null && max != null) return { label: `${formatRupiah(min)} – ${formatRupiah(max)}`, serif: true }
  if (min != null) return { label: `Mulai ${formatRupiah(min)}`, serif: true }
  return { label: `Mulai ${formatRupiah(max!)}`, serif: true }
}

function getInitials(nama: string | null): string {
  if (!nama) return '?'
  const words = nama.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return (words[0]?.[0] ?? '?').toUpperCase()
}

export default function PsikologCard({ psikolog: p }: { psikolog: Psikolog }) {
  const tags = (p.case_focus ?? []).slice(0, 3)
  const fee = getFee(p)
  const initials = getInitials(p.nama)
  const bothMode = p.online_available && p.offline_available
  const modeLabel = bothMode ? 'Online & Offline' : p.online_available ? 'Online' : p.offline_available ? 'Offline' : null

  return (
    <Link
      href={`/psikolog/${p.id}`}
      className="block rounded-[20px] border border-[#e5d9c2] bg-white no-underline transition hover:border-[#d4c5a8] hover:shadow-[0_4px_24px_rgba(30,61,18,0.12)] active:opacity-90"
    >
      <div className="p-4 pb-[14px]">
        <div className="mb-[11px] flex items-start gap-[13px]">
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#1e3d12]">
            <span className="font-serif text-[20px] italic leading-none tracking-tight text-[#9ec485]">
              {initials}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-[2px] text-[15px] font-bold leading-snug tracking-tight text-[#19290f]">
              {p.nama ?? 'Nama tidak tersedia'}
            </div>
            <div className="mb-2 text-[12px] leading-snug text-[#7b6e5c]">
              {[p.gelar, p.kota].filter(Boolean).join(' · ')}
            </div>
            <div className="flex flex-wrap gap-[5px]">
              {modeLabel && (
                <span className={`inline-flex items-center rounded-full px-[9px] py-[3px] text-[11px] font-bold ${bothMode ? 'bg-[#e0eef5] text-[#5a89a0]' : p.online_available ? 'bg-[#e0eef5] text-[#5a89a0]' : 'bg-[#ede8de] text-[#7b6e5c]'}`}>
                  {modeLabel}
                </span>
              )}
              {p.bpjs_accepted === true && (
                <span className="inline-flex items-center rounded-full bg-[#eaf3e5] px-[9px] py-[3px] text-[11px] font-bold text-[#396025]">
                  Ditanggung BPJS ✓
                </span>
              )}
              {p.bpjs_accepted === null && (
                <span className="inline-flex items-center rounded-full bg-[#ede8de] px-[9px] py-[3px] text-[11px] font-bold text-[#7b6e5c]">
                  BPJS belum diketahui
                </span>
              )}
            </div>
          </div>
          <span className="mt-[3px] shrink-0 text-[15px] text-[#d4c5a8] transition-transform group-hover:translate-x-0.5">›</span>
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
