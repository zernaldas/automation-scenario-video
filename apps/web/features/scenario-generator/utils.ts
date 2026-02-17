import type { FormState, ResultRow } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toText(value: unknown, fallback = "-"): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

function getPayloadItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  for (const key of ["data", "items", "results", "rows"]) {
    const candidate = payload[key];
    if (Array.isArray(candidate)) return candidate;
  }

  return [payload];
}

export function mapRows(payload: unknown, fallback: FormState): ResultRow[] {
  const items = getPayloadItems(payload);
  if (items.length === 0) return [];

  return items.map((item) => {
    const row = isRecord(item) ? item : {};
    const product = isRecord(row.product) ? row.product : {};

    return {
      title: toText(row.title ?? row.name),
      status: toText(row.status),
      prompt: toText(row.prompt, toText(fallback.prompt)),
      scenarioType: toText(row.scenarioType, fallback.scenarioType),
      platform: toText(row.platform, fallback.platform),
      productName: toText(
        product.name,
        toText(fallback.product?.name),
      ),
      productSegment: toText(product.segment),
    };
  });
}
