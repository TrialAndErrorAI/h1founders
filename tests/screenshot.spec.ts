import { test } from '@playwright/test'

test('Take screenshots of Tech Stack Analyzer', async ({ page }) => {
  await page.goto('http://localhost:5173/tools/tech-stack-analyzer')
  await page.screenshot({ path: '/tmp/tech-stack-ui.png' })

  // Trigger error
  const button = page.locator('button:has-text("ANALYZE()")')
  await button.click()
  await page.waitForTimeout(2000)
  await page.screenshot({ path: '/tmp/tech-stack-error.png' })
})
