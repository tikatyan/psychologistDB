'use client'

interface TagListProps {
  tags: string[] | null
  colorClass?: string
  maxShow?: number
}

export default function TagList({
  tags,
  colorClass = 'bg-[#e8f3ee] text-[#4d8b6f]',
  maxShow = 5,
}: TagListProps) {
  if (!tags || tags.length === 0) return null

  const visible = tags.slice(0, maxShow)
  const remaining = tags.length - visible.length

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tag) => (
        <span key={tag} className={`badge ${colorClass}`}>
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span className="badge bg-[#f0ede8] text-[#6b6568]">+{remaining} lainnya</span>
      )}
    </div>
  )
}
