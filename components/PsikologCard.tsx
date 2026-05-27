import Link from 'next/link'
import type { Psikolog } from '@/lib/types'
import BpjsBadge from './BpjsBadge'

interface PsikologCardProps {
  psikolog: Psikolog
}

function formatRupiah(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID')
}

function getFeeLabel(p: Psikolog): string {
  const min = p.fee_online_idr_min ?? p.fee_offline_idr_min
  const max = p.fee_online_idr_max ?? p.fee_offline_idr_max
  if (min == null && max == null) return 'Hubungi untuk info biaya'
  if (min != null && max != null) return `${formatRupiah(min)} – ${formatRupiah(max)}`
  if (min != null) return `Mulai ${formatRupiah(min)}`
  return `Mulai ${formatRupiah(max!)}`
}

export default function PsikologCard({ psikolog: p }: PsikologCardProps) {
  const tags = p.case_focus ?? []
  const visibleTags = tags.slice(0, 3)
  const remaining = tags.length - visibleTags.length

  return (
    <Link href={`/psikolog/${p.id}`} className="card block hover:no-underline group">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f3ee] text-lg font-semibold text-[#4d8b6f]">
          {p.nama ? p.nama.charAt(0).toUpperCase() : '?'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-semibold text-[#2c2c2c] group-hover:text-[#4d8b6f] transition-colors truncate">
              {p.nama ?? 'Nama tidak tersedia'}
            </h3>
            {p.gender === 'Perempuan' && (
              <span className="text-[#d97454] text-sm" title="Perempuan">♀</span>
            )}
            {p.gender === 'Laki-laki' && (
              <span className="text-[#6b6568] text-sm" title="Laki-laki">♂</span>
            )}
          </div>
          {p.gelar && (
            <p className="text-xs text-[#6b6568]">{p.gelar}</p>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.kota && (
          <span className="badge bg-[#fdf0eb] text-[#d97454]">{p.kota}</span>
        )}
        {p.online_available && (
          <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">Online</span>
        )}
        {p.offline_available && (
          <span className="badge bg-[#f0ede8] text-[#6b6568]">Offline</span>
        )}
      </div>

      {visibleTags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span key={tag} className="badge bg-[#f0ede8] text-[#6b6568] text-[11px]">
              {tag}
            </span>
          ))}
          {remaining > 0 && (
            <span className="badge bg-[#f0ede8] text-[#6b6568] text-[11px]">
              +{remaining} lainnya
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
        <span className="text-sm font-medium text-[#2c2c2c]">{getFeeLabel(p)}</span>
        <BpjsBadge accepted={p.bpjs_accepted} />
      </div>
    </Link>
  )
}
