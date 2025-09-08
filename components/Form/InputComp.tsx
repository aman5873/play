"use client";
import { useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputCompProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  showPasswordToggle?: boolean; // For password inputs only
}

export default function InputComp({
  label,
  placeholder,
  type = "text",
  showPasswordToggle = false,
  ...props
}: InputCompProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className="text-[var(--textOne)] text-md font-semibold"
          htmlFor={props.id}
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={
            isPasswordType && showPasswordToggle
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          {...props}
          className={`w-full px-3 py-2 rounded-[50px] border-[var(--borderTwo)] bg-[var(--bgTwo)]
            text-[var(--textOne)] placeholder:text-[var(--textTwo)]
            outline-none transition-colors duration-200
            focus:border-[var(--borderOne)] focus:bg-[var(--bgOne)] focus:text-[var(--textOne)]
            ${showPasswordToggle && isPasswordType ? "pr-10" : ""}
            ${props.className ?? ""}
          `}
        />

        {showPasswordToggle && isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-[var(--textTwo)] hover:text-[var(--textOne)]"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
