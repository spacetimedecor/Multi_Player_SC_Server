import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';
import { onMessage } from '../../messageController';

export interface userOptions {
  socket: WebSocket;
  id: string | null;
}

export default class User {
  private _socket: WebSocket;
  id: string;

  constructor(options: userOptions) {
    this.socket = options.socket;
    this.id = options.id !== 'null' ? options.id : uuid();
    this.socket.on('message', onMessage);
  }

  set socket(newValue: WebSocket) {
    this._socket = newValue;
  }

  get socket(): WebSocket {
    return this._socket;
  }

  replaceSocket(newSocket: WebSocket): void {
    this.destroySocket();
    this.socket = newSocket;
    this.socket.on('message', onMessage);
  }

  destroySocket(): void {
    this.socket.close();
  }

  send = (message: string): void => {
    this.socket.send(message);
  };
}
