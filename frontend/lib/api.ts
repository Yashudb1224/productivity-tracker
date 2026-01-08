import { User } from "@/types/user";
import { DailyEntry } from "@/types/entry";

const API_URL = "http://localhost:3001/api";

export const api = {
    getUsers: async (): Promise<User[]> => {
        try {
            const res = await fetch(`${API_URL}/users`);
            return res.ok ? res.json() : [];
        } catch (e) {
            console.error("API Error", e);
            return [];
        }
    },

    register: async (name: string, id: string, password: string): Promise<User> => {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, id, password }),
        });
        if (!res.ok) throw new Error("Registration failed");
        return res.json();
    },

    login: async (name: string, password: string): Promise<User> => {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
        });
        if (!res.ok) throw new Error("Login failed");
        return res.json();
    },

    getEntries: async (userId: string): Promise<DailyEntry[]> => {
        try {
            const res = await fetch(`${API_URL}/entries?userId=${userId}`);
            return res.ok ? res.json() : [];
        } catch (e) {
            return [];
        }
    },

    addEntry: async (entry: DailyEntry) => {
        await fetch(`${API_URL}/entries`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        });
    },

    clearData: async (userId: string) => {
        await fetch(`${API_URL}/clear`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId })
        });
    },

    deleteAccount: async (userId: string) => {
        await fetch(`${API_URL}/account`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId })
        });
    }
};
