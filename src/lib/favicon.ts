export type FaviconOptions = {
  label: string;
  background: string;
  foreground: string;
  shape: 'square' | 'circle' | 'rounded';
};

function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export function faviconSvg(options: FaviconOptions): string {
  const safeLabel = escapeXml(options.label.trim().slice(0, 2).toUpperCase() || 'S');
  const shape = options.shape === 'circle'
    ? '<circle cx="128" cy="128" r="112" fill="url(#bg)"/>'
    : `<rect x="16" y="16" width="224" height="224" rx="${options.shape === 'rounded' ? 48 : 8}" fill="url(#bg)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${options.background}"/><stop offset="1" stop-color="${options.background}"/></linearGradient></defs>${shape}<text x="128" y="143" fill="${options.foreground}" text-anchor="middle" font-family="Geist, sans-serif" font-size="88" font-weight="700" letter-spacing="-6">${safeLabel}</text></svg>`;
}

export function faviconSnippet(): string {
  return `<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">`;
}
