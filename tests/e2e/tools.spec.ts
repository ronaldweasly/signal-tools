import { expect, test } from '@playwright/test';

test.describe('JSON Lens', () => {
  test('formats the sample and renders document structure', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/JSON Lens/);
    await expect(page.getByRole('heading', { name: /See the structure/ })).toBeVisible();
    await page.getByRole('button', { name: 'Format JSON' }).click();
    await expect(page.locator('#input-status')).toContainText('Valid JSON');
    await expect(page.locator('#output-status')).toContainText('Formatted output ready');
    await expect(page.locator('#json-output')).toContainText('"project"');
    await expect(page.locator('#stat-keys')).not.toHaveText('—');
    await expect(page.locator('#tree-output > .tree-node')).toHaveCount(1);
  });

  test('explains invalid JSON with a line, column, and highlighted row', async ({ page }) => {
    await page.goto('/');
    await page.locator('#json-input').fill('{\n  "broken": true,\n}');
    await page.getByRole('button', { name: 'Format JSON' }).click();
    await expect(page.locator('#input-status')).toContainText('Invalid JSON');
    await expect(page.locator('#input-status')).toContainText('line 3');
    await expect(page.locator('#json-input')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#input-lines .is-error')).toHaveAttribute('data-line', '3');
    await expect(page.locator('#input-status')).toContainText('try Repair safe issues');
  });

  test('supports skip navigation, keyboard tabs, and recoverable compare errors', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();

    await page.getByRole('tab', { name: 'Format & inspect' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Compare JSON' })).toBeFocused();
    await expect(page.getByRole('tab', { name: 'Compare JSON' })).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowLeft');
    await expect(page.getByRole('tab', { name: 'Format & inspect' })).toBeFocused();
    await expect(page.getByRole('tab', { name: 'Format & inspect' })).toHaveAttribute('aria-selected', 'true');

    await page.getByRole('tab', { name: 'Compare JSON' }).click();
    await page.locator('#compare-right').fill('{');
    await page.getByRole('button', { name: 'Compare documents' }).click();
    await expect(page.locator('#compare-right')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#compare-status')).toContainText('edit this document');
  });

  test('repairs safe syntax issues and keeps an undo path', async ({ page }) => {
    await page.goto('/');
    await page.locator('#json-input').fill('{\n  "name": "demo", // comment\n  "items": [1, 2,],\n}');
    await page.getByRole('button', { name: 'Repair safe issues' }).click();
    await expect(page.locator('#input-status')).toContainText('Repaired locally');
    await expect(page.locator('#undo-repair')).toBeVisible();
    const repaired = await page.locator('#json-output').textContent();
    expect(JSON.parse(repaired ?? '')).toEqual({ name: 'demo', items: [1, 2] });
    await page.getByRole('button', { name: 'Undo repair' }).click();
    await expect(page.locator('#input-status')).toContainText('Repair undone');
    await expect(page.locator('#json-input')).toHaveValue(/\/\/ comment/);
  });

  test('loads a local file, minifies output, and filters the tree', async ({ page }) => {
    await page.goto('/');
    await page.locator('#json-file').setInputFiles({
      name: 'payload.json',
      mimeType: 'application/json',
      buffer: Buffer.from('{"service":{"name":"edge"},"contributors":["Mira"]}'),
    });
    await expect(page.locator('#file-note')).toContainText('payload.json loaded locally');
    await expect(page.locator('#output-status')).toContainText('Formatted output ready');
    await page.getByRole('button', { name: 'Minify' }).click();
    const minified = await page.locator('#json-output').textContent();
    expect(minified).not.toContain('\n');
    await page.locator('#tree-search').fill('contributors');
    await expect(page.locator('#tree-output')).toContainText('contributors');
    await expect(page.locator('#tree-result-count')).toContainText('match');
  });

  test('compares parsed documents and exposes a copyable diff', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Compare JSON' }).click();
    await expect(page.locator('#compare-panel')).toBeVisible();
    await page.getByRole('button', { name: 'Compare documents' }).click();
    await expect(page.locator('#compare-status')).toContainText('structural difference');
    await expect(page.locator('#compare-results .diff-row')).not.toHaveCount(0);
    await expect(page.locator('#compare-results')).toContainText('$["active"]');
    await expect(page.locator('#copy-diff')).toBeEnabled();
  });

  test('keeps the focused routes, metadata, and install assets available', async ({ page }) => {
    test.setTimeout(60_000);
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
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.webmanifest');
    const structuredData = await page.locator('script[type="application/ld+json"]').evaluate((element) => element.textContent ?? '');
    expect(structuredData).toContain('JSON Lens');
    await page.goto('/research/');
    await expect(page.locator('main h1')).toHaveCount(1);
  });

  test('has no horizontal overflow at supported widths', async ({ page }) => {
    test.setTimeout(60_000);
    for (const width of [320, 375, 390, 414, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow, `horizontal overflow at ${width}px`).toBe(false);
    }
  });

  test('uses comfortable primary control targets and stacks the workspace at tablet width', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto('/');
    const controlHeights = await page.evaluate(() => ['mode-format', 'mode-compare', 'load-sample', 'clear-json', 'format-json', 'minify-json', 'repair-json', 'expand-tree', 'collapse-tree', 'tree-search'].map((id) => Math.round(document.getElementById(id)?.getBoundingClientRect().height ?? 0)));
    expect(controlHeights.every((height) => height >= 42)).toBe(true);
    const columns = await page.locator('.workspace-grid').evaluate((element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length);
    expect(columns).toBe(1);
  });
});
