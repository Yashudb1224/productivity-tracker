import { DailyEntry } from "@/types/entry";
import { Activity } from "@/types/habit";

export const dateStats = (entries: DailyEntry[], date: string) => {
  const targetEntries = entries.filter(e => e.date === date);

  return {
    completed: targetEntries.length,
    score: targetEntries.reduce((a, b) => a + b.value, 0),
  };
};

export const totalByActivity = (
  entries: DailyEntry[],
  activity: DailyEntry["activity"]
) =>
  entries
    .filter(e => e.activity === activity)
    .reduce((a, b) => a + b.value, 0);

export const noJunkDays = (entries: DailyEntry[], activityId: string = "nojunk") =>
  new Set(
    entries.filter(e => e.activity === activityId).map(e => e.date)
  ).size;

export const streakForActivity = (entries: DailyEntry[], activity: Activity) => {
  const days = new Set(
    entries.filter(e => e.activity === activity).map(e => e.date)
  );

  return calculateStreak(days);
};

export const globalStreak = (entries: DailyEntry[]) => {
  const days = new Set(entries.map(e => e.date));
  return calculateStreak(days);
};

// Helper: robust streak calc using Local Date
const calculateStreak = (activeDays: Set<string>) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let streak = 0;
  let currentCheck: Date;

  if (activeDays.has(todayStr)) {
    streak = 1;
    currentCheck = yesterday;
  } else if (activeDays.has(yesterdayStr)) {
    streak = 0;
    currentCheck = yesterday;
  } else {
    return 0;
  }

  while (true) {
    const checkStr = currentCheck.toISOString().split('T')[0];
    if (activeDays.has(checkStr)) {
      streak++;
      currentCheck.setDate(currentCheck.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};
