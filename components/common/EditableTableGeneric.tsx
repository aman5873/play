"use client";

import { Trash2 } from "lucide-react";
import InputComp from "../Form/InputComp";
import { useAlert } from "@/context/AlertContext";

export default function EditableTableGeneric({
  title = "",
  columns = [],
  rows = [],
  onChange,
  onAddRow = null,
  defaultRow = {},
  addLabel = "Add Row",
  disableAction = false,
}) {
  const { confirmAlert } = useAlert();

  // ✅ Now supports rowIndex, key, value, and row.id
  const updateRow = (idx, key, value, id = null) => {
    const updated = [...rows];

    updated[idx] = {
      ...updated[idx],
      [key]: value,
      id: updated[idx]?.id ?? id, // keep existing id or assign incoming id
    };

    onChange(updated);
  };

  const addRow = () => {
    if (onAddRow) return onAddRow();
    onChange([...rows, { ...defaultRow }]);
  };

  const removeRow = (idx) => {
    confirmAlert({
      message: `Delete row ${idx + 1}?`,
      type: "warning",
      autoClose: false,
      actions: [
        { label: "Cancel" },
        { label: "Yes, Delete", onClick: () => confirmRemove(idx) },
      ],
    });
  };

  const confirmRemove = (idx) => {
    onChange(rows.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-full">
      {/* Title + Add button */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[var(--textOne)] text-lg font-semibold">{title}</h3>
      </div>

      <div className="overflow-x-auto border-1 border-[var(--borderThree)] rounded-xl">
        <table className="min-w-full gradient-one">
          <thead className="gradient-one">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-sm font-semibold text-[var(--textTwo)] ${
                    col.className || ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
              {!disableAction && <th className="w-10 px-4 py-3"></th>}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx} // ← ALWAYS safe here because stable table, no DnD
                className="border-t border-[var(--borderThree)] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-md text-[var(--textOne)] ${
                      col.className || ""
                    }`}
                  >
                    <div className="w-full block">
                      {col.render ? (
                        col.render({
                          row,
                          rowIndex: idx,
                          value: row[col.key],
                          onChange: (value) =>
                            updateRow(idx, col.key, value, row?.id),
                        })
                      ) : (
                        <InputComp
                          variant="secondaryTwo"
                          value={row[col.key] || ""}
                          onChange={(e) =>
                            updateRow(idx, col.key, e.target.value, row?.id)
                          }
                        />
                      )}
                    </div>
                  </td>
                ))}

                {!disableAction && (
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="cursor-pointer text-red-500 hover:text-red-600"
                      onClick={() => removeRow(idx)}
                    >
                      <Trash2 />
                    </button>
                  </td>
                )}
              </tr>
            ))}

            {!disableAction && (
              <tr
                onClick={addRow}
                className="cursor-pointer border-t border-[var(--borderThree)] hover:bg-[var(--bgTwo)] cursor-pointer transition-colors"
              >
                <td
                  colSpan={columns.length + 1}
                  className="px-4 text-center py-3 text-md text-[var(--textOne)] font-medium"
                >
                  + {addLabel}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
