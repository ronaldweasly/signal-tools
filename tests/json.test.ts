import { describe, expect, it } from 'vitest';
import {
  compareJsonText,
  formatJsonText,
  getJsonErrorLocation,
  getJsonStats,
  minifyJsonText,
  repairJsonText,
} from '../src/lib/json';

describe('JSON Lens transformations', () => {
  it('formats JSON with the requested indentation', () => {
    const result = formatJsonText('{"z":1,"a":{"ok":true}}', 2);
    expect(result.output).toContain('\n  "z": 1');
    expect(result.output).toContain('\n    "ok": true');
  });

  it('sorts keys recursively when requested', () => {
    const result = formatJsonText('{"z":1,"a":{"y":2,"b":3}}', 2, true);
    expect(result.output.indexOf('"a"')).toBeLessThan(result.output.indexOf('"z"'));
    expect(result.output.indexOf('"b"')).toBeLessThan(result.output.indexOf('"y"'));
  });

  it('minifies without changing the parsed value', () => {
    const result = minifyJsonText('{ "name": "JSON Lens", "enabled": true }');
    expect(result.output).toBe('{"name":"JSON Lens","enabled":true}');
    expect(result.value).toEqual({ name: 'JSON Lens', enabled: true });
  });

  it('reports a useful line and column for parse errors', () => {
    const input = '{\n  "name": "JSON Lens",\n  "active": true,\n}';
    const location = getJsonErrorLocation(input, new SyntaxError('Unexpected token } in JSON at position 43'));
    expect(location.line).toBe(4);
    expect(location.column).toBe(1);
    expect(location.message).toContain('Unexpected token }');
  });

  it('removes duplicate parser line and column metadata from the message', () => {
    const location = getJsonErrorLocation('{', new SyntaxError('Unexpected end of JSON input at position 1 (line 1 column 2)'));
    expect(location.message).toBe('Unexpected end of JSON input');
  });

  it('measures structural document stats', () => {
    const text = '{\n  "items": [{"id": 1}],\n  "ok": true\n}';
    const value = JSON.parse(text);
    expect(getJsonStats(value, text)).toMatchObject({ keys: 3, depth: 2, lines: 4 });
  });

  it('repairs comments, trailing commas, and a leading BOM without touching strings', () => {
    const input = '\ufeff{\n  "url": "https://example.com/a//b", // keep the URL intact\n  "items": [1, 2,], /* remove this */\n}';
    const result = repairJsonText(input);

    expect(result.changes).toHaveLength(3);
    expect(result.changes).toContain('Removed 2 comments');
    expect(result.changes).toContain('Removed 2 trailing commas');
    expect(JSON.parse(result.output)).toEqual({ url: 'https://example.com/a//b', items: [1, 2] });
  });

  it('returns no repair changes for strict JSON', () => {
    const result = repairJsonText('{"ok":true}');
    expect(result.changes).toEqual([]);
    expect(result.output).toBe('{"ok":true}');
  });

  it('compares parsed structures and reports stable JSON paths', () => {
    const result = compareJsonText(
      '{"name":"before","keep":true,"removed":1,"nested":{"same":"x"}}',
      '{"name":"after","keep":true,"added":2,"nested":{"same":"x"}}',
    );

    expect(result.diffs).toEqual([
      { path: '$["added"]', kind: 'added', right: 2 },
      { path: '$["name"]', kind: 'changed', left: 'before', right: 'after' },
      { path: '$["removed"]', kind: 'removed', left: 1 },
    ]);
  });
});
