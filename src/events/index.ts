import { current, currentUsersList } from '../users';
import User from '../users/user';
import { MESSAGES, newMessage } from '../messages';

//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////// Who to tell mechanisms:
//////////////////////////////////////////////////////////////////

enum WhoAreWeTelling {
  EVERYONE,
  ONE,
  SOME,
}

export const tell = (
  whoAreWeTelling: WhoAreWeTelling,
  what: (user: User) => void,
  id?: string,
  whoPredicate?: (user: User) => boolean
): void => {
  switch (whoAreWeTelling) {
    case WhoAreWeTelling.SOME:
      some(what, whoPredicate);
      break;
    case WhoAreWeTelling.EVERYONE:
      everyone(what);
      break;
    case WhoAreWeTelling.ONE:
      one(what, id);
      break;
  }
};

const some = (
  what: (user: User) => void,
  whoPredicate: (user: User) => boolean
): void => {
  current.forEach((user: User) => {
    if (whoPredicate(user)) {
      what(user);
    }
  });
};

const one = (what: (user: User) => void, id: string): void => {
  const thisUser: User | null = current.get(id);
  if (thisUser) {
    what(thisUser);
  }
};

const everyone = (what: (user: User) => void): void => {
  current.forEach(what);
};

//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////// EVENTS:
//////////////////////////////////////////////////////////////////

export const newUserJoined = (id: string): void => {
  tell(WhoAreWeTelling.EVERYONE, (user: User) =>
    user.send(newMessage(MESSAGES.NEW_USER_JOINED, { id }))
  );
};

export const statusUpdate = (): void => {
  tell(WhoAreWeTelling.EVERYONE, (user: User) =>
    user.send(
      newMessage(MESSAGES.SERVER_STATUS, {
        toClientID: user.id,
        currentUsers: currentUsersList(),
      })
    )
  );
};
