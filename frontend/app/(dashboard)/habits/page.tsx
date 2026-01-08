"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import GlassCard from "@/components/ui/GlassCard";
import Input from "@/components/ui/Input";
import NeonButton from "@/components/ui/NeonButton";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Habit } from "@/types/habit";
import { nanoid } from "nanoid";

export default function HabitsPage() {
    const { user, addHabit, removeHabit, updateHabit } = useAppStore();
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [type, setType] = useState<"numeric" | "boolean">("numeric");
    const [editingId, setEditingId] = useState<string | null>(null);

    const colors = [
        "from-neon-purple to-neon-pink",
        "from-neon-blue to-neon-cyan",
        "from-neon-green to-emerald-400",
        "from-orange-400 to-red-500",
        "from-pink-500 to-rose-400",
        "from-yellow-400 to-orange-500",
        "from-indigo-500 to-purple-600",
        "from-gray-400 to-gray-600",
        "from-teal-400 to-cyan-500",
        "from-fuchsia-500 to-pink-600"
    ];
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const commonUnits = ["Hours", "KM", "Pages", "Count"];

    const handleSave = () => {
        if (!name.trim()) return;

        // If editing, use existing ID. If new, generate ID.
        // For new, simplify name to slug.
        const id = editingId || name.toLowerCase().replace(/\s+/g, '-');

        const habitData: Habit = {
            id,
            name,
            type,
            unit: type === "numeric" ? unit : undefined,
            color: selectedColor
        };

        if (editingId) {
            updateHabit(habitData);
            setEditingId(null);
        } else {
            // Check if ID exists? store doesn't throw but we might want to avoid dupes visually?
            // Assuming good faith usage for now.
            addHabit(habitData);
        }

        // Reset form
        setName("");
        setUnit("");
        setType("numeric");
        setSelectedColor(colors[0]);
    };

    const handleEdit = (habit: Habit) => {
        setEditingId(habit.id);
        setName(habit.name);
        setType(habit.type);
        setUnit(habit.unit || "");
        setSelectedColor(habit.color);
        // Scroll to top?
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setName("");
        setUnit("");
        setType("numeric");
        setSelectedColor(colors[0]);
    };

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Manage Protocols</h1>
                    <p className="text-gray-400">Define the metrics for your mission.</p>
                </div>

                {/* Editor Form */}
                <GlassCard className="p-6 transition-all duration-300 ring-1 ring-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-xl font-bold ${editingId ? "text-neon-purple" : "text-neon-cyan"}`}>
                            {editingId ? "Edit Protocol" : "Initialize New Protocol"}
                        </h2>
                        {editingId && (
                            <button onClick={handleCancel} className="text-xs text-gray-500 hover:text-white uppercase tracking-wider">
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Protocol Name"
                            placeholder="e.g. Deep Work"
                            value={name} onChange={e => setName(e.target.value)}
                        // Disable name editing to prevent ID changes, or warn? 
                        // User asked to edit. If we allow name edit, ID changes? 
                        // My backend implementation uses ID. Changing name shouldn't change ID if we don't re-generate ID.
                        // BUT my handleSave uses `editingId || name...` logic.
                        // If editingId is set, ID stays constant. Name updates. Correct.
                        />

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Type</label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setType("numeric")}
                                    className={`flex-1 p-3 rounded-xl border transition-all ${type === "numeric" ? "border-neon-cyan bg-neon-cyan/20 text-white" : "border-white/10 text-gray-500 hover:border-white/30"}`}
                                >
                                    Numeric (Count)
                                </button>
                                <button
                                    onClick={() => setType("boolean")}
                                    className={`flex-1 p-3 rounded-xl border transition-all ${type === "boolean" ? "border-neon-purple bg-neon-purple/20 text-white" : "border-white/10 text-gray-500 hover:border-white/30"}`}
                                >
                                    Checkbox (Done)
                                </button>
                            </div>
                        </div>

                        {type === "numeric" && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unit</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {commonUnits.map(u => (
                                        <button
                                            key={u}
                                            onClick={() => setUnit(u)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${unit === u ? "bg-white text-black border-white" : "border-white/20 text-gray-400 hover:border-white/50"}`}
                                        >
                                            {u}
                                        </button>
                                    ))}
                                </div>
                                <Input
                                    placeholder="Or type custom unit..."
                                    value={unit}
                                    onChange={e => setUnit(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Accent Color</label>
                            <div className="flex flex-wrap gap-3">
                                {colors.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setSelectedColor(c)}
                                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${c} ${selectedColor === c ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        {editingId && (
                            <NeonButton variant="danger" onClick={handleCancel}>Cancel</NeonButton>
                        )}
                        <NeonButton onClick={handleSave} variant={editingId ? "purple" : "cyan"}>
                            {editingId ? "Update Protocol" : "Confirm Protocol"}
                        </NeonButton>
                    </div>
                </GlassCard>

                {/* Existing Habits List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user?.habits?.map(habit => (
                        <div key={habit.id} className="relative group">
                            <GlassCard
                                onClick={() => handleEdit(habit)}
                                className={`p-4 flex justify-between items-center cursor-pointer hover:border-white/30 transition-all ${editingId === habit.id ? "border-neon-purple bg-neon-purple/5" : ""}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${habit.color} flex items-center justify-center`}>
                                        <span className="text-xl font-bold text-black/50">{habit.name[0]}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{habit.name}</h3>
                                        <p className="text-xs text-gray-500 uppercase">{habit.type} {habit.unit ? `(${habit.unit})` : ''}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to Edit
                                </div>
                            </GlassCard>

                            {/* Delete Button outside clickable area or safely positioned */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm("Delete this protocol? Data will remain but validation rules disappear.")) {
                                        removeHabit(habit.id);
                                        if (editingId === habit.id) handleCancel();
                                    }
                                }}
                                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2 z-10"
                                title="Delete"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    {(!user?.habits || user.habits.length === 0) && (
                        <div className="col-span-2 p-8 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">
                            No active protocols. Initialize one above.
                        </div>
                    )}
                </div>

            </div>
        </DashboardShell>
    );
}
