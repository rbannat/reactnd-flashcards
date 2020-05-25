import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore } from 'redux'
import reducer from './reducers'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import Deck from './components/Deck'
import { Provider } from 'react-redux'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createBottomTabNavigator()
const DecksStack = createStackNavigator()

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName={'Decks'}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName

                  if (route.name === 'Add Deck') {
                    iconName = focused
                      ? 'ios-add-circle'
                      : 'ios-add-circle-outline'
                  } else if (route.name === 'Decks') {
                    iconName = focused ? 'ios-list-box' : 'ios-list'
                  }

                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />
                },
              })}
            >
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
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  )
}
