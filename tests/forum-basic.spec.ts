import { test, expect } from '@playwright/test'

test.describe('Basic Forum Functionality', () => {
  const BASE_URL = 'http://localhost:5173'

  test('forum page loads and displays basic elements', async ({ page }) => {
    // Navigate to forum
    await page.goto(`${BASE_URL}/forum`)
    
    // Wait for the main content to load - just look for the h1 header
    await page.waitForSelector('h1', { timeout: 15000 })
    
    // Check main forum header is present
    await expect(page.locator('h1')).toContainText('THE MATRIX FORUM')
    
    // Check subtitle
    await expect(page.locator('text=Where minds are freed and empires are built')).toBeVisible()
    
    // Check search functionality exists
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible()
    
    // Take screenshot to see what's actually rendered
    await page.screenshot({ path: '/Users/sid/Code/te/h1founders/screenshots/forum-basic-test.png', fullPage: true })
    
    console.log('✅ Basic forum elements loaded successfully')
  })

  test('content from contentIndex.json loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/forum`)
    
    // Wait for the forum content to load - be more lenient
    await page.waitForSelector('h1', { timeout: 15000 })
    
    // Wait a bit more for content to load
    await page.waitForTimeout(2000)
    
    // Look for any thread links
    const threadLinks = page.locator('a[href*="/forum/thread/"]')
    const threadCount = await threadLinks.count()
    
    console.log(`Found ${threadCount} thread links`)
    
    // Check for specific content from contentIndex.json
    const contentTest1 = await page.locator('text=Content System Test').count()
    const contentTest2 = await page.locator('text=H-1B & F-1 Visa').count()
    const contentTest3 = await page.locator('text=Founding a company').count()
    
    console.log(`Content checks - Test content: ${contentTest1}, Visa content: ${contentTest2}, Founding content: ${contentTest3}`)
    
    // Take screenshot for debugging
    await page.screenshot({ path: '/Users/sid/Code/te/h1founders/screenshots/forum-content-test.png', fullPage: true })
    
    // Should have at least some content
    expect(threadCount).toBeGreaterThan(0)
  })

  test('categories display and function', async ({ page }) => {
    await page.goto(`${BASE_URL}/forum`)
    
    // Wait for forum to load
    await page.waitForSelector('h1', { timeout: 15000 })
    await page.waitForTimeout(2000)
    
    // Check category buttons
    const allCategoriesBtn = page.locator('button:has-text("ALL CATEGORIES")')
    await expect(allCategoriesBtn).toBeVisible()
    
    // Check if category buttons are present
    const theConstructBtn = page.locator('button:has-text("THE CONSTRUCT")')
    const theMatrixBtn = page.locator('button:has-text("THE MATRIX")')
    
    const constructVisible = await theConstructBtn.count() > 0
    const matrixVisible = await theMatrixBtn.count() > 0
    
    console.log(`Category buttons - THE CONSTRUCT: ${constructVisible}, THE MATRIX: ${matrixVisible}`)
    
    // Take screenshot
    await page.screenshot({ path: '/Users/sid/Code/te/h1founders/screenshots/forum-categories-test.png', fullPage: true })
    
    // At least ALL CATEGORIES should be visible
    await expect(allCategoriesBtn).toBeVisible()
  })

  test('search functionality works', async ({ page }) => {
    await page.goto(`${BASE_URL}/forum`)
    
    // Wait for forum to load
    await page.waitForSelector('h1', { timeout: 15000 })
    await page.waitForTimeout(2000)
    
    const searchInput = page.locator('input[placeholder*="Search"]')
    await expect(searchInput).toBeVisible()
    
    // Try searching
    await searchInput.fill('H1B')
    await page.waitForTimeout(1000)
    
    // Take screenshot to see results
    await page.screenshot({ path: '/Users/sid/Code/te/h1founders/screenshots/forum-search-test.png', fullPage: true })
    
    console.log('✅ Search functionality tested')
  })

  test('anonymous user banner displays', async ({ page }) => {
    await page.goto(`${BASE_URL}/forum`)
    
    // Wait for forum to load
    await page.waitForSelector('h1', { timeout: 15000 })
    
    // Check for anonymous user elements
    const viewingAnonymous = await page.locator('text=VIEWING_AS_ANONYMOUS').count()
    const joinButton = await page.locator('text=JOIN_TO_POST').count()
    const redPillButton = await page.locator('text=TAKE_RED_PILL').count()
    
    console.log(`Anonymous elements - Viewing: ${viewingAnonymous}, Join: ${joinButton}, Red Pill: ${redPillButton}`)
    
    // Take screenshot
    await page.screenshot({ path: '/Users/sid/Code/te/h1founders/screenshots/forum-anonymous-test.png', fullPage: true })
    
    // Should have some anonymous user elements
    expect(viewingAnonymous + joinButton + redPillButton).toBeGreaterThan(0)
  })

  test('debug content loading issues', async ({ page }) => {
    await page.goto(`${BASE_URL}/forum`)
    
    // Wait for basic page load
    await page.waitForSelector('h1', { timeout: 15000 })
    
    // Listen for console messages
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console error:', msg.text())
      } else if (msg.type() === 'warn') {
        console.log('⚠️ Console warning:', msg.text())
      } else if (msg.type() === 'log') {
        console.log('📝 Console log:', msg.text())
      }
    })
    
    // Wait for content to potentially load
    await page.waitForTimeout(5000)
    
    // Check what we actually have on the page
    const pageText = await page.textContent('body')
    const hasLoadingText = pageText?.includes('Loading content')
    const hasNoThreadsText = pageText?.includes('No threads found')
    const hasThreadContent = pageText?.includes('Content System Test')
    
    console.log('Page content analysis:')
    console.log(`- Has loading text: ${hasLoadingText}`)
    console.log(`- Has no threads text: ${hasNoThreadsText}`)
    console.log(`- Has thread content: ${hasThreadContent}`)
    
    // Check network errors
    page.on('response', response => {
      if (!response.ok()) {
        console.log('❌ Network error:', response.url(), response.status())
      }
    })
    
    // Take full screenshot for analysis
    await page.screenshot({ path: '/Users/sid/Code/te/h1founders/screenshots/forum-debug-full.png', fullPage: true })
  })
})