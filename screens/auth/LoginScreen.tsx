import React, { useState } from "react"
import { Alert, StyleSheet, TextInput, View, Text, Image, ScrollView } from "react-native"
import { supabase } from "../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Button } from "../../components/Button"

import { tintColorDark, tintColorLight } from "../../constants/Colors"
import { useForm, Controller } from "react-hook-form"
type LogInField = {
  email: string
  password: string
}

export default function LoginScreen() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInField>({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (data: LogInField) => {
    const { error } = await supabase.auth.signInWithPassword({
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
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 70 }}>
        <Image source={{ uri: "https://purepng.com/public/uploads/large/purepng.com-batman-logobatmansuperherocomicdc-comicsbob-kanebat-manbruce-wayne-1701528523452unulm.png" }}
          style={{ width: 200, height: 100 }} />
      </View>
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
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={{ marginTop: 5, paddingBottom: 5 }}>
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
      <View style={{ marginTop: 30, paddingHorizontal: 55, width: '100%' }}>
        <Button isLoading={isSubmitting} onPress={handleSubmit(onSubmit)} title="Log in" />
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 55, width: '100%' }}>
        <Button
          bgColor={tintColorDark}
          color={tintColorLight}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Register" }],
            })
          }
          title="Sign up"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: "center",
    position: 'relative'
  },
  input: {
    borderColor: "#d2c9bc",
    borderWidth: 2,
    fontSize: 18,
    padding: 8,
    borderRadius: 10,
    color: "black",
    height: 40,
    width: 400,
  },
})
