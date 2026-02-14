"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import GlassCard from "@/components/ui/GlassCard";
import Input from "@/components/ui/Input";
import NeonButton from "@/components/ui/NeonButton";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Habit } from "@/types/habit";
import { nanoid } from "nanoid";

import { habitIcons, getHabitIcon } from "@/lib/habitIcons";
import { habitPresets } from "@/lib/habitPresets";

export default function HabitsPage() {
    const { user, addHabit, removeHabit, updateHabit } = useAppStore();
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [type, setType] = useState<"numeric" | "boolean">("numeric");
    const [selectedIcon, setSelectedIcon] = useState<string>("default");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [confirmingPreset, setConfirmingPreset] = useState<Habit | null>(null);

    const formRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const colors = [
        "from-neon-blue to-neon-cyan",
        "from-neon-purple to-neon-pink",
        "from-neon-green to-emerald-400",
        "from-orange-400 to-red-500",
        "from-pink-500 to-rose-400",
        "from-yellow-400 to-orange-500",
        "from-indigo-500 to-purple-600",
        "from-teal-400 to-cyan-500"
    ];
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const handleSave = () => {
        if (!name.trim()) return;
        const id = editingId || name.toLowerCase().replace(/\s+/g, '-');

        const habitData: Habit = {
            id,
            name,
            type,
            unit: type === "numeric" ? unit : undefined,
            color: selectedColor,
            icon: selectedIcon
        };

        console.log("[HabitsPage] Saving Habit Data:", habitData);

        if (editingId) {
            updateHabit(habitData);
            setEditingId(null);
        } else {
            addHabit(habitData);
            // Scroll to list after adding
            setTimeout(() => {
                listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        handleCancel();
    };

    const handleEdit = (habit: Habit) => {
        setEditingId(habit.id);
        setConfirmingPreset(null);
        setName(habit.name);
        setType(habit.type);
        setUnit(habit.unit || "");
        setSelectedColor(habit.color);
        setSelectedIcon(habit.icon || "default");
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setConfirmingPreset(null);
        setName("");
        setUnit("");
        setType("numeric");
        setSelectedColor(colors[0]);
        setSelectedIcon("default");
    };

    const initiationFromPreset = (preset: Partial<Habit>) => {
        setConfirmingPreset({
            id: nanoid(),
            name: preset.name || "",
            type: preset.type || "numeric",
            unit: preset.unit || "",
            color: preset.color || colors[0],
            icon: preset.icon || "default"
        });
        setEditingId(null);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    return (
        <DashboardShell>
            <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
                <div className="flex flex-col gap-10">
                    <div>
                        <h1 className="text-5xl font-black text-white tracking-tighter mb-4 italic">
                            PROTOCOLS <span className="text-aurora-cyan text-glow-cyan">.</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                            Define the metrics for your mission
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-white/10"></span>
                            PRESET CORE // GALACTIC LIBRARY
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {habitPresets.map(preset => (
                                <button
                                    key={preset.name}
                                    onClick={() => initiationFromPreset(preset)}
                                    className="group/preset relative p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all text-left overflow-hidden hover:scale-105 active:scale-95 shadow-xl"
                                >
                                    <div className={`mb-5 p-4 rounded-2xl bg-gradient-to-br ${preset.color} w-fit shadow-2xl group-hover/preset:scale-110 transition-transform`}>
                                        <div className="text-black/70">
                                            {getHabitIcon(preset.icon, "w-8 h-8")}
                                        </div>
                                    </div>
                                    <div className="text-xs font-black text-white uppercase tracking-tighter line-clamp-1">{preset.name}</div>
                                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-2 opacity-60">Preset // {preset.type}</div>

                                    {/* Decoration */}
                                    <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover/preset:opacity-20 transition-opacity bg-gradient-to-br ${preset.color}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Editor Form / Confirmation Card */}
                    <div className="lg:col-span-12 xl:col-span-5 relative" ref={formRef}>
                        {confirmingPreset ? (
                            <GlassCard className="p-10 ring-2 ring-white/10 relative overflow-hidden group !rounded-[3rem] animate-in fade-in zoom-in duration-500 border-aurora-cyan/30">
                                <div className="relative z-10 flex flex-col space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-28 h-28 rounded-[2rem] bg-gradient-to-br ${confirmingPreset.color} flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/20 shrink-0`}>
                                            <div className="text-black/80 scale-150">
                                                {getHabitIcon(confirmingPreset.icon, "w-10 h-10")}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-aurora-cyan uppercase tracking-[0.4em]">Initializing Protocol</p>
                                            <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase leading-none">{confirmingPreset.name}</h2>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-white/5" />

                                    <div className="space-y-8">
                                        <Input
                                            label="PROTOCOL DESIGNATION"
                                            value={confirmingPreset.name}
                                            onChange={e => setConfirmingPreset({ ...confirmingPreset, name: e.target.value })}
                                            className="!bg-white/[0.01] border-white/10 !p-5 !text-lg italic font-black uppercase"
                                        />

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Execution Type</label>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setConfirmingPreset({ ...confirmingPreset, type: "numeric" })}
                                                        className={`flex-1 py-4 rounded-xl border transition-all text-[10px] font-black tracking-widest uppercase ${confirmingPreset.type === "numeric" ? "border-aurora-cyan bg-aurora-cyan/10 text-white" : "border-white/5 bg-white/[0.01] text-gray-500"}`}
                                                    >
                                                        Numeric
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmingPreset({ ...confirmingPreset, type: "boolean" })}
                                                        className={`flex-1 py-4 rounded-xl border transition-all text-[10px] font-black tracking-widest uppercase ${confirmingPreset.type === "boolean" ? "border-neon-purple bg-neon-purple/10 text-white" : "border-white/5 bg-white/[0.01] text-gray-500"}`}
                                                    >
                                                        Binary
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Measurement Unit</label>
                                                <Input
                                                    disabled={confirmingPreset.type === "boolean"}
                                                    value={confirmingPreset.type === "boolean" ? "N/A" : confirmingPreset.unit}
                                                    onChange={e => setConfirmingPreset({ ...confirmingPreset, unit: e.target.value })}
                                                    placeholder="UNIT"
                                                    className="!bg-white/[0.01] border-white/10 italic font-black uppercase text-xs"
                                                />
                                                {confirmingPreset.type === "numeric" && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {["HOURS", "MINS", "KM", "REPS"].map(u => (
                                                            <button
                                                                key={u}
                                                                onClick={() => setConfirmingPreset({ ...confirmingPreset, unit: u })}
                                                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-widest"
                                                            >
                                                                {u}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Iconic Signature</label>
                                            <div className="grid grid-cols-6 gap-3">
                                                {Object.keys(habitIcons).map(iconId => (
                                                    <button
                                                        key={iconId}
                                                        onClick={() => setConfirmingPreset({ ...confirmingPreset, icon: iconId })}
                                                        className={`aspect-square rounded-xl border flex items-center justify-center transition-all ${confirmingPreset.icon === iconId ? "bg-white/10 border-white/40 shadow-lg" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20"}`}
                                                    >
                                                        {getHabitIcon(iconId, "w-5 h-5")}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Atmospheric Color</label>
                                            <div className="flex flex-wrap gap-3">
                                                {colors.map(c => (
                                                    <button
                                                        key={c}
                                                        onClick={() => setConfirmingPreset({ ...confirmingPreset, color: c })}
                                                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c} ${confirmingPreset.color === c ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-100'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 space-y-4">
                                        <button
                                            onClick={() => {
                                                addHabit(confirmingPreset);
                                                setConfirmingPreset(null);
                                                setTimeout(() => {
                                                    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }, 100);
                                            }}
                                            className="w-full py-5 rounded-[1.5rem] bg-white text-black font-black text-xs tracking-[0.3em] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase"
                                        >
                                            Confirm Ritual Setup
                                        </button>
                                        <button
                                            onClick={() => setConfirmingPreset(null)}
                                            className="w-full py-4 rounded-[1.5rem] bg-white/5 text-white/40 font-black text-[9px] tracking-[0.2em] hover:text-white transition-all uppercase"
                                        >
                                            Cancel // Return to Engine
                                        </button>
                                    </div>
                                </div>
                                <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-20 bg-gradient-to-br ${confirmingPreset.color}`} />
                            </GlassCard>
                        ) : (
                            <GlassCard className="p-8 ring-1 ring-white/10 relative overflow-hidden group !rounded-[2.5rem]">
                                <div className="flex justify-between items-center mb-10 relative z-10">
                                    <h2 className={`text-xl font-black uppercase tracking-tighter ${editingId ? "text-neon-purple" : "text-neon-cyan"}`}>
                                        {editingId ? "Modify Protocol" : "Add Custom Activity"}
                                    </h2>
                                    {editingId && (
                                        <button onClick={handleCancel} className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest border-b border-white/10 transition-colors">
                                            Back to Custom
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-10 relative z-10">
                                    <Input
                                        label="ACTIVITY NAME"
                                        placeholder="e.g. DEEP FOCUS"
                                        value={name} onChange={e => setName(e.target.value)}
                                        autoFocus
                                        className="!bg-white/[0.01] border-white/10 !p-5 !text-lg"
                                    />

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Select Iconic Signature</label>
                                        <div className="grid grid-cols-6 gap-3">
                                            {Object.keys(habitIcons).map(iconId => (
                                                <button
                                                    key={iconId}
                                                    onClick={() => setSelectedIcon(iconId)}
                                                    className={`aspect-square rounded-2xl border flex items-center justify-center transition-all ${selectedIcon === iconId ? "bg-white/10 border-white/40 shadow-xl" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20"}`}
                                                >
                                                    {getHabitIcon(iconId, "w-7 h-7")}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Data Structure</label>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setType("numeric")}
                                                className={`flex-1 py-5 rounded-2xl border transition-all flex flex-col items-center gap-2 ${type === "numeric" ? "border-aurora-cyan bg-aurora-cyan/10 text-white" : "border-white/5 bg-white/[0.01] text-gray-500 hover:border-white/20"}`}
                                            >
                                                <span className="text-xs font-black tracking-widest uppercase">Numeric</span>
                                                <span className="text-[9px] opacity-40">GOALS & TARGETS</span>
                                            </button>
                                            <button
                                                onClick={() => setType("boolean")}
                                                className={`flex-1 py-5 rounded-2xl border transition-all flex flex-col items-center gap-2 ${type === "boolean" ? "border-neon-purple bg-neon-purple/10 text-white" : "border-white/5 bg-white/[0.01] text-gray-500 hover:border-white/20"}`}
                                            >
                                                <span className="text-xs font-black tracking-widest uppercase">Binary</span>
                                                <span className="text-[9px] opacity-40">COMPLIANCE CODE</span>
                                            </button>
                                        </div>
                                    </div>

                                    {type === "numeric" && (
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Measurement Unit</label>
                                            <Input
                                                placeholder="e.g. HOURS, MINS, UNIT"
                                                value={unit}
                                                onChange={e => setUnit(e.target.value)}
                                                className="!bg-white/[0.01] border-white/10 uppercase font-mono"
                                            />
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {["HOURS", "MINS", "KM", "REPS"].map(u => (
                                                    <button
                                                        key={u}
                                                        onClick={() => setUnit(u)}
                                                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-widest"
                                                    >
                                                        {u}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Color Frequency</label>
                                        <div className="flex flex-wrap gap-4">
                                            {colors.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setSelectedColor(c)}
                                                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${c} ${selectedColor === c ? 'ring-2 ring-white scale-110 shadow-2xl shadow-white/20' : 'opacity-30 hover:opacity-100'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            onClick={handleSave}
                                            className={`w-full py-5 rounded-[1.5rem] font-black text-xs tracking-[0.3em] transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98] uppercase ${editingId ? "bg-neon-purple text-white shadow-neon-purple/20" : "bg-white text-black shadow-white/20"}`}
                                        >
                                            {editingId ? "Update Sequence" : "Initialize Activity"}
                                        </button>
                                    </div>
                                </div>

                                {/* Background glow */}
                                <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[120px] opacity-10 ${editingId ? "bg-neon-purple" : "bg-aurora-cyan"}`} />
                            </GlassCard>
                        )}
                    </div>

                    {/* Existing Habits List */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-8" ref={listRef}>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                <span className="w-8 h-px bg-white/10"></span>
                                ACTIVE PROTOCOLS
                            </h2>
                            <span className="text-[10px] text-gray-600 font-black px-4 py-2 bg-white/5 rounded-full border border-white/5 uppercase">INDEX: {user?.habits?.length || 0}</span>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {user?.habits?.map(habit => (
                                <div key={habit.id} className="relative group/item">
                                    <GlassCard
                                        onClick={() => handleEdit(habit)}
                                        className={`p-8 flex justify-between items-center cursor-pointer hover:border-white/20 transition-all !rounded-[2rem] ${editingId === habit.id ? "border-aurora-cyan bg-aurora-cyan/5 ring-1 ring-aurora-cyan/20" : "bg-black/10"}`}
                                    >
                                        <div className="flex items-center gap-8">
                                            <div className={`w-24 h-24 rounded-[1.75rem] bg-gradient-to-br ${habit.color} flex items-center justify-center shadow-2xl group-hover/item:scale-105 transition-transform shrink-0`}>
                                                <div className="text-black/70">
                                                    {getHabitIcon(habit.icon, "w-12 h-12", habit.name)}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="font-black text-white text-2xl tracking-tighter italic">{habit.name.toUpperCase()}</h3>
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full border ${habit.type === 'numeric' ? 'border-aurora-cyan/30 text-aurora-cyan bg-aurora-cyan/5' : 'border-neon-purple/30 text-neon-purple bg-neon-purple/5'}`}>
                                                        {habit.type}
                                                    </span>
                                                    {habit.unit && (
                                                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                                            // {habit.unit}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <div className="hidden sm:flex flex-col items-end">
                                                <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Status</div>
                                                <div className="text-xs font-black text-aurora-cyan uppercase tracking-widest flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-aurora-cyan animate-pulse"></span>
                                                    OPERATIONAL
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover/item:text-white group-hover/item:border-white/20 transition-all shadow-xl">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </GlassCard>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm(`INITIATE DESTRUCTION PROTOCOL: ${habit.name}? This action is irreversible.`)) {
                                                removeHabit(habit.id);
                                                if (editingId === habit.id) handleCancel();
                                            }
                                        }}
                                        className="absolute -top-3 -right-3 w-10 h-10 rounded-[1.25rem] bg-black border border-white/10 text-gray-600 hover:text-white hover:bg-red-500 transition-all flex items-center justify-center opacity-0 group-hover/item:opacity-100 z-10 shadow-2xl"
                                        title="Destroy"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {(!user?.habits || user.habits.length === 0) && (
                                <div className="p-20 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]">
                                    <div className="mb-6 flex justify-center opacity-10">
                                        <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-black uppercase tracking-[0.4em] text-gray-500">Awaiting Ritual Setup</p>
                                    <p className="text-[10px] font-bold mt-4 text-gray-600 uppercase tracking-widest">Select a preset above to begin your sequence</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
