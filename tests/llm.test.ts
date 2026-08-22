import { describe, expect, it } from 'vitest';
import { MODEL_PRICING, estimateCost, estimateTokens } from '../src/lib/llm';

describe('LLM cost calculator', () => {
  it('estimates a non-empty prompt with a transparent heuristic', () => {
    expect(estimateTokens('12345678')).toBe(2);
    expect(estimateTokens('')).toBe(0);
  });

  it('scales input, output, cache, and request volume independently', () => {
    const result = estimateCost(MODEL_PRICING[0], { inputTokens: 1_000_000, outputTokens: 1_000_000, cachedTokens: 1_000_000, requestsPerDay: 1 });
    expect(result.perRequest).toBe(35.5);
    expect(result.perMonth).toBe(1065);
  });
});
