import React from "react"
import { supabase } from "../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { atom, useAtom } from "jotai"

export const sessionAtom = atom<Session | null>(null)

export default function useSession() {
  const [_, setSession] = useAtom(sessionAtom)
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return null
}
