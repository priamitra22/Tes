export default function DataTable({ columns, data, className = "" }) {
  // Tentukan kelas untuk tabel secara dinamis
  const tableClassName = `
    w-full text-sm
    ${columns.length > 3 ? "min-w-[600px]" : ""}
    ${columns.length > 7 ? "md:min-w-max" : ""}
  `;

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {/* Scroll wrapper hanya untuk tabel */}
      <div className="overflow-x-auto">
        <table className={tableClassName}>
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 font-semibold text-slate-800 border-b border-slate-200 whitespace-nowrap ${
                    (col.label || col.Header) === "No"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {col.label || col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-slate-50 transition-all duration-200"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 text-slate-700 whitespace-nowrap ${
                      (col.label || col.Header) === "No"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {row[col.key || col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-8 bg-white">
          <p className="text-slate-500 text-sm">
            Belum ada data yang tersedia untuk ditampilkan.
          </p>
        </div>
      )}
    </div>
  );
}