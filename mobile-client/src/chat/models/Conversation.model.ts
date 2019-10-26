import { Message } from './message.model';
import { Profile } from '../../profiles/Profile.model';

export interface Conversation {
  interlocutor: Profile
  messages: Message[]
}