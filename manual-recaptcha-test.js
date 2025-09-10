const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting reCAPTCHA v3 Test...');
  
  const browser = await chromium.launch({ 
    headless: false, // Show browser to see the UI
    slowMo: 1000 // Slow down interactions
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Capture console logs
  const consoleLogs = [];
  page.on('console', (msg) => {
    const logText = `${msg.type()}: ${msg.text()}`;
    consoleLogs.push(logText);
    console.log('📝 Console:', logText);
  });
  
  // Monitor network requests for reCAPTCHA
  const recaptchaRequests = [];
  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('recaptcha') || url.includes('google.com')) {
      recaptchaRequests.push(url);
      console.log('🌐 reCAPTCHA Request:', url);
    }
  });
  
  try {
    console.log('📱 Navigating to Network page...');
    await page.goto('http://localhost:5173/network');
    await page.waitForLoadState('networkidle');
    
    // Check for access denied screen
    console.log('🔒 Looking for authentication gate...');
    await page.waitForSelector('h1:has-text("ACCESS_DENIED")', { timeout: 5000 });
    
    // Take screenshot of initial state
    await page.screenshot({ path: './screenshots/01-access-denied.png' });
    console.log('📸 Screenshot 1: Access Denied screen');
    
    // Click JOIN_AS_NEW_MEMBER
    console.log('👆 Clicking JOIN_AS_NEW_MEMBER button...');
    await page.click('button:has-text("JOIN_AS_NEW_MEMBER()")');
    
    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]', { state: 'attached' });
    
    // Take screenshot of auth modal
    await page.screenshot({ path: './screenshots/02-auth-modal.png' });
    console.log('📸 Screenshot 2: Auth modal opened');
    
    // Fill phone number
    console.log('📞 Filling phone number...');
    const phoneInput = page.locator('input[type="tel"]');
    await phoneInput.fill('5555555555');
    
    // Take screenshot with phone filled
    await page.screenshot({ path: './screenshots/03-phone-filled.png' });
    console.log('📸 Screenshot 3: Phone number filled');
    
    // Click send verification code - this should trigger reCAPTCHA v3
    console.log('🚀 Clicking SEND_VERIFICATION_CODE (triggering reCAPTCHA v3)...');
    const sendButton = page.locator('button:has-text("SEND_VERIFICATION_CODE()")');
    await sendButton.click();
    
    // Wait for reCAPTCHA processing
    console.log('⏳ Waiting for reCAPTCHA processing...');
    await page.waitForTimeout(3000);
    
    // Take screenshot during processing
    await page.screenshot({ path: './screenshots/04-during-recaptcha.png' });
    console.log('📸 Screenshot 4: During reCAPTCHA processing');
    
    // Check for visible reCAPTCHA elements (should NOT be visible)
    const recaptchaFrame = await page.locator('iframe[src*="recaptcha"]').count();
    const recaptchaCheckbox = await page.locator('[role="checkbox"]').count();
    const recaptchaContainer = await page.locator('.g-recaptcha').count();
    
    console.log('🔍 Checking for visible reCAPTCHA elements:');
    console.log(`   - reCAPTCHA iframes: ${recaptchaFrame}`);
    console.log(`   - Checkboxes: ${recaptchaCheckbox}`);
    console.log(`   - g-recaptcha containers: ${recaptchaContainer}`);
    
    // Check if we reached OTP screen
    try {
      await page.waitForSelector('text=Enter Verification Code', { timeout: 10000 });
      await page.screenshot({ path: './screenshots/05-otp-screen-success.png' });
      console.log('✅ SUCCESS: Reached OTP screen - reCAPTCHA v3 worked invisibly!');
    } catch (error) {
      console.log('❌ FAILED: Did not reach OTP screen');
      await page.screenshot({ path: './screenshots/05-failed-state.png' });
    }
    
    // Check for invisible reCAPTCHA container
    const invisibleContainer = await page.locator('#recaptcha-container').count();
    console.log(`🔍 Invisible reCAPTCHA container present: ${invisibleContainer > 0}`);
    
    // Summary
    console.log('\n📊 TEST SUMMARY:');
    console.log('================');
    console.log(`✓ Visible reCAPTCHA elements: ${recaptchaFrame + recaptchaCheckbox + recaptchaContainer === 0 ? 'NONE (Good!)' : 'FOUND (Bad!)'}`);
    console.log(`✓ reCAPTCHA requests made: ${recaptchaRequests.length}`);
    console.log(`✓ Console logs captured: ${consoleLogs.length}`);
    
    // Log reCAPTCHA specific console messages
    const recaptchaLogs = consoleLogs.filter(log => 
      log.includes('reCAPTCHA') || 
      log.includes('grecaptcha') || 
      log.includes('invisible') ||
      log.includes('token obtained')
    );
    
    console.log('\n🔍 reCAPTCHA-related logs:');
    recaptchaLogs.forEach(log => console.log(`   ${log}`));
    
    console.log('\n🌐 reCAPTCHA network requests:');
    recaptchaRequests.forEach(req => console.log(`   ${req}`));
    
    console.log('\n🎉 Test completed! Check screenshots in ./screenshots/');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    await page.screenshot({ path: './screenshots/error-state.png' });
  }
  
  // Keep browser open for manual inspection
  console.log('\n👀 Browser will stay open for 10 seconds for manual inspection...');
  await page.waitForTimeout(10000);
  
  await browser.close();
  console.log('🏁 Test completed!');
})();