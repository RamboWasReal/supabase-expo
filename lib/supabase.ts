import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
//@ts-ignore
import { API_SUPABASE_URL, API_SUPABASE_ANON_KEY } from "@env"

const supabaseUrl = API_SUPABASE_URL
const supabaseAnonKey = API_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
