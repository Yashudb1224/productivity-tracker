import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";
import { DailyEntry } from "@/types/entry";
import { Goal, Activity } from "@/types/habit";
import { streakForActivity } from "@/lib/calculations";
import { nanoid } from "nanoid";
import { api } from "@/lib/api";

interface AppState {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  checkSession: () => void;

  selectedDate: string;
  setSelectedDate: (date: string) => void;

  entries: DailyEntry[];
  fetchEntries: () => Promise<void>;
  addEntry: (activity: Activity, value: number, date?: string) => void;

  goals: Goal[];
  addGoal: (goal: Goal) => void;

  period: "monthly" | "yearly";
  setPeriod: (p: "monthly" | "yearly") => void;

  getStreak: (activity: Activity) => number;
  clearData: () => void;
  deleteAccount: () => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // -------- USER --------
      user: null,
      isLoading: true,
      selectedDate: new Date().toISOString().slice(0, 10),

      login: (user: User) => {
        set({ user });
        get().fetchEntries();
      },
      logout: () => {
        localStorage.removeItem("pd_current_user"); // Legacy cleanup if needed
        set({ user: null, entries: [], goals: [] });
      },
      checkSession: () => {
        set({ isLoading: false });
        // If user exists from persist, fetch data
        if (get().user) {
          get().fetchEntries();
        }
      },

      setSelectedDate: (date: string) => set({ selectedDate: date }),

      // -------- ENTRIES --------
      entries: [],
      fetchEntries: async () => {
        const u = get().user;
        if (!u) return;
        const entries = await api.getEntries(u.id);
        set({ entries });
      },
      addEntry: (activity: Activity, value: number, date?: string) => {
        const u = get().user;
        if (!u) return;

        const newEntry: DailyEntry = {
          id: nanoid(),
          userId: u.id,
          activity,
          value,
          date: date || new Date().toISOString().slice(0, 10),
        };
        // Optimistic
        set((state) => ({ entries: [...state.entries, newEntry] }));
        // API
        api.addEntry(newEntry).catch(err => console.error(err));
      },

      // -------- GOALS --------
      goals: [],
      addGoal: (goal: Goal) =>
        set((state) => ({ goals: [...state.goals, goal] })),

      // -------- PERIOD TOGGLE --------
      period: "monthly",
      setPeriod: (p: "monthly" | "yearly") => set({ period: p }),

      // -------- STREAKS --------
      getStreak: (activity: Activity) =>
        streakForActivity(get().entries, activity),

      // -------- MAINTENANCE --------
      clearData: () => {
        const u = get().user;
        set({ entries: [], goals: [] });
        if (u) api.clearData(u.id);
      },
      deleteAccount: async () => {
        const u = get().user;
        if (u) {
          await api.deleteAccount(u.id);
          get().logout();
        }
      }
    }),
    {
      name: "productivity-tracker-v2", // Bumped version to invalidate old cache
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        goals: state.goals,
      }),
    }
  )
);
