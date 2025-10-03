import React from "react";

const activeClasses =
  "bg-[var(--primary)] text-[var(--secondary)] border-[var(--primary)]";
const inactiveClasses =
  "bg-[var(--borderTwo)] text-[var(--textOne)] border-[var(--borderTwo)]";

/* 🔘 Radio as Button Group */
export const RadioGroup = ({
  options,
  value,
  onChange,
  disabled = false,
  label = "",
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  name: string;
  disabled?: boolean;
  label?: string;
}) => {
  return (
    <div>
      {label && (
        <div className="text-[var(--textOne)] mb-1 font-medium">{label}</div>
      )}

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange(opt.value)}
              className={`
              px-4 py-2 rounded-lg border transition-colors duration-200 font-medium
              ${isActive ? activeClasses : inactiveClasses}
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* 🔀 Switch */
export const SwitchInput = ({ label, checked, onChange, disabled }: any) => (
  <label className="flex items-center space-x-2 cursor-pointer mt-2">
    <div
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
        checked ? activeClasses : inactiveClasses
      }`}
      onClick={() => !disabled && onChange(!checked)}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full  transition-transform duration-300 ease-in-out ${
          checked
            ? "translate-x-6 bg-[var(--secondary)]"
            : "translate-x-0 bg-[var(--textOne)]"
        }`}
      />
    </div>
    {label && <span className="text-[var(--textOne)]">{label}</span>}
  </label>
);

/* 🎚 Slider */
export const SliderInput = (props: any) => {
  const { label, name, value, onChange, disabled, min = 0, max = 100 } = props;

  // Calculate percentage of fill
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <span className="text-[var(--textOne)] text-md font-medium">
          {label}
        </span>
      )}

      <div className="flex justify-between items-center gap-4 w-full">
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className="w-full h-2 rounded-lg cursor-pointer appearance-none"
          style={{
            background: `linear-gradient(
              to right,
              var(--primary) 0%,
              var(--primary) ${percent}%,
              var(--borderThree) ${percent}%,
              var(--borderThree) 100%
            )`,
          }}
        />
        <span className="text-md font-semibold text-[var(--primary)] w-10 text-right">
          {value ?? 0}
        </span>
      </div>

      <div className="flex justify-between text-sm text-[var(--textTwo)]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--textOne);
          border: 2px solid var(--textOne);
          cursor: pointer;
          transition: background 0.2s;
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--textOne);
          border: 2px solid var(--textOne);
          cursor: pointer;
          transition: background 0.2s;
        }
      `}</style>
    </div>
  );
};
