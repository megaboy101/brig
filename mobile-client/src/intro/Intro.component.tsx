import React from 'react'
import { ViewPager, Text, Button } from 'react-native-ui-kitten';
import { View, Image } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

interface State {
  selectedIndex: number
}

const StepOne = () => (
  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <Image
      style={{ width: 300, height: 180, marginTop: 95 }}
      source={require('../../assets/images/LovingDoodle.png')}
    />
    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 45 }}>
      <Text category="h4">Welcome</Text>
      <Text category="s1">We're glad you're here.</Text>
    </View>
  </View>
)

const StepTwo = () => (
  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <Image
      style={{ width: 300, height: 225, marginTop: 95 }}
      source={require('../../assets/images/ReadingSideDoodle.png')}
    />
    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 45 }}>
      <Text category="h4">Look, we get it.</Text>
      <Text category="s1">Reaching out for help is hard.</Text>
    </View>
  </View>
)

const StepThree = () => (
  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <Image
      style={{ width: 300, height: 225, marginTop: 95 }}
      source={require('../../assets/images/GroovySittingDoodle.png')}
    />
    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 45 }}>
      <Text category="h4">That is exactly</Text>
      <Text category="h4">why we created</Text>
      <Text category="h4">Bridge</Text>
    </View>
  </View>
)

const StepFour = () => (
  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <Image
      style={{ width: 300, height: 225, marginTop: 95 }}
      source={require('../../assets/images/LayingDoodle.png')}
    />
    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 45 }}>
      <Text category="h4">Tailored Guidance</Text>
      <Text category="s1">Just tell us a little bit about yourself</Text>
      <Text category="s1">first, completely anonymously...</Text>
    </View>
  </View>
)

const StepFive = ({ finishIntro }) => (
  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <Image
      style={{ width: 300, height: 225, marginTop: 95 }}
      source={require('../../assets/images/MeditatingDoodle.png')}
    />
    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 45 }}>
      <Text category="h4">Stress free solutions</Text>
      <Text category="s1">And we will find the right mental health</Text>
      <Text category="s1">and wellbeing professionals for you.</Text>
    </View>

    <Button onPress={finishIntro} style={{ width: '90%', marginTop: 30 }} size="large">ENTER</Button>
  </View>
)

interface IntroProps {
  startHandler: () => void
}

export class Intro extends React.Component<IntroProps & NavigationStackScreenProps, State> {
  static navigationOptions = {
    header: null
  }

  state = {
    selectedIndex: 0
  }

  onIndexChange = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  render() {
    return (
      <View
        style={{ flexDirection: 'column', alignItems: 'center', height: '100%' }}
      >
        <Image
          style={{ width: 80, height: 80, marginTop: 80 }}
          source={require('../../assets/images/logo.png')}
        />
        <ViewPager
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onIndexChange}
        >
          {[
            <StepOne key={6} />,
            <StepOne key={7} />,
            <StepOne key={8} />,
            <StepOne key={9} />,
            <StepOne key={1} />,
            <StepTwo key={2} />,
            <StepThree key={3} />,
            <StepFour key={4} />,
            <StepFive key={5} finishIntro={() => this.props.navigation.navigate('Questionnaire')} />
          ]}
        </ViewPager>

      </View>
    )
  }
}