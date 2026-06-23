// Maps free-text feelings/symptoms (Bahasa Indonesia, casual) to the
// Title Case focus tags used in the database. Users often describe how they
// feel ("capek banget", "susah tidur", "sedih terus") rather than naming a
// clinical condition — this bridges that gap.

const KEYWORD_MAP: { tag: string; keywords: string[] }[] = [
  {
    tag: 'Depresi',
    keywords: [
      'sedih', 'murung', 'putus asa', 'hampa', 'kosong', 'hilang minat',
      'ga semangat', 'gak semangat', 'tidak semangat', 'nggak semangat',
      'lelah hidup', 'capek hidup', 'nangis', 'menangis', 'down', 'terpuruk',
      'males', 'malas ngapa', 'gak ada gunanya', 'tidak berharga', 'sendu',
    ],
  },
  {
    tag: 'Kecemasan',
    keywords: [
      'cemas', 'khawatir', 'kuatir', 'panik', 'takut', 'deg-degan', 'deg degan',
      'gelisah', 'overthinking', 'over thinking', 'was-was', 'was was',
      'jantung berdebar', 'gugup', 'parno', 'anxious', 'anxiety', 'kepikiran terus',
    ],
  },
  {
    tag: 'Stres',
    keywords: [
      'stres', 'stress', 'tertekan', 'beban', 'pusing', 'kewalahan',
      'overwhelmed', 'banyak pikiran', 'mumet', 'penat',
    ],
  },
  {
    tag: 'Burnout',
    keywords: [
      'burnout', 'capek', 'cape banget', 'lelah', 'kelelahan', 'jenuh',
      'exhausted', 'lelah kerja', 'lelah banget', 'gak kuat lagi', 'ga kuat lagi',
    ],
  },
  {
    tag: 'Kecemasan',
    keywords: [
      'susah tidur', 'ga bisa tidur', 'gak bisa tidur', 'tidak bisa tidur',
      'insomnia', 'begadang terus', 'gelisah malam',
    ],
  },
  {
    tag: 'Trauma',
    keywords: [
      'trauma', 'masa lalu', 'kekerasan', 'pelecehan', 'abuse', 'ptsd',
      'flashback', 'mimpi buruk', 'kejadian buruk', 'disakiti',
    ],
  },
  {
    tag: 'Relasi Romantis',
    keywords: [
      'pacar', 'putus', 'hubungan', 'pasangan', 'patah hati', 'selingkuh',
      'ldr', 'move on', 'cinta', 'gebetan', 'mantan', 'ditinggal',
    ],
  },
  {
    tag: 'Pernikahan',
    keywords: [
      'pernikahan', 'suami', 'istri', 'nikah', 'rumah tangga', 'perceraian',
      'cerai', 'menikah',
    ],
  },
  {
    tag: 'Keluarga',
    keywords: [
      'keluarga', 'orang tua', 'ortu', 'konflik keluarga', 'saudara',
      'ibu saya', 'ayah saya', 'mertua',
    ],
  },
  {
    tag: 'Karier',
    keywords: [
      'kerja', 'karier', 'karir', 'kantor', 'atasan', 'pekerjaan', 'resign',
      'dipecat', 'bos', 'rekan kerja', 'lingkungan kerja',
    ],
  },
  {
    tag: 'Regulasi Emosi',
    keywords: [
      'emosi', 'marah', 'marah-marah', 'gampang marah', 'mood', 'meledak',
      'sensitif', 'gak bisa nahan', 'gak terkontrol', 'mood swing',
    ],
  },
  {
    tag: 'OCD',
    keywords: [
      'ocd', 'berulang', 'ritual', 'kompulsi', 'obsesi', 'cuci tangan terus',
      'ngecek terus', 'harus rapi',
    ],
  },
  {
    tag: 'Pengembangan Diri',
    keywords: [
      'percaya diri', 'kepercayaan diri', 'pengembangan diri', 'tujuan hidup',
      'insecure', 'minder', 'gak pede', 'tidak pede', 'bingung arah hidup',
    ],
  },
  {
    tag: 'Psikologi Anak',
    keywords: [
      'anak saya', 'anakku', 'anak saya', 'tumbuh kembang', 'anak susah',
      'perkembangan anak', 'anak saya susah',
    ],
  },
  {
    tag: 'Remaja',
    keywords: [
      'remaja', 'anak sekolah', 'abg', 'anak remaja', 'sekolah', 'kuliah',
    ],
  },
]

/**
 * Returns the focus tags that best match a free-text description, ordered by
 * how many keywords matched (most relevant first). Empty array if nothing matches.
 */
export function matchSymptoms(text: string): string[] {
  if (!text || !text.trim()) return []
  const lower = text.toLowerCase()

  const scores = new Map<string, number>()
  for (const { tag, keywords } of KEYWORD_MAP) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        scores.set(tag, (scores.get(tag) ?? 0) + 1)
      }
    }
  }

  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
}
