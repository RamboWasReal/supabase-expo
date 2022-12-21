import { TextInput, TextInputProps, StyleSheet } from "react-native"

interface Props extends TextInputProps {
  name: string
  handleChange: (value: string) => void
  error?: string | false
}

export const Input: React.FC<Props> = ({
  handleChange,
  value,
  placeholder = "",
  name,
  ...rest
}) => {
  return (
    <TextInput
      onChangeText={(value) => handleChange(value)}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="black"
      autoCapitalize="none"
      style={styles.textInput}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#d2c9bc",
    borderWidth: 2,
    fontSize: 18,
    padding: 8,
    borderRadius: 10,
    color: "black",
    height: 40,
  },
})
