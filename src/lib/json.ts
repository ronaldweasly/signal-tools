export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface JsonFormatResult {
  value: JsonValue;
  output: string;
}

export interface JsonStats {
  bytes: number;
  keys: number;
  depth: number;
  lines: number;
}

export interface JsonErrorLocation {
  line: number;
  column: number;
  position: number;
  message: string;
}

function isRecord(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function sortJsonKeys(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return value.map(sortJsonKeys);
  if (!isRecord(value)) return value;

  return Object.fromEntries(
    Object.keys(value)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => [key, sortJsonKeys(value[key])]),
  );
}

function normalizeIndent(indent: number | 'tab'): number | string {
  return indent === 'tab' ? '\t' : indent;
}

export function formatJsonText(input: string, indent: number | 'tab' = 2, sortKeys = false): JsonFormatResult {
  const parsed = JSON.parse(input) as JsonValue;
  const value = sortKeys ? sortJsonKeys(parsed) : parsed;
  return { value, output: JSON.stringify(value, null, normalizeIndent(indent)) };
}

export function minifyJsonText(input: string, sortKeys = false): JsonFormatResult {
  const parsed = JSON.parse(input) as JsonValue;
  const value = sortKeys ? sortJsonKeys(parsed) : parsed;
  return { value, output: JSON.stringify(value) };
}

function measureDepth(value: JsonValue, current = 0, root = true): number {
  const childDepth = current + (root ? 0 : 1);
  if (Array.isArray(value)) {
    let max = current;
    for (const item of value) max = Math.max(max, measureDepth(item, childDepth, false));
    return max;
  }
  if (isRecord(value)) {
    let max = current;
    for (const item of Object.values(value)) max = Math.max(max, measureDepth(item, childDepth, false));
    return max;
  }
  return current;
}

function countKeys(value: JsonValue): number {
  if (Array.isArray(value)) {
    let total = 0;
    for (const item of value) total += countKeys(item);
    return total;
  }
  if (!isRecord(value)) return 0;
  let total = 0;
  for (const child of Object.values(value)) total += 1 + countKeys(child);
  return total;
}

export function getJsonStats(value: JsonValue, text: string): JsonStats {
  return {
    bytes: new TextEncoder().encode(text).length,
    keys: countKeys(value),
    depth: measureDepth(value),
    lines: text ? text.split('\n').length : 0,
  };
}

export function getJsonErrorLocation(input: string, error: unknown): JsonErrorLocation {
  const rawMessage = error instanceof Error ? error.message : 'Invalid JSON';
  const match = rawMessage.match(/position\s+(\d+)/i);
  const position = match ? Math.min(Number(match[1]), input.length) : input.length;
  const before = input.slice(0, position);
  const line = before.split('\n').length;
  const lastLine = before.split('\n').at(-1) ?? '';
  const column = lastLine.length + 1;
  const message = rawMessage.replace(/\s+at position\s+\d+\.?$/i, '').trim();
  return { line, column, position, message: message || 'Invalid JSON' };
}
