import { Message as MessageModel } from './models/Message.model'
import { Alignments } from './components'

interface UiMessage {
  alignment: Alignments;
}

export type UiMessageModel = UiMessage & MessageModel;

export const StringValidator = (value: string): boolean => {
  return !!value && value.length > 0;
};