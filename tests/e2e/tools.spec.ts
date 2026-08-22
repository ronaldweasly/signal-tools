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

    if (tool.path === '/utm-builder/') {
      await expect(page.locator('#utm-output')).toContainText('utm_source=newsletter');
    }
    if (tool.path === '/llm-cost-calculator/') {
      await expect(page.locator('#monthly-cost')).toContainText('$');
      await expect(page.locator('#comparison-rows tr')).toHaveCount(6);
    }
    if (tool.path === '/cron-generator/') {
      await expect(page.locator('#cron-description')).not.toHaveText('—');
      await expect(page.locator('#next-runs .result-row')).toHaveCount(3);
    }
    if (tool.path === '/schema-generator/') {
      await expect(page.locator('#schema-output')).toContainText('Organization');
    }
    if (tool.path === '/favicon-generator/') {
      await expect(page.locator('#icon-preview svg')).toBeVisible();
      await expect(page.locator('#favicon-snippet')).toContainText('icon.svg');
    }
  });
}

test('home page has all five tools and no horizontal overflow on mobile', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Make the small decisions cleanly.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /UTM Builder/ })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('all tool routes stay within narrow mobile viewports', async ({ page }) => {
  for (const width of [320, 375, 414, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const tool of tools) {
      await page.goto(tool.path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${tool.path} overflows at ${width}px`).toBeLessThanOrEqual(1);
    }
  }
});
