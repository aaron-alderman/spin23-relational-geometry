import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createAdaptiveHousehold, simulateAdaptiveHousehold } from '../derive/the_field_household_model_v2.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.FIELD_PLAYWRIGHT_PACKAGE ?? 'playwright');
const pagePath = resolve(process.env.FIELD_EXPLORER_PAGE ?? 'preview/the-field/household-explorer-v2.html');
const read = file => JSON.parse(readFileSync(new URL(`../../evidence/data/the-field/${file}`, import.meta.url)));
const material = read('household-orientations-v1.json');
const adaptive = read('household-orientations-v2.json');
const browser = await chromium.launch({ headless: true,
  ...(process.env.FIELD_BROWSER_EXECUTABLE ? { executablePath: process.env.FIELD_BROWSER_EXECUTABLE } : {}) });
try {
  const page = await browser.newPage({ viewport: { width: 1024, height: 1000 } });
  const errors = [], network = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) network.push(request.url()); });
  await page.goto(pathToFileURL(pagePath).href);
  const scope = page.frames().find(frame => frame !== page.mainFrame()) ?? page.mainFrame();
  await scope.waitForFunction(() => document.getElementById('field-household-v2')?.householdRun);
  const locator = name => scope.locator(`[data-hf="${name}"]`);
  const browserRun = () => scope.evaluate(() => document.getElementById('field-household-v2').householdRun);
  const browserInput = () => scope.evaluate(() => document.getElementById('field-household-v2').householdScenario);
  const setRange = async (id, value) => scope.locator(`#${id}`).evaluate((input, next) => {
    input.value = String(next); input.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  assert.deepEqual(await browserRun(), simulateAdaptiveHousehold(createAdaptiveHousehold(material, adaptive, 'roles', 'values', 'repair')));
  assert.equal(await locator('history').locator('tr').count(), 12);
  await locator('feedback-enabled').uncheck();
  let result = await browserRun();
  assert.ok(result.history.every(row => row.willingnessClosing.A === 0.8 && row.willingnessClosing.B === 0.8));
  await locator('feedback-enabled').check();
  await locator('profile').selectOption('dismissal');
  result = await browserRun();
  assert.ok(result.history[4].willingnessClosing.B < result.history[3].willingnessClosing.B);
  await locator('person').selectOption('B');
  await scope.locator('details').first().locator('summary').click();
  await setRange('hf-learning-dismissedLoss', 0);
  const input = await browserInput();
  assert.equal(input.feedback.B.dismissedLoss, 0);
  assert.deepEqual(await browserRun(), simulateAdaptiveHousehold(input));
  await setRange('hf-learning-dismissedLoss', 0.25);
  await locator('person').selectOption('A');
  await locator('phase').selectOption('after');
  await locator('handling').selectOption('respectful');
  await setRange('hf-learning-deliveryFraction', 0.5);
  result = await browserRun();
  assert.ok(result.history.slice(4).some(row => row.evidence.some(e => e.actor === 'A' && e.kind === 'implementation-shortfall')));
  assert.deepEqual(result, simulateAdaptiveHousehold(await browserInput()));
  await setRange('hf-person-capacity', 40);
  assert.equal((await browserRun()).history[4].assumptions[0].capacity, 40);

  // Reset authored controls through their actual inputs, then compare all presets.
  await locator('orientation').selectOption('roles');
  await locator('profile').selectOption('constructive');
  for (const orientation of material.orientations) {
    await locator('orientation').selectOption(orientation.id);
    for (const change of material.changes) {
      await locator('change').selectOption(change.id);
      for (const profile of adaptive.profiles) {
        await locator('profile').selectOption(profile.id);
        assert.deepEqual(await browserRun(), simulateAdaptiveHousehold(createAdaptiveHousehold(material, adaptive, orientation.id, change.id, profile.id)));
      }
    }
  }
  await locator('period').evaluate(input => { input.value = '12'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  assert.match(await locator('detail').textContent(), /Period 12/);
  assert.ok(await locator('error').isHidden());
  assert.deepEqual(errors, []);
  if (scope === page.mainFrame()) assert.deepEqual(network, []);
  else {
    const previewUtilities = new Set([
      'https://unpkg.com/@floating-ui/core@1.7.3/dist/floating-ui.core.umd.min.js',
      'https://unpkg.com/@floating-ui/dom@1.7.4/dist/floating-ui.dom.umd.min.js',
      'https://unpkg.com/lucide@1.17.0/dist/umd/lucide.js',
    ]);
    assert.ok(network.every(url => previewUtilities.has(url)));
  }
  const prefix = process.env.FIELD_EXPLORER_SCREENSHOT_PREFIX;
  if (prefix) { mkdirSync(dirname(resolve(prefix)), { recursive: true }); await page.screenshot({ path: `${prefix}-wide.png`, fullPage: true }); }
  await page.setViewportSize({ width: 320, height: 900 });
  const width = await scope.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  assert.ok(width.scroll <= width.width + 1, JSON.stringify(width));
  if (prefix) {
    const height = await scope.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 320, height: Math.min(6000, height + 64) });
    await page.screenshot({ path: `${prefix}-narrow.png`, fullPage: true });
  }
  console.log(JSON.stringify({ browserModelParity: true, presetRuns: 100,
    changedControls: ['feedback-enabled', 'dismissedLoss', 'handling', 'deliveryFraction', 'capacity', 'period'],
    narrowWidth: width, pageErrors: errors.length, networkRequests: network.length }));
} finally { await browser.close(); }
