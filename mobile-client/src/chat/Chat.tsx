import React from 'react'
import { Socket } from 'phoenix'
import { useChat, Message } from './useChat'
import { Layout, Text, Button } from 'react-native-ui-kitten'

const url = 'http://76528b72.ngrok.io/socket'
const socket = new Socket(url, {})

export const Chat = () => {
  const [ messages, setMessages ] = React.useState([] as Message[])

  const handleMessage = (msg: any) => {
    setMessages([ ...messages, msg ])
  }

  const [ sendMessage ] = useChat(socket, 'echo', handleMessage)

  return (
    <Layout>
      <Text category='h4'>Welcome to UI Kitten</Text>
      <Button>BUTTON</Button>
    </Layout>
  )
}