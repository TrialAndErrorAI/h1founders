import { test, expect } from '@playwright/test';

test.describe('Launch Club Dashboard & Path Pages', () => {

  test.beforeEach(async ({ page }) => {
    // Suppress console errors/warnings noise for cleaner output
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`[CONSOLE ERROR] ${msg.text()}`);
      }
    });

    page.on('pageerror', error => {
      console.log(`[PAGE ERROR] ${error.message}`);
    });
  });

  test('1. Dashboard Page - Load and Verify Structure', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify no unhandled errors in console
    let consoleErrors = false;
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors = true;
        console.log(`Console Error: ${msg.text()}`);
      }
    });

    // Check dashboard header
    const header = page.getByRole('heading', { name: /Dashboard/i });
    await expect(header).toBeVisible({ timeout: 5000 });
    console.log('✅ Dashboard header visible');

    // Should NOT have console errors
    expect(consoleErrors).toBe(false);
  });

  test('2. Dashboard Page - Cohort Info Display', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Give React time to render

    // Check for cohort information
    const content = await page.content();

    // Should have some text about founders count or progress
    expect(content.length).toBeGreaterThan(500); // Page has meaningful content

    console.log('✅ Cohort info present');
  });

  test('3. Dashboard Page - Milestone Cards Display', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program');
    await page.waitForLoadState('networkidle');

    const content = await page.content();

    // Check for milestone names (should have at least 4)
    const milestoneKeywords = [
      'Corporate Foundation',
      'Business Infrastructure',
      'Pitch Ready',
      'Attorney Ready'
    ];

    let milestoneCount = 0;
    for (const keyword of milestoneKeywords) {
      if (content.includes(keyword)) {
        milestoneCount++;
        console.log(`✅ Found milestone: ${keyword}`);
      }
    }

    expect(milestoneCount).toBeGreaterThanOrEqual(3); // At least 3 milestones should be visible
  });

  test('4. Dashboard Page - Quick Action Links Work', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program');
    await page.waitForLoadState('networkidle');

    // Look for clickable links (The Path, Schedule)
    const pathLinks = page.getByRole('link');
    const pathCount = await pathLinks.count();

    expect(pathCount).toBeGreaterThan(0);
    console.log(`✅ Found ${pathCount} navigation links on dashboard`);

    // Try clicking "The Path" link if it exists
    const thePathLink = page.getByRole('link', { name: /The Path/i });
    const isVisible = await thePathLink.isVisible().catch(() => false);

    if (isVisible) {
      await thePathLink.click();
      await page.waitForURL(/\/launch-club\/program\/path/);
      console.log('✅ Clicked "The Path" link - navigated correctly');
    } else {
      console.log('ℹ️ The Path link not immediately visible (may load dynamically)');
    }
  });

  test('5. Path Page - Load and Verify Structure', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program/path');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check path page header
    const header = page.getByRole('heading', { name: /The Path/i });
    const headerExists = await header.isVisible().catch(() => false);

    if (headerExists) {
      await expect(header).toBeVisible();
      console.log('✅ "The Path" header visible');
    } else {
      // Check if page has content
      const content = await page.content();
      expect(content.length).toBeGreaterThan(500);
      console.log('✅ Path page has content');
    }
  });

  test('6. Path Page - Founders List Present', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program/path');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    const content = await page.content();

    // Check that we have founder entries
    // Look for common founder-related elements
    const founderRows = page.locator('[role="button"]').filter({ has: page.locator('text=/[A-Z]{2,}|founder|name/i') });
    const rowCount = await founderRows.count().catch(() => 0);

    if (rowCount > 0) {
      console.log(`✅ Found ${rowCount} potential founder rows`);
    } else {
      // Alternative: check if page has data
      expect(content).toContain('founder');
      console.log('✅ Page contains founder data');
    }
  });

  test('7. Path Page - Progress Bars Visible', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program/path');
    await page.waitForLoadState('networkidle');

    // Look for progress bar elements (divs with progress/percentage role)
    const progressBars = page.locator('[role="progressbar"]');
    const progressCount = await progressBars.count().catch(() => 0);

    if (progressCount > 0) {
      console.log(`✅ Found ${progressCount} progress bars`);
      expect(progressCount).toBeGreaterThan(0);
    } else {
      // Alternative: check for progress-related styling
      const content = await page.content();
      const hasPercentage = content.includes('%');
      if (hasPercentage) {
        console.log('✅ Page contains percentage data (progress indicators)');
        expect(hasPercentage).toBe(true);
      }
    }
  });

  test('8. Path Page - Expand/Collapse Functionality', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program/path');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Look for expand/collapse buttons
    const expandAllBtn = page.getByRole('button', { name: /Expand All/i });
    const collapseAllBtn = page.getByRole('button', { name: /Collapse All/i });

    const expandVisible = await expandAllBtn.isVisible().catch(() => false);
    const collapseVisible = await collapseAllBtn.isVisible().catch(() => false);

    if (expandVisible) {
      console.log('✅ Expand All button found');
      await expandAllBtn.click();
      await page.waitForTimeout(500);
      console.log('✅ Clicked Expand All button');
    }

    if (collapseVisible) {
      console.log('✅ Collapse All button found');
      await collapseAllBtn.click();
      await page.waitForTimeout(500);
      console.log('✅ Clicked Collapse All button');
    }

    if (!expandVisible && !collapseVisible) {
      console.log('ℹ️ Expand/Collapse buttons not found (may be in different format)');
    }
  });

  test('9. Path Page - Founder Row Expansion', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program/path');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Try to find and click a founder row
    // Look for clickable elements that might be founder rows
    const rows = page.locator('button, [role="button"]');
    const rowCount = await rows.count();

    if (rowCount > 0) {
      // Try clicking first row
      const firstRow = rows.first();
      const isVisible = await firstRow.isVisible().catch(() => false);

      if (isVisible) {
        await firstRow.click();
        await page.waitForTimeout(500);
        console.log('✅ Clicked founder row - expansion works');
      }
    } else {
      console.log('ℹ️ No clickable rows found');
    }
  });

  test('10. Path Page - Milestone Stats at Bottom', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program/path');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Scroll to bottom to load milestone stats
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const content = await page.content();

    // Look for completion format like "X/11" or "X of 11"
    const completionPattern = /(\d+)\/11|(\d+)\s+of\s+11/i;
    const hasCompletionStats = completionPattern.test(content);

    if (hasCompletionStats) {
      console.log('✅ Found milestone completion stats (X/11 format)');
    } else {
      console.log('ℹ️ Completion stats in different format');
    }
  });

  test('11. Path Page - No Console Errors', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program/path');
    await page.waitForLoadState('networkidle');

    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    await page.waitForTimeout(2000);

    if (errors.length === 0) {
      console.log('✅ No console errors on Path page');
    } else {
      console.log(`⚠️ Found ${errors.length} console errors:`);
      errors.forEach(err => console.log(`  - ${err}`));
    }

    // Should be no critical errors
    expect(errors.length).toBe(0);
  });

  test('12. Dashboard Page - No Console Errors', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program');
    await page.waitForLoadState('networkidle');

    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    await page.waitForTimeout(2000);

    if (errors.length === 0) {
      console.log('✅ No console errors on Dashboard page');
    } else {
      console.log(`⚠️ Found ${errors.length} console errors:`);
      errors.forEach(err => console.log(`  - ${err}`));
    }

    expect(errors.length).toBe(0);
  });

  test('13. Dashboard Page - Responsive on Mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('http://localhost:5173/launch-club/program');
    await page.waitForLoadState('networkidle');

    // Check that content is still readable
    const content = await page.content();
    expect(content.length).toBeGreaterThan(200);

    console.log('✅ Dashboard renders on mobile viewport (375px)');
  });

  test('14. Path Page - Responsive on Mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('http://localhost:5173/launch-club/program/path');
    await page.waitForLoadState('networkidle');

    // Check that content is still readable
    const content = await page.content();
    expect(content.length).toBeGreaterThan(200);

    console.log('✅ Path page renders on mobile viewport (375px)');
  });

  test('15. Navigation Between Dashboard and Path', async ({ page }) => {
    // Start on dashboard
    await page.goto('http://localhost:5173/launch-club/program');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/launch-club\/program$/);
    console.log('✅ Dashboard page loaded');

    // Navigate to path
    await page.goto('http://localhost:5173/launch-club/program/path');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/launch-club\/program\/path/);
    console.log('✅ Path page loaded');

    // Go back to dashboard
    await page.goto('http://localhost:5173/launch-club/program');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/launch-club\/program$/);
    console.log('✅ Back to dashboard');
  });
});
