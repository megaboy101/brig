import React from 'react'
import { Socket } from 'phoenix'

export interface Message {
  isSelf: boolean
  text: string
}

export function useChat(socket: Socket, channel: string, handleMessage: (msg: any) => void) {
  // Chat config constants
  const user = 'AnonymousCoward'
  const body = 'I got something to say.'
  const timeout = 10000

  // Create a socket for connections
  socket.onOpen(() => console.log('Connected.'))
  socket.onError(() => console.log('Cannot connect.'))
  socket.onClose(() => console.log('Goodbye.'))
  socket.connect({})

  const chan = socket.channel(channel, { user })

  // join the channel and listen
  chan.join()
    .receive('ignore', () => console.log('Access denied.'))
    .receive('ok', () => console.log('Access granted.'))
    .receive('timeout', () => console.log('Must be MongoDB.'))

  // channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'))
  chan.onClose(event => console.log('Channel closed.'))

  chan.on(channel, handleMessage)

  const sendMessage = (content: string) => {
    chan.push(channel, { data: content }, timeout)
      .receive('ok', (msg) => console.log(msg))
      .receive('error', (reasons) => console.log('flop', reasons))
      .receive('timeout', () => console.log('slow much?'))
  }

  return [
    sendMessage
  ]
}