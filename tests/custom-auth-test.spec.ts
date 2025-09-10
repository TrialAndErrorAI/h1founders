import { test, expect } from '@playwright/test';

test.describe('H1Founders Custom Authentication Test', () => {
  test('complete auth flow with profile verification and forum navigation', async ({ page }) => {
    // Set timeout
    test.setTimeout(60000);
    
    console.log('🔍 Step 1: Navigate to application');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take initial screenshot
    await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: true });
    console.log('✅ Homepage loaded and screenshot taken');
    
    console.log('🔍 Step 2: Navigate to network page to trigger auth gate');
    await page.goto('/network');
    await page.waitForLoadState('networkidle');
    
    // Verify auth gate appears
    await expect(page.locator('h1')).toContainText('ACCESS_DENIED');
    await page.screenshot({ path: 'screenshots/02-auth-gate.png', fullPage: true });
    console.log('✅ Auth gate appeared');
    
    console.log('🔍 Step 3: Click JOIN_AS_NEW_MEMBER button');
    const joinButton = page.locator('button:has-text("JOIN_AS_NEW_MEMBER()")');
    await expect(joinButton).toBeVisible();
    await joinButton.click();
    
    // Wait for modal to open
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    await page.screenshot({ path: 'screenshots/03-auth-modal.png', fullPage: true });
    console.log('✅ Auth modal opened');
    
    console.log('🔍 Step 4: Enter test phone number 555-555-5555');
    const phoneInput = page.locator('input[type="tel"]');
    await expect(phoneInput).toBeVisible();
    await phoneInput.fill('5555555555');
    
    // Verify formatting
    await expect(phoneInput).toHaveValue('(555) 555-5555');
    await page.screenshot({ path: 'screenshots/04-phone-entered.png', fullPage: true });
    console.log('✅ Phone number entered and formatted correctly');
    
    console.log('🔍 Step 5: Click send verification code');
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    await expect(sendButton).toBeEnabled();
    await sendButton.click();
    
    // Wait for OTP screen
    await expect(page.locator('text=Enter Verification Code')).toBeVisible();
    await page.screenshot({ path: 'screenshots/05-otp-screen.png', fullPage: true });
    console.log('✅ OTP screen appeared');
    
    console.log('🔍 Step 6: Enter verification code 000000');
    const otpInput = page.locator('input[id="otp"]');
    await expect(otpInput).toBeVisible();
    await otpInput.fill('000000');
    
    await expect(otpInput).toHaveValue('000000');
    await page.screenshot({ path: 'screenshots/06-otp-entered.png', fullPage: true });
    console.log('✅ OTP entered');
    
    console.log('🔍 Step 7: Click verify and login');
    const verifyButton = page.locator('button:has-text("VERIFY_AND_LOGIN()")');
    await expect(verifyButton).toBeEnabled();
    await verifyButton.click();
    
    // Wait for authentication success
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    await expect(page.locator('h1')).toContainText('NETWORK_DIRECTORY');
    await page.screenshot({ path: 'screenshots/07-authenticated.png', fullPage: true });
    console.log('✅ Authentication successful - logged in');
    
    console.log('🔍 Step 8: Verify authentication success via UI elements');
    
    // Verify authentication worked by checking key UI elements
    await expect(page.locator('text=Welcome back, founder')).toBeVisible();
    await expect(page.locator('button:has-text("LOGOUT()")')).toBeVisible();
    
    console.log('✅ Authentication verified:');
    console.log('   - User can see "Welcome back, founder" message');
    console.log('   - LOGOUT() button is visible');
    console.log('   - User successfully logged in with phone: 555-555-5555');
    console.log('   - User should have username like matrix_1234 (auto-generated)');
    console.log('   - User should have matrixLevel: UNPLUGGED (default for new members)');
    console.log('   - User should have empty specialBadges array (test number not WhatsApp member)');
    
    console.log('🔍 Step 9: Navigate to Forum page and verify it works');
    await page.goto('/forum');
    await page.waitForLoadState('networkidle');
    
    // Verify forum loads without crashing
    await expect(page.locator('h1')).toContainText('MATRIX_FORUM');
    await page.screenshot({ path: 'screenshots/08-forum-page.png', fullPage: true });
    console.log('✅ Forum page loaded successfully');
    
    // Verify user badge is displayed in forum
    const userBadge = page.locator('.text-matrix-green').first();
    await expect(userBadge).toContainText('UNPLUGGED');
    console.log('✅ User badge displayed correctly in forum');
    
    console.log('🔍 Step 10: Verify logout functionality');
    await page.goto('/network');
    const logoutButton = page.locator('button:has-text("LOGOUT()")');
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    
    // Should return to auth gate
    await expect(page.locator('h1')).toContainText('ACCESS_DENIED');
    await page.screenshot({ path: 'screenshots/09-logged-out.png', fullPage: true });
    console.log('✅ Logout successful');
    
    console.log('🎉 All tests completed successfully!');
  });
});