import { setup as setupWebsocket } from './websocket';
import {
  setup as setupTriggers,
  shutdown as shutdownTriggers,
} from './triggers';

const setup = (): void => {
  setupWebsocket();
  setupTriggers();
};

setup();

const shutdown = (): void => {
  shutdownTriggers();
};
