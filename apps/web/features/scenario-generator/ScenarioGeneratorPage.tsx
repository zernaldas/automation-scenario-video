"use client";

import { ScenarioGeneratorForm } from "./components/ScenarioGeneratorForm";
import { ScenarioResultSection } from "./components/ScenarioResultSection";
import { useScenarioGenerator } from "./hooks/useScenarioGenerator";

export function ScenarioGeneratorPage() {
  const {
    form,
    loading,
    error,
    result,
    rows,
    prettyJson,
    setFormField,
    handleSubmit,
  } = useScenarioGenerator();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-5xl space-y-6">
        <ScenarioGeneratorForm
          form={form}
          loading={loading}
          onSubmit={handleSubmit}
          onFieldChange={setFormField}
        />

        {error && (
          <section className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </section>
        )}

        {result !== null && (
          <ScenarioResultSection rows={rows} prettyJson={prettyJson} />
        )}
      </div>
    </main>
  );
}
