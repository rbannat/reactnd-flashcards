import React, { Component } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { getDecks } from '../utils/api'
import { white } from '../utils/colors'
import { setLocalNotification } from '../utils/notifications'
import { PrimaryButton } from './Buttons'

class Decks extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
    setLocalNotification()
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Deck', { title: item.title })}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.questions.length} cards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        {!Object.keys(decks).length ? (
          <View style={styles.contentContainer}>
            <Text style={styles.description}>There are no decks.</Text>
            <TouchableOpacity>
              <PrimaryButton
                onPress={() => this.props.navigation.navigate('Add Deck')}
              >
                Add Deck
              </PrimaryButton>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={Object.keys(decks).map((deckId) => decks[deckId])}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.title}
          />
        )}
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: white,
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
