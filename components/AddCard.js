import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { PrimaryButton } from './Buttons'
import { useDispatch } from 'react-redux'
import { addCardToDeck } from '../actions'
import { addCardToDeck as addCardToDeckStorage } from '../utils/api'
import { gray, white } from '../utils/colors'

export default function AddCard({ route, navigation }) {
  const deckId = route.params.deckId
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const dispatch = useDispatch()

  const submit = () => {
    dispatch(addCardToDeck(deckId, { question, answer }))
    setQuestion('')
    setAnswer('')
    navigation.goBack()
    addCardToDeckStorage(deckId, { question, answer })
  }
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>
        What is the question and answer for your new card?
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setQuestion(text)}
        value={question}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAnswer(text)}
        value={answer}
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
    borderColor: gray,
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: white,
  },
  container: {
    flex: 1,
    padding: 15,
  },
})
