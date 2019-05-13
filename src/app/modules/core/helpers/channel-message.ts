import { Token } from '../models/token/token';

export class ChannelMessage {
  command: 'login' | 'logout' | 'getStorage' | 'shareStorage';
  token: Token;
}
