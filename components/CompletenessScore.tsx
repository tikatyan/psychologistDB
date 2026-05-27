'use client'

interface CompletenessScoreProps {
  score: number
}

export default function CompletenessScore({ score }: CompletenessScoreProps) {
  let label: string
  let barColor: string
  let textColor: string

  if (score <= 40) {
    label = 'Data terbatas'
    barColor = 'bg-gray-400'
    textColor = 'text-gray-500'
  } else if (score <= 70) {
    label = 'Data sebagian'
    barColor = 'bg-amber-400'
    textColor = 'text-amber-600'
  } else {
    label = 'Data lengkap'
    barColor = 'bg-[#4d8b6f]'
    textColor = 'text-[#4d8b6f]'
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#e8e3dc]">
        <div
          className={`h-full rounded-full ${barColor} transition-all`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </div>
  )
}
