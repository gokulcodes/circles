import { useMutation } from "@apollo/client";

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
  lastActivityTime: number,
  updateUserStatus: ReturnType<typeof useMutation>[0]
): Function {
  const ONE_MINUTE = 1000 * 60;
  let timerId: ReturnType<typeof setTimeout> | null = null,
    cnt = 0;

  return () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    console.log("timers", ++cnt);
    timerId = setInterval(async () => {
      const timeDiff = (Date.now() - lastActivityTime) / 60000; // diff in minutes
      const isActive = timeDiff <= 1;

      await updateUserStatus({
        variables: {
          isOnline: isActive, // if last activity is less than 1mins, make online to true
          lastSeen:
            timeDiff > 1 // five minutes
              ? lastActivityTime.toString()
              : Date.now().toString(),
        },
      });
    }, 2 * ONE_MINUTE);
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
    }, 2000);
  };
}
