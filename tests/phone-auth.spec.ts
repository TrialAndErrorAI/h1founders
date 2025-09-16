import { test, expect, type Page } from '@playwright/test';

test.describe('H1Founders Phone Authentication', () => {
  
  // Test data
  const TEST_PHONE = '5555555555';  // Will be formatted to +15555555555
  const TEST_OTP = '000000';
  const FORMATTED_PHONE = '(555) 555-5555';

  test.beforeEach(async ({ page }) => {
    // Set longer timeout for Firebase operations
    test.setTimeout(60000);
    
    // Navigate to network page where auth is required
    await page.goto('/network');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('complete phone authentication flow - new member', async ({ page }) => {
    // Step 1: Verify authentication gate appears
    await expect(page.locator('h1')).toContainText('ACCESS_DENIED');
    await expect(page.locator('text=Authentication required')).toBeVisible();
    
    // Step 2: Click "JOIN_AS_NEW_MEMBER()" button
    const joinButton = page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")');
    await expect(joinButton).toBeVisible();
    await joinButton.click();
    
    // Step 3: Verify auth modal opens
    // Wait for HeadlessUI transition to complete
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    await expect(page.locator('text=Join H1Founders')).toBeVisible();
    
    // Step 4: Fill in phone number
    const phoneInput = page.locator('input[type="tel"]');
    await expect(phoneInput).toBeVisible();
    await phoneInput.fill(TEST_PHONE);
    
    // Verify phone number is formatted correctly in UI
    await expect(phoneInput).toHaveValue(FORMATTED_PHONE);
    
    // Step 5: Verify send button becomes enabled
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    await expect(sendButton).toBeEnabled();
    
    // Step 6: Submit phone number form
    await sendButton.click();
    
    // Step 7: Wait for OTP screen to appear
    await expect(page.locator('text=Enter Verification Code')).toBeVisible();
    await expect(page.locator(`text=We sent a 6-digit code to ${FORMATTED_PHONE}`)).toBeVisible();
    
    // Step 8: Fill in OTP code
    const otpInput = page.locator('input[id="otp"]');
    await expect(otpInput).toBeVisible();
    await otpInput.fill(TEST_OTP);
    
    // Verify OTP is entered correctly
    await expect(otpInput).toHaveValue(TEST_OTP);
    
    // Step 9: Verify verify button becomes enabled
    const verifyButton = page.locator('button:has-text("VERIFY_AND_LOGIN()")');
    await expect(verifyButton).toBeEnabled();
    
    // Step 10: Submit OTP form
    await verifyButton.click();
    
    // Step 11: Wait for successful authentication and modal to close
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    
    // Step 12: Verify successful authentication - should see matrix forum
    await expect(page.locator('h1')).toContainText('THE MATRIX FORUM');
    await expect(page.locator('text=Welcome back')).toBeVisible();
    
    // Step 13: Verify logout button is present
    const logoutButton = page.locator('button:has-text("DISCONNECT()")');
    await expect(logoutButton).toBeVisible();
  });

  test('complete phone authentication flow - claim existing profile', async ({ page }) => {
    // Step 1: Verify authentication gate appears
    await expect(page.locator('h1')).toContainText('ACCESS_DENIED');
    
    // Step 2: Click "CLAIM_WHATSAPP_PROFILE()" button
    const claimButton = page.locator('button:has-text("CLAIM_WHATSAPP_PROFILE()")');
    await expect(claimButton).toBeVisible();
    await claimButton.click();
    
    // Step 3: Verify auth modal opens with claim profile text
    // Wait for HeadlessUI transition to complete
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    await expect(page.locator('text=Claim Your Profile')).toBeVisible();
    await expect(page.locator('text=Enter your WhatsApp number to claim your pre-existing profile')).toBeVisible();
    
    // Step 4: Complete authentication flow
    const phoneInput = page.locator('input[type="tel"]');
    await phoneInput.fill(TEST_PHONE);
    
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    await sendButton.click();
    
    await expect(page.locator('text=Enter Verification Code')).toBeVisible();
    
    const otpInput = page.locator('input[id="otp"]');
    await otpInput.fill(TEST_OTP);
    
    const verifyButton = page.locator('button:has-text("VERIFY_AND_LOGIN()")');
    await verifyButton.click();
    
    // Step 5: Verify successful authentication
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    await expect(page.locator('h1')).toContainText('THE MATRIX FORUM');
  });

  test('logout functionality', async ({ page }) => {
    // First authenticate
    await authenticateUser(page);
    
    // Verify we're logged in
    await expect(page.locator('h1')).toContainText('THE MATRIX FORUM');
    
    // Click logout button
    const logoutButton = page.locator('button:has-text("DISCONNECT()")');
    await logoutButton.click();

    // Wait for logout to complete and page state to update
    await page.waitForTimeout(2000);

    // Navigate back to network page to see access denied screen
    await page.goto('/network');
    await page.waitForLoadState('networkidle');

    // Verify we're logged out - should see access denied screen
    await expect(page.locator('h1')).toContainText('ACCESS_DENIED');
    await expect(page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")')).toBeVisible();
  });

  test('phone input validation', async ({ page }) => {
    // Open auth modal
    await page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")').click();
    // Wait for HeadlessUI transition to complete
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    const phoneInput = page.locator('input[type="tel"]');
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    
    // Test empty input
    await expect(sendButton).toBeDisabled();
    
    // Test partial input
    await phoneInput.fill('555');
    await expect(sendButton).toBeDisabled();
    
    // Test invalid characters (should be stripped) by typing sequentially
    await phoneInput.clear();
    await phoneInput.type('5555555555'); // Type 10 digits
    await expect(phoneInput).toHaveValue('(555) 555-5555');
    await expect(sendButton).toBeEnabled();
    
    // Test too long input (should be limited to 10 digits)
    await phoneInput.clear();
    await phoneInput.type('55555555551234'); // Type more than 10 digits
    await expect(phoneInput).toHaveValue('(555) 555-5555'); // Should still only show first 10
  });

  test('OTP input validation', async ({ page }) => {
    // Navigate to OTP screen
    await authenticateToOtpScreen(page);
    
    const otpInput = page.locator('input[id="otp"]');
    const verifyButton = page.locator('button:has-text("VERIFY_AND_LOGIN()")');
    
    // Test empty input
    await expect(verifyButton).toBeDisabled();
    
    // Test partial input
    await otpInput.fill('123');
    await expect(verifyButton).toBeDisabled();
    
    // Test invalid characters (should be stripped)
    await otpInput.clear();
    await otpInput.fill('12a3b4');
    await expect(otpInput).toHaveValue('1234');
    
    // Test too long input (should be limited to 6 digits)
    await otpInput.clear();
    await otpInput.fill('1234567890');
    await expect(otpInput).toHaveValue('123456');
    await expect(verifyButton).toBeEnabled();
  });

  test('error handling - invalid OTP', async ({ page }) => {
    // Navigate to OTP screen
    await authenticateToOtpScreen(page);
    
    const otpInput = page.locator('input[id="otp"]');
    const verifyButton = page.locator('button:has-text("VERIFY_AND_LOGIN()")');
    
    // Enter invalid OTP
    await otpInput.fill('123456');
    await verifyButton.click();
    
    // Should show error message (could be Firebase error or our default message)
    await expect(page.locator('.bg-red-900\\/20.border-red-500')).toBeVisible();
    await expect(page.locator('.text-red-400')).toBeVisible();
    
    // Should still be on OTP screen
    await expect(page.locator('text=Enter Verification Code')).toBeVisible();
  });

  test('back button functionality on OTP screen', async ({ page }) => {
    // Navigate to OTP screen
    await authenticateToOtpScreen(page);
    
    // Click back button
    const backButton = page.locator('button:has-text("← Change phone number")');
    await backButton.click();
    
    // Should return to phone input screen
    await expect(page.locator('text=Join H1Founders')).toBeVisible();
    await expect(page.locator('input[type="tel"]')).toBeVisible();
  });

  test('modal close functionality', async ({ page }) => {
    // Open auth modal
    await page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")').click();
    // Wait for HeadlessUI transition to complete
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    // Click close button (X icon) - look for the close button in the modal
    const closeButton = page.locator('[role="dialog"] .absolute.right-4.top-4 button');
    await closeButton.click();
    
    // Modal should close
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    
    // Should still be on access denied screen
    await expect(page.locator('h1')).toContainText('ACCESS_DENIED');
  });

  test('no console errors during authentication flow', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    // Capture console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Complete authentication flow
    await authenticateUser(page);
    
    // Verify no console errors occurred
    expect(consoleErrors).toEqual([]);
  });

  test('authentication persistence after page reload', async ({ page }) => {
    // Authenticate user
    await authenticateUser(page);
    await expect(page.locator('h1')).toContainText('THE MATRIX FORUM');

    // Reload page
    await page.reload();

    // Should still be authenticated
    await expect(page.locator('h1')).toContainText('THE MATRIX FORUM');
    await expect(page.locator('button:has-text("DISCONNECT()")')).toBeVisible();
  });

  // Helper functions
  async function authenticateUser(page: Page) {
    await page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")').click();
    // Wait for HeadlessUI transition to complete
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    const phoneInput = page.locator('input[type="tel"]');
    await phoneInput.fill(TEST_PHONE);
    
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    await sendButton.click();
    
    await expect(page.locator('text=Enter Verification Code')).toBeVisible();
    
    const otpInput = page.locator('input[id="otp"]');
    await otpInput.fill(TEST_OTP);
    
    const verifyButton = page.locator('button:has-text("VERIFY_AND_LOGIN()")');
    await verifyButton.click();
    
    // Wait for successful authentication
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  }

  async function authenticateToOtpScreen(page: Page) {
    await page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")').click();
    // Wait for HeadlessUI transition to complete
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    const phoneInput = page.locator('input[type="tel"]');
    await phoneInput.fill(TEST_PHONE);
    
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    await sendButton.click();
    
    await expect(page.locator('text=Enter Verification Code')).toBeVisible();
  }
});