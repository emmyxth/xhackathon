import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL as string
const public_anon_key = process.env.SUPABASE_PUBLIC_ANON_KEY as string


// Create a single supabase client for interacting with your database
export const supabase = createClient(url, public_anon_key)
