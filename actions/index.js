export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title,
  }
}

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    card,
  }
}
