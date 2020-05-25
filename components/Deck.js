import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { PrimaryButton, TextButton } from './Buttons'
import { red } from '../utils/colors'
import { deleteDeck } from '../actions'
import { deleteDeck as deleteDeckFromStorage } from '../utils/api'

export default Deck = ({ route, navigation }) => {
  const deckId = route.params.title
  const deck = useSelector((state) => state[deckId])
  const dispatch = useDispatch()
  const remove = () => {
    dispatch(deleteDeck(deckId))
    navigation.navigate('Decks')
    deleteDeckFromStorage(deckId)
  }
  return deck ? (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.description}>{deck.questions.length} Cards</Text>
      <PrimaryButton
        onPress={() => navigation.navigate('Add Card', { deckId })}
      >
        Add Card
      </PrimaryButton>
      <PrimaryButton onPress={() => navigation.navigate('Quiz', { deckId })}>
        Start a Quiz
      </PrimaryButton>
      <TextButton onPress={remove} style={{ color: red }}>
        Delete Deck
      </TextButton>
    </View>
  ) : (
    <></>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  description: {
    marginBottom: 20,
  },
})
