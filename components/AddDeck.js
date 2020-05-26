import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { PrimaryButton } from './Buttons'
import { useDispatch } from 'react-redux'
import { addDeck } from '../actions'
import { addDeck as addDeckToStorage } from '../utils/api'

export default function AddDeck({ navigation }) {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const submit = () => {
    dispatch(addDeck(value))
    setValue('')
    navigation.navigate('Deck', {title: value})
    addDeckToStorage(value)
  }

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>What is the title of your new Deck?</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
      <PrimaryButton onPress={submit}>Submit</PrimaryButton>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 15,
  },
})
