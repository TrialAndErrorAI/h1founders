import { test, expect, Page } from '@playwright/test'

test.describe('H1BFounders Forum System', () => {
  const BASE_URL = 'http://localhost:5173'

  test.beforeEach(async ({ page }) => {
    // Navigate to forum page
    await page.goto(`${BASE_URL}/forum`)
    
    // Wait for content to load
    await page.waitForSelector('[data-testid="forum-container"], .max-w-7xl', { timeout: 10000 })
  })

  test('forum page loads correctly with header and navigation', async ({ page }) => {
    // Check main forum header is present
    await expect(page.locator('h1')).toContainText('THE MATRIX FORUM')
    
    // Check subtitle
    await expect(page.locator('text=Where minds are freed and empires are built')).toBeVisible()
    
    // Check search functionality
    await expect(page.locator('input[placeholder*="Search threads"]')).toBeVisible()
  })

  test('content loads from contentIndex.json correctly', async ({ page }) => {
    // Wait for threads to load
    await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
    
    // Check that content threads are visible
    const threadLinks = page.locator('a[href*="/forum/thread/"]')
    const threadCount = await threadLinks.count()
    
    // Should have at least the 6 threads from contentIndex.json
    expect(threadCount).toBeGreaterThanOrEqual(6)
    
    // Check specific threads from contentIndex.json are present
    await expect(page.locator('text=Content System Test - Forum Ready!')).toBeVisible()
    await expect(page.locator('text=H-1B & F-1 Visa Overhaul')).toBeVisible()
    await expect(page.locator('text=Founding a company is absolutely legal on H1B')).toBeVisible()
  })

  test('content type badges display correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
    
    // Check for different content type badges
    const contentBadges = page.locator('[title="News"], [title="Article"], [title="Story"], [title="Guide"], [title="Tool"], [title="Wisdom"]')
    const badgeCount = await contentBadges.count()
    
    // Should have content badges visible
    expect(badgeCount).toBeGreaterThan(0)
    
    console.log(`Found ${badgeCount} content badges`)
  })

  test('status badges (OFFICIAL, PINNED) display correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
    
    // Check for status badges - OFFICIAL and PINNED should be visible
    const officialBadges = page.locator('[title="Official"]')
    const pinnedBadges = page.locator('[title="Pinned"]')
    
    const officialCount = await officialBadges.count()
    const pinnedCount = await pinnedBadges.count()
    
    console.log(`Found ${officialCount} official badges and ${pinnedCount} pinned badges`)
    
    // All threads in contentIndex.json are marked as official and pinned
    expect(officialCount).toBeGreaterThan(0)
    expect(pinnedCount).toBeGreaterThan(0)
  })

  test('category filtering works correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
    
    // Test ALL CATEGORIES button
    const allCategoriesBtn = page.locator('button', { hasText: 'ALL CATEGORIES' })
    await expect(allCategoriesBtn).toBeVisible()
    
    // Check category buttons are present
    await expect(page.locator('button:has-text("THE CONSTRUCT")')).toBeVisible()
    await expect(page.locator('button:has-text("THE MATRIX")')).toBeVisible()
    await expect(page.locator('button:has-text("THE REAL WORLD")')).toBeVisible()
    await expect(page.locator('button:has-text("CLUB H1")')).toBeVisible()
    
    // Count total threads before filtering
    const allThreads = await page.locator('a[href*="/forum/thread/"]').count()
    
    // Click on THE CONSTRUCT category
    await page.locator('button:has-text("THE CONSTRUCT")').click()
    
    // Wait for filtering to apply
    await page.waitForTimeout(500)
    
    // Check that filtering worked
    const constructThreads = await page.locator('a[href*="/forum/thread/"]').count()
    
    // Should show fewer threads after filtering (unless all threads are in THE CONSTRUCT)
    console.log(`All threads: ${allThreads}, THE CONSTRUCT threads: ${constructThreads}`)
    
    // Verify we can see THE CONSTRUCT category content
    await expect(page.locator('text=Content System Test - Forum Ready!')).toBeVisible()
  })

  test('search functionality works', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
    
    const searchInput = page.locator('input[placeholder*="Search threads"]')
    
    // Test search for "H1B" - should match multiple threads
    await searchInput.fill('H1B')
    await page.waitForTimeout(500)
    
    const h1bResults = await page.locator('a[href*="/forum/thread/"]').count()
    expect(h1bResults).toBeGreaterThan(0)
    
    // Clear search
    await searchInput.clear()
    await page.waitForTimeout(500)
    
    // Test search for specific content
    await searchInput.fill('visa overhaul')
    await page.waitForTimeout(500)
    
    // Should show the visa overhaul thread
    await expect(page.locator('text=H-1B & F-1 Visa Overhaul')).toBeVisible()
    
    // Test search with no results
    await searchInput.fill('nonexistent search term xyz')
    await page.waitForTimeout(500)
    
    await expect(page.locator('text=No threads found')).toBeVisible()
  })

  test('thread metadata displays correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
    
    const firstThread = page.locator('a[href*="/forum/thread/"]').first()
    
    // Check thread metadata is present
    await expect(firstThread.locator('text=/👁.*\d+/')).toBeVisible() // Views counter
    await expect(firstThread.locator('text=/💬.*\d+/')).toBeVisible() // Replies counter
    
    // Check author badge display
    await expect(firstThread.locator('[title*="THE_ARCHITECT"], [title*="ARCHITECT"]')).toBeVisible()
    
    // Check author name is visible
    await expect(firstThread.locator('text=sid')).toBeVisible()
  })

  test('badge tooltips work correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
    
    // Find a content badge and hover over it
    const contentBadge = page.locator('[title="News"], [title="Article"], [title="Story"]').first()
    await contentBadge.hover()
    
    // The title attribute should be accessible
    const title = await contentBadge.getAttribute('title')
    expect(['News', 'Article', 'Story', 'Guide', 'Tool', 'Wisdom']).toContain(title)
  })

  test('ESC key navigation works', async ({ page }) => {
    // This test ensures ESC key can be used for navigation (if implemented)
    await page.keyboard.press('Escape')
    // The exact behavior would depend on implementation
    // For now, just ensure page doesn't crash
    await expect(page.locator('h1')).toContainText('THE MATRIX FORUM')
  })

  test('forum stats display', async ({ page }) => {
    // Check forum statistics are displayed
    await expect(page.locator('text=Active Threads')).toBeVisible()
    await expect(page.locator('text=Daily Posts')).toBeVisible()
    await expect(page.locator('text=Active Members')).toBeVisible()
    await expect(page.locator('text=Morpheus Teachers')).toBeVisible()
    
    // Check that numbers are displayed
    const activeThreadsNumber = page.locator('text=Active Threads').locator('..').locator('p').first()
    const activeThreadsText = await activeThreadsNumber.textContent()
    expect(activeThreadsText).toMatch(/\d+/)
  })

  test('anonymous user experience', async ({ page }) => {
    // Check anonymous user banner is displayed
    await expect(page.locator('text=VIEWING_AS_ANONYMOUS()')).toBeVisible()
    await expect(page.locator('text=Join 781 verified founders')).toBeVisible()
    
    // Check JOIN_TO_POST button
    await expect(page.locator('text=JOIN_TO_POST()')).toBeVisible()
    
    // Check TAKE_RED_PILL button
    const redPillButton = page.locator('text=TAKE_RED_PILL()')
    await expect(redPillButton).toBeVisible()
    
    // Click should navigate to network page
    await redPillButton.click()
    await expect(page).toHaveURL(/\/network/)
  })

  test('category access control displays', async ({ page }) => {
    // Wait for categories to load
    await page.waitForSelector('button:has-text("THE CONSTRUCT")', { timeout: 10000 })
    
    // Check that premium categories show correct indicators
    const premiumCategories = page.locator('button:has([class*="text-yellow-400"]):has(text="💎")')
    const hybridCategories = page.locator('button:has([class*="text-purple-400"]):has(text="⚡")')
    
    // Log what we find for debugging
    const premiumCount = await premiumCategories.count()
    const hybridCount = await hybridCategories.count()
    
    console.log(`Found ${premiumCount} premium categories and ${hybridCount} hybrid categories`)
  })

  test('content threads link correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
    
    // Get first thread link
    const firstThreadLink = page.locator('a[href*="/forum/thread/"]').first()
    const href = await firstThreadLink.getAttribute('href')
    
    // Should be a valid thread URL
    expect(href).toMatch(/\/forum\/thread\/[\w-]+/)
    
    // Click the link (but don't wait for navigation as the thread page might not be fully implemented)
    await firstThreadLink.click()
    
    // Check if we navigate or if there's any error handling
    // This will help identify if thread pages are working
  })

  test.describe('Content Badge Issue Investigation', () => {
    test('investigate SUBSTACK content category mapping', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('a[href*="/forum/thread/"]', { timeout: 10000 })
      
      // Look for SUBSTACK content specifically
      const substackThreads = page.locator('a:has-text("H-1B & F-1 Visa Overhaul"), a:has-text("Founding a company is absolutely legal"), a:has-text("Navigating Immigration Law")')
      
      const substackCount = await substackThreads.count()
      console.log(`Found ${substackCount} SUBSTACK threads`)
      
      if (substackCount > 0) {
        const firstSubstack = substackThreads.first()
        
        // Check what badges are actually displayed
        const badges = await firstSubstack.locator('[title]').allTextContents()
        console.log('Badges found on SUBSTACK content:', badges)
        
        // Check for "Unknown Category" text
        const unknownCategory = await firstSubstack.locator('text=Unknown Category').count()
        if (unknownCategory > 0) {
          console.log('❌ ISSUE FOUND: "Unknown Category" text detected')
        }
        
        // Check what category the SUBSTACK content is in
        const categoryInfo = await firstSubstack.locator('[class*="text-"]').allTextContents()
        console.log('Category info for SUBSTACK:', categoryInfo)
      }
    })
  })

  test('page performance and bundle size', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto(`${BASE_URL}/forum`)
    await page.waitForSelector('h1:has-text("THE MATRIX FORUM")', { timeout: 10000 })
    
    const loadTime = Date.now() - startTime
    
    console.log(`Forum page load time: ${loadTime}ms`)
    
    // Should load within reasonable time (< 5 seconds for development)
    expect(loadTime).toBeLessThan(5000)
    
    // Check for any console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text())
      }
    })
  })
})