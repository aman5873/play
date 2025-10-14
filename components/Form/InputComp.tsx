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
    variant?: "primary" | "secondary" | "secondaryTwo"; // ✅ Variant selector
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
  variant = "primary", // ✅ default variant
  ...props
}: InputCompProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const isTextarea = type === "textarea";

  const isSecondary = variant === "secondary";
  const isSecondaryTwo = variant === "secondaryTwo";

  // ✅ Styles switched (primary ↔ secondary)
  const baseClasses = `
    w-full px-3 py-2 rounded-[${radius}] border
    ${
      isError
        ? "border-red-500"
        : isSecondary
        ? "border-[var(--borderTwo)]"
        : isSecondaryTwo
        ? "border-[var(--borderThree)]"
        : "border-[var(--borderOne)]"
    }
    ${
      isSecondary
        ? "bg-[var(--bgTwo)] text-[var(--textOne)] placeholder:text-[var(--textTwo)]"
        : isSecondaryTwo
        ? "bg-[var(--black-800)] text-[var(--textOne)] placeholder:text-[var(--textTwo)]"
        : "bg-[var(--bgOne)] text-[var(--textOne)] placeholder:text-[var(--textTwo)]"
    }
    outline-none transition-colors duration-200
    ${
      isSecondary
        ? "focus:border-[var(--borderOne)] focus:bg-[var(--bgOne)] focus:text-[var(--textOne)]"
        : isSecondaryTwo
        ? "focus:border-[var(--borderTwo)] focus:bg-[var(--black-500)] focus:text-[var(--textOne)]"
        : "focus:border-[var(--borderTwo)] focus:bg-[var(--bgTwo)] focus:text-[var(--textOne)]"
    }
    ${props.className ?? ""}
  `;

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
            } ${type === "number" ? "no-spinner" : ""}`}
            onKeyDown={(e) => {
              if (type === "number") {
                if (
                  ["e", "E", "+", "-", ".", ","].includes(e.key) ||
                  e.key === " " ||
                  e.key === "Tab"
                ) {
                  e.preventDefault();
                }
              }
              handleKeyDown?.(e);
            }}
            onWheel={(e) => {
              if (type === "number" && hideArrows) {
                (e.target as HTMLInputElement).blur();
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
