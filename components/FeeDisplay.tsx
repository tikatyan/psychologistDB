'use client'

interface FeeDisplayProps {
  onlineMin?: number | null
  onlineMax?: number | null
  offlineMin?: number | null
  offlineMax?: number | null
  className?: string
}

function formatRupiah(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID')
}

function formatFeeRange(min?: number | null, max?: number | null): string | null {
  if (min == null && max == null) return null
  if (min != null && max != null) return `${formatRupiah(min)} – ${formatRupiah(max)}`
  if (min != null) return `Mulai ${formatRupiah(min)}`
  if (max != null) return `Mulai ${formatRupiah(max)}`
  return null
}

export default function FeeDisplay({
  onlineMin,
  onlineMax,
  offlineMin,
  offlineMax,
  className,
}: FeeDisplayProps) {
  const onlineFee = formatFeeRange(onlineMin, onlineMax)
  const offlineFee = formatFeeRange(offlineMin, offlineMax)

  if (!onlineFee && !offlineFee) {
    return (
      <span className={`text-sm text-[#6b6568] ${className ?? ''}`}>
        Hubungi untuk info biaya
      </span>
    )
  }

  return (
    <div className={`flex flex-col gap-1 text-sm ${className ?? ''}`}>
      {onlineFee && (
        <div className="flex items-center gap-2">
          <span className="section-label">Online</span>
          <span className="font-medium text-[#2c2c2c]">{onlineFee}</span>
        </div>
      )}
      {offlineFee && (
        <div className="flex items-center gap-2">
          <span className="section-label">Offline</span>
          <span className="font-medium text-[#2c2c2c]">{offlineFee}</span>
        </div>
      )}
    </div>
  )
}
