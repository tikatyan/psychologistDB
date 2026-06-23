import { supabase } from './supabase'
import type { Psikolog, Clinic } from './types'

export async function getStats(): Promise<{
  totalPsikolog: number
  totalKliniks: number
  totalKota: number
}> {
  const [psikologResult, klinikResult, kotaPsikologResult, kotaKlinikResult] =
    await Promise.all([
      supabase.from('psikolog').select('id', { count: 'exact', head: true }),
      supabase.from('clinics').select('id', { count: 'exact', head: true }),
      supabase.from('psikolog').select('kota'),
      supabase.from('clinics').select('kota'),
    ])

  const kotaSet = new Set<string>()
  for (const row of kotaPsikologResult.data ?? []) {
    if (row.kota) kotaSet.add(row.kota)
  }
  for (const row of kotaKlinikResult.data ?? []) {
    if (row.kota) kotaSet.add(row.kota)
  }

  return {
    totalPsikolog: psikologResult.count ?? 0,
    totalKliniks: klinikResult.count ?? 0,
    totalKota: kotaSet.size,
  }
}

export async function searchDirectory(params: {
  q?: string
  kota?: string[]
  online?: boolean
  offline?: boolean
  bpjs?: boolean
  focus?: string[]
  approach?: string
  ageRange?: string
  clientType?: 'anak' | 'dewasa'
  format?: string
  feeMax?: number
  type?: 'psikolog' | 'klinik' | 'semua'
}): Promise<{ psikolog: Psikolog[]; clinics: Clinic[] }> {
  const type = params.type ?? 'semua'

  let psikologData: Psikolog[] = []
  let clinicsData: Clinic[] = []

  if (type === 'psikolog' || type === 'semua') {
    let query = supabase
      .from('psikolog')
      .select('*')
      .order('data_completeness_score', { ascending: false })

    if (params.q) {
      query = query.textSearch('search_vector', params.q, {
        type: 'websearch',
        config: 'simple',
      })
    }
    if (params.kota && params.kota.length > 0) {
      query = query.or(params.kota.map(k => `kota.ilike.%${k}%`).join(','))
    }
    if (params.online) {
      query = query.eq('online_available', true)
    }
    if (params.offline) {
      query = query.eq('offline_available', true)
    }
    if (params.bpjs) {
      query = query.eq('bpjs_accepted', true)
    }
    if (params.focus && params.focus.length > 0) {
      query = query.overlaps('case_focus', params.focus)
    }
    if (params.approach) {
      query = query.contains('therapeutic_approach', [params.approach])
    }
    if (params.ageRange) {
      query = query.contains('age_range_handled', [params.ageRange])
    }
    if (params.format) {
      query = query.contains('session_format', [params.format])
    }
    if (params.feeMax !== undefined) {
      query = query.lte('fee_online_idr_min', params.feeMax)
    }

    const { data, error } = await query
    if (error) console.error('[searchDirectory] psikolog query error:', error.message)
    psikologData = (data as Psikolog[]) ?? []

    // Client type (anak / dewasa) — filtered in JS so it is robust to the
    // exact casing of age_range_handled values stored in the database.
    if (params.clientType) {
      const wantAnak = params.clientType === 'anak'
      psikologData = psikologData.filter((p) =>
        (p.age_range_handled ?? []).some((a) => {
          const low = a.toLowerCase()
          return wantAnak
            ? low.includes('anak') || low.includes('remaja')
            : low.includes('dewasa') || low.includes('lansia')
        })
      )
    }
  }

  if (type === 'klinik' || type === 'semua') {
    let query = supabase.from('clinics').select('*').order('kota', { ascending: true })

    if (params.q) {
      query = query.textSearch('search_vector', params.q, {
        type: 'websearch',
        config: 'simple',
      })
    }
    if (params.kota && params.kota.length > 0) {
      query = query.or(params.kota.map(k => `kota.ilike.%${k}%`).join(','))
    }
    if (params.online) {
      query = query.eq('online_available', true)
    }
    if (params.offline) {
      query = query.eq('offline_available', true)
    }
    if (params.bpjs) {
      query = query.eq('bpjs_accepted', true)
    }
    if (params.focus && params.focus.length > 0) {
      query = query.overlaps('focus', params.focus)
    }

    const { data, error } = await query
    if (error) console.error('[searchDirectory] clinics query error:', error.message)
    clinicsData = (data as Clinic[]) ?? []

    // When filtering by client type, clinics have no age data — hide them so
    // the results stay focused on psikolog that match.
    if (params.clientType) clinicsData = []
  }

  return { psikolog: psikologData, clinics: clinicsData }
}

export async function getPsikolog(id: string): Promise<Psikolog | null> {
  const { data } = await supabase.from('psikolog').select('*').eq('id', id).single()
  return (data as Psikolog | null) ?? null
}

export async function getClinic(id: string): Promise<Clinic | null> {
  const { data } = await supabase.from('clinics').select('*').eq('id', id).single()
  return (data as Clinic | null) ?? null
}

export async function getPsikologByClinic(clinicIds: string[]): Promise<Psikolog[]> {
  const { data } = await supabase
    .from('psikolog')
    .select('*')
    .overlaps('clinic_ids', clinicIds)
    .order('data_completeness_score', { ascending: false })
  return (data as Psikolog[]) ?? []
}

export async function getKotaList(): Promise<string[]> {
  const [psikologResult, klinikResult] = await Promise.all([
    supabase.from('psikolog').select('kota'),
    supabase.from('clinics').select('kota'),
  ])

  if (psikologResult.error) console.error('[getKotaList] psikolog error:', psikologResult.error.message)
  if (klinikResult.error) console.error('[getKotaList] clinics error:', klinikResult.error.message)

  const kotaSet = new Set<string>()
  for (const row of [...(psikologResult.data ?? []), ...(klinikResult.data ?? [])]) {
    if (row.kota) {
      row.kota.split(',').map((k: string) => k.trim()).filter(Boolean).forEach((k: string) => kotaSet.add(k))
    }
  }

  return Array.from(kotaSet).sort()
}
