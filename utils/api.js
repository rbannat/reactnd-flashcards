import { AsyncStorage } from 'react-native'

const storageKey = 'rnd:flashcards'

// {
//     React: {
//       title: 'React',
//       questions: [
//         {
//           question: 'What is React?',
//           answer: 'A library for managing user interfaces'
//         },
//         {
//           question: 'Where do you make Ajax requests in React?',
//           answer: 'The componentDidMount lifecycle event'
//         }
//       ]
//     },
//     JavaScript: {
//       title: 'JavaScript',
//       questions: [
//         {
//           question: 'What is a closure?',
//           answer: 'The combination of a function and the lexical environment within which that function was declared.'
//         }
//       ]
//     }
//   }

export async function deleteAll() {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log(e)
  }
}

// getDecks: return all of the decks along with their titles, questions, and answers.
export async function getDecks() {
  try {
    const decks = await AsyncStorage.getItem(storageKey)
    return decks != null ? JSON.parse(decks) : null
  } catch (e) {
    console.log(e)
  }
}
// getDeck: take in a single id argument and return the deck associated with that id.
export async function getDeck(title) {
  try {
    const decks = await AsyncStorage.getItem(storageKey)
    if (decks === null) {
      return null
    }
    const deck = JSON.parse(decks)[title]
    if (!deck) {
      throw new Error(`There is no deck with title ${title}`)
    }
    return deck
  } catch (e) {
    console.log(e)
  }
}
// saveDeckTitle: take in a single title argument and add it to the decks.
export async function addDeck(title) {
  try {
    const decks = await getDecks()
    decks[title] = { title, questions: [] }
    await AsyncStorage.setItem(storageKey, JSON.stringify(decks))
  } catch (e) {
    console.log(e)
  }
}
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export async function addCardToDeck(title, card) {
  try {
    const decks = await getDecks()
    if (decks === null) {
      return null
    }
    const existingDeck = decks[title]
    if (!existingDeck) {
      throw new Error(`There is no deck with title ${title}`)
    }
    decks[title] = {
      ...existingDeck,
      questions: [...existingDeck.questions, card],
    }
    await AsyncStorage.setItem(storageKey, JSON.stringify(decks))
  } catch (e) {
    console.log(e)
  }
}

// deleteDeck: deletes deck by title.
export async function deleteDeck(title) {
  try {
    const decks = await getDecks()
    if (decks === null) {
      return null
    }
    const { [title]: _, ...rest } = decks
    await AsyncStorage.setItem(storageKey, JSON.stringify(rest))
  } catch (e) {
    console.log(e)
  }
}
