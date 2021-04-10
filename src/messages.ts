import User from './users/user';

export type messagePayloadTypes =
  | ServerGreetingPayload
  | ClientGreetingPayload
  | ServerStatusPayload
  | ClientStatusPayload
  | NewUserJoinedPayload;

export type message = {
  type: MESSAGES;
  payload: messagePayloadTypes;
};

export enum MESSAGES {
  SERVER_STATUS = 'Just checking in with SERVER status :)',
  CLIENT_STATUS = 'Just checking in with CLIENT status :)',
  SERVER_GREETING = 'Hello from server!',
  CLIENT_GREETING = 'Hello from client!',
  NEW_USER_JOINED = 'A new user joined, :D OMFG!',
}

export type NewUserJoinedPayload = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ServerStatusPayload = {
  toClientID: string;
  currentUsers: Map<string, User>;
};

export type ClientStatusPayload = { id: string };

export type ServerGreetingPayload = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ClientGreetingPayload = { id: string | null };

function mapReplacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

export function newMessage(
  type: MESSAGES,
  payload: messagePayloadTypes
): string {
  let typedPayload;
  switch (type) {
    case MESSAGES.NEW_USER_JOINED:
      typedPayload = payload as NewUserJoinedPayload;
      return JSON.stringify({
        type: MESSAGES.NEW_USER_JOINED,
        payload: typedPayload,
      } as message);
    case MESSAGES.SERVER_STATUS:
      typedPayload = payload as ServerStatusPayload;
      return JSON.stringify(
        {
          type: MESSAGES.SERVER_STATUS,
          payload: typedPayload,
        } as message,
        mapReplacer
      );
    case MESSAGES.SERVER_GREETING:
      typedPayload = payload as ServerGreetingPayload;
      return JSON.stringify({
        type: MESSAGES.SERVER_GREETING,
        payload: typedPayload,
      } as message);
    default:
      return '';
  }
}
