import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  View,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  Icon,
} from 'react-native-ui-kitten';
import {
  Button,
  ButtonProps,
  Input,
  List,
} from 'react-native-ui-kitten';
import {
  Alignments,
  ChatMessage,
  ChatMessageProps,
} from '../components'
import { Conversation as ConversationModel } from '../models/Conversation.model'
import { Message as MessageModel } from '../models/Message.model'
import {
  profile1
} from '../../profiles/Profile1';
import { UiMessageModel } from '../models/uiMessage.model';
import {
  AvoidKeyboard,
  textStyle,
} from '../components';
import { StringValidator } from '../utils';

interface ComponentProps {
  conversation: ConversationModel;
  newMessage: string;
  onNewMessageChange: (text: string) => void;
  onMessageAdd: () => void;
}

export type ChatComponentProps = ThemedComponentProps & ComponentProps;

class ChatComponent extends React.Component<ChatComponentProps> {

  private listRef: React.RefObject<FlatList<any>> = React.createRef();

  private onListContentSizeChange = (): void => {
    setTimeout(() => this.listRef.current.scrollToEnd({ animated: true }), 0);
  };

  private onNewMessageChange = (text: string): void => {
    this.props.onNewMessageChange(text);
  };

  private onMessageAdd = (): void => {
    this.props.onMessageAdd();
  };

  private createUiMessages = (): UiMessageModel[] => {
    const { conversation } = this.props;

    return conversation.messages.map((message: MessageModel) => {
      if (message.author.name !== 'client') {
        return {
          ...message,
          alignment: Alignments['ROW-LEFT'],
        };
      } else {
        return {
          ...message,
          alignment: Alignments['ROW-RIGHT'],
        };
      }
    });
  };

  private renderMessage = (info: ListRenderItemInfo<UiMessageModel>): React.ReactElement<ChatMessageProps> => {
    const { themedStyle } = this.props;

    return (
      <ChatMessage
        style={themedStyle.message}
        index={info.index}
        message={info.item}
        alignment={info.item.alignment}
      />
    );
  };

  private keyboardOffset = (height: number) => {
    return Platform.select({
      ios: height,
      android: height + 35,
    });
  };

  public render(): React.ReactNode {
    const { themedStyle, newMessage } = this.props;

    return (
      <AvoidKeyboard
        style={themedStyle.container}
        autoDismiss={false}
        offset={this.keyboardOffset}>
        <List
          ref={this.listRef}
          contentContainerStyle={themedStyle.chatContainer}
          data={this.createUiMessages()}
          onContentSizeChange={this.onListContentSizeChange}
          renderItem={this.renderMessage}
        />
        <View style={themedStyle.inputContainer}>
          <Input
            style={themedStyle.messageInput}
            textStyle={textStyle.paragraph}
            value={newMessage}
            placeholder='Message...'
            onChangeText={this.onNewMessageChange}
            onSubmitEditing={this.onMessageAdd}
          />
          {}
        </View>
      </AvoidKeyboard>
    );
  }
}

export const Chat = withStyles(ChatComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  chatContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  message: {
    marginVertical: 12,
  },
  inputContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme['background-basic-color-1'],
  },
  addMessageButton: {
    width: 26,
    height: 26,
    borderRadius: 26,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
}));

