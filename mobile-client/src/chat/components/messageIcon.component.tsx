import React from 'react';
import { ImageProps } from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
  Icon,
} from 'react-native-ui-kitten';
import { Message } from '../models/Message.model';

interface MessageIconProvider {
  icon(style: StyleType): React.ReactElement<ImageProps>;
}

export enum MessageIcons {
  READ = 'read',
  DELIVERED = 'delivered',
}

const messageIcons: { [key in MessageIcons]: MessageIconProvider } = {
  [MessageIcons.READ]: {
    icon(style: StyleType): React.ReactElement<ImageProps> {
      return <Icon name="done-all" />
    },
  },
  [MessageIcons.DELIVERED]: {
    icon(style: StyleType): React.ReactElement<ImageProps> {
      return <Icon name="done-all" />
    },
  },
};

interface ComponentProps {
  message: Message;
}

type MessageIconProps = ThemedComponentProps & ComponentProps;

export class MessageIconComponent extends React.Component<MessageIconProps> {
  public render(): React.ReactElement<ImageProps> {
    const { themedStyle } = this.props;

    const messageStatus: MessageIcons = MessageIcons.READ
    const iconProvider: MessageIconProvider = messageIcons[messageStatus];

    return iconProvider ? iconProvider.icon(themedStyle) : null;
  }
}

export const MessageIcon = withStyles(MessageIconComponent, (theme: ThemeType) => ({
  messageIndicatorIcon: {
    width: 13,
    height: 8,
    marginRight: 4,
  },
  messageIndicatorIconRead: {
    tintColor: theme['color-primary-default'],
  },
  messageIndicatorIconDelivered: {
    tintColor: theme['text-hint-color'],
  },
}));
