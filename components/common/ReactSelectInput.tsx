"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface ReactSelectInputProps {
  value?: any;
  onChange?: (value: any) => void;
  options?: any[];
  placeholder?: string;
  selectedBorder?: string;
  isSecondary?: boolean;
  [key: string]: any;
}

export default function ReactSelectInput({
  value,
  onChange,
  options,
  placeholder = "Select...",
  selectedBorder = "",
  isSecondary = false,
  ...rest
}: ReactSelectInputProps) {
  const controlBg = isSecondary ? "transparent" : "var(--bgOne)";

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: controlBg,
      border: `2px solid ${
        state.isFocused
          ? "var(--borderTwo)"
          : isSecondary
          ? "var(--textTwo)"
          : "var(--borderOne)"
      }`,
      borderRadius: "10px",
      color: "var(--textOne)",
      boxShadow: "none",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: isSecondary ? "var(--textTwo)" : "var(--borderTwo)",
        backgroundColor: "var(--bgTwo)",
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
      backgroundColor: isSecondary ? "var(--textTwo)" : "var(--borderOne)",
    }),
    input: (base: any) => ({
      ...base,
      color: "var(--textOne)",
    }),
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}
