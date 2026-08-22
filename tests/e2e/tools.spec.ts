import { expect, test } from '@playwright/test';

test.describe('JSON Lens', () => {
  test('formats the sample and renders document structure', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/JSON Lens/);
    await expect(page.getByRole('heading', { name: /Make JSON readable/ })).toBeVisible();
    await page.getByRole('button', { name: 'Format JSON' }).click();
    await expect(page.locator('#input-status')).toContainText('Valid JSON');
    await expect(page.locator('#output-status')).toContainText('Formatted output ready');
    await expect(page.locator('#json-output')).toContainText('"project"');
    await expect(page.locator('#stat-keys')).not.toHaveText('—');
    await expect(page.locator('#tree-output > .tree-node')).toHaveCount(1);
  });

  test('explains invalid JSON with a line and column', async ({ page }) => {
    await page.goto('/');
    await page.locator('#json-input').fill('{\n  "broken": true,\n}');
    await page.getByRole('button', { name: 'Format JSON' }).click();
    await expect(page.locator('#input-status')).toContainText('Invalid JSON');
    await expect(page.locator('#input-status')).toContainText('line 3');
    await expect(page.locator('#json-input')).toHaveAttribute('aria-invalid', 'true');
  });

  test('minifies output and filters the tree', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Minify' }).click();
    const minified = await page.locator('#json-output').textContent();
    expect(minified).not.toContain('\n');
    await page.locator('#tree-search').fill('contributors');
    await expect(page.locator('#tree-output')).toContainText('contributors');
  });

  test('keeps the focused routes and metadata available', async ({ page }) => {
    for (const route of ['/', '/research/', '/about/', '/robots.txt', '/sitemap-index.xml', '/api/health']) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
    }
    for (const oldRoute of ['/utm-builder/', '/llm-cost-calculator/', '/cron-generator/', '/schema-generator/', '/favicon-generator/']) {
      const response = await page.goto(oldRoute);
      expect(response?.status(), oldRoute).toBe(404);
    }
    await page.goto('/');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /JSON/);
    const structuredData = await page.locator('script[type="application/ld+json"]').evaluate((element) => element.textContent ?? '');
    expect(structuredData).toContain('JSON Lens');
  });

  test('has no horizontal overflow at supported widths', async ({ page }) => {
    for (const width of [320, 375, 414, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow, `horizontal overflow at ${width}px`).toBe(false);
    }
  });
});
