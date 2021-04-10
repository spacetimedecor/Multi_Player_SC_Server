import WebSocket, { Server } from 'ws';
import User from './users/user';
import { addUser, current, userReturned, userExists } from './users';
import * as http from 'http';
import { URL, URLSearchParams } from 'url';
import { newUserJoined } from './events';

const websocket: Server = new Server({ port: 8081 });

export const setup = (): void => {
  websocket.on('connection', onConnection);
};

const onConnection = (ws: WebSocket, req: http.IncomingMessage) => {
  const params = new URLSearchParams(req.url);
  const id: string = params.get('/?id');
  const existingUser: User | null = userExists(id);
  if (existingUser) {
    userReturned(id, ws);
  } else {
    addUser({ socket: ws, id });
  }
  newUserJoined(id);
  console.log(current);
};
