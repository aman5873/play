"use client";
export default function GenericTable({
  data = [],
  columns = [],
  onClickRow = null,
}) {
  if (!data || data.length === 0) {
    return (
      <p className="text-[var(--textTwo)]">No leaderboard data available</p>
    );
  }

  return (
    <div className="overflow-x-auto border-1 border-[var(--borderThree)] rounded-xl">
      <table className="min-w-full  gradient-one  overflow-hidden">
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
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t border-[var(--borderThree)] hover:bg-[var(--bgTwo)] transition-colors"
              onClick={() => onClickRow && onClickRow(row)}
              style={{ cursor: onClickRow && "pointer" }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-md text-[var(--textOne)] ${
                    col.className || ""
                  }`}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
