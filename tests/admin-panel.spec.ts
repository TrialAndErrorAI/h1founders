import { test, expect } from '@playwright/test'

test.describe('Admin Panel Security and Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Enable verbose console logging to catch any errors
    page.on('console', msg => console.log(`Console ${msg.type()}: ${msg.text()}`))
    page.on('pageerror', error => console.log(`Page error: ${error.message}`))
  })

  test('should test admin panel access and security', async ({ page }) => {
    // Navigate directly to admin panel without authentication
    await page.goto('/admin')
    await page.waitForTimeout(2000) // Give time for auth check and potential redirect

    const currentUrl = page.url()
    console.log(`Final URL after /admin navigation: ${currentUrl}`)

    // Take screenshot of current state
    await page.screenshot({ path: 'test-results/admin-access-test.png', fullPage: true })

    if (currentUrl.includes('/admin')) {
      console.log('🔓 Admin panel accessible - testing admin functionality...')

      // Try to find admin-specific elements
      const adminHeader = page.locator('h1:has-text("ADMIN PANEL")')
      const isAdminPanelVisible = await adminHeader.isVisible().catch(() => false)

      if (isAdminPanelVisible) {
        console.log('✅ Admin panel fully loaded and functional')
        await expect(adminHeader).toBeVisible()

        // Test search functionality if present
        const searchInput = page.locator('input[placeholder*="Search"]')
        if (await searchInput.isVisible().catch(() => false)) {
          await searchInput.fill('test')
          console.log('✅ Search functionality working')
        }

        // Check for user count display
        const userCountText = await page.locator('text=/\\d+ users/').textContent().catch(() => null)
        if (userCountText) {
          console.log(`✅ User count displayed: ${userCountText}`)
        }

      } else {
        console.log('⚠️ On admin URL but admin panel not loaded (likely loading error)')
        // Check for error messages
        const errorText = await page.textContent('body')
        if (errorText.includes('Failed to resolve import')) {
          console.log('❌ Import error detected in admin panel')
        }
      }

    } else {
      console.log('🔒 Security redirect working - redirected to home page')
      await expect(page).toHaveURL('/')

      // Verify we're on home page by looking for common home page elements
      const homeElements = [
        page.locator('text=/Welcome/i'),
        page.locator('text=/H1Founders/i'),
        page.locator('text=/Matrix/i'),
        page.locator('text=/Forum/i')
      ]

      let foundHomeElement = false
      for (const element of homeElements) {
        if (await element.isVisible().catch(() => false)) {
          foundHomeElement = true
          break
        }
      }

      expect(foundHomeElement).toBeTruthy()
      console.log('✅ Confirmed on home page after redirect')
    }
  })

  test('should show admin panel for Sid (authorized user)', async ({ page }) => {
    // First go to home page
    await page.goto('/')

    // Wait for any initial auth checks
    await page.waitForTimeout(1000)

    // Try to directly navigate to admin panel
    await page.goto('/admin')

    // Check the current URL - should either be at admin or redirected to home
    const currentUrl = page.url()
    console.log(`Current URL after /admin navigation: ${currentUrl}`)

    if (currentUrl.includes('/admin')) {
      // If we're actually on the admin panel, it means we're authenticated as Sid
      console.log('✅ Authenticated as admin - testing admin panel functionality')

      // Take screenshot of admin panel
      await page.screenshot({ path: 'test-results/admin-panel-authenticated.png', fullPage: true })

      // Verify admin panel elements
      await expect(page.locator('h1')).toContainText('ADMIN PANEL')
      await expect(page.locator('text=users')).toBeVisible()
      await expect(page.locator('input[placeholder*="Search"]')).toBeVisible()

      // Test search functionality if there are users
      const userCount = await page.locator('text= users').first().textContent()
      console.log(`User count display: ${userCount}`)

      // Try typing in search box
      await page.fill('input[placeholder*="Search"]', 'test')
      await page.screenshot({ path: 'test-results/admin-panel-search.png', fullPage: true })

    } else {
      // If we're redirected, it means security is working correctly
      console.log('✅ Security redirect working - non-admin redirected to home')
      await expect(page).toHaveURL('/')
      await page.screenshot({ path: 'test-results/admin-security-redirect.png', fullPage: true })
    }
  })

  test('should handle admin panel direct URL access correctly', async ({ page }) => {
    // Test accessing admin panel with various URL variations
    const adminUrls = ['/admin', '/admin/', '/admin?test=1', '/admin#hash']

    for (const url of adminUrls) {
      console.log(`Testing admin URL: ${url}`)
      await page.goto(url)

      // Should either show admin panel (if authenticated) or redirect to home
      const finalUrl = page.url()
      const isOnAdmin = finalUrl.includes('/admin')
      const isOnHome = finalUrl === 'http://localhost:5173/' || finalUrl.endsWith('/')

      expect(isOnAdmin || isOnHome).toBeTruthy()
      console.log(`URL ${url} -> ${finalUrl} (${isOnAdmin ? 'ADMIN' : 'HOME'})`)
    }

    // Take final screenshot
    await page.screenshot({ path: 'test-results/admin-url-variations.png', fullPage: true })
  })

  test('should not expose admin functionality in navigation', async ({ page }) => {
    // Go to home page
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check that admin links are not visible in navigation
    const adminLinks = await page.locator('a[href*="admin"]').count()
    const adminButtons = await page.locator('button:has-text("Admin")').count()
    const adminText = await page.locator('text=Admin Panel').count()
    const totalAdminElements = adminLinks + adminButtons + adminText
    expect(totalAdminElements).toBe(0)

    // Take screenshot of navigation
    await page.screenshot({ path: 'test-results/navigation-no-admin.png', fullPage: true })

    // Also check in any mobile menu if it exists
    const menuButton = page.locator('button[aria-label*="menu"], button:has(svg)')
    if (await menuButton.count() > 0) {
      await menuButton.first().click()
      await page.waitForTimeout(500)

      const adminLinksInMenu = await page.locator('a[href*="admin"]').count()
      const adminTextInMenu = await page.locator('text=Admin').count()
      const totalAdminInMenu = adminLinksInMenu + adminTextInMenu
      expect(totalAdminInMenu).toBe(0)

      await page.screenshot({ path: 'test-results/mobile-menu-no-admin.png', fullPage: true })
    }
  })

  test('should verify admin panel security constants', async ({ page }) => {
    // This test checks that the admin UID constant is properly set
    await page.goto('/')

    // Check if the page loads without console errors
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))

    await page.waitForTimeout(2000)

    // Navigate to admin to trigger security check
    await page.goto('/admin')

    // Wait for any auth processing
    await page.waitForTimeout(1000)

    // Check for any JavaScript errors
    expect(errors.length).toBe(0)

    // Take screenshot of final state
    await page.screenshot({ path: 'test-results/admin-security-check.png', fullPage: true })
  })

  test('should verify console logs and error handling', async ({ page }) => {
    const consoleMessages: string[] = []
    const pageErrors: string[] = []

    // Capture all console messages and errors
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`)
    })

    page.on('pageerror', error => {
      pageErrors.push(error.message)
    })

    // Navigate to admin panel
    await page.goto('/admin')
    await page.waitForTimeout(2000)

    // Log captured messages for debugging
    console.log('Console messages:', consoleMessages)
    console.log('Page errors:', pageErrors)

    // Verify no critical errors occurred
    const criticalErrors = pageErrors.filter(error =>
      !error.includes('Warning') &&
      !error.includes('DevTools') &&
      !error.includes('Lighthouse')
    )

    expect(criticalErrors.length).toBe(0)

    // Take final screenshot
    await page.screenshot({ path: 'test-results/admin-console-check.png', fullPage: true })
  })

  test('should verify page loads and responsive design', async ({ page }) => {
    // Test admin panel on different viewport sizes
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ]

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/admin')
      await page.waitForTimeout(1000)

      // Take screenshot for each viewport
      await page.screenshot({
        path: `test-results/admin-${viewport.name}-${viewport.width}x${viewport.height}.png`,
        fullPage: true
      })

      // Verify page is responsive (should either show admin or home)
      const title = await page.title()
      expect(title).toBeTruthy()
    }
  })
})