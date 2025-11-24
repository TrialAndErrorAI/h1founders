#!/usr/bin/env node
// Quick smoke test for Launch Club Path page
// Run: node scripts/test-path.js

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let passed = 0;
  let failed = 0;

  const check = (name, result) => {
    if (result) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  };

  try {
    // Test Dashboard
    await page.goto('http://localhost:5173/launch-club/program');
    await page.waitForLoadState('networkidle');

    check('Dashboard loads', page.url().includes('/launch-club/program'));

    const pathLink = await page.getByText('The Path').first().isVisible();
    check('The Path link visible', pathLink);

    // Test Path page navigation
    await page.click('a:has-text("The Path")');
    await page.waitForURL('**/path');
    check('Path page URL', page.url().includes('/path'));

    // Check page content has "The Path" title
    const pathTitle = await page.getByText('The Path').first().isVisible();
    check('Path title visible', pathTitle);

    // Check sidebar nav item highlighted
    const sidebarPath = await page.locator('aside').getByText('The Path').isVisible();
    check('Sidebar shows The Path', sidebarPath);

    // Check founder names visible
    const swarup = await page.getByText('Swarup').isVisible();
    check('Founders visible (Swarup)', swarup);

    // Test Expand All
    await page.click('button:has-text("Expand All")');
    await page.waitForTimeout(300);
    const tasksVisible = await page.getByText('Form Delaware C-Corp or LLC').first().isVisible();
    check('Expand All shows tasks', tasksVisible);

    // Test Collapse All
    await page.click('button:has-text("Collapse All")');
    await page.waitForTimeout(300);

    // Test single founder expand
    await page.locator('button').filter({ hasText: 'Swarup' }).click();
    await page.waitForTimeout(300);
    const singleExpand = await page.getByText('Form Delaware C-Corp or LLC').first().isVisible();
    check('Single founder expand', singleExpand);

    // Check milestone stats
    const milestoneCards = await page.locator('text=/\\/11/').count();
    check(`Milestone stat cards (${milestoneCards}/4)`, milestoneCards >= 4);

  } catch (err) {
    console.log(`\n❌ Error: ${err.message}`);
    failed++;
  }

  await browser.close();

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
})();
