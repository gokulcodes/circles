import { User } from "./types";

export function getRelativeTime(date: string | undefined) {
  if (!date) {
    return "";
  }
  const diff = Math.round(
    (new Date(parseInt(date)).getTime() - Date.now()) / 1000 / 3600
  );
  const relativeTime = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  }).format(diff, "minutes");
  return relativeTime;
}

export function getFormatedTime(date: string) {
  const tempate = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  });
  return tempate.format(new Date(parseInt(date)));
}

export function getChatMessageTimeFormat(date: string) {
  const template = new Intl.DateTimeFormat("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  return template.format(new Date(parseInt(date)));
}

export function scheduleUserStatusUpdate(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  updateUserStatus: Function
) {
  const ONE_MINUTE = 1000 * 60;
  let timerId: ReturnType<typeof setInterval> | null = null;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return (): { cancelInterval: Function; schedule: Function } => {
    return {
      cancelInterval: () => {
        if (timerId) {
          clearInterval(timerId);
        }
      },
      schedule: (lastActivityTime: number) => {
        if (timerId) {
          clearInterval(timerId);
        }
        timerId = setInterval(async () => {
          const timeDiff = (Date.now() - lastActivityTime) / 60000; // diff in minutes
          const isActive = timeDiff <= 3;

          await updateUserStatus({
            variables: {
              isOnline: isActive, // if last activity is less than 3mins, make online to true
              lastSeen: isActive
                ? Date.now().toString()
                : lastActivityTime.toString(),
            },
          });
        }, 2 * ONE_MINUTE);
      },
    };
  };
}

export function debounce<T extends (...args: unknown[]) => void>(func: T) {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, 5000);
  };
}

export function getCharCode(username: string) {
  return username[0].charCodeAt(0) * 10;
}

export function getOtherUsersFromRoom(
  members: Array<{ user: User; isTyping: boolean }>,
  myEmail: string | undefined
) {
  if (!myEmail || !members || !members.length) {
    return null;
  }

  const otherUsers = members.filter(({ user }) => user.email !== myEmail);
  if (otherUsers.length) {
    return otherUsers.at(0); // for now we support only 1:1 chats, so there can be atmost 1 user other than me
  }
  return null;
}
