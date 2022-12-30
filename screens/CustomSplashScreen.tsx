import { View, Text } from "react-native"
import { tintColorLight } from "../constants/Colors"
import { useAtomValue } from "jotai"
import { sessionAtom } from "../hooks/useSession"
import { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { RootStackScreenProps } from "../types"

export default function CustomSplashScreen({ navigation }: RootStackScreenProps<"SplashScreen">) {
  const session = useAtomValue(sessionAtom)
  useEffect(() => {
    if (session?.user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Root" }],
      })
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    }
  }, [session?.user])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tintColorLight,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Just for fun</Text>
      <StatusBar style="dark" />
    </View>
  )
}
