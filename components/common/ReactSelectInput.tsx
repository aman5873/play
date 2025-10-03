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
  isSecondary?: boolean;
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
  isSecondary = false,
  isPrimaryTwo = true,
  isError = false,
  required = false,
  isRequired = false,
  ...rest
}: ReactSelectInputProps) {
  const controlBg = isSecondary
    ? "transparent"
    : isPrimaryTwo
    ? "var(--bgTwo)"
    : "var(--bgOne)";

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: controlBg,
      border: `2px solid ${
        state.isFocused
          ? "var(--borderTwo)"
          : isSecondary
          ? "var(--textTwo)"
          : isPrimaryTwo
          ? "var(--borderTwo)"
          : "var(--borderOne)"
      }`,
      borderRadius: "10px",
      color: "var(--textOne)",
      boxShadow: "none",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: isSecondary
          ? "var(--textTwo)"
          : isPrimaryTwo
          ? "var(--borderOne)"
          : "var(--borderTwo)",
        backgroundColor: isPrimaryTwo ? "var(--bgOne)" : "var(--bgTwo)",
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "var(--textOne)",
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
    placeholder: (base: any) => ({
      ...base,
      color: "var(--placeholder)",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "var(--textOne)",
      "&:hover": {
        color: "var(--primary)",
      },
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      backgroundColor: isSecondary
        ? "var(--textTwo)"
        : isPrimaryTwo
        ? "var(--borderOne)"
        : "var(--borderOne)",
    }),
    input: (base: any) => ({
      ...base,
      color: "var(--textOne)",
    }),
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
