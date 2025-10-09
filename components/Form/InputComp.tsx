"use client";
import { useState, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputCompProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    radius?: string;
    showPasswordToggle?: boolean; // For password inputs
    isRequired?: boolean;
    hideArrows?: boolean;
    isError?: boolean;
    errorMessage?: string;
  };

export default function InputComp({
  label,
  placeholder,
  type = "text",
  required = false,
  isRequired = false,
  isError = false,
  errorMessage = "",
  showPasswordToggle = false,
  hideArrows = true,
  radius = "50px",
  value = "",
  ...props
}: InputCompProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const isTextarea = type === "textarea";

  const baseClasses = `w-full px-3 py-2 rounded-[${radius}] border ${
    isError ? "border-red-500" : "border-[var(--borderTwo)]"
  } bg-[var(--bgTwo)]
    text-[var(--textOne)] placeholder:text-[var(--textTwo)]
    outline-none transition-colors duration-200
    focus:border-[var(--borderOne)] focus:bg-[var(--bgOne)] focus:text-[var(--textOne)]
    ${props.className ?? ""}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && hideArrows) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    }
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className="text-[var(--textOne)] text-md font-medium"
          htmlFor={props.id}
        >
          {label} {(isRequired || required) && "*"}
        </label>
      )}

      <div className="relative w-full">
        {isTextarea ? (
          <textarea
            placeholder={placeholder}
            required={required}
            value={value}
            {...props}
            className={baseClasses}
          />
        ) : (
          <input
            type={
              isPasswordType && showPasswordToggle
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            placeholder={placeholder}
            required={required}
            value={value}
            {...props}
            className={`${baseClasses} ${
              showPasswordToggle && isPasswordType ? "pr-10" : ""
            }
            ${type === "number" ? "no-spinner" : ""}`}
            onKeyDown={(e) => {
              if (type === "number") {
                // Restrict invalid keys
                if (
                  ["e", "E", "+", "-", ".", ","].includes(e.key) ||
                  e.key === " " ||
                  e.key === "Tab"
                ) {
                  e.preventDefault();
                }
              }
              handleKeyDown?.(e); // Preserve any custom logic
            }}
            onWheel={(e) => {
              if (type === "number" && hideArrows) {
                (e.target as HTMLInputElement).blur(); // Prevent scroll changing value
              }
            }}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              if (type === "number") {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }
            }}
          />
        )}

        {showPasswordToggle && isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-[var(--textTwo)] hover:text-[var(--textOne)]"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>

      {isError && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
