# H1Founders Test Suite

## Phone Authentication Tests

Comprehensive automated testing for the H1Founders phone authentication system using Playwright.

### Test Coverage

The test suite validates the complete phone authentication flow with the following scenarios:

#### Core Authentication Flows
- ✅ **New Member Registration**: Complete flow from access gate to authenticated directory
- ✅ **Existing Profile Claim**: WhatsApp member claiming pre-existing profile
- ✅ **Logout Functionality**: Proper session termination and redirect

#### Input Validation
- ✅ **Phone Number Validation**: Format validation, character filtering, length limits
- ✅ **OTP Code Validation**: 6-digit requirement, numeric-only input, length limits

#### Error Handling
- ✅ **Invalid OTP**: Proper error message display and form state
- ✅ **Form Validation**: Button enable/disable states based on input completeness

#### UI/UX Testing
- ✅ **Modal Interactions**: HeadlessUI modal open/close, transitions
- ✅ **Navigation**: Back button functionality between phone/OTP screens
- ✅ **Authentication Persistence**: Session persistence across page reloads
- ✅ **Console Error Monitoring**: No JavaScript errors during flow

### Test Configuration

**Test Environment:**
- URL: `http://localhost:5174/network`
- Test phone: `555-555-5555` (formats to `+15555555555`)
- Test OTP: `000000`

**Test Data:**
- All tests use Firebase test configuration
- No real SMS sent during testing
- Deterministic test phone number and OTP

### Running Tests

#### Quick Run
```bash
# Run all auth tests
npm run test:auth

# Or directly with Playwright
npx playwright test tests/phone-auth.spec.ts
```

#### Development/Debug Mode
```bash
# Run with browser visible
npx playwright test tests/phone-auth.spec.ts --debug

# Run specific test
npx playwright test tests/phone-auth.spec.ts -g "complete phone authentication"

# Use the test script
./scripts/test-auth.sh --debug
```

#### Automated CI/CD
```bash
# Headless mode (default)
npx playwright test tests/phone-auth.spec.ts --reporter=junit
```

### Test Structure

```
tests/
├── phone-auth.spec.ts          # Main test file
├── README.md                   # This documentation
└── test-results/               # Generated test artifacts

scripts/
└── test-auth.sh               # Test runner script
```

### Test Scenarios Breakdown

#### 1. Complete Authentication Flow - New Member
- Navigate to `/network` → Access denied screen
- Click "JOIN_AS_NEW_MEMBER()" → Auth modal opens
- Enter phone number → Form validation
- Submit phone → OTP screen appears  
- Enter OTP code → Verification
- Submit OTP → Success → Network directory visible

#### 2. Complete Authentication Flow - Claim Profile
- Navigate to `/network` → Access denied screen
- Click "CLAIM_WHATSAPP_PROFILE()" → Auth modal opens
- Same flow as above but with claim-specific UI text
- Successful authentication → Network directory

#### 3. Input Validation Tests
- Phone input: partial input, invalid chars, length limits
- OTP input: partial input, invalid chars, 6-digit requirement
- Button states: disabled until valid input provided

#### 4. Error Handling
- Invalid OTP → Error message display
- Firebase errors → Graceful error handling
- Form remains in error state until resolved

#### 5. UI/UX Edge Cases
- Modal close button functionality
- Back navigation between screens
- Session persistence across page reloads
- Clean logout and redirect

### Firebase Test Configuration

Tests use Firebase Auth test phone numbers:
- Phone: `+15555555555`
- OTP: `000000` 
- No real SMS/reCAPTCHA required

### Performance Considerations

- Tests timeout after 60 seconds (Firebase operations can be slow)
- HeadlessUI transitions properly awaited
- Network idle state ensured before test execution
- Parallel test execution supported

### Maintenance

**When updating authentication flow:**
1. Update relevant test selectors if UI changes
2. Add new test cases for new features
3. Update test data if phone/OTP changes
4. Verify Firebase test configuration remains valid

**Common Issues:**
- **Modal not visible**: Check HeadlessUI transition timing
- **Phone format mismatch**: Verify formatting logic matches component
- **Firebase timeout**: Check test phone configuration
- **Button not enabled**: Verify input validation logic

### Integration with CI/CD

The test suite is designed for automated testing:
- Deterministic test data (no external dependencies)
- Comprehensive error reporting
- JUnit XML output support
- Screenshot/video capture on failures
- No manual intervention required

---

*Part of the H1Founders platform testing strategy. For questions, see project documentation or NEXUS (CPTO).*