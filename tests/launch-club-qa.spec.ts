import { test, expect } from '@playwright/test';

test.describe('Launch Club Pre-Deploy QA', () => {
  
  test('1. Home Page + LaunchBanner', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Wait for app to hydrate
    await page.waitForSelector('nav', { timeout: 10000 });
    
    // Verify LaunchBanner shows "LAUNCH CLUB C2" and "Dec 2"
    await expect(page.getByText('LAUNCH CLUB C2')).toBeVisible();
    await expect(page.getByText('Dec 2')).toBeVisible();
    
    // Verify banner button - use first() since there are two (desktop/mobile)
    const spotsButton = page.getByRole('button', { name: /5.?SPOTS/i }).first();
    await expect(spotsButton).toBeVisible();
    
    // Click banner button → should go to /launch-club
    await spotsButton.click();
    await expect(page).toHaveURL(/launch-club/);
  });

  test('2. Navigation', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('nav', { timeout: 10000 });
    
    // Check nav items in header (use first() for duplicates)
    const nav = page.locator('nav');
    await expect(nav.getByRole('link', { name: /CRISIS/i }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: /FORUM/i }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: /NEWSLETTER/i }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: /OFFERINGS/i }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: /LAUNCH CLUB/i }).first()).toBeVisible();
    
    // Check version
    await expect(page.getByText(/v0\.8/)).toBeVisible();
    
    // Click OFFERINGS → navigate
    await nav.getByRole('link', { name: /OFFERINGS/i }).first().click();
    await expect(page).toHaveURL(/offerings/);
    
    // Go back and click LAUNCH CLUB
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('nav', { timeout: 10000 });
    await page.locator('nav').getByRole('link', { name: /LAUNCH CLUB/i }).first().click();
    await expect(page).toHaveURL(/launch-club/);
  });

  test('3. /launch-club Page - CRITICAL checks', async ({ page }) => {
    await page.goto('http://localhost:5173/launch-club');
    
    // Wait for page content to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Give React time to render
    
    const content = await page.content();
    
    // Verify price shows "$997"
    expect(content).toContain('997');
    
    // CRITICAL: Verify NO "Current C1 Founders - Your Upgrade" section
    expect(content).not.toContain('Current C1 Founders');
    expect(content).not.toContain('Your Upgrade');
    
    // CRITICAL: Verify NO mention of "$197" or "$697"
    expect(content).not.toContain('$197');
    expect(content).not.toContain('$697');
    
    console.log('✅ /launch-club: $997 present, no C1 upgrade section, no $197/$697');
  });

  test('4. /offerings Page checks', async ({ page }) => {
    await page.goto('http://localhost:5173/offerings');
    
    // Wait for content
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const content = await page.content();
    
    // Verify Launch Club tier shows "$997"
    expect(content).toContain('997');
    
    // Verify "3-week" program
    expect(content).toContain('3-week');
    
    // Verify subtitle is "Ready to file" NOT "Ideation stage"
    expect(content).toContain('Ready to file');
    expect(content).not.toContain('Ideation stage');
    
    // Verify "Dec 2" NOT Nov 18
    expect(content).toContain('Dec 2');
    expect(content).not.toMatch(/Next cohort.*Nov 18/);
    
    console.log('✅ /offerings: $997, 3-week, Ready to file, Dec 2');
  });

  test('5. Mobile Responsive - LaunchBanner', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    
    // Banner should still be visible on mobile
    await expect(page.getByText('LAUNCH CLUB C2')).toBeVisible();
    
    console.log('✅ Mobile: LaunchBanner visible at 375px');
  });
});
