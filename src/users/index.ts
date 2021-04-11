import User, { userOptions } from './user';
import { MESSAGES, newMessage } from '../messages';
import WebSocket from 'ws';

export const current = new Map<string, User>();

export const currentUsersList = (): string[] =>
  Array.from(current).map(([id]) => id);

export const addUser = (options: userOptions): void => {
  const thisUser = new User(options);
  thisUser.send(newMessage(MESSAGES.SERVER_GREETING, { id: thisUser.id }));
  current.set(thisUser.id, thisUser);
};

export const removeUser = (id: string): void => {
  current.get(id).destroySocket();
  current.delete(id);
};

export const userExists = (id: string): User | null => current.get(id) ?? null;

export const userReturned = (id: string, newSocket: WebSocket): void => {
  const thisUser: User = current.get(id);
  thisUser.replaceSocket(newSocket);
};
