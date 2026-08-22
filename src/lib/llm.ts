export type ModelPricing = {
  id: string;
  provider: string;
  name: string;
  input: number;
  output: number;
  cached: number;
  context: string;
  source: string;
};

// List prices are shown as USD per 1M tokens and must be re-verified before budgeting.
export const MODEL_PRICING: ModelPricing[] = [
  { id: 'gpt-5.6-sol', provider: 'OpenAI', name: 'GPT‑5.6 Sol', input: 5, output: 30, cached: 0.5, context: '270K+', source: 'https://platform.openai.com/pricing' },
  { id: 'gpt-5.6-terra', provider: 'OpenAI', name: 'GPT‑5.6 Terra', input: 2.5, output: 15, cached: 0.25, context: '270K+', source: 'https://platform.openai.com/pricing' },
  { id: 'gpt-5.6-luna', provider: 'OpenAI', name: 'GPT‑5.6 Luna', input: 1, output: 6, cached: 0.1, context: '270K+', source: 'https://platform.openai.com/pricing' },
  { id: 'claude-sonnet-4', provider: 'Anthropic', name: 'Claude Sonnet 4', input: 3, output: 15, cached: 0.3, context: '200K', source: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
  { id: 'claude-haiku-3-5', provider: 'Anthropic', name: 'Claude Haiku 3.5', input: 0.8, output: 4, cached: 0.08, context: '200K', source: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
  { id: 'gemini-3-5-flash', provider: 'Google', name: 'Gemini 3.5 Flash', input: 1.5, output: 9, cached: 0.15, context: '1M', source: 'https://ai.google.dev/gemini-api/docs/pricing' },
];

export type CostInputs = {
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  requestsPerDay: number;
};

export type CostEstimate = {
  inputPerRequest: number;
  outputPerRequest: number;
  cachedPerRequest: number;
  perRequest: number;
  perDay: number;
  perMonth: number;
  perYear: number;
};

export function estimateTokens(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return Math.max(1, Math.ceil(trimmed.length / 4));
}

export function estimateCost(model: ModelPricing, inputs: CostInputs): CostEstimate {
  const inputPerRequest = (Math.max(0, inputs.inputTokens) / 1_000_000) * model.input;
  const outputPerRequest = (Math.max(0, inputs.outputTokens) / 1_000_000) * model.output;
  const cachedPerRequest = (Math.max(0, inputs.cachedTokens) / 1_000_000) * model.cached;
  const perRequest = inputPerRequest + outputPerRequest + cachedPerRequest;
  const perDay = perRequest * Math.max(0, inputs.requestsPerDay);
  return {
    inputPerRequest,
    outputPerRequest,
    cachedPerRequest,
    perRequest,
    perDay,
    perMonth: perDay * 30,
    perYear: perDay * 365,
  };
}

export function money(value: number): string {
  if (!Number.isFinite(value)) return '$0.00';
  if (value > 0 && value < 0.01) return `$${value.toFixed(4)}`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
}

