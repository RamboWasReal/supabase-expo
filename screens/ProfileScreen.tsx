import { useState, useEffect } from "react"
import { Alert, View, TextInput, Pressable } from "react-native"
import { supabase } from "../lib/supabase"
import useSession, { sessionAtom } from "../hooks/useSession"
import { useAtomValue } from "jotai"

type ProfileField = {
    username: string
}

export default function ProfileScreen() {
 const session = useAtomValue(sessionAtom) 
  const [username, setUsername] = useState<string>("")
  const [website, setWebsite] = useState<string>("")

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      if (!session?.auth?.user) throw new Error("No user on the session!")

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website`)
        .eq("id", session?.auth?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

  async function updateProfile({
    username,
    website,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      if (!session?.auth?.user) throw new Error("No user on the session!")

      const updates = {
        id: session?.auth?.user.id,
        username,
        website,
        updated_at: new Date(),
      }

      let { error } = await supabase.from("profiles").upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

  return (
    <View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={session?.auth?.user?.email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setUsername(text)}
          value={username || ""}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setWebsite(text)}
          value={website || ""}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Pressable onPress={() => supabase.auth.signOut()}>
          <Text>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
})
