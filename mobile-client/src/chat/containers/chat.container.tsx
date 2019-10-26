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
  Message, SocketMessage
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
import { Socket } from 'phoenix'

interface State {
  newMessageText: string;
  conversation: Conversation;
}

const mockConversation: Conversation = {
  interlocutor: profile1,
  messages: [],
};

export class ChatContainer extends React.Component<NavigationStackScreenProps, State> {
  sendMessage: (content: string) => void

  componentDidMount(): void {
    const url = 'ws://06755f46.ngrok.io/socket'
    const socket = new Socket(url, {})
    const user = 'anon'

    socket.onOpen(() => console.warn('Connected.'))
    socket.onError(() => console.warn('Cannot connect.'))
    socket.onClose(() => console.warn('Goodbye.'))
    socket.connect({})

    const chan = socket.channel('chat:something', { user })

    // join the channel and listen
    chan.join()
      .receive('ignore', () => console.warn('Access denied.'))
      .receive('ok', () => console.warn('Access granted.'))
      .receive('timeout', () => console.warn('Must be MongoDB.'))

    // channel-level event handlers
    chan.onError(event => console.warn('Channel blew up.'))
    chan.onClose(event => console.warn('Channel closed.'))

    chan.on('message', (msg: SocketMessage) => {
      const now = new Date()
      const dateString = `${now.getHours()}:${now.getMinutes()}`

      const newMessage: Message = {
        author: {...profile2, name: msg.user },
        text: msg.content,
        time: dateString
      }

      const conversationCopy: Conversation = this.state.conversation

      conversationCopy.messages.push(newMessage)

      this.setState({
        conversation: conversationCopy
      })
    })

    this.sendMessage = (content: string) => {
      chan.push('message', { user: 'client', content: content }, 10000)
        .receive('ok', (msg) => console.warn(msg))
        .receive('error', (reasons) => console.warn('flop', reasons))
        .receive('timeout', () => console.warn('slow much?'))
    }
  }

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
    this.sendMessage(this.state.newMessageText)
    this.setState({
      newMessageText: ''
    })
  };

  private handleMessage(msg: SocketMessage) {
    const newMessage: Message = {
      author: {...profile1, name: msg.user },
      text: msg.content,
      time: '15:01 PM'
    }

    const conversationCopy: Conversation = this.state.conversation

    conversationCopy.messages.push(newMessage)

    this.setState({
      conversation: conversationCopy
    })
  }

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
