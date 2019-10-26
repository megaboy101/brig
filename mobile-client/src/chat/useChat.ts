import React from 'react'
import { Socket } from 'phoenix'

export interface Message {
  isSelf: boolean
  text: string
}

export function useChat(socket: Socket, topic: string, handleMessage: (msg: any) => void) {
  // Chat config constants
  const user = 'AnonymousCoward'
  const body = 'I got something to say.'
  const timeout = 10000

  // Create a socket for connections
  socket.onOpen(() => console.warn('Connected.'))
  socket.onError(() => console.warn('Cannot connect.'))
  socket.onClose(() => console.warn('Goodbye.'))
  socket.connect({})

  const chan = socket.channel(topic, { user })

  // join the channel and listen
  chan.join()
    .receive('ignore', () => console.warn('Access denied.'))
    .receive('ok', () => console.warn('Access granted.'))
    .receive('timeout', () => console.warn('Must be MongoDB.'))

  // channel-level event handlers
  chan.onError(event => console.warn('Channel blew up.'))
  chan.onClose(event => console.warn('Channel closed.'))

  chan.on('message', (msg) => {
    console.warn('Recieved message')
  })

  const sendMessage = (content: string) => {
    chan.push('message', { user: 'Anonymouse', content: content }, timeout)
      .receive('ok', (msg) => console.warn(msg))
      .receive('error', (reasons) => console.warn('flop', reasons))
      .receive('timeout', () => console.warn('slow much?'))
  }

  return [
    sendMessage
  ]
}
