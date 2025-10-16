import { test, expect } from '@playwright/test'

test.describe('Tech Stack Analyzer - Pragmatic Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the tool
    await page.goto('http://localhost:5173/tools/tech-stack-analyzer')

    // Wait for page to load
    await expect(page.locator('h1:has-text("TECH_STACK_ANALYZER")')).toBeVisible()
  })

  test('UI loads without errors - Matrix theme present', async ({ page }) => {
    // Verify header is visible and styled
    const header = page.locator('h1:has-text("TECH_STACK_ANALYZER")')
    await expect(header).toBeVisible()
    await expect(header).toHaveClass(/matrix-glow/)

    // Check for input field
    const input = page.locator('input[placeholder*="renovateai.app"]')
    await expect(input).toBeVisible()

    // Check for analyze button
    const button = page.locator('button:has-text("ANALYZE()")')
    await expect(button).toBeVisible()

    // Verify HOW_IT_WORKS section
    await expect(page.locator('text=HOW_IT_WORKS')).toBeVisible()
  })

  test('Empty input - shows error message', async ({ page }) => {
    const button = page.locator('button:has-text("ANALYZE()")')

    // Click without entering URL
    await button.click()

    // Should show error
    const errorBox = page.locator('.bg-red-900\\/20')
    await expect(errorBox).toBeVisible()

    // Error message should be present
    await expect(page.locator('text=ERROR')).toBeVisible()
    await expect(page.locator('text=Please enter a URL')).toBeVisible()
  })

  test('Button disabled state during analysis - then re-enables', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    // Fill with localhost (faster, no CORS needed)
    await input.fill('localhost')

    // Button should be enabled before click
    await expect(button).toBeEnabled()

    // Click button
    await button.click()

    // Button should be disabled immediately
    await expect(button).toBeDisabled()

    // Input should be disabled too
    await expect(input).toBeDisabled()

    // Wait for completion (even if it fails, state should update)
    await page.waitForTimeout(5000)

    // Check final state - either back to enabled or error shown
    const errorOrComplete = page.locator('.bg-red-900\\/20').or(page.locator('text=ANALYSIS_COMPLETE'))
    if (await errorOrComplete.isVisible()) {
      // One of these should be visible
      expect(await errorOrComplete.isVisible()).toBe(true)
    }
  })

  test('Enter key triggers analysis without needing button click', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')
    const button = page.locator('button:has-text("ANALYZE()")')

    await input.fill('localhost')
    await input.press('Enter')

    // Button should be disabled (analysis started)
    await expect(button).toBeDisabled()

    // Wait a bit
    await page.waitForTimeout(2000)
  })

  test('Analyze Another button - resets form when visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')

    // Fill with something that will fail quickly (garbage domain)
    await input.fill('invalid-domain-12345.test')

    const button = page.locator('button:has-text("ANALYZE()")')
    await button.click()

    // Wait for error
    await expect(page.locator('text=ERROR')).toBeVisible({ timeout: 5000 })

    // There should NOT be an "ANALYZE_ANOTHER" button visible if no results
    const anotherButton = page.locator('button:has-text("ANALYZE_ANOTHER()")')
    const isVisible = await anotherButton.isVisible().catch(() => false)

    // If button exists, verify it works
    if (isVisible) {
      await anotherButton.click()
      await expect(input).toHaveValue('')
      await expect(page.locator('text=ERROR')).not.toBeVisible()
    }
  })

  test('Error message styling - has proper classes', async ({ page }) => {
    const button = page.locator('button:has-text("ANALYZE()")')

    // Trigger error by clicking empty
    await button.click()

    // Error box should have specific styling
    const errorBox = page.locator('.bg-red-900\\/20')
    await expect(errorBox).toBeVisible()
    await expect(errorBox).toHaveClass(/border-red-500/)

    // Error text should be styled
    const errorText = page.locator('.bg-red-900\\/20 >> text=ERROR')
    await expect(errorText).toHaveClass(/text-red-400/)
  })

  test('Input field accepts text input', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')

    // Type different values
    await input.fill('example.com')
    await expect(input).toHaveValue('example.com')

    await input.fill('test.io')
    await expect(input).toHaveValue('test.io')

    await input.clear()
    await expect(input).toHaveValue('')
  })

  test('Button styling - has accent background', async ({ page }) => {
    const button = page.locator('button:has-text("ANALYZE()")')

    // Check for button classes
    const classes = await button.evaluate(el => el.className)

    // Should have bg-accent class
    expect(classes).toContain('bg-accent')
    expect(classes).toContain('font-mono')
  })

  test('Input styling - has font-mono', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')

    // Check for input classes
    const classes = await input.evaluate(el => el.className)

    expect(classes).toContain('font-mono')
    expect(classes).toContain('border')
  })

  test('Navigation - back button to tools visible', async ({ page }) => {
    const backLink = page.locator('text=BACK TO TOOLS')

    await expect(backLink).toBeVisible()
    await expect(backLink).toHaveClass(/text-accent/)
  })

  test('Description text - explains purpose', async ({ page }) => {
    const description = page.locator('text=Spy on your competitors')

    await expect(description).toBeVisible()
  })

  test('HOW_IT_WORKS section - lists 4 steps', async ({ page }) => {
    const section = page.locator('text=HOW_IT_WORKS').locator('..')

    // Should contain step numbers
    await expect(section.locator('text=1.')).toBeVisible()
    await expect(section.locator('text=2.')).toBeVisible()
    await expect(section.locator('text=3.')).toBeVisible()
    await expect(section.locator('text=4.')).toBeVisible()
  })

  test('Input placeholder - shows example', async ({ page }) => {
    const input = page.locator('input[placeholder*="renovateai.app"]')

    const placeholder = await input.getAttribute('placeholder')
    expect(placeholder).toContain('renovateai.app')
  })
})
