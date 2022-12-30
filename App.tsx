import "react-native-url-polyfill/auto"
import { StatusBar, setStatusBarStyle } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import useSession from "./hooks/useSession"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  useSession()
  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    )
  }
}
