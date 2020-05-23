import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function Decks() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Decks!</Text>
    </View>
  )
}

function AddDeck() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Deck!</Text>
    </View>
  )
}

function Deck() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Deck!</Text>
    </View>
  )
}

function AddCard() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Deck!</Text>
    </View>
  )
}

function Quiz() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Deck!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()
const DecksStack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Decks'>
            {() => (
              <DecksStack.Navigator>
                <DecksStack.Screen name='Decks' component={Decks} />
                <DecksStack.Screen name='Deck' component={Deck} />
                <DecksStack.Screen name='Add Card' component={AddCard} />
                <DecksStack.Screen name='Quiz' component={Quiz} />
              </DecksStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name='Add Deck' component={AddDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
