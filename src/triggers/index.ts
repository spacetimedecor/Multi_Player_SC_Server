import { statusUpdate } from '../events';

const timeouts = new Map<string, NodeJS.Timeout>();

export const setup = (): void => {
  timeouts.set('statusUpdates', setInterval(statusUpdate, 2000));
};

export const shutdown = (): void => {
  timeouts.forEach(clearInterval);
};
