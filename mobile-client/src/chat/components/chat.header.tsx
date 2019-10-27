import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  Icon,
} from 'react-native-ui-kitten';
import {
  Avatar,
  AvatarProps,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
  TopNavigationProps,
} from 'react-native-ui-kitten';
import { SafeAreaView } from './SafeAreaView';
import { Profile } from '../../profiles/Profile.model';

interface ComponentProps {
  interlocutor: Profile;
  lastSeen: string;
  onBack: () => void;
  onProfile: (profile: Profile) => void;
}

export interface ChatHeaderNavigationStateParams {
  interlocutor: Profile;
  lastSeen: string;
  onBack: () => void;
  onProfile: (profile: Profile) => void;
}

export type ChatHeaderProps = ThemedComponentProps & ComponentProps & NavigationStackScreenProps;

class ChatHeaderComponent extends React.Component<ChatHeaderProps> {

  private onBack = (): void => {
    this.props.onBack();
  };

  private onProfile = (): void => {
    const { interlocutor, onProfile } = this.props;

    onProfile(interlocutor);
  };

  private renderLeftControl = (): React.ReactElement<TopNavigationActionProps> => {
    return (
      <TopNavigationAction
        icon={() => <Icon name="arrow-back" />}
        onPress={this.onBack}
      />
    );
  };

  private renderProfileAvatar = (): React.ReactElement<AvatarProps> => {
    const { interlocutor } = this.props;

    return (
      <Avatar source={{uri: interlocutor.photo}} />
    );
  };

  private renderRightControls = (): React.ReactElement<TopNavigationActionProps> => {
    const { themedStyle } = this.props;

    return (
      <TopNavigationAction
        icon={this.renderProfileAvatar}
      />
    );
  };

  private renderInterlocutorProps = (): TopNavigationProps | null => {
    const { interlocutor, lastSeen } = this.props;

    return interlocutor && {
      title: `${interlocutor.name}`,
      subtitle: `Last seen ${lastSeen}`,
      rightControls: this.renderRightControls(),
    };
  };

  public render(): React.ReactNode {
    const { themedStyle, interlocutor } = this.props;

    return (
      <SafeAreaView style={themedStyle.container}>
        <TopNavigation
          alignment='center'
          leftControl={this.renderLeftControl()}
          {...this.renderInterlocutorProps()}
        />
      </SafeAreaView>
    );
  }
}

export const ChatHeader = withStyles(ChatHeaderComponent, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
    marginTop: 40
  },
}));

