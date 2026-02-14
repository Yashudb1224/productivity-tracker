import GlassCard from "../ui/GlassCard";

interface StatCardProps {
    label: string;
    value: string | number;
    subtext?: string;
    trend?: "up" | "down" | "neutral";
    color?: "cyan" | "purple" | "green";
    icon?: React.ReactNode;
}

export default function StatCard({
    label,
    value,
    subtext,
    trend,
    icon,
    color = "cyan",
}: StatCardProps) {
    const colorFn = {
        cyan: "text-neon-cyan text-glow-cyan",
        purple: "text-neon-purple text-glow-purple",
        green: "text-neon-green",
    };

    return (
        <GlassCard className="flex flex-col items-start gap-1 relative overflow-hidden group">
            <div className="flex justify-between items-start w-full mb-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">
                    {label}
                </span>
                {icon && <div className={`opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${colorFn[color]}`}>{icon}</div>}
            </div>
            <div className={`text-4xl font-black font-mono tracking-tighter ${colorFn[color]}`}>
                {value}
            </div>
            {subtext && <div className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">{subtext}</div>}

            {/* Subtle background glow on hover */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-current ${colorFn[color]}`} />
        </GlassCard>
    );
}
