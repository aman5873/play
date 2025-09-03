"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function ReactSelectInput(props) {
  const { value, onChange, options, placeholder = "Select.." } = props;

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      {...props}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }),
        singleValue: (base) => ({
          ...base,
          color: "var(--text)",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "var(--surface)",
          color: "var(--text)",
        }),
        option: (base, { isFocused }) => ({
          ...base,
          backgroundColor: isFocused ? "var(--hoverBg)" : "var(--surface)",
          color: "var(--text)",
          cursor: "pointer",
        }),
      }}
    />
  );
}
