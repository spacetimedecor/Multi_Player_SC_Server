import {
  ClientGreetingPayload,
  ClientStatusPayload,
  message,
  MESSAGES,
} from './messages';
import { newUserJoined } from './events';

export const onMessage = (aMessage: string): void => {
  const interpretMessage: message = JSON.parse(aMessage);
  switch (interpretMessage.type) {
    case MESSAGES.CLIENT_GREETING:
      onClientGreeting(interpretMessage.payload as ClientGreetingPayload);
      break;
    case MESSAGES.CLIENT_STATUS:
      onClientStatus(interpretMessage.payload as ClientStatusPayload);
      break;
    default:
      onUnknownMessage();
      break;
  }
};

export const onClientGreeting = (payload: ClientGreetingPayload): void => {
  console.log(MESSAGES.CLIENT_GREETING, payload.id);
  newUserJoined(payload.id);
};

export const onClientStatus = (payload: ClientStatusPayload): void => {
  console.log(MESSAGES.CLIENT_STATUS, payload.id);
};

export const onUnknownMessage = (): void => {
  console.log('Received unknown message');
};
