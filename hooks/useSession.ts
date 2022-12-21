import React from "react"
import { supabase } from "../lib/supabase"
import { Session } from "@supabase/supabase-js"

export default function useSession() {
  const [session, setSession] = React.useState<Session | null>(null)
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return { session }
}
