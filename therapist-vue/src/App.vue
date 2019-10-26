<template>
  <div id="app">
    <div>
      <ul>
        <li v-for="message in messageHistory">
          {{ message.user }}: <b>{{ message.content }}</b>
        </li>
      </ul>
    </div>
    <label>
      Message:
      <input v-on:keyup.enter="send()" v-model="currentMessage">
    </label>
    <button type="button" v-on:click="send()">Send</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import { Message } from "@/models/message";
import { connectChat } from "@/connectChat";
import { Socket } from 'phoenix';

const url = 'ws://localhost:4000/socket'
const socket = new Socket(url, {})

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  currentMessage = ''
  messageHistory: Message[] = []
  readonly sendMessage: (content: string) => void

  constructor() {
    super()

    this.sendMessage = connectChat(socket, 'chat:something', this.handleMessage)[0]
  }

  handleMessage(msg: Message) {
    this.messageHistory.push(msg)
  }

  send() {
    this.sendMessage(this.currentMessage)
    this.currentMessage = ''
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

li {
  list-style: none;
}
</style>
