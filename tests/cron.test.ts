import { describe, expect, it } from 'vitest';
import { buildCron, inspectCron } from '../src/lib/cron';

describe('cron generator', () => {
  it('builds a five-field expression', () => {
    expect(buildCron({ minute: '0', hour: '9', day: '*', month: '*', weekday: '1-5' })).toBe('0 9 * * 1-5');
  });

  it('describes valid expressions and returns next runs', () => {
    const result = inspectCron('0 9 * * 1-5', new Date('2026-08-21T08:00:00Z'), 'UTC');
    expect(result.valid).toBe(true);
    expect(result.description.toLowerCase()).toContain('09:00');
    expect(result.nextRuns).toHaveLength(3);
  });

  it('returns a useful error for invalid expressions', () => {
    const result = inspectCron('not cron');
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
