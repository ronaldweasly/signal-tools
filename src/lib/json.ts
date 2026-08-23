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

export interface JsonRepairResult {
  output: string;
  changes: string[];
}

export type JsonDiffKind = 'added' | 'removed' | 'changed';

export interface JsonDiff {
  path: string;
  kind: JsonDiffKind;
  left?: JsonValue;
  right?: JsonValue;
}

export interface JsonCompareResult {
  leftValue: JsonValue;
  rightValue: JsonValue;
  diffs: JsonDiff[];
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

function stripComments(input: string): { output: string; count: number } {
  let output = '';
  let count = 0;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (inString) {
      output += char;
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }

    if (char === '"') {
      inString = true;
      output += char;
      continue;
    }

    if (char === '/' && next === '/') {
      count += 1;
      index += 2;
      while (index < input.length && input[index] !== '\n' && input[index] !== '\r') index += 1;
      if (index < input.length) output += input[index];
      continue;
    }

    if (char === '/' && next === '*') {
      count += 1;
      index += 2;
      while (index < input.length && !(input[index] === '*' && input[index + 1] === '/')) index += 1;
      index += 1;
      output += ' ';
      continue;
    }

    output += char;
  }

  return { output, count };
}

function stripTrailingCommas(input: string): { output: string; count: number } {
  let output = '';
  let count = 0;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (inString) {
      output += char;
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }

    if (char === '"') {
      inString = true;
      output += char;
      continue;
    }

    if (char === ',') {
      let lookahead = index + 1;
      while (/\s/.test(input[lookahead] ?? '')) lookahead += 1;
      if (input[lookahead] === '}' || input[lookahead] === ']') {
        count += 1;
        continue;
      }
    }

    output += char;
  }

  return { output, count };
}

export function repairJsonText(input: string): JsonRepairResult {
  const changes: string[] = [];
  let output = input;

  if (output.charCodeAt(0) === 0xfeff) {
    output = output.slice(1);
    changes.push('Removed a byte-order mark');
  }

  const comments = stripComments(output);
  output = comments.output;
  if (comments.count) changes.push(`Removed ${comments.count} comment${comments.count === 1 ? '' : 's'}`);

  const trailing = stripTrailingCommas(output);
  output = trailing.output;
  if (trailing.count) changes.push(`Removed ${trailing.count} trailing comma${trailing.count === 1 ? '' : 's'}`);

  return { output, changes };
}

function isComparableRecord(value: JsonValue | undefined): value is { [key: string]: JsonValue } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function compareValues(left: JsonValue | undefined, right: JsonValue | undefined, path: string, diffs: JsonDiff[]): void {
  if (left === undefined && right !== undefined) {
    diffs.push({ path, kind: 'added', right });
    return;
  }
  if (left !== undefined && right === undefined) {
    diffs.push({ path, kind: 'removed', left });
    return;
  }
  if (left === undefined || right === undefined) return;

  if (Array.isArray(left) && Array.isArray(right)) {
    const length = Math.max(left.length, right.length);
    for (let index = 0; index < length; index += 1) compareValues(left[index], right[index], `${path}[${index}]`, diffs);
    return;
  }

  if (isComparableRecord(left) && isComparableRecord(right)) {
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    [...keys].sort((a, b) => a.localeCompare(b)).forEach((key) => {
      compareValues(left[key], right[key], `${path}[${JSON.stringify(key)}]`, diffs);
    });
    return;
  }

  if (JSON.stringify(left) !== JSON.stringify(right)) diffs.push({ path, kind: 'changed', left, right });
}

export function compareJsonText(leftInput: string, rightInput: string): JsonCompareResult {
  const leftValue = JSON.parse(leftInput) as JsonValue;
  const rightValue = JSON.parse(rightInput) as JsonValue;
  const diffs: JsonDiff[] = [];
  compareValues(leftValue, rightValue, '$', diffs);
  return { leftValue, rightValue, diffs };
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
  const message = rawMessage
    .replace(/\s+at position\s+\d+\.?/i, '')
    .replace(/\s*\(line\s+\d+\s+column\s+\d+\)\s*$/i, '')
    .trim();
  return { line, column, position, message: message || 'Invalid JSON' };
}
