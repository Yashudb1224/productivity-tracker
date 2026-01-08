"use client";

type InputProps = {
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-neutral-400">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>
  );
}
