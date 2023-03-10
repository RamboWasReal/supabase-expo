import React from "react"
import { Alert, StyleSheet, TextInput, View, Text, Image } from "react-native"
import { supabase } from "../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "../../components/Button"
import { tintColorDark, tintColorLight } from "../../constants/Colors"
import { useForm, Controller } from "react-hook-form"

type RegisterField = {
  email: string
  password: string
}

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigation = useNavigation()

  const onSubmit = async (data: RegisterField) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })
    if (error) return Alert.alert(error.message)

    navigation.reset({
      index: 0,
      routes: [{ name: "Root" }],
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", height: "40%", marginTop: -95 }}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </View>
      <View style={{ marginHorizontal: 15, marginTop: 15 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View style={{ paddingBottom: 5 }}>
                <Text>Email</Text>
              </View>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            </>
          )}
          name="email"
        />
        {errors.email && <Text style={{ color: "red" }}>This is required.</Text>}
        <View style={{ marginTop: 20 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View style={{ paddingBottom: 5 }}>
                  <Text>Password</Text>
                </View>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  secureTextEntry
                />
              </>
            )}
            name="password"
          />
          {errors.password && <Text style={{ color: "red" }}>This is required.</Text>}
        </View>
        <View style={{ marginHorizontal: 40 }}>
          <View style={{ marginTop: 30 }}>
            <Button isLoading={isSubmitting} onPress={handleSubmit(onSubmit)} title="Sign up" />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              isLoading={isSubmitting}
              bgColor={tintColorDark}
              color={tintColorLight}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              }
              title="Log in"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    borderColor: "#d2c9bc",
    borderWidth: 2,
    fontSize: 18,
    padding: 8,
    borderRadius: 10,
    color: "black",
    height: 40,
  },
})
