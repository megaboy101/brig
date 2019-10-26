import React from 'react';
import { StyleSheet, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten'
import { Chat } from './src/chat/Chat';
import { Directory } from './src/directory/Directory';
import { Questionnaire } from './src/questionnaire/Questionnaire';

const AppNavigator = createStackNavigator({
  Chat,
  Directory,
  Questionnaire
}, {
  initialRouteName: 'Chat'
});

const AppContainer = createAppContainer(AppNavigator)


const App = () => {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <AppContainer />
    </ApplicationProvider>
  )
}

export default App