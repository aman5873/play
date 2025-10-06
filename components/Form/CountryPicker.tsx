"use client";

import Select, { SingleValue } from "react-select";
import { getNames, getCodeList } from "country-list";
import ReactSelectInput from "../common/ReactSelectInput";

type Option = {
  label: string;
  value: string;
};

type CountryPickerProps = {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  isError?: boolean;
  readOnly?: boolean;
  label?: string;
};

export default function CountryPicker({
  value,
  onChange,
  placeholder = "Select Country",
  isError = false,
  label = "",
  readOnly = false,
}: CountryPickerProps) {
  const countries = getNames().map((name) => ({
    label: name,
    value: name,
  }));

  const selected = countries.find((c) => c.value === value) || null;

  return (
    <ReactSelectInput
      value={selected}
      label={label}
      onChange={(val: SingleValue<Option>) => onChange?.(val?.value || "")}
      options={countries}
      placeholder={placeholder}
      isSearchable
      isDisabled={readOnly}
      isError={isError}
    />
  );
}
