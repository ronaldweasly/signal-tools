import { describe, expect, it } from 'vitest';
import { buildUtmUrl, validateUtmUrl } from '../src/lib/utm';

describe('UTM builder', () => {
  it('preserves existing query parameters and adds UTM fields', () => {
    const result = buildUtmUrl('https://example.com/page?ref=nav', { source: 'newsletter', medium: 'email', campaign: 'launch' });
    expect(result).toContain('ref=nav');
    expect(result).toContain('utm_source=newsletter');
    expect(result).toContain('utm_campaign=launch');
  });

  it('removes empty optional values', () => {
    const result = buildUtmUrl('https://example.com', { source: 'x', medium: 'y', campaign: 'z', term: '' });
    expect(result).not.toContain('utm_term');
  });

  it('reports missing required fields', () => {
    const result = validateUtmUrl('https://example.com');
    expect(result.valid).toBe(false);
    expect(result.issues).toHaveLength(3);
  });
});
