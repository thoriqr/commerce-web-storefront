import { useEffect, useState } from "react";

export function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(0, target.getTime() - Date.now());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, target.getTime() - Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const totalSeconds = Math.floor(timeLeft / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    isExpired: timeLeft <= 0,
    formatted: `${minutes}:${seconds.toString().padStart(2, "0")}`
  };
}
