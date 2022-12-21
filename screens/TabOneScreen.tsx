import { Alert, StyleSheet } from "react-native"
import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"
import { RootTabScreenProps } from "../types"
import React from "react"
import { supabase } from "../lib/supabase"
import { Session } from "@supabase/supabase-js"
import useSession from "../hooks/useSession"
import { tintColorDark, tintColorLight } from "../constants/Colors"
import { Button } from "../components/Button"

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const { session } = useSession()

  React.useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      if (!session?.user) throw new Error("No user on the session!")

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website`)
        .eq("id", session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        console.log(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor={tintColorLight} darkColor={tintColorDark} />
      <Button isLoading={false} onPress={() => supabase.auth.signOut()} title="Log Out" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
