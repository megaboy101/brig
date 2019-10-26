import { Socket } from 'phoenix';
import { Message } from '@/models/message'


export function connectChat(socket: Socket, topic: string, handleMessage: (msg: Message) => void) {
  // Chat config constants
  const user = 'professional'
  const timeout = 10000

  // Create a socket for connections
  socket.onOpen(() => console.log('Connected.'))
  socket.onError(() => console.log('Cannot connect.'))
  socket.onClose(() => console.log('Goodbye.'))
  socket.connect({})

  const chan = socket.channel(topic, { user })

  // join the channel and listen
  chan.join()
    .receive('ignore', () => console.log('Access denied.'))
    .receive('ok', () => console.log('Access granted.'))
    .receive('timeout', () => console.log('Must be MongoDB.'))

  // channel-level event handlers
  chan.onError((event: any) => console.log('Channel blew up.'))
  chan.onClose((event: any) => console.log('Channel closed.'))

  chan.on('message', handleMessage)

  const sendMessage = (content: string) => {
    chan.push('message', { user: user, content: content }, timeout)
      .receive('ok', (msg: any) => console.log(msg))
      .receive('error', (reasons: any) => console.log('flop', reasons))
      .receive('timeout', () => console.log('slow much?'))
  }

  return [
    sendMessage
  ]
}
