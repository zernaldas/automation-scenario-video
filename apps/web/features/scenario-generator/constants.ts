import type { FormState, SelectOption } from "./types";

export const WEBHOOK_URL = "http://localhost:5678/webhook/generate-scenario";

export const DEFAULT_FORM: FormState = {
  prompt: "",
  scenarioType: "education",
  platform: "web",
};

export const SCENARIO_TYPE_OPTIONS: SelectOption[] = [
  { label: "Education", value: "education" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Review Product", value: "review" },
  { label: "Upselling Product", value: "upsell" },
];

export const PLATFORM_OPTIONS: SelectOption[] = [
  { label: "Web", value: "web" },
  { label: "API", value: "api" },
];
