import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => new Response(JSON.stringify({
  ok: true,
  service: 'signal-tools',
  runtime: 'cloudflare-workers',
  site: site?.toString() ?? null,
}), { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
