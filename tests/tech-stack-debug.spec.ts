import { test, expect } from '@playwright/test'

test('Debug: Check what tech stack analyzer actually receives', async ({ page }) => {
  // Intercept network calls to see what the analyzer gets back
  const responses: Record<string, { status: number; html: string }> = {}

  page.on('response', async (response) => {
    if (response.url().includes('/api/proxy')) {
      try {
        const text = await response.text()
        responses[response.url()] = {
          status: response.status(),
          html: text.substring(0, 500), // First 500 chars
        }
        console.log(`Proxy response status: ${response.status()}`)
        console.log(`HTML starts with: ${text.substring(0, 200)}...`)
      } catch (e) {
        console.log('Could not read response')
      }
    }
  })

  await page.goto('http://localhost:5173/tools/tech-stack-analyzer')

  // Analyze renovateai.app
  const input = page.locator('input[placeholder*="renovateai.app"]')
  await input.fill('renovateai.app')
  await page.click('button:has-text("ANALYZE()")')

  // Wait for completion
  await expect(page.locator('text=ANALYSIS_COMPLETE')).toBeVisible({ timeout: 30000 })

  // Get detected techs
  const techs = await page.locator('[class*="bg-accent"] span').allTextContents()
  console.log(`\nDetected: ${techs.length} technologies`)
  console.log(`Technologies: ${techs.join(', ')}`)

  // Check if we're seeing the full HTML
  console.log(`\nProxy responses received: ${Object.keys(responses).length}`)
  Object.entries(responses).forEach(([url, data]) => {
    console.log(`- ${url}: status=${data.status}`)
  })

  // Now let's check what's in the page
  console.log('\n=== What the analyzer sees ===')

  // Check for specific patterns that should be in renovateai.app HTML
  const pageContent = await page.content()
  const hasReact = pageContent.includes('react')
  const hasTailwind = pageContent.includes('tailwind')
  const hasFramer = pageContent.includes('framer')

  console.log(`Page contains "react": ${hasReact}`)
  console.log(`Page contains "tailwind": ${hasTailwind}`)
  console.log(`Page contains "framer": ${hasFramer}`)
})
