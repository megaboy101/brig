import React from 'react'
import { ViewPager, Text } from 'react-native-ui-kitten';
import { View, Image } from 'react-native';

interface State {
  selectedIndex: number
}

const StepOne = () => (
  <>
    <Image
      style={{ width: 300, height: 180, marginTop: 95 }}
      source={require('./assets/images/LovingDoodle.png')}
    />
    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 45 }}>
      <Text category="h4">Welcome</Text>
      <Text category="s1">We're glad you're here.</Text>
    </View>
  </>
)

export class Intro extends React.Component<{}, State> {
  state = {
    selectedIndex: 0
  }

  onIndexChange = (selectedIndex) => {
    console.warn('Yo')
    this.setState({ selectedIndex });
  }

  render() {
    return (
      <View
        style={{ flexDirection: 'column', alignItems: 'center', height: '100%' }}
      >
        <Image
          style={{ width: 80, height: 80, marginTop: 80 }}
          source={require('./assets/images/logo.png')}
        />
        <ViewPager
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onIndexChange}
        >
          {}
        </ViewPager>

      </View>
    )
  }
}