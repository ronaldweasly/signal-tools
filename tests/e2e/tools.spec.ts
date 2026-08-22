import { expect, test } from '@playwright/test';

const tools = [
  { path: '/utm-builder/', heading: 'Build links you can trust.', input: '#base-url', value: 'https://example.com/new' },
  { path: '/llm-cost-calculator/', heading: 'Price the workload, not the hype.', input: '#requests-day', value: '1000' },
  { path: '/cron-generator/', heading: 'Make recurring work readable.', input: '#expression', value: '*/15 * * * *' },
  { path: '/schema-generator/', heading: 'Make the page legible to machines.', input: '#schema-type', value: 'Organization' },
  { path: '/favicon-generator/', heading: 'Make the smallest mark work harder.', input: '#icon-label', value: 'ST' },
];

for (const tool of tools) {
  test(`${tool.path} loads and produces an interactive output`, async ({ page }) => {
    await page.goto(tool.path);
    await expect(page.getByRole('heading', { name: tool.heading })).toBeVisible();
    const control = page.locator(tool.input);
    if (tool.path === '/schema-generator/') {
      await control.selectOption(tool.value);
    } else {
      await control.fill(tool.value);
    }
    if (tool.path === '/cron-generator/') await control.press('Tab');
    await expect(page.locator('[aria-live="polite"]')).toBeVisible();
  });
}

test('home page has all five tools and no horizontal overflow on mobile', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Make the small decisions cleanly.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /UTM Builder/ })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
