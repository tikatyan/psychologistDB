'use client'

interface BpjsBadgeProps {
  accepted: boolean | null
}

export default function BpjsBadge({ accepted }: BpjsBadgeProps) {
  if (accepted === true) {
    return (
      <span className="badge bg-[#e8f3ee] text-[#4d8b6f]">
        BPJS Diterima
      </span>
    )
  }

  if (accepted === null) {
    return (
      <span className="text-xs text-[#6b6568]">BPJS: tidak diketahui</span>
    )
  }

  return null
}
