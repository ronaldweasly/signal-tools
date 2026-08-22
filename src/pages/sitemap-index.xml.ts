import type { APIRoute } from 'astro';

const paths = ['/', '/about/', '/research/', '/utm-builder/', '/llm-cost-calculator/', '/cron-generator/', '/schema-generator/', '/favicon-generator/'];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://signal-tools.pages.dev');
  const urls = paths.map((path) => `<url><loc>${new URL(path, base).toString()}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
