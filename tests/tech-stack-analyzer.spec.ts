import { test, expect } from '@playwright/test'

test.describe('Tech Stack Analyzer', () => {
  test('should load analyzer page', async ({ page }) => {
    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')

    // Check title (h1founders page)
    await expect(page).toHaveTitle(/H1Founders/)
    await expect(page.locator('text=TECH_STACK_ANALYZER')).toBeVisible()
    await expect(page.locator('text=Spy on your competitors')).toBeVisible()
  })

  test('should analyze renovateai.app successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')

    // Enter URL
    await page.fill('input[placeholder*="renovateai.app"]', 'renovateai.app')

    // Click analyze button
    await page.click('button:has-text("ANALYZE()")')

    // Wait for analysis to complete (fetching remote URLs can take time)
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 60000 })

    // List all visible tech badges
    const techBadges = await page.locator('span[class*="bg-accent"]').allTextContents()
    console.log('RenovateAI - All technologies detected:', techBadges)

    // Should find at least some technologies
    expect(techBadges.length).toBeGreaterThan(0)
  })

  test('should analyze h1founders.com successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')

    // Enter URL
    await page.fill('input[placeholder*="renovateai.app"]', 'h1founders.com')

    // Click analyze button
    await page.click('button:has-text("ANALYZE()")')

    // Wait for analysis to complete (fetching remote URLs can take time)
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 60000 })

    // List all visible tech badges
    const techBadges = await page.locator('span[class*="bg-accent"]').allTextContents()
    console.log('H1Founders - All technologies detected:', techBadges)

    // Should find at least some technologies
    expect(techBadges.length).toBeGreaterThan(0)
  })

  test('should silently handle tracking endpoint failures in dev', async ({ page }) => {
    // The tracking endpoint (D1 database) isn't available in dev
    // The app should not bubble up this error - it catches and logs it silently

    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')
    await page.fill('input[placeholder*="renovateai.app"]', 'renovateai.app')
    await page.click('button:has-text("ANALYZE()")')

    // Wait for analysis to complete
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })

    // Results should be displayed (tracking failure didn't block analysis)
    const techBadges = await page.locator('span[class*="bg-accent"]').allTextContents()
    expect(techBadges.length).toBeGreaterThan(0)
  })

  test('should handle CORS errors gracefully', async ({ page }) => {
    // Intercept network to simulate CORS failure
    await page.route('**/api/proxy**', route => {
      route.abort('blockedbyclient')
    })

    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')
    await page.fill('input[placeholder*="renovateai.app"]', 'example.com')
    await page.click('button:has-text("ANALYZE()")')

    // Should show error message
    await expect(page.locator('text=ERROR:')).toBeVisible({ timeout: 5000 })
  })

  test('should copy results to clipboard', async ({ page, context }) => {
    // Grant clipboard permission
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')
    await page.fill('input[placeholder*="renovateai.app"]', 'renovateai.app')
    await page.click('button:has-text("ANALYZE()")')

    // Wait for analysis
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })

    // Click copy button
    await page.click('button:has-text("COPY_RESULTS")')

    // Verify button shows "COPIED"
    await expect(page.locator('button:has-text("✓ COPIED!")')).toBeVisible()
  })

  test('should reset form with ANALYZE_ANOTHER button', async ({ page }) => {
    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')
    await page.fill('input[placeholder*="renovateai.app"]', 'renovateai.app')
    await page.click('button:has-text("ANALYZE()")')

    // Wait for analysis
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })

    // Click reset button
    await page.click('button:has-text("ANALYZE_ANOTHER")')

    // Input should be cleared
    const inputValue = await page.inputValue('input[placeholder*="renovateai.app"]')
    expect(inputValue).toBe('')

    // Results should be hidden
    await expect(page.locator('text=ANALYSIS_COMPLETE')).not.toBeVisible()
  })
})
