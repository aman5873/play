export default function TableComp({
  title = "Table",
  columns = [],
  data = [],
}) {
  return (
    <div>
      {title && (
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[var(--text)]">
          {title}
        </h3>
      )}

      <div className="w-full rounded-lg bg-[var(--surface)] shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full border border-[var(--text)] rounded-lg overflow-hidden">
            {/* Header */}
            <thead className="text-[var(--text)]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    className="px-4 py-2 text-left text-sm md:text-base font-semibold border-b border-[var(--text)] uppercase tracking-wide"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {data?.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors duration-200 text-[var(--subtitle)]"
                >
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      className="px-4 py-2 border-b border-[var(--subtitle)] text-sm md:text-base font-medium"
                    >
                      {row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
