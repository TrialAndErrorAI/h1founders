import { test, expect } from '@playwright/test';

test.describe('Launch Club Pages - Visual Check', () => {

  test('Dashboard page loads and shows structure', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program');

    // Wait a bit for React to render
    await page.waitForTimeout(2000);

    // Get page info
    const title = await page.title();
    console.log('Dashboard Page Title:', title);

    // Get all text on page
    const body = await page.locator('body').textContent();

    // Check what's displayed
    const bodyText = body || '';
    console.log('Page has content:', bodyText.length > 100);

    // Check for common elements
    const hasLaunchClub = bodyText.includes('Launch');
    const hasProgram = bodyText.includes('Program') || bodyText.includes('program');
    const hasError = bodyText.toLowerCase().includes('error');
    const hasLoading = bodyText.includes('Loading');

    console.log('- Contains "Launch":', hasLaunchClub);
    console.log('- Contains "Program":', hasProgram);
    console.log('- Contains "error":', hasError);
    console.log('- Contains "Loading":', hasLoading);

    // Screenshot
    await page.screenshot({ path: '/tmp/dashboard-actual.png' });
    console.log('Dashboard screenshot at: /tmp/dashboard-actual.png');
  });

  test('Path page loads and shows structure', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club/program/path');

    // Wait for render
    await page.waitForTimeout(2000);

    // Get page info
    const title = await page.title();
    console.log('Path Page Title:', title);

    // Get all text
    const body = await page.locator('body').textContent();
    const bodyText = body || '';

    console.log('Page has content:', bodyText.length > 100);

    // Check for common elements
    const hasPath = bodyText.includes('Path') || bodyText.includes('path');
    const hasFounder = bodyText.includes('Founder') || bodyText.includes('founder');
    const hasError = bodyText.toLowerCase().includes('error');
    const hasLoading = bodyText.includes('Loading');

    console.log('- Contains "Path":', hasPath);
    console.log('- Contains "Founder/founder":', hasFounder);
    console.log('- Contains "error":', hasError);
    console.log('- Contains "Loading":', hasLoading);

    // Screenshot
    await page.screenshot({ path: '/tmp/path-actual.png' });
    console.log('Path screenshot at: /tmp/path-actual.png');
  });
});
