import { Message as MessageModel } from './Message.model';
import { Alignments } from '../components';

interface UiMessage {
  alignment: Alignments;
}

export type UiMessageModel = UiMessage & MessageModel;