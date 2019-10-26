import { Profile } from '../../profiles/Profile.model';

export interface Message {
  author: Profile;
  text: string;
  time: string;
}