import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { PrimaryButton, TextButton } from './Buttons'
import { green, red } from '../utils/colors'

export default function Quiz({ route, navigation }) {
  const deckId = route.params.deckId
  const { title, questions: cards } = useSelector((state) => state[deckId])
  const [cardsDone, setCardsDone] = useState(0)
  const [correctCardsCount, setCorrectCardsCount] = useState(0)
  const [showQuestion, setShowQuestion] = useState(true)
  const nextCard = () => {
    if (cardsDone < cards.length) {
      setShowQuestion(true)
      setCardsDone(cardsDone + 1)
      return
    }
  }
  const handleCorrect = () => {
    setCorrectCardsCount(correctCardsCount + 1)
    nextCard()
  }
  const reset = () => {
    setCardsDone(0)
    setShowQuestion(true)
    setCorrectCardsCount(0)
  }

  return !cards.length ? (
    <View style={styles.container}>
      <Text>There are no cards in the deck!</Text>
    </View>
  ) : (
    <>
      <View style={styles.cardCountContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cardCount}>
          {cardsDone} / {cards.length}
        </Text>
      </View>
      {cardsDone === cards.length ? (
        <View style={styles.container}>
          <Text style={[styles.cardTitle, { textAlign: 'center' }]}>
            You got {correctCardsCount} out of {cards.length}!
          </Text>
          <PrimaryButton onPress={reset}>Restart Quiz</PrimaryButton>
          <PrimaryButton onPress={() => navigation.goBack()}>
            Back to Deck
          </PrimaryButton>
        </View>
      ) : (
        <View style={styles.container}>
          {showQuestion ? (
            <Text style={styles.cardTitle}>{cards[cardsDone].question}</Text>
          ) : (
            <Text style={styles.cardTitle}>{cards[cardsDone].answer}</Text>
          )}
          <TextButton onPress={() => setShowQuestion(!showQuestion)}>
            {showQuestion ? `Show answer` : `Show question`}
          </TextButton>
          <PrimaryButton
            style={{ backgroundColor: green }}
            onPress={handleCorrect}
          >
            Correct
          </PrimaryButton>
          <PrimaryButton style={{ backgroundColor: red }} onPress={nextCard}>
            Incorrect
          </PrimaryButton>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCountContainer: {
    padding: 15,
  },
  title: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 48,
    marginBottom: 20,
  },
})
