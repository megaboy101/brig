import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import {
  ChatHeader,
  ChatHeaderNavigationStateParams,
} from '../components';
import {
  Conversation,
} from '../models/Conversation.model';
import {
  Message
} from '../models/Message.model'
import {
  Profile
} from '../../profiles/Profile.model'
import {
  profile1,
} from '../../profiles/Profile1';
import {
  profile2,
} from '../../profiles/Profile2';
import { Chat } from './chat.component';

interface State {
  newMessageText: string;
  conversation: Conversation;
}

const mockConversation: Conversation = {
  interlocutor: profile1,
  messages: [
    {
      author: profile1,
      text: "Person A",
      time: "2:35"
    },
    {
      author: profile2,
      text: "Person B",
      time: "2:35"
    }
  ],
};

export class ChatContainer extends React.Component<NavigationStackScreenProps, State> {

  public state: State = {
    newMessageText: '',
    conversation: mockConversation,
  };

  static navigationOptions = ({ navigation, screenProps }) => {
    const headerProps: ChatHeaderNavigationStateParams = {
      interlocutor: navigation.getParam('interlocutor', mockConversation.interlocutor),
      lastSeen: navigation.getParam('lastSeen', 'today'),
      onBack: navigation.getParam('onBack'),
      onProfile: navigation.getParam('onProfile'),
    };

    const header = (navigationProps: NavigationStackScreenProps) => {
      return (
        <ChatHeader
          {...navigationProps}
          {...headerProps}
        />
      );
    };

    return { ...navigation, ...screenProps, header };
  };

  public componentWillMount(): void {
    this.props.navigation.setParams({
      interlocutor: this.state.conversation.interlocutor,
      onBack: this.onBackPress,
      onProfile: this.onProfilePress,
    });
  }

  private onProfilePress = (profile: Profile): void => {
    this.props.navigation.navigate('Test Profile');
  };

  private onNewMessageChange = (newMessageText: string): void => {
    this.setState({ newMessageText });
  };

  private onMessageAddPress = (): void => {
    const profiles: Profile[] = [profile1, profile2];
    const newMessage: Message = {
      author: profiles[1],
      text: this.state.newMessageText,
      time: '15:01 PM',
    };
    const conversationCopy: Conversation = this.state.conversation;
    conversationCopy.messages.push(newMessage);
    this.setState({
      conversation: conversationCopy,
      newMessageText: '',
    });
  };

  private onBackPress = (): void => {
    this.props.navigation.goBack(null);
  };

  public render(): React.ReactNode {
    return (
      <Chat
        conversation={this.state.conversation}
        newMessage={this.state.newMessageText}
        onNewMessageChange={this.onNewMessageChange}
        onMessageAdd={this.onMessageAddPress}
      />
    );
  }
}
