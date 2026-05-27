import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qexrwixiraxeczxguhpm.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFleHJ3aXhpcmF4ZWN6eGd1aHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NTA2NDYsImV4cCI6MjA5NTQyNjY0Nn0.A4gKXfyKqLOEZrMVw1BzFjatMwlgVqduy38cA0dBJi0'

export const createClient = () =>
  createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)
