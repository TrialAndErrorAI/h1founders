#!/bin/bash

# Test the H1Founders phone authentication system
# Usage: ./scripts/test-auth.sh [--debug]

set -e

echo "🧪 H1Founders Phone Authentication Test Suite"
echo "=============================================="

# Check if Playwright is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js"
    exit 1
fi

# Start dev server in background if not running
if ! curl -s http://localhost:5174 > /dev/null 2>&1; then
    echo "🚀 Starting dev server..."
    bun run dev:client &
    DEV_SERVER_PID=$!
    
    # Wait for server to start
    echo "⏳ Waiting for dev server to start..."
    for i in {1..30}; do
        if curl -s http://localhost:5174 > /dev/null 2>&1; then
            echo "✅ Dev server is running at http://localhost:5174"
            break
        fi
        sleep 1
    done
    
    if ! curl -s http://localhost:5174 > /dev/null 2>&1; then
        echo "❌ Failed to start dev server"
        exit 1
    fi
else
    echo "✅ Dev server already running at http://localhost:5174"
fi

# Run tests
echo ""
echo "🎭 Running Playwright tests..."

if [[ "$1" == "--debug" ]]; then
    echo "🐞 Running in debug mode"
    npx playwright test tests/phone-auth.spec.ts --debug
else
    npx playwright test tests/phone-auth.spec.ts --reporter=list
fi

TEST_RESULT=$?

# Clean up background process if we started it
if [[ -n "$DEV_SERVER_PID" ]]; then
    echo "🧹 Cleaning up dev server (PID: $DEV_SERVER_PID)"
    kill $DEV_SERVER_PID 2>/dev/null || true
fi

if [[ $TEST_RESULT -eq 0 ]]; then
    echo ""
    echo "🎉 All tests passed! Authentication system is working correctly."
    echo ""
    echo "✅ Test Coverage:"
    echo "   • Complete authentication flow (new member)"
    echo "   • Complete authentication flow (claim existing profile)" 
    echo "   • Phone input validation"
    echo "   • OTP input validation"
    echo "   • Error handling for invalid OTP"
    echo "   • Logout functionality"
    echo "   • Authentication persistence"
    echo "   • Modal UI interactions"
    echo "   • Back button functionality"
    echo "   • Console error monitoring"
else
    echo ""
    echo "❌ Some tests failed. Check the output above for details."
    echo "💡 Run with --debug flag to see browser interactions."
fi

exit $TEST_RESULT