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
  // Get local YYYY-MM-DD for today and yesterday
  // Trick: use a Date object, shift it, then slice toISOString?
  // NO! toISOString is UTC. Use toLocaleDateString("en-CA") for local ISO-like format.
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-CA");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString("en-CA");

  let streak = 0;

  // 1. Determine start point
  let currentCheck: Date;

  if (activeDays.has(todayStr)) {
    streak = 1;
    currentCheck = yesterday; // Start checking backward from yesterday
  } else if (activeDays.has(yesterdayStr)) {
    streak = 0; // Don't count "today" yet, but streak is alive from yesterday
    currentCheck = yesterday;
  } else {
    return 0; // Streak broken
  }

  // 2. Walk backwards
  while (true) {
    const checkStr = currentCheck.toLocaleDateString("en-CA");
    if (activeDays.has(checkStr)) {
      streak++;
      currentCheck.setDate(currentCheck.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};
