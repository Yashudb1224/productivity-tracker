interface NeonButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "cyan" | "purple" | "danger" | "ghost" | "green";
    fullWidth?: boolean;
    children: React.ReactNode;
}

export default function NeonButton({
    variant = "cyan",
    fullWidth = false,
    className = "",
    children,
    ...props
}: NeonButtonProps) {
    const base =
        "relative px-6 py-3 rounded-xl font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        cyan: "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]",
        purple: "bg-neon-purple/10 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/20 hover:shadow-[0_0_20px_rgba(188,19,254,0.3)]",
        green: "bg-neon-green/10 text-neon-green border border-neon-green/50 hover:bg-neon-green/20 hover:shadow-[0_0_20px_rgba(10,255,10,0.3)]",
        danger: "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    };

    return (
        <button
            className={`
        ${base} 
        ${variants[variant]} 
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}
