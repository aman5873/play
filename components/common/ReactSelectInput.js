"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function ReactSelectInput({
  value,
  onChange,
  options,
  placeholder = "Select...",
  ...rest
}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "var(--surface)",
      borderColor: state.isFocused ? "var(--primary)" : "var(--border)",
      color: "var(--text)",
      boxShadow: state.isFocused ? `0 0 0 1px var(--primary)` : "none",
      transition: "all 0.2s ease",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--text)",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--surface)",
      color: "var(--text)",
      zIndex: 9999, // ensure menu appears on top
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused
        ? "var(--hover)"
        : isSelected
        ? "var(--selectedBg)"
        : "var(--surface)",
      color: isFocused ? "var(--background)" : "var(--text)",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--placeholder)",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "var(--text)",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "var(--border)",
    }),
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      {...rest}
    />
  );
}
