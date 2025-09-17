import { test, expect } from '@playwright/test'

test.describe('H1BFounders Forum Persistence Implementation Test', () => {
  const BASE_URL = 'http://localhost:5173'

  test('verify 6 content threads are loaded from Firestore', async ({ page }) => {
    console.log('🧪 Testing forum persistence with real Firestore data...')

    await page.goto(`${BASE_URL}/forum`)

    // Wait for content to load
    await page.waitForSelector('h1:has-text("THE MATRIX FORUM")', { timeout: 15000 })
    await page.waitForTimeout(2000) // Allow content to fully load

    // Take screenshot of main forum page
    await page.screenshot({
      path: '/Users/sid/Code/te/h1founders/screenshots/forum-persistence-main.png',
      fullPage: true
    })

    // Count thread links
    const threadLinks = page.locator('a[href*="/forum/thread/"]')
    const threadCount = await threadLinks.count()

    console.log(`📊 Found ${threadCount} thread links`)

    // Should have at least 6 threads (content system imported)
    expect(threadCount).toBeGreaterThanOrEqual(6)

    // Verify specific content from the 6 imported threads
    const contentTitles = [
      'Content System Test - Forum Ready!',
      'I have been in the US for 15 years',
      'H-1B & F-1 Visa Overhaul',
      'Founding a company is absolutely legal',
      'Navigating Immigration Law',
      '2024 H1B Founders Community'
    ]

    for (const title of contentTitles) {
      const titleElement = page.locator(`text*="${title}"`).first()
      await expect(titleElement).toBeVisible()
      console.log(`✅ Found thread: ${title}`)
    }

    console.log('✅ All 6 content threads verified as loaded')
  })

  test('test thread navigation and content display', async ({ page }) => {
    console.log('🧪 Testing thread navigation...')

    await page.goto(`${BASE_URL}/forum`)
    await page.waitForSelector('h1:has-text("THE MATRIX FORUM")', { timeout: 15000 })
    await page.waitForTimeout(2000)

    // Click on the first thread
    const firstThread = page.locator('a[href*="/forum/thread/"]').first()
    const threadTitle = await firstThread.locator('h3').textContent()
    console.log(`🔗 Clicking on thread: ${threadTitle}`)

    await firstThread.click()

    // Wait for thread page to load
    await page.waitForTimeout(3000)

    // Take screenshot of thread page
    await page.screenshot({
      path: '/Users/sid/Code/te/h1founders/screenshots/forum-thread-page.png',
      fullPage: true
    })

    // Check if we're on a thread page or if it redirected
    const currentUrl = page.url()
    console.log(`📍 Current URL: ${currentUrl}`)

    // Test ESC key to go back (if implemented)
    await page.keyboard.press('Escape')
    await page.waitForTimeout(1000)

    const afterEscUrl = page.url()
    console.log(`📍 URL after ESC: ${afterEscUrl}`)

    // Should be back at forum
    await expect(page.locator('h1:has-text("THE MATRIX FORUM")')).toBeVisible()
  })

  test('test category filtering functionality', async ({ page }) => {
    console.log('🧪 Testing category filtering...')

    await page.goto(`${BASE_URL}/forum`)
    await page.waitForSelector('h1:has-text("THE MATRIX FORUM")', { timeout: 15000 })
    await page.waitForTimeout(2000)

    // Count all threads initially
    const allThreadsCount = await page.locator('a[href*="/forum/thread/"]').count()
    console.log(`📊 Total threads: ${allThreadsCount}`)

    // Test THE MATRIX category filter
    const matrixButton = page.locator('button:has-text("The Matrix")')
    if (await matrixButton.count() > 0) {
      console.log('🔍 Testing THE MATRIX category filter...')
      await matrixButton.click()
      await page.waitForTimeout(1000)

      const matrixThreadsCount = await page.locator('a[href*="/forum/thread/"]').count()
      console.log(`📊 THE MATRIX threads: ${matrixThreadsCount}`)

      // Take screenshot of filtered view
      await page.screenshot({
        path: '/Users/sid/Code/te/h1founders/screenshots/forum-matrix-category.png',
        fullPage: true
      })

      // Should show visa-related content
      await expect(page.locator('text*="Visa Overhaul"')).toBeVisible()
    }

    // Test THE CONSTRUCT category filter
    const constructButton = page.locator('button:has-text("The Construct")')
    if (await constructButton.count() > 0) {
      console.log('🔍 Testing THE CONSTRUCT category filter...')
      await constructButton.click()
      await page.waitForTimeout(1000)

      const constructThreadsCount = await page.locator('a[href*="/forum/thread/"]').count()
      console.log(`📊 THE CONSTRUCT threads: ${constructThreadsCount}`)

      // Should show orientation content
      await expect(page.locator('text*="Content System Test"')).toBeVisible()
    }

    // Reset to all categories
    await page.locator('button:has-text("ALL CATEGORIES")').click()
    await page.waitForTimeout(1000)

    const resetThreadsCount = await page.locator('a[href*="/forum/thread/"]').count()
    console.log(`📊 All categories reset: ${resetThreadsCount}`)
    expect(resetThreadsCount).toBe(allThreadsCount)
  })

  test('test search functionality', async ({ page }) => {
    console.log('🧪 Testing search functionality...')

    await page.goto(`${BASE_URL}/forum`)
    await page.waitForSelector('h1:has-text("THE MATRIX FORUM")', { timeout: 15000 })
    await page.waitForTimeout(2000)

    const searchInput = page.locator('input[placeholder*="Search"]')
    await expect(searchInput).toBeVisible()

    // Test search for "h1b"
    console.log('🔍 Searching for "h1b"...')
    await searchInput.fill('h1b')
    await page.waitForTimeout(1000)

    const h1bResults = await page.locator('a[href*="/forum/thread/"]').count()
    console.log(`📊 H1B search results: ${h1bResults}`)

    // Take screenshot of search results
    await page.screenshot({
      path: '/Users/sid/Code/te/h1founders/screenshots/forum-search-h1b.png',
      fullPage: true
    })

    expect(h1bResults).toBeGreaterThan(0)

    // Test search for "visa"
    console.log('🔍 Searching for "visa"...')
    await searchInput.clear()
    await searchInput.fill('visa')
    await page.waitForTimeout(1000)

    const visaResults = await page.locator('a[href*="/forum/thread/"]').count()
    console.log(`📊 Visa search results: ${visaResults}`)

    expect(visaResults).toBeGreaterThan(0)
    await expect(page.locator('text*="Visa Overhaul"')).toBeVisible()

    // Test search with no results
    console.log('🔍 Testing search with no results...')
    await searchInput.clear()
    await searchInput.fill('nonexistentterm12345')
    await page.waitForTimeout(1000)

    await expect(page.locator('text=No threads found')).toBeVisible()
    console.log('✅ No results message displayed correctly')
  })

  test('test authentication flow for creating threads', async ({ page }) => {
    console.log('🧪 Testing authentication requirement for thread creation...')

    await page.goto(`${BASE_URL}/forum`)
    await page.waitForSelector('h1:has-text("THE MATRIX FORUM")', { timeout: 15000 })
    await page.waitForTimeout(2000)

    // Look for JOIN_TO_POST button (for anonymous users)
    const joinToPostButton = page.locator('text=JOIN_TO_POST()')
    if (await joinToPostButton.count() > 0) {
      console.log('👤 Anonymous user detected - testing auth flow...')

      await joinToPostButton.click()
      await page.waitForTimeout(2000)

      // Should redirect to network/auth page
      const currentUrl = page.url()
      console.log(`📍 Redirected to: ${currentUrl}`)

      // Take screenshot of auth page
      await page.screenshot({
        path: '/Users/sid/Code/te/h1founders/screenshots/forum-auth-redirect.png',
        fullPage: true
      })

      // Should be on network or auth page
      expect(currentUrl).toMatch(/(network|login|auth)/)
    }

    // Check if NEW THREAD button exists and behavior
    await page.goto(`${BASE_URL}/forum`)
    await page.waitForTimeout(2000)

    const newThreadButton = page.locator('text=NEW THREAD', { hasText: /NEW THREAD/i })
    if (await newThreadButton.count() > 0) {
      console.log('🔘 NEW THREAD button found - testing click behavior...')
      await newThreadButton.click()
      await page.waitForTimeout(2000)

      const afterClickUrl = page.url()
      console.log(`📍 After NEW THREAD click: ${afterClickUrl}`)

      // Take screenshot
      await page.screenshot({
        path: '/Users/sid/Code/te/h1founders/screenshots/forum-new-thread-click.png',
        fullPage: true
      })
    } else {
      console.log('ℹ️ NEW THREAD button not found (expected for anonymous users)')
    }
  })

  test('check for console errors during forum usage', async ({ page }) => {
    console.log('🧪 Monitoring console for errors...')

    const consoleErrors = []
    const consoleWarnings = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
        console.log('❌ Console error:', msg.text())
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text())
        console.log('⚠️ Console warning:', msg.text())
      }
    })

    page.on('pageerror', error => {
      console.log('💥 Page error:', error.message)
      consoleErrors.push(`Page error: ${error.message}`)
    })

    await page.goto(`${BASE_URL}/forum`)
    await page.waitForSelector('h1:has-text("THE MATRIX FORUM")', { timeout: 15000 })
    await page.waitForTimeout(3000)

    // Interact with various forum elements
    await page.locator('input[placeholder*="Search"]').fill('test')
    await page.waitForTimeout(500)

    const categoryButtons = page.locator('button[class*="bg-"]')
    const categoryCount = await categoryButtons.count()
    if (categoryCount > 1) {
      await categoryButtons.nth(1).click()
      await page.waitForTimeout(500)
    }

    // Click on a thread if available
    const threadLinks = page.locator('a[href*="/forum/thread/"]')
    const threadCount = await threadLinks.count()
    if (threadCount > 0) {
      await threadLinks.first().click()
      await page.waitForTimeout(2000)
    }

    console.log(`📊 Console errors found: ${consoleErrors.length}`)
    console.log(`📊 Console warnings found: ${consoleWarnings.length}`)

    // Report summary
    if (consoleErrors.length === 0) {
      console.log('✅ No console errors detected during forum usage')
    } else {
      console.log('❌ Console errors detected:')
      consoleErrors.forEach(error => console.log(`  - ${error}`))
    }

    // Don't fail test for warnings, but report them
    if (consoleWarnings.length > 0) {
      console.log('⚠️ Console warnings detected:')
      consoleWarnings.forEach(warning => console.log(`  - ${warning}`))
    }

    // Only fail if there are actual errors (not warnings)
    expect(consoleErrors.length).toBe(0)
  })

  test('performance and load time check', async ({ page }) => {
    console.log('🧪 Testing forum performance...')

    const startTime = Date.now()

    await page.goto(`${BASE_URL}/forum`)
    await page.waitForSelector('h1:has-text("THE MATRIX FORUM")', { timeout: 15000 })

    const headerLoadTime = Date.now() - startTime
    console.log(`⏱️ Header load time: ${headerLoadTime}ms`)

    // Wait for content to fully load
    await page.waitForTimeout(2000)
    const contentLoadTime = Date.now() - startTime
    console.log(`⏱️ Content load time: ${contentLoadTime}ms`)

    // Count loaded elements
    const threadCount = await page.locator('a[href*="/forum/thread/"]').count()
    const buttonCount = await page.locator('button').count()
    const imageCount = await page.locator('img').count()

    console.log(`📊 Performance metrics:`)
    console.log(`  - ${threadCount} threads loaded`)
    console.log(`  - ${buttonCount} buttons rendered`)
    console.log(`  - ${imageCount} images loaded`)
    console.log(`  - Total load time: ${contentLoadTime}ms`)

    // Performance assertions
    expect(headerLoadTime).toBeLessThan(5000) // Header should load within 5s
    expect(contentLoadTime).toBeLessThan(10000) // Content should load within 10s
    expect(threadCount).toBeGreaterThanOrEqual(6) // Should have at least 6 threads

    console.log('✅ Performance metrics within acceptable ranges')
  })
})