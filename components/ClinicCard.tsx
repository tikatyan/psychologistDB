import Link from 'next/link'
import type { Clinic } from '@/lib/types'
import BpjsBadge from './BpjsBadge'

interface ClinicCardProps {
  clinic: Clinic
}

function formatRupiah(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID')
}

function getFeeLabel(c: Clinic): string {
  const min = c.fee_online_idr_min ?? c.fee_offline_idr_min
  const max = c.fee_online_idr_max ?? c.fee_offline_idr_max
  if (min == null && max == null) return 'Hubungi untuk info biaya'
  if (min != null && max != null) return `${formatRupiah(min)} – ${formatRupiah(max)}`
  if (min != null) return `Mulai ${formatRupiah(min)}`
  return `Mulai ${formatRupiah(max!)}`
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

export default function ClinicCard({ clinic: c }: ClinicCardProps) {
  const tags = c.focus ?? []
  const visibleTags = tags.slice(0, 3)
  const remaining = tags.length - visibleTags.length

  return (
    <Link href={`/klinik/${c.id}`} className="card block hover:no-underline group">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fdf0eb] text-lg font-semibold text-[#d97454]">
          {c.nama ? c.nama.charAt(0).toUpperCase() : '?'}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[#2c2c2c] group-hover:text-[#4d8b6f] transition-colors truncate">
            {c.nama ?? 'Nama tidak tersedia'}
          </h3>
          <p className="text-xs text-[#6b6568]">{getTipeLabel(c.tipe)}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.kota && (
          <span className="badge bg-[#fdf0eb] text-[#d97454]">{c.kota}</span>
        )}
        {c.online_available && (
          <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">Online</span>
        )}
        {c.offline_available && (
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
        <span className="text-sm font-medium text-[#2c2c2c]">{getFeeLabel(c)}</span>
        <BpjsBadge accepted={c.bpjs_accepted} />
      </div>
    </Link>
  )
}
