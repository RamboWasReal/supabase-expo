import { Alert, StyleSheet } from "react-native"

import { Text, View } from "../components/Themed"
import { RootTabScreenProps } from "../types"
import React from "react"
import { supabase } from "../lib/supabase"
import { Button } from "../components/Button"
import AnimatedView from "../components/AnimateView"

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {

  const signOut = () => {
    supabase.auth.signOut()

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  }

  return (
    <View style={styles.container}>
      <AnimatedView />
      <View style={{width: 200, overflow: 'hidden', backgroundColor: "transparent"}}>
        <Button isLoading={false} onPress={() => signOut()} title="Log Out" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white'
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
