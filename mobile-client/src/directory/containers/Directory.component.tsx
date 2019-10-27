import React from 'react';
import {
  ImageBackground,
  View,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import {
  Button,
  Text,
} from 'react-native-ui-kitten';
import {
  PriceText
} from '../components/PriceText.component'
import { Profile } from '../../profiles/Profile.model';
import {
  textStyle,
} from '../../chat/components/textStyles';
import { ContainerView } from '../components/ContainerView.component';
import { TherapistSpecialties } from '../components/TherapistSpecialties.component';
import { TherapistServices } from '../components/TherapistServices.component';

interface ComponentProps {
  profile: Profile;
  listIndex: number
  onChatPress: (profile: Profile) => void;
}

export type DirectoryProps = ThemedComponentProps & ComponentProps;

class DirectoryComponent extends React.Component<DirectoryProps> {

  private onChatPress = (profile: Profile) => {
    this.props.onChatPress(profile)
  };

  public render(): React.ReactNode {
    const { themedStyle, profile, listIndex } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        <ImageBackground
        style={themedStyle.backgroundImage}
          source={{ uri: profile.photo }}
        />
        <View style={themedStyle.infoContainer}>
          <View style={themedStyle.detailsContainer}>
            <Text
              style={themedStyle.titleLabel}
              category='h6'>
              {profile.name}
            </Text>
            <Text
              style={themedStyle.rentLabel}
              appearance='hint'
              category='p2'>
              Rate
            </Text>
            <View style={themedStyle.bookContainer}>
              <PriceText
                style={themedStyle.priceLabel}
                valueStyle={themedStyle.priceValueLabel}
                scaleStyle={themedStyle.priceScaleLabel}
                scale='hour'>
                {`$${profile.rate}`}
              </PriceText>
              <Button
                style={themedStyle.bookButton}
                textStyle={textStyle.button}
                onPress={() => this.onChatPress(this.props.profile)}>
                CHAT NOW
              </Button>
            </View>
          </View>
          <View style={themedStyle.facilitiesContainer}>
            <Text
              style={themedStyle.sectionLabel}
              category='s1'>
              Summary
            </Text>
            <TherapistSpecialties
              style={themedStyle.primaryFacilityList}
              data={profile.specialties}
            />
            <TherapistServices
              style={themedStyle.facilityList}
              data={profile.services}
            />
          </View>
        </View>
        <View style={themedStyle.aboutSection}>
          <Text
            style={themedStyle.sectionLabel}
            category='s1'>
            About
          </Text>
          <Text
            style={themedStyle.aboutLabel}
            appearance='hint'>
            {profile.description}
          </Text>
        </View>
      </ContainerView>
    );
  }
}

export const Directory = withStyles(DirectoryComponent, (theme: ThemeType) => ({
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
