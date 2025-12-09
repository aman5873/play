import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function parseUtcDate(str: string | null | undefined): Date | null {
  if (!str) return null;

  // If ISO → trust it
  if (str.includes("T")) {
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  }

  // If MySQL "YYYY-MM-DD HH:mm:ss" → convert to UTC
  const iso = str.replace(" ", "T") + "Z";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

export function TimeAgoText({ date, contClass = "opacity-50" }) {
  const timeAgo = useTimeAgo(date);
  return <span className={`text-xs ${contClass}`}>{timeAgo}</span>;
}

export function useTimeAgo(dateString) {
  const [timeAgo, setTimeAgo] = useState("");
  const { t: tCommon } = useTranslation("common");

  function formatTime(str) {
    const date = parseUtcDate(str); // 🟢 external util
    if (!date) return "";

    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 10) return tCommon("time.justNow");
    if (seconds < 60) return tCommon("time.secondsAgo", { count: seconds });
    if (minutes < 60) return tCommon("time.minutesAgo", { count: minutes });
    if (hours < 24) return tCommon("time.hoursAgo", { count: hours });
    if (days === 1) return tCommon("time.yesterday");
    if (days < 7) return tCommon("time.daysAgo", { count: days });
    if (weeks < 4) return tCommon("time.weeksAgo", { count: weeks });
    if (months < 12) return tCommon("time.monthsAgo", { count: months });

    return tCommon("time.yearsAgo", { count: years });
  }

  useEffect(() => {
    if (!dateString) {
      setTimeAgo("");
      return;
    }

    const update = () => setTimeAgo(formatTime(dateString));
    update();

    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [dateString, tCommon]);

  return timeAgo;
}
