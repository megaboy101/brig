import React from 'react';
import { Image, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider, Layout, Text, IconRegistry } from 'react-native-ui-kitten'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as Font from 'expo-font'
import { ChatContainer as Chat } from './src/chat/containers/chat.container';
import { DirectoryContainer as Directory } from './src/directory/containers/Directory.container';
import { Questionnaire } from './src/questionnaire/containers/Questionnaire.component';

const AppNavigator = createStackNavigator({
  Chat,
  Directory,
  Questionnaire
}, {
  initialRouteName: 'Questionnaire'
});

const AppContainer = createAppContainer(AppNavigator)


const App = () => {
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    const loader = Font.loadAsync({
      'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
      'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
      'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
      'opensans-light': require('./assets/fonts/opensans-light.ttf'),
      'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
    })

    loader.then(() => {
      setLoaded(true)
    })
  }, [])

  if (!loaded) {
    return (
      <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <AppContainer />
      </ApplicationProvider>
      </>
    )
  } else {
    return (
      <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <View
          style={{ flexDirection: 'column', alignItems: 'center', height: '100%' }}
        >
          <View></View>
          <Image
            style={{ width: 80, height: 80, marginTop: 80 }}
            source={require('./assets/images/logo.png')}
          />
          <Image
            style={{ width: 300, height: 180, marginTop: 95 }}
            source={require('./assets/images/LovingDoodle.png')}
          />
          <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 45 }}>
            <Text category="h4">Welcome</Text>
            <Text category="s1">We're glad you're here.</Text>
          </View>
        </View>
      </ApplicationProvider>
      </>
    )
  }
}

export default App