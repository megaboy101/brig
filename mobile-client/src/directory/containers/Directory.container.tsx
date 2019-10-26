import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Profile } from '../../profiles/Profile.model';
import { profile1 } from '../../profiles/Profile1';
import { Directory } from './Directory.component';
import { ViewPager, withStyles, ThemeType, ThemedComponentProps } from 'react-native-ui-kitten';
import { ContainerView } from '../components/ContainerView.component';
import { ImageBackground, View } from 'react-native';
import { textStyle } from '../../chat/components';

interface State {
  profiles: Profile[];
  selectedIndex: number
  currentFade: number
}

export type DirectoryContainerProps = NavigationStackScreenProps & ThemedComponentProps;

export class DirectoryContainerComponent extends React.Component<DirectoryContainerProps, State> {
  therapist1 = require('../../../assets/images/demo-person.jpg')
  therapist2 = require('../../../assets/images/demo-person2.jpg')

  public state: State = {
    profiles: [profile1, profile1],
    selectedIndex: 0,
    currentFade: 1
  }

  onIndexChange = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  fadeProfile = (offset: number) => {
    const realOffset = Math.abs(offset)
    // This assumes a 360px screen width
    const degree = 100000 / 360
    const percentage = realOffset / degree

    if (this.state.selectedIndex === 0) {
      this.setState({
        currentFade: realOffset >= 360 ? 100 : 1 - percentage
      })
    } else {
      this.setState({
        currentFade: realOffset >= 360 ? 100 : percentage
      })
    }
  }

  private navigationKey: string = 'DirectoryContainer';

  private onChatPress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Chat',
    });
  };

  private decideImage() {
    const { themedStyle } = this.props
    if (this.state.selectedIndex === 0) {
      return (
        <View style={{ position: 'relative', top: 0, left: 0, flex: 1 }}>
          <ImageBackground
            style={{ ...themedStyle.backgroundImage }}
            source={this.therapist2}
          >
            <ImageBackground
              style={{ ...themedStyle.backgroundImage, opacity: this.state.currentFade }}
              source={this.therapist1}
            />
          </ImageBackground>
        </View>
      )
    } else {
      return (
        <View style={{ position: 'relative', top: 0, left: 0, flex: 1 }}>
          <ImageBackground
            style={{ ...themedStyle.backgroundImage }}
            source={this.therapist1}
          >
            <ImageBackground
              style={{ ...themedStyle.backgroundImage, opacity: this.state.currentFade }}
              source={this.therapist2}
            />
          </ImageBackground>
        </View>
      )
    }
  }

  public render(): React.ReactNode {
    const { themedStyle } = this.props

    return (
      <ContainerView style={themedStyle.container}>
        {
          this.decideImage()
        }
        <ViewPager
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onIndexChange}
          onOffsetChange={this.fadeProfile}
        >
          {
            this.state.profiles.map((profile, i) => {
              return (
                <Directory
                  key={i}
                  listIndex={i}
                  profile={profile}
                  onChatPress={this.onChatPress}
                />
              )
            })
          }
        </ViewPager>
      </ContainerView>
    )
  }
}

export const DirectoryContainer = withStyles(DirectoryContainerComponent, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
  },
  backgroundImage: {
    flex: 1,
    minHeight: 280,
  },
  infoContainer: {
    marginTop: -80,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: theme['background-basic-color-1'],
  },
  detailsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  facilitiesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  primaryFacilityList: {
    paddingVertical: 16,
  },
  facilityList: {
    paddingVertical: 12,
  },
  aboutSection: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  photoSection: {
    marginVertical: 8,
  },
  photoList: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  titleLabel: textStyle.headline,
  rentLabel: {
    marginTop: 24,
    ...textStyle.paragraph,
  },
  bookButton: {},
  priceLabel: {
    marginTop: 8,
  },
  priceValueLabel: {
    fontFamily: 'opensans-bold',
    fontSize: 26,
    lineHeight: 32,
  },
  priceScaleLabel: {
    fontSize: 13,
    lineHeight: 24,
    ...textStyle.paragraph,
  },
  sectionLabel: textStyle.subtitle,
  aboutLabel: {
    marginVertical: 16,
    ...textStyle.paragraph,
  },
  photoLabel: {
    marginHorizontal: 24,
  },
}));