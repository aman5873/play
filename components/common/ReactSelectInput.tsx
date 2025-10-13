"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface ReactSelectInputProps {
  value?: any;
  onChange?: (value: any) => void;
  options?: any[];
  placeholder?: string;
  label?: string;
  selectedBorder?: string;
  errorMessage?: string;
  isError?: boolean;
  required?: boolean;
  isRequired?: boolean;
  variant?: "primary" | "primaryTwo" | "secondary"; // ✅ unified variant
  [key: string]: any;
}

export default function ReactSelectInput({
  value,
  onChange,
  options,
  placeholder = "Select...",
  selectedBorder = "",
  label = "",
  errorMessage = "",
  isError = false,
  required = false,
  isRequired = false,
  variant = "primary", // default
  ...rest
}: ReactSelectInputProps) {
  // ✅ Swap styles for primary and primaryTwo
  const primaryTwoStyle = variant === "primary"; // primary now uses old primaryTwo style
  const primaryStyle = variant === "primaryTwo"; // primaryTwo now uses old primary style
  const secondaryStyle = variant === "secondary"; // secondary unchanged

  const controlBg = primaryStyle
    ? "var(--bgTwo)"
    : primaryTwoStyle
    ? "var(--bgOne)"
    : secondaryStyle
    ? "transparent"
    : "var(--bgOne)";

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: controlBg,
      borderRadius: "10px",
      color: "var(--textOne)",
      boxShadow: "none",
      transition: "all 0.2s ease",
      border: isError
        ? "2px solid var(--color-red-500)" // 🔴 error state overrides all
        : state.isFocused
        ? "2px solid var(--borderTwo)"
        : primaryStyle
        ? "2px solid var(--borderTwo)"
        : primaryTwoStyle
        ? "2px solid var(--borderOne)"
        : secondaryStyle
        ? "2px solid var(--textTwo)"
        : "2px solid var(--borderOne)",
      "&:hover": {
        borderColor: isError
          ? "red"
          : primaryStyle
          ? "var(--borderOne)"
          : primaryTwoStyle
          ? "var(--borderTwo)"
          : secondaryStyle
          ? "var(--textTwo)"
          : "var(--borderTwo)",
        backgroundColor: primaryStyle
          ? "var(--bgOne)"
          : primaryTwoStyle
          ? "var(--bgTwo)"
          : secondaryStyle
          ? "transparent"
          : "var(--bgTwo)",
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: primaryStyle
        ? "var(--bgOne)"
        : primaryTwoStyle
        ? "var(--bgTwo)"
        : "var(--bgThree)",
      borderRadius: "6px",
      border: isError
        ? "1px solid var(--color-red-500);"
        : "1px solid var(--borderTwo)",
      padding: "0 4px",
    }),
    singleValue: (base: any) => ({ ...base, color: "var(--textOne)" }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: "var(--textOne)",
      fontWeight: 500,
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "var(--textTwo)",
      cursor: "pointer",
      "&:hover": { backgroundColor: "unset", color: "var(--bgFour)" },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "var(--bgTwo)",
      border: "1px solid var(--borderTwo)",
      borderRadius: "8px",
      zIndex: 50,
    }),
    option: (base: any, { isFocused, isSelected }: any) => ({
      ...base,
      backgroundColor: isFocused
        ? "var(--bgOne)"
        : isSelected
        ? "var(--bgThree)"
        : "transparent",
      color: isFocused || isSelected ? "var(--primary)" : "var(--textOne)",
      cursor: "pointer",
      transition: "background-color 0.2s ease, color 0.2s ease",
    }),
    placeholder: (base: any) => ({ ...base, color: "var(--placeholder)" }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "var(--textOne)",
      "&:hover": { color: "var(--primary)" },
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      backgroundColor: primaryStyle
        ? "var(--borderOne)"
        : primaryTwoStyle
        ? "var(--borderTwo)"
        : secondaryStyle
        ? "var(--textTwo)"
        : "var(--borderOne)",
    }),
    input: (base: any) => ({ ...base, color: "var(--textOne)" }),
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className="text-[var(--textOne)] text-md font-medium"
          htmlFor={rest.id}
        >
          {label} {(isRequired || required) && "*"}
        </label>
      )}
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        classNamePrefix="react-select"
        {...rest}
      />
      {isError && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
