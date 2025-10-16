import { test, expect } from '@playwright/test'

test.describe('Tech Stack Analyzer Tool', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the tool
    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')

    // Wait for page to load
    await expect(page).toHaveTitle(/.*/)
  })

  test('1. Basic functionality - analyze renovateai.app', async ({ page }) => {
    // Verify page loaded
    await expect(page.locator('h1:has-text("TECH_STACK_ANALYZER")')).toBeVisible()

    // Find input and button
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    // Enter URL
    await input.fill('renovateai.app')

    // Click analyze
    await button.click()

    // Verify analyzing state
    await expect(button).toContainText('ANALYZING...')
    await expect(button).toBeDisabled()

    // Wait for results (with timeout)
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })

    // Verify results display
    await expect(page.locator('text=technologies detected')).toBeVisible()

    // Verify button returns to normal
    await expect(button).toContainText('ANALYZE()')
    await expect(button).toBeEnabled()
  })

  test('2. Different URLs - stripe.com', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    await input.fill('stripe.com')
    await button.click()

    // Wait for completion
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })

    // Should detect Stripe's tech
    const results = page.locator('.bg-background-secondary')
    await expect(results.first()).toBeVisible()
  })

  test('3. Different URLs - vercel.com', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    await input.fill('vercel.com')
    await button.click()

    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })
  })

  test('4. Different URLs - github.com', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    await input.fill('github.com')
    await button.click()

    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })
  })

  test('5. Empty input - should show error', async ({ page }) => {
    const button = page.locator('button:has-text("ANALYZE()")')

    // Click without entering URL
    await button.click()

    // Should show error
    await expect(page.locator('text=ERROR')).toBeVisible()
    await expect(page.locator('text=Please enter a URL')).toBeVisible()
  })

  test('6. Invalid URL - garbage input', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    await input.fill('!!!invalid@@@garbage###url')
    await button.click()

    // Should either show error or attempt fetch
    // Could timeout or show error message
    const errorOrComplete = page.locator('text=ERROR').or(page.locator('text=ANALYSIS_COMPLETE'))
    await expect(errorOrComplete).toBeVisible({ timeout: 10000 })
  })

  test('7. Loading state verification', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    await input.fill('google.com')
    await button.click()

    // Verify loading state immediately
    await expect(button).toContainText('ANALYZING...')
    await expect(button).toBeDisabled()
    await expect(input).toBeDisabled()
  })

  test('8. Results display - technology categories visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    await input.fill('airbnb.com')
    await button.click()

    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })

    // Check for category headers
    const categoryHeaders = [
      'Frameworks',
      'Analytics & Tracking',
      'Hosting & CDN',
      'Content Management',
      'Payment Processing',
      'Marketing & Email',
      'Chat & Support',
      'A/B Testing'
    ]

    // At least some categories should be present
    const pageContent = await page.content()
    let foundCount = 0
    for (const category of categoryHeaders) {
      if (pageContent.includes(category)) foundCount++
    }

    // Should find at least one category
    expect(foundCount).toBeGreaterThan(0)
  })

  test('9. UI Theme verification - Matrix styling', async ({ page }) => {
    // Check for Matrix theme classes
    const header = page.locator('h1:has-text("TECH_STACK_ANALYZER")')
    await expect(header).toHaveClass(/matrix-glow/)

    // Check for font-mono usage
    const labels = page.locator('label:has-text("COMPETITOR_URL")')
    await expect(labels.first()).toHaveClass(/font-mono/)
  })

  test('10. Analyze Another button - resets form', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    // Do first analysis
    await input.fill('example.com')
    await button.click()

    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })

    // Click "ANALYZE_ANOTHER()"
    const anotherButton = page.locator('button:has-text("ANALYZE_ANOTHER()")')
    await anotherButton.click()

    // Verify results cleared
    await expect(page.locator('text=ANALYSIS_COMPLETE')).not.toBeVisible()

    // Verify input is empty
    await expect(input).toHaveValue('')
  })

  test('11. Error message styling', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    await button.click()

    // Check error styling
    const errorBox = page.locator('.bg-red-900\\/20')
    await expect(errorBox).toBeVisible()
  })

  test('12. Enter key triggers analyze', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')

    await input.fill('example.com')
    await input.press('Enter')

    // Should start analyzing
    const button = page.locator('button:has-text("ANALYZING...")')
    await expect(button).toBeVisible()

    // Wait for completion
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 10000 })
  })
})
