import { test, expect, type Page } from '@playwright/test';

test.describe('reCAPTCHA v3 Invisible Implementation', () => {
  
  const TEST_PHONE = '5555555555';
  const FORMATTED_PHONE = '(555) 555-5555';
  
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for network operations
    test.setTimeout(60000);
    
    // Navigate to network page to trigger auth gate
    await page.goto('/network');
    await page.waitForLoadState('networkidle');
  });

  test('invisible reCAPTCHA v3 flow - no visible checkbox', async ({ page }) => {
    // Capture console logs to verify reCAPTCHA v3 operation
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Step 1: Open auth modal
    await page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")').click();
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    // Step 2: Fill phone number
    const phoneInput = page.locator('input[type="tel"]');
    await phoneInput.fill(TEST_PHONE);
    await expect(phoneInput).toHaveValue(FORMATTED_PHONE);
    
    // Step 3: Take screenshot before clicking send
    await page.screenshot({ path: './screenshots/before-recaptcha.png' });
    
    // Step 4: Click send verification - this should trigger invisible reCAPTCHA v3
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    await sendButton.click();
    
    // Step 5: Wait a moment for reCAPTCHA processing
    await page.waitForTimeout(2000);
    
    // Step 6: Take screenshot during processing
    await page.screenshot({ path: './screenshots/during-recaptcha.png' });
    
    // Step 7: KEY CHECK - Verify NO visible reCAPTCHA checkbox appears
    // Look for common reCAPTCHA v2 elements that should NOT be present
    const recaptchaFrame = page.locator('iframe[src*="recaptcha"]');
    const recaptchaCheckbox = page.locator('[role="checkbox"]');
    const recaptchaContainer = page.locator('.g-recaptcha');
    
    // These should not be visible (invisible reCAPTCHA)
    await expect(recaptchaFrame).not.toBeVisible();
    await expect(recaptchaCheckbox).not.toBeVisible();
    await expect(recaptchaContainer).not.toBeVisible();
    
    // Step 8: Verify smooth transition to OTP screen
    await expect(page.locator('text=Enter Verification Code')).toBeVisible({ timeout: 10000 });
    await expect(page.locator(`text=We sent a 6-digit code to ${FORMATTED_PHONE}`)).toBeVisible();
    
    // Step 9: Take screenshot of successful OTP screen
    await page.screenshot({ path: './screenshots/otp-screen-success.png' });
    
    // Step 10: Verify console logs show reCAPTCHA v3 operation
    const recaptchaLogs = consoleLogs.filter(log => 
      log.includes('reCAPTCHA v3') || 
      log.includes('invisible') ||
      log.includes('token obtained')
    );
    
    console.log('All console logs:', consoleLogs);
    console.log('reCAPTCHA-related logs:', recaptchaLogs);
    
    // Should have the success log from AuthContext
    const successLog = consoleLogs.find(log => log.includes('✅ reCAPTCHA v3 token obtained (invisible)'));
    expect(successLog).toBeDefined();
  });

  test('reCAPTCHA v3 script loading verification', async ({ page }) => {
    // Monitor network requests
    const scriptRequests: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('recaptcha') || url.includes('google.com')) {
        scriptRequests.push(url);
      }
    });

    // Open auth modal
    await page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")').click();
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    // Fill phone and trigger reCAPTCHA loading
    await page.locator('input[type="tel"]').fill(TEST_PHONE);
    await page.locator('button:has-text("SEND_VERIFICATION_CODE()")').click();
    
    // Wait for network requests to complete
    await page.waitForTimeout(3000);
    
    console.log('reCAPTCHA-related network requests:', scriptRequests);
    
    // Should load reCAPTCHA v3 script
    const recaptchaV3Request = scriptRequests.find(url => 
      url.includes('recaptcha/api.js') && url.includes('render=')
    );
    expect(recaptchaV3Request).toBeDefined();
    
    // Verify the correct site key is being used
    expect(recaptchaV3Request).toContain('6LdWL8QrAAAAAJY6ldO9vJSqSu0YsE2NiOg50P_s');
  });

  test('compare UX with previous v2 implementation', async ({ page }) => {
    const startTime = Date.now();
    
    // Open auth modal
    await page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")').click();
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    // Fill phone number
    await page.locator('input[type="tel"]').fill(TEST_PHONE);
    
    // Click send button
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    await sendButton.click();
    
    // Measure time to OTP screen
    await expect(page.locator('text=Enter Verification Code')).toBeVisible();
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.log(`Time from phone input to OTP screen: ${totalTime}ms`);
    
    // Should be faster than typical v2 reCAPTCHA (which requires user interaction)
    // Invisible v3 should complete in under 5 seconds
    expect(totalTime).toBeLessThan(5000);
    
    // Take final UX screenshot
    await page.screenshot({ path: './screenshots/improved-ux-flow.png' });
  });

  test('grecaptcha global variable verification', async ({ page }) => {
    // Open auth modal and trigger reCAPTCHA loading
    await page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")').click();
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    await page.locator('input[type="tel"]').fill(TEST_PHONE);
    await page.locator('button:has-text("SEND_VERIFICATION_CODE()")').click();
    
    // Wait for reCAPTCHA script to load
    await page.waitForTimeout(3000);
    
    // Check if grecaptcha is available
    const hasGrecaptcha = await page.evaluate(() => {
      return typeof (window as any).grecaptcha !== 'undefined';
    });
    
    console.log('grecaptcha global variable available:', hasGrecaptcha);
    expect(hasGrecaptcha).toBe(true);
    
    // Check if it has the expected v3 methods
    const hasExecuteMethod = await page.evaluate(() => {
      return typeof (window as any).grecaptcha?.execute === 'function';
    });
    
    console.log('grecaptcha.execute method available:', hasExecuteMethod);
    expect(hasExecuteMethod).toBe(true);
  });
});