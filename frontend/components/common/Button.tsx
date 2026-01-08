"use client";

import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger" | "ghost";
  className?: string;
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition",
        {
          "bg-white text-black hover:bg-neutral-200":
            variant === "primary",
          "bg-red-600 text-white hover:bg-red-700":
            variant === "danger",
          "bg-transparent text-neutral-400 hover:bg-neutral-800":
            variant === "ghost",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
