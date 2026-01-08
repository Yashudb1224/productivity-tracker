import GlassCard from "../ui/GlassCard";

interface StatCardProps {
    label: string;
    value: string | number;
    subtext?: string;
    trend?: "up" | "down" | "neutral";
    color?: "cyan" | "purple" | "green";
}

export default function StatCard({
    label,
    value,
    subtext,
    trend,
    color = "cyan",
}: StatCardProps) {
    const colorFn = {
        cyan: "text-neon-cyan text-glow-cyan",
        purple: "text-neon-purple text-glow-purple",
        green: "text-neon-green",
    };

    return (
        <GlassCard className="flex flex-col items-start gap-1">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                {label}
            </span>
            <div className={`text-3xl font-bold font-mono ${colorFn[color]}`}>
                {value}
            </div>
            {subtext && <div className="text-xs text-gray-500 mt-1">{subtext}</div>}
        </GlassCard>
    );
}
