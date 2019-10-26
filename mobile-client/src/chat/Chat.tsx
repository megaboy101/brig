import React from 'react'
import { Socket } from 'phoenix'
import { StyleSheet, Text, View } from 'react-native'
import { useChat, Message } from './useChat'

const url = 'http://76528b72.ngrok.io/socket'
const socket = new Socket(url, {})

export const Chat = () => {
  const [ messages, setMessages ] = React.useState([] as Message[])

  const handleMessage = (msg: any) => {
    setMessages([ ...messages, msg ])
  }

  const [ sendMessage ] = useChat(socket, 'echo', handleMessage)

  return (
    <Text>Chat</Text>
  )
}