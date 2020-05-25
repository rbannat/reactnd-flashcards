import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black, blue, white } from '../utils/colors'

export function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[btnStyles.default, btnStyles.reset, style]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export const PrimaryButton = ({ children, onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[btnStyles.default, btnStyles.primary, style]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const btnStyles = StyleSheet.create({
  default: {
    padding: 10,
    textAlign: 'center',
    color: black,
    marginBottom: 20,
  },
  primary: {
    textAlign: 'center',
    color: white,
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
})
