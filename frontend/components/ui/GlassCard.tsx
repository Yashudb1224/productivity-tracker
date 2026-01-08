import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function GlassCard({
    children,
    className = "",
    hoverEffect = true,
}: GlassCardProps) {
    return (
        <div
            className={`
        glass rounded-2xl p-6 relative overflow-hidden transition-all duration-300
        ${hoverEffect ? "hover:scale-[1.01] hover:bg-[rgba(30,30,30,0.7)]" : ""}
        ${className}
      `}
        >
            {/* Subtle shine effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent opacity-50" />
            {children}
        </div>
    );
}
