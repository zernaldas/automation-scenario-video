import type { ResultRow } from "../types";
import { ScenarioResultTable } from "./ScenarioResultTable";

type ScenarioResultSectionProps = {
  rows: ResultRow[];
  prettyJson: string;
};

export function ScenarioResultSection({
  rows,
  prettyJson,
}: ScenarioResultSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold">Result Table</h2>
      <ScenarioResultTable rows={rows} />

      <h3 className="mt-6 text-sm font-semibold text-slate-700">Raw JSON</h3>
      <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
        {prettyJson}
      </pre>
    </section>
  );
}
