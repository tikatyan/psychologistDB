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
      // No keyword matched — fall back to full-text search on the raw words.
      router.push(`/cari?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-[18px] border-[1.5px] border-[#cdd5c5] bg-[#e6ece0] p-2 transition focus-within:border-[#396025] focus-within:bg-[#faf7f0]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Misal: akhir-akhir ini aku gampang cemas, susah tidur, dan capek banget sama kerjaan..."
          className="w-full resize-none bg-transparent px-3 py-2 font-sans text-[15px] leading-relaxed text-[#19290f] outline-none placeholder:text-[#7b6e5c]"
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1e3d12] py-[13px] text-[14px] font-bold text-white transition hover:bg-[#396025] disabled:opacity-50"
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
      </div>
      <p className="mt-2 px-1 text-[12px] leading-relaxed text-[#7b6e5c]">
        Gak perlu tahu nama kondisinya — ceritakan saja apa yang kamu rasakan, kami bantu carikan yang sesuai.
      </p>
    </form>
  )
}
