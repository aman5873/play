"use client";
import { useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export default function OtpInputComp({
  length = 6,
  value,
  onChange,
  label,
}: OtpInputProps) {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (/[^0-9]/.test(val)) return; // only numbers allowed

    const otpArray = value.split("");
    otpArray[index] = val;
    const newValue = otpArray.join("");
    onChange(newValue);

    // auto focus next
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const otpArray = pasteData.split("");
    const newValue = otpArray.join("").padEnd(length, "");
    onChange(newValue);

    // focus last filled input
    inputsRef.current[Math.min(pasteData.length, length - 1)]?.focus();
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      {label && (
        <label className="block text-[var(--textOne)] text-md font-semibold mb-1">
          {label}
        </label>
      )}

      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              if (el) inputsRef.current[i] = el;
            }}
            value={value[i] || ""}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            maxLength={1}
            className="w-10 h-12 text-center text-xl font-semibold rounded-md
              border border-[var(--borderTwo)] bg-[var(--bgTwo)]
              text-[var(--textOne)] placeholder:text-[var(--textTwo)]
              outline-none transition-colors duration-200
              focus:border-[var(--borderOne)] focus:bg-[var(--bgOne)] focus:text-[var(--textOne)]"
          />
        ))}
      </div>
    </div>
  );
}
