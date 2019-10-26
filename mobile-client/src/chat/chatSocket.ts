import { Channel, Socket } from 'phoenix'
import { SocketMessage } from './models/Message.model'

const wsUrl = 'ws://06755f46.ngrok.io/socket'
const user = 'Anon'
const timeout = 10000

export class ChatSocket {
  readonly socket: Socket
  readonly channel: Channel

  readonly handleMessage: (msg: SocketMessage) => void

  constructor(handleMessage: (msg: SocketMessage) => void) {
    this.handleMessage = handleMessage

    this.socket = new Socket(wsUrl, {})

    this.socket.onOpen(() => console.warn('Connected.'))
    this.socket.onError(() => console.warn('Cannot connect.'))
    this.socket.onClose(() => console.warn('Goodbye.'))
    this.socket.connect({})

    this.channel = this.socket.channel('chat:professional', { user })

    this.channel.join()
      .receive('ignore', () => console.warn('Access denied.'))
      .receive('ok', () => console.warn('Access granted.'))
      .receive('timeout', () => console.warn('Must be MongoDB.'))

    this.channel.onError(event => console.warn('Channel blew up.'))
    this.channel.onClose(event => console.warn('Channel closed.'))

    this.channel.on('message', (msg: any) => {
      console.warn('Recieved message')
      console.warn(msg)
      this.handleMessage(msg)
    })
  }

  sendMessage(content: string) {
    this.channel.push('message', { user, content }, timeout)
  }
}
