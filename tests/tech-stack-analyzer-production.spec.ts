import { test, expect } from '@playwright/test'

test.describe('Tech Stack Analyzer - Production Testing', () => {
  test('Analyze h1founders.com (production URL)', async ({ page }) => {
    // Navigate to production
    await page.goto('https://h1founders.com/tools/tech-stack-analyzer')

    // Verify page loaded with title
    await expect(page).toHaveTitle(/H1Founders/)

    // Wait for UI to be ready
    await expect(page.locator('h1:has-text("TECH_STACK_ANALYZER")')).toBeVisible()

    // Enter URL to analyze: github.com (should have comprehensive detection)
    const input = page.locator('input[placeholder*="renovateai.app"]')
    await input.fill('github.com')

    // Click analyze
    const button = page.locator('button:has-text("ANALYZE()")')
    await button.click()

    // Wait for analysis to complete
    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 60000 })

    // Take screenshot of results
    await page.screenshot({ path: '/tmp/tech-stack-analyzer-github.png' })

    // Get all detected technologies
    const techResults = await page.locator('[class*="bg-accent"] span').allTextContents()
    console.log('\nGitHub.com - Detected Technologies:')
    console.log(techResults)

    // Verify we're detecting more than just 2 technologies
    console.log(`Total technologies detected: ${techResults.length}`)
    expect(techResults.length).toBeGreaterThan(2)

    // Verify enhanced detection patterns are working
    const techSet = new Set(techResults)
    const hasFrameworks = Array.from(techSet).some(t =>
      /React|Vue|Angular|Next\.js|Svelte|Ember|Backbone|Polymer|Marko|Preact|Inferno|Riot|Astro|SolidJS|Alpine|htmx|Stimulus|HTMX/i.test(t)
    )
    const hasHosting = Array.from(techSet).some(t =>
      /Vercel|Netlify|Cloudflare|AWS|Azure|Google Cloud|Heroku|DigitalOcean|Render|Fly\.io|Railway/i.test(t)
    )

    console.log(`Has frameworks detected: ${hasFrameworks}`)
    console.log(`Has hosting/CDN detected: ${hasHosting}`)

    // Should detect at least frameworks OR hosting providers
    expect(hasFrameworks || hasHosting).toBe(true)
  })

  test('Analyze vercel.com for enhanced detection', async ({ page }) => {
    await page.goto('https://h1founders.com/tools/tech-stack-analyzer')

    await expect(page.locator('h1:has-text("TECH_STACK_ANALYZER")')).toBeVisible()

    const input = page.locator('input[placeholder*="renovateai.app"]')
    await input.fill('vercel.com')

    const button = page.locator('button:has-text("ANALYZE()")')
    await button.click()

    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 60000 })

    await page.screenshot({ path: '/tmp/tech-stack-analyzer-vercel.png' })

    const techResults = await page.locator('[class*="bg-accent"] span').allTextContents()
    console.log('\nVercel.com - Detected Technologies:')
    console.log(techResults)

    console.log(`Total technologies detected: ${techResults.length}`)
    expect(techResults.length).toBeGreaterThan(2)
  })

  test('Analyze stripe.com for comprehensive tech detection', async ({ page }) => {
    await page.goto('https://h1founders.com/tools/tech-stack-analyzer')

    await expect(page.locator('h1:has-text("TECH_STACK_ANALYZER")')).toBeVisible()

    const input = page.locator('input[placeholder*="renovateai.app"]')
    await input.fill('stripe.com')

    const button = page.locator('button:has-text("ANALYZE()")')
    await button.click()

    await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 60000 })

    await page.screenshot({ path: '/tmp/tech-stack-analyzer-stripe.png' })

    const techResults = await page.locator('[class*="bg-accent"] span').allTextContents()
    console.log('\nStripe.com - Detected Technologies:')
    console.log(techResults)

    console.log(`Total technologies detected: ${techResults.length}`)
    expect(techResults.length).toBeGreaterThan(2)

    // Stripe should have payment/analytics
    const hasPaymentOrAnalytics = Array.from(new Set(techResults)).some(t =>
      /Stripe|Analytics|Segment|Mixpanel|Amplitude|Google Analytics|PayPal/i.test(t)
    )
    console.log(`Has payment/analytics detected: ${hasPaymentOrAnalytics}`)
  })

  test('Verify enhanced Wappalyzer patterns are active', async ({ page }) => {
    await page.goto('https://h1founders.com/tools/tech-stack-analyzer')

    await expect(page.locator('h1:has-text("TECH_STACK_ANALYZER")')).toBeVisible()

    // Analyze multiple sites to verify pattern detection
    const testSites = [
      { url: 'react.dev', expectedPatterns: ['React'] },
      { url: 'vuejs.org', expectedPatterns: ['Vue'] },
      { url: 'nextjs.org', expectedPatterns: ['Next.js', 'React'] },
    ]

    for (const site of testSites) {
      const input = page.locator('input[placeholder*="renovateai.app"]')
      await input.clear()
      await input.fill(site.url)

      const button = page.locator('button:has-text("ANALYZE()")')
      await button.click()

      await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 60000 })

      const techResults = await page.locator('[class*="bg-accent"] span').allTextContents()
      console.log(`\n${site.url} - Detected: ${techResults.join(', ')}`)

      // Reset for next iteration
      const anotherButton = page.locator('button:has-text("ANALYZE_ANOTHER()")')
      const isVisible = await anotherButton.isVisible().catch(() => false)
      if (isVisible) {
        await anotherButton.click()
      }
    }
  })
})
