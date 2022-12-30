import { supabase } from './supabase'


export const getUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data?.user
}


export const getProfile = async () => {
  const currentUser = await supabase.auth.getUser()
  const { data } = await supabase.from('profiles').select('*').eq('user_id', currentUser.data.user?.id).single()

  return data
}

