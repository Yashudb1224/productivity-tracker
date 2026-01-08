interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm text-gray-400 tracking-wide uppercase font-semibold">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] 
          rounded-xl px-4 py-3 text-white placeholder-gray-600
          focus:outline-none focus:border-neon-cyan/50 focus:bg-[rgba(255,255,255,0.05)]
          transition-all duration-300
          ${className}
        `}
                {...props}
            />
        </div>
    );
}
