import { describe, expect, it } from 'vitest';
import { faviconSnippet, faviconSvg } from '../src/lib/favicon';

describe('favicon generator', () => {
  it('escapes markup in user-controlled labels', () => {
    const svg = faviconSvg({ label: '<x', background: '#123456', foreground: '#ffffff', shape: 'square' });
    expect(svg).not.toContain('<X');
    expect(svg).toContain('&lt;X');
  });

  it('provides install tags', () => {
    expect(faviconSnippet()).toContain('rel="icon"');
    expect(faviconSnippet()).toContain('apple-touch-icon');
  });
});
