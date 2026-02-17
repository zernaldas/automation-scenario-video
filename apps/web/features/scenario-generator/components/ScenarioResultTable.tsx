import type { ResultRow } from "../types";

type ScenarioResultTableProps = {
  rows: ResultRow[];
};

export function ScenarioResultTable({ rows }: ScenarioResultTableProps) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-3 py-2 font-semibold">Title</th>
            <th className="px-3 py-2 font-semibold">Status</th>
            <th className="px-3 py-2 font-semibold">Prompt</th>
            <th className="px-3 py-2 font-semibold">Scenario Type</th>
            <th className="px-3 py-2 font-semibold">Platform</th>
            <th className="px-3 py-2 font-semibold">Product Name</th>
            <th className="px-3 py-2 font-semibold">Product Segment</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={`${row.title}-${index}`} className="border-t">
                <td className="px-3 py-2">{row.title}</td>
                <td className="px-3 py-2">{row.status}</td>
                <td className="px-3 py-2">{row.prompt}</td>
                <td className="px-3 py-2">{row.scenarioType}</td>
                <td className="px-3 py-2">{row.platform}</td>
                <td className="px-3 py-2">{row.productName}</td>
                <td className="px-3 py-2">{row.productSegment}</td>
              </tr>
            ))
          ) : (
            <tr className="border-t">
              <td className="px-3 py-2 text-slate-500" colSpan={7}>
                Tidak ada data yang bisa ditampilkan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
