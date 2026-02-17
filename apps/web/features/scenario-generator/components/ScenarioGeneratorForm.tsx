import type { FormEvent } from "react";

import { PLATFORM_OPTIONS, SCENARIO_TYPE_OPTIONS } from "../constants";
import type { FormState } from "../types";
import { ProductSearchField } from "./ProductSearchField";

type ScenarioGeneratorFormProps = {
  form: FormState;
  loading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onFieldChange: <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => void;
};

export function ScenarioGeneratorForm({
  form,
  loading,
  onSubmit,
  onFieldChange,
}: ScenarioGeneratorFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Automation Scenario Generator
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Form submit ke webhook lalu render hasil dalam table.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Prompt</label>
          <textarea
            name="prompt"
            value={form.prompt}
            onChange={(event) => onFieldChange("prompt", event.target.value)}
            rows={4}
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-200 transition focus:ring"
            placeholder="Contoh: Buatkan scenario login dengan validasi error."
          />
        </div>

        <ProductSearchField
          value={form.product}
          onChange={(value) => onFieldChange("product", value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Scenario Type
            </label>
            <select
              name="scenarioType"
              value={form.scenarioType}
              onChange={(event) =>
                onFieldChange("scenarioType", event.target.value)
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-200 transition focus:ring"
            >
              {SCENARIO_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Target Platform
            </label>
            <select
              name="platform"
              value={form.platform}
              onChange={(event) => onFieldChange("platform", event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-200 transition focus:ring"
            >
              {PLATFORM_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Scenario"}
        </button>
      </form>
    </section>
  );
}
