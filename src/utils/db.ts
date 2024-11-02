import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL as string
const public_anon_key = process.env.SUPABASE_PUBLIC_ANON_KEY as string


// Create a single supabase client for interacting with your database
export const supabase = createClient("https://mhktmdtwobpdvpdxusfk.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oa3RtZHR3b2JwZHZwZHh1c2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzNjEyNjcsImV4cCI6MjA0NDkzNzI2N30.FE_rI-cWzA112Sv_eu8d2jqhlKg1NS-YFwemanMPxSc")
