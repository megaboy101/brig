import React from 'react'
import { Socket } from 'phoenix'
import { StyleSheet, View } from 'react-native'
import { useChat, Message } from './useChat'
import {
  Layout,
  Text,
  Button,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten'
import { SERVER_DOMAIN } from '../../App'

const url = `http://${SERVER_DOMAIN}/socket`
const socket = new Socket(url, {})

const BackIcon = (style) => (
  <Icon {...style} name="arrow-back-outline" />
)

const BackAction = () => (
  <TopNavigationAction icon={BackIcon} />
);

export const Chat = () => {
  const [ messages, setMessages ] = React.useState([] as Message[])

  const handleMessage = (msg: any) => {
    setMessages([ ...messages, msg ])
  }

  const [ sendMessage ] = useChat(socket, 'echo', handleMessage)

  return (
    <Layout>
      <TopNavigation
        style={styles.topNavigation}
        title='Person Name'
        subtitle='Last online time...'
        leftControl={BackAction()}
        alignment='center'
      />
      <Text category='h4'>Welcome to UI Kitten</Text>
      <Button>BUTTON</Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  topNavigation: { borderBottomColor: '#EDF1F7', borderBottomWidth: 1 },
});