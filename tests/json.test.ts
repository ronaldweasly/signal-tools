import { describe, expect, it } from 'vitest';
import { formatJsonText, getJsonErrorLocation, getJsonStats, minifyJsonText } from '../src/lib/json';

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

  it('measures structural document stats', () => {
    const text = '{\n  "items": [{"id": 1}],\n  "ok": true\n}';
    const value = JSON.parse(text);
    expect(getJsonStats(value, text)).toMatchObject({ keys: 3, depth: 2, lines: 4 });
  });
});
