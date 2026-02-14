import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";
import { DailyEntry } from "@/types/entry";
import { Goal, Activity, Habit } from "@/types/habit";
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

  addHabit: (habit: Habit) => Promise<void>;
  removeHabit: (habitId: string) => Promise<void>;
  updateHabit: (habit: Habit) => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // -------- USER --------
      user: null,
      isLoading: true,
      selectedDate: new Date().toISOString().split('T')[0],

      login: (user: User) => {
        set({ user, isLoading: false });
        get().fetchEntries();
      },
      logout: () => {
        localStorage.removeItem("pd_current_user"); // Legacy cleanup if needed
        set({ user: null, entries: [], goals: [] });
      },
      checkSession: async () => {
        const u = get().user;
        if (u) {
          try {
            const freshUser = await api.getMe(u.id);
            set({ user: freshUser });
          } catch (e) {
            console.error("Session refresh failed", e);
          }
          get().fetchEntries();
        }
        set({ isLoading: false });
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
          date: date || new Date().toLocaleDateString("en-CA"),
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
      },

      addHabit: async (habit: Habit) => {
        const u = get().user;
        if (!u) return;

        // Optimistic update
        const updatedHabits = [...(u.habits || []), habit];
        set({ user: { ...u, habits: updatedHabits } });

        try {
          await api.addHabit(u.id, habit);
        } catch (e) {
          console.error("Failed to add habit", e);
          // Revert? For now assume success or reload.
        }
      },

      removeHabit: async (habitId: string) => {
        const u = get().user;
        if (!u) return;

        const updatedHabits = (u.habits || []).filter(h => h.id !== habitId);
        set({ user: { ...u, habits: updatedHabits } });

        try {
          await api.removeHabit(u.id, habitId);
        } catch (e) {
          console.error("Failed to remove habit", e);
        }
      },

      updateHabit: async (habit: Habit) => {
        const u = get().user;
        if (!u) return;

        const updatedHabits = (u.habits || []).map(h => h.id === habit.id ? habit : h);
        set({ user: { ...u, habits: updatedHabits } });

        try {
          await api.updateHabit(u.id, habit);
        } catch (e) {
          console.error("Failed to update habit", e);
        }
      }
    }),
    {
      name: "productivity-tracker-v2",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        goals: state.goals,
      }),
    }
  )
);
