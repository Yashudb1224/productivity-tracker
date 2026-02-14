import { Habit } from "@/types/habit";

export const habitPresets: Partial<Habit>[] = [
    {
        name: "Morning Yoga",
        type: "boolean",
        icon: "yoga",
        color: "from-purple-500 to-pink-500"
    },
    {
        name: "Heavy Gym Session",
        type: "boolean",
        icon: "gym",
        color: "from-orange-500 to-red-600"
    },
    {
        name: "Morning Run",
        type: "numeric",
        unit: "KM",
        icon: "running",
        color: "from-emerald-400 to-teal-600"
    },
    {
        name: "Deep Reading",
        type: "numeric",
        unit: "Pages",
        icon: "reading",
        color: "from-amber-400 to-orange-500"
    },
    {
        name: "Code Masterclass",
        type: "numeric",
        unit: "Hours",
        icon: "coding",
        color: "from-sky-400 to-blue-700"
    },
    {
        name: "Mindful Meditation",
        type: "numeric",
        unit: "Mins",
        icon: "meditation",
        color: "from-teal-300 to-cyan-600"
    },
    {
        name: "Hydration Protocol",
        type: "numeric",
        unit: "Liters",
        icon: "water",
        color: "from-blue-400 to-indigo-600"
    },
    {
        name: "Sleep Optimization",
        type: "numeric",
        unit: "Score",
        icon: "sleep",
        color: "from-indigo-600 to-violet-800"
    },
    {
        name: "Journaling Session",
        type: "boolean",
        icon: "writing",
        color: "from-violet-400 to-fuchsia-600"
    },
    {
        name: "Music Practice",
        type: "numeric",
        unit: "Mins",
        icon: "music",
        color: "from-rose-400 to-pink-600"
    },
    {
        name: "No Junk Logic",
        type: "boolean",
        icon: "junk",
        color: "from-slate-500 to-slate-700"
    }
];
