import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native"

interface Props {
  isLoading?: boolean
  onPress: () => void
  style?: ViewStyle
  size?: number
  radius?: number
  title: string
  bgColor?: string
  color?: string
}

export const Button: React.FC<Props> = ({
  isLoading = false,
  onPress,
  style,
  size = 18,
  radius = 10,
  title,
  color = "black",
  bgColor = "#d2c9bc",
}) => {
  const content = isLoading ? (
    <ActivityIndicator color="black" />
  ) : (
    <Text style={{ fontSize: size, color: color }}>{title}</Text>
  )

  return (
    <Pressable
      disabled={isLoading}
      onPress={onPress}
      style={[styles.button, style, { borderRadius: radius, backgroundColor: bgColor }]}>
      {content}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
})
