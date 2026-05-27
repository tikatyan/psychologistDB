import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const SUPABASE_URL = "https://qexrwixiraxeczxguhpm.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFleHJ3aXhpcmF4ZWN6eGd1aHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NTA2NDYsImV4cCI6MjA5NTQyNjY0Nn0.A4gKXfyKqLOEZrMVw1BzFjatMwlgVqduy38cA0dBJi0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

type RawClinic = Record<string, unknown>;
type RawPsikolog = Record<string, unknown>;

function pickClinic(raw: RawClinic) {
  return {
    id: raw.id,
    nama: raw.nama,
    tipe: raw.tipe,
    kota: raw.kota,
    area: raw.area ?? null,
    alamat: raw.alamat ?? null,
    telepon: raw.telepon ?? null,
    email: raw.email ?? null,
    website: raw.website ?? null,
    instagram: raw.instagram ?? null,
    wa_number: raw.wa_number ?? null,
    gmaps_link: raw.gmaps_link ?? null,
    online_available: raw.online_available ?? null,
    offline_available: raw.offline_available ?? null,
    bpjs_accepted: raw.bpjs_accepted ?? null,
    focus: Array.isArray(raw.focus) ? raw.focus : null,
    fee_online_idr_min: raw.fee_online_idr_min ?? null,
    fee_online_idr_max: raw.fee_online_idr_max ?? null,
    fee_offline_idr_min: raw.fee_offline_idr_min ?? null,
    fee_offline_idr_max: raw.fee_offline_idr_max ?? null,
    session_duration_minutes: raw.session_duration_minutes ?? null,
    jam_operasional: raw.jam_operasional ?? null,
    instagram_followers: raw.instagram_followers ?? null,
    notes: raw.notes ?? null,
    subsidi_silang: raw.subsidi_silang ?? null,
    fee_notes: raw.fee_notes ?? null,
    data_source: (raw.data_source as string) ?? "scraped",
    last_verified: raw.last_verified ?? null,
  };
}

function pickPsikolog(raw: RawPsikolog) {
  return {
    id: raw.id,
    nama: raw.nama,
    gelar: raw.gelar ?? null,
    gender: raw.gender ?? null,
    clinic_ids: Array.isArray(raw.clinic_ids) && raw.clinic_ids.length > 0 ? raw.clinic_ids : null,
    clinic_names: Array.isArray(raw.clinic_names) && raw.clinic_names.length > 0 ? raw.clinic_names : null,
    kota: raw.kota ?? null,
    online_available: raw.online_available ?? null,
    offline_available: raw.offline_available ?? null,
    case_focus: Array.isArray(raw.case_focus) ? raw.case_focus : null,
    therapeutic_approach: Array.isArray(raw.therapeutic_approach) ? raw.therapeutic_approach : null,
    age_range_handled: Array.isArray(raw.age_range_handled) ? raw.age_range_handled : null,
    session_format: Array.isArray(raw.session_format) ? raw.session_format : null,
    language: Array.isArray(raw.language) ? raw.language : null,
    years_of_experience: raw.years_of_experience ?? null,
    hands_on_hours: raw.hands_on_hours ?? null,
    fee_offline_idr_min: raw.fee_offline_idr_min ?? null,
    fee_offline_idr_max: raw.fee_offline_idr_max ?? null,
    fee_online_idr_min: raw.fee_online_idr_min ?? null,
    fee_online_idr_max: raw.fee_online_idr_max ?? null,
    session_duration_minutes: raw.session_duration_minutes ?? null,
    bpjs_accepted: raw.bpjs_accepted ?? null,
    first_timer_welcome: raw.first_timer_welcome ?? null,
    sippk_status: raw.sippk_status ?? null,
    himpsi_member: raw.himpsi_member ?? null,
    ipk_member: raw.ipk_member ?? null,
    education: Array.isArray(raw.education) ? raw.education : null,
    photo_url: raw.photo_url ?? null,
    profile_url: raw.profile_url ?? null,
    platform_presence: Array.isArray(raw.platform_presence) ? raw.platform_presence : null,
    instagram_handle: raw.instagram_handle ?? null,
    notes: raw.notes ?? null,
    data_source: (raw.data_source as string) ?? "scraped",
    data_completeness_score: (raw.data_completeness_score as number) ?? 0,
    last_verified: raw.last_verified ?? null,
  };
}

async function upsertBatch<T extends object>(
  table: string,
  rows: T[],
  batchSize = 50
) {
  let inserted = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from(table).upsert(batch, { onConflict: "id" });
    if (error) {
      console.error(`Error upserting batch into ${table}:`, error.message);
      process.exit(1);
    }
    inserted += batch.length;
    console.log(`  ${table}: ${inserted}/${rows.length} rows upserted`);
  }
}

async function main() {
  const jsonPath = process.argv[2] ?? resolve(__dirname, "../psikolog_indonesia_db.json");
  console.log(`Reading data from: ${jsonPath}`);

  const raw = JSON.parse(readFileSync(jsonPath, "utf-8"));

  const clinics: RawClinic[] = raw.clinics ?? [];
  const psikolog: RawPsikolog[] = raw.psikolog ?? [];

  console.log(`Found ${clinics.length} clinics, ${psikolog.length} psikolog`);

  console.log("\nImporting clinics...");
  await upsertBatch("clinics", clinics.map(pickClinic));

  console.log("\nImporting psikolog...");
  await upsertBatch("psikolog", psikolog.map(pickPsikolog));

  console.log("\nImport complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
