"use client";

import { SingleValue } from "react-select";
import { getCodeList } from "country-list";
import ReactSelectInput from "../common/ReactSelectInput";
import { useTranslation } from "react-i18next";

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
  isAllCountry?: boolean;
  label?: string;
};

export default function CountryPicker({
  value,
  onChange,
  placeholder = "Select Country",
  isError = false,
  label = "",
  readOnly = false,
  isAllCountry = false,
}: CountryPickerProps) {
  const { t: tCommon } = useTranslation("common");
  const countries = Object.entries(getCodeList()).map(([key, value]) => ({
    value: key.toUpperCase(),
    label: value,
  }));

  const countryOptions = isAllCountry
    ? [{ value: "", label: tCommon("filters.all") }, ...countries]
    : countries;

  // ✅ Case-insensitive match
  const selected =
    countryOptions.find(
      (c) => c.value.toUpperCase() === (value || "").toUpperCase()
    ) || null;

  return (
    <ReactSelectInput
      value={selected}
      label={label}
      onChange={(val: SingleValue<Option>) => onChange?.(val?.value || "")}
      options={countryOptions}
      placeholder={placeholder}
      isSearchable
      isDisabled={readOnly}
      isError={isError}
    />
  );
}
