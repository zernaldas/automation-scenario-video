import { FormEvent, useMemo, useState } from "react";

import { DEFAULT_FORM, WEBHOOK_URL } from "../constants";
import type { FormState, ResultRow } from "../types";
import { mapRows } from "../utils";

export function useScenarioGenerator() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [rows, setRows] = useState<ResultRow[]>([]);

  const prettyJson = useMemo(() => {
    if (result === null) return "";
    return JSON.stringify(result, null, 2);
  }, [result]);

  const setFormField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setRows([]);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data: unknown = await response.json();
      if (!response.ok) {
        throw new Error(`Request gagal dengan status ${response.status}`);
      }

      setResult(data);
      setRows(mapRows(data, form));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memanggil webhook.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    result,
    rows,
    prettyJson,
    setFormField,
    handleSubmit,
  };
}
