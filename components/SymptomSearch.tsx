'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { matchSymptoms } from '@/lib/symptomMatch'

export default function SymptomSearch() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setLoading(true)

    const matched = matchSymptoms(trimmed)
    if (matched.length > 0) {
      router.push(`/cari?focus=${encodeURIComponent(matched.join(','))}&from=cerita`)
    } else {
      router.push(`/cari?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Misal: akhir-akhir ini aku gampang cemas, susah tidur, dan capek banget sama kerjaan..."
        className="w-full resize-none rounded-[22px] border-[1.5px] border-[#cdd5c5] bg-[#e6ece0] px-5 py-4 font-sans text-[15px] leading-relaxed text-[#19290f] outline-none transition placeholder:text-[#a09585] focus:border-[#396025] focus:bg-[#faf7f0]"
      />
      <p className="px-1 text-[12px] leading-relaxed text-[#a09585]">
        Gak perlu tahu nama kondisinya — ceritakan aja apa yang kamu rasakan.
      </p>
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1e3d12] py-[13px] text-[14px] font-bold text-white transition hover:bg-[#396025] disabled:opacity-40"
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Mencari...
          </>
        ) : (
          'Temukan psikolog yang cocok'
        )}
      </button>
    </form>
  )
}
