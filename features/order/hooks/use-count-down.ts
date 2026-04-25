import { useEffect, useMemo, useState } from "react";

export function useCountdown(target: string) {
  const targetTime = useMemo(() => {
    return new Date(target).getTime();
  }, [target]);

  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, targetTime - Date.now()));

  // Reset remaining time when the target changes
  useEffect(() => {
    setTimeLeft(Math.max(0, targetTime - Date.now()));
  }, [targetTime]);

  // Update remaining time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, targetTime - Date.now()));
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalSeconds = Math.floor(timeLeft / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatted =
    hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      : `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return {
    isExpired: timeLeft <= 0,
    formatted
  };
}
