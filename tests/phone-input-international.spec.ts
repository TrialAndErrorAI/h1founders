import { test, expect } from '@playwright/test';

test.describe('Phone Authentication Input - International Numbers', () => {

  test('should support typing international phone numbers correctly', async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:5173');
    await expect(page).toHaveTitle(/H1Founders/);

    // Find and click the sign-in/join button to open auth modal
    const authButton = page.locator('button').filter({ hasText: /join|sign.?in|get.?started/i }).first();
    await expect(authButton).toBeVisible();
    await authButton.click();

    // Wait for auth modal to appear
    await page.waitForSelector('[data-testid="phone-input"], input[type="tel"], input[placeholder*="phone"]', { timeout: 5000 });

    // Find the phone input field (try multiple selectors)
    const phoneInput = page.locator('[data-testid="phone-input"]').or(
      page.locator('input[type="tel"]')
    ).or(
      page.locator('input[placeholder*="phone" i]')
    ).or(
      page.locator('input[name*="phone" i]')
    ).first();

    await expect(phoneInput).toBeVisible();

    // Test 1: Indian number (+91)
    console.log('Testing Indian number: +919876543210');
    await phoneInput.clear();
    await phoneInput.fill('+919876543210');

    // Verify the full number was entered
    const indianValue = await phoneInput.inputValue();
    console.log('Indian number input value:', indianValue);
    expect(indianValue).toBe('+919876543210');

    // Test 2: Turkish number (+90)
    console.log('Testing Turkish number: +905346859884');
    await phoneInput.clear();
    await phoneInput.fill('+905346859884');

    const turkishValue = await phoneInput.inputValue();
    console.log('Turkish number input value:', turkishValue);
    expect(turkishValue).toBe('+905346859884');

    // Test 3: US number without country code
    console.log('Testing US number: 5555555555');
    await phoneInput.clear();
    await phoneInput.fill('5555555555');

    const usValue = await phoneInput.inputValue();
    console.log('US number input value:', usValue);
    expect(usValue).toBe('5555555555');

    // Test 4: Test typing character by character for +91 to verify no blocking
    console.log('Testing character-by-character typing for +91...');
    await phoneInput.clear();

    // Type each character one by one
    await phoneInput.type('+');
    let currentValue = await phoneInput.inputValue();
    console.log('After typing "+": ', currentValue);
    expect(currentValue).toBe('+');

    await phoneInput.type('9');
    currentValue = await phoneInput.inputValue();
    console.log('After typing "9": ', currentValue);
    expect(currentValue).toBe('+9');

    await phoneInput.type('1');
    currentValue = await phoneInput.inputValue();
    console.log('After typing "1": ', currentValue);
    expect(currentValue).toBe('+91');

    // Now try typing digits after +91
    await phoneInput.type('9876543210');
    currentValue = await phoneInput.inputValue();
    console.log('After typing full number: ', currentValue);
    expect(currentValue).toBe('+919876543210');

    // Test 5: Test focus behavior - ensure input doesn't lose focus during typing
    await phoneInput.clear();
    await phoneInput.focus();
    expect(await phoneInput.evaluate(el => el === document.activeElement)).toBe(true);

    await phoneInput.type('+91');
    // Verify focus is still on the input
    expect(await phoneInput.evaluate(el => el === document.activeElement)).toBe(true);

    await phoneInput.type('9876543210');
    const finalValue = await phoneInput.inputValue();
    console.log('Final value after focus test:', finalValue);
    expect(finalValue).toBe('+919876543210');

    // Test 6: Check input properties that might affect typing
    const inputType = await phoneInput.getAttribute('type');
    const inputMode = await phoneInput.getAttribute('inputmode');
    const pattern = await phoneInput.getAttribute('pattern');
    const maxLength = await phoneInput.getAttribute('maxlength');

    console.log('Input properties:');
    console.log('- type:', inputType);
    console.log('- inputmode:', inputMode);
    console.log('- pattern:', pattern);
    console.log('- maxlength:', maxLength);

    // Take a screenshot for visual verification
    await page.screenshot({
      path: '/Users/sid/Code/te/h1founders/test-results/phone-input-test.png',
      fullPage: true
    });
  });

  test('should handle edge cases and special characters', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Open auth modal
    const authButton = page.locator('button').filter({ hasText: /join|sign.?in|get.?started/i }).first();
    await authButton.click();

    const phoneInput = page.locator('[data-testid="phone-input"]').or(
      page.locator('input[type="tel"]')
    ).or(
      page.locator('input[placeholder*="phone" i]')
    ).first();

    await expect(phoneInput).toBeVisible();

    // Test special characters and formatting
    const testCases = [
      { input: '+1 (555) 123-4567', description: 'US formatted number' },
      { input: '+44 20 7946 0958', description: 'UK number with spaces' },
      { input: '+33-1-42-86-83-26', description: 'French number with dashes' },
      { input: '+81-3-5784-1110', description: 'Japanese number' },
      { input: '+86 138 0013 8000', description: 'Chinese number' }
    ];

    for (const testCase of testCases) {
      console.log(`Testing ${testCase.description}: ${testCase.input}`);
      await phoneInput.clear();
      await phoneInput.fill(testCase.input);

      const value = await phoneInput.inputValue();
      console.log(`Result: ${value}`);

      // Verify that the input accepts the value (even if it gets formatted)
      expect(value.length).toBeGreaterThan(0);
    }
  });
});