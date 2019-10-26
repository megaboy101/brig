import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import { Avatar } from 'react-native-ui-kitten';
import { Profile } from '../../profiles/Profile.model';

interface ComponentProps {
  profile: Profile;
}

export type ConversationInterlocutorProps = & ThemedComponentProps & ViewProps & ComponentProps;

class ConversationInterlocutorComponent extends React.Component<ConversationInterlocutorProps> {

  private renderOnlineIndicator = (): React.ReactElement<ViewProps> | null => {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.onlineIndicator}/>
    )
  };

  public render(): React.ReactNode {
    const { themedStyle, profile, style } = this.props;

    return (
      <View style={[themedStyle.container, style]}>
        <Avatar
          source={{uri: profile.photo }}
          style={themedStyle.avatar}/>
        {this.renderOnlineIndicator()}
      </View>
    );
  }
}

export const ConversationInterlocutor = withStyles(ConversationInterlocutorComponent, (theme: ThemeType) => ({
  container: {
    justifyContent: 'flex-end',
  },
  avatar: {
    alignSelf: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme['color-success-default'],
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 2,
    right: 2,
  },
}));
