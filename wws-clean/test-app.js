import { chromium } from 'playwright';
import fs from 'fs';
import { fileURLToPath } from 'url';

const BASE_URL = 'http://localhost:5173';
const TEST_EMAIL = `testuser_${Date.now()}@example.com`;
const TEST_PASSWORD = 'Test123456';
const TEST_DISPLAY_NAME = 'Test User';

const results = [];

function logResult(testNumber, testName, status, details = '') {
  const result = {
    test: testNumber,
    name: testName,
    status: status,
    details: details,
    timestamp: new Date().toISOString()
  };
  results.push(result);
  console.log(`\n[TEST ${testNumber}] ${testName}: ${status}`);
  if (details) console.log(`  Details: ${details}`);
}

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  let page = await context.newPage();

  try {
    // TEST 1: Register new user
    console.log('\n========== TEST 1: Register New User ==========');
    try {
      await page.goto(`${BASE_URL}/register`);
      await page.fill('input[name="displayName"]', TEST_DISPLAY_NAME);
      await page.fill('input[name="email"]', TEST_EMAIL);
      await page.fill('input[name="password"]', TEST_PASSWORD);
      await page.fill('input[name="confirmPassword"]', TEST_PASSWORD);

      await page.click('button[type="submit"]');

      // Wait for redirect to home page (max 10 seconds)
      await page.waitForNavigation({ url: `${BASE_URL}/`, timeout: 10000 }).catch(() => {});

      const currentUrl = page.url();
      const userMenuExists = await page.locator('text=' + TEST_DISPLAY_NAME).isVisible().catch(() => false);

      if (currentUrl === BASE_URL + '/' && userMenuExists) {
        logResult(1, 'Register New User', 'PASS', `Successfully registered ${TEST_EMAIL}`);
      } else {
        logResult(1, 'Register New User', 'FAIL', `URL: ${currentUrl}, Menu visible: ${userMenuExists}`);
      }
    } catch (error) {
      logResult(1, 'Register New User', 'FAIL', error.message);
    }

    // TEST 2: Login (create new page context to test login with different user)
    console.log('\n========== TEST 2: Login ==========');
    try {
      const loginPage = await context.newPage();
      await loginPage.goto(`${BASE_URL}/login`);
      await loginPage.fill('input[name="email"]', TEST_EMAIL);
      await loginPage.fill('input[name="password"]', TEST_PASSWORD);
      await loginPage.click('button[type="submit"]');

      await loginPage.waitForNavigation({ url: `${BASE_URL}/`, timeout: 10000 }).catch(() => {});

      const currentUrl = loginPage.url();
      if (currentUrl === BASE_URL + '/') {
        logResult(2, 'Login', 'PASS', `Successfully logged in with ${TEST_EMAIL}`);
      } else {
        logResult(2, 'Login', 'FAIL', `URL: ${currentUrl}`);
      }

      // TEST 3: Logout (from this page)
      console.log('\n========== TEST 3: Logout ==========');
      try {
        // Click on user menu
        await loginPage.click('[data-testid="user-menu-trigger"]').catch(async () => {
          // Fallback: look for navbar and click
          const userMenuButton = await loginPage.locator('button:has-text("' + TEST_DISPLAY_NAME + '")').first();
          if (await userMenuButton.isVisible()) {
            await userMenuButton.click();
          }
        });

        // Wait a bit for menu to open
        await loginPage.waitForTimeout(500);

        // Look for logout button
        const logoutBtn = await loginPage.locator('button, [role="menuitem"]').filter({ hasText: 'Logout' }).first();
        if (await logoutBtn.isVisible()) {
          await logoutBtn.click();
        } else {
          throw new Error('Logout button not found');
        }

        // Wait for redirect to login page
        await loginPage.waitForNavigation({ url: /login/, timeout: 5000 }).catch(() => {});

        const redirectedUrl = loginPage.url();
        if (redirectedUrl.includes('/login')) {
          logResult(3, 'Logout', 'PASS', `Successfully logged out, redirected to ${redirectedUrl}`);
        } else {
          logResult(3, 'Logout', 'FAIL', `URL: ${redirectedUrl}, expected /login`);
        }
      } catch (error) {
        logResult(3, 'Logout', 'FAIL', error.message);
      }

      await loginPage.close();
    } catch (error) {
      logResult(2, 'Login', 'FAIL', error.message);
      logResult(3, 'Logout', 'SKIP', 'Skipped due to login failure');
    }

    // TEST 4: Session Persistence (page refresh)
    console.log('\n========== TEST 4: Session Persistence (Page Refresh) ==========');
    try {
      const persistPage = await context.newPage();
      await persistPage.goto(`${BASE_URL}/login`);
      await persistPage.fill('input[name="email"]', TEST_EMAIL);
      await persistPage.fill('input[name="password"]', TEST_PASSWORD);
      await persistPage.click('button[type="submit"]');

      // Wait for navigation and then verify on home
      await persistPage.waitForNavigation({ url: `${BASE_URL}/`, timeout: 10000 }).catch(() => {});

      // Refresh page
      await persistPage.reload({ waitUntil: 'networkidle' });

      const userMenuExists = await persistPage.locator('text=' + TEST_DISPLAY_NAME).isVisible().catch(() => false);
      const currentUrl = persistPage.url();

      if (currentUrl === BASE_URL + '/' && userMenuExists) {
        logResult(4, 'Session Persistence (Page Refresh)', 'PASS', 'User remained logged in after page refresh');
      } else {
        logResult(4, 'Session Persistence (Page Refresh)', 'FAIL', `URL: ${currentUrl}, User menu visible: ${userMenuExists}`);
      }

      await persistPage.close();
    } catch (error) {
      logResult(4, 'Session Persistence (Page Refresh)', 'FAIL', error.message);
    }

    // TEST 5: Protected Routes (redirect to login when not authenticated)
    console.log('\n========== TEST 5: Protected Routes ==========');
    try {
      const protectedPage = await context.newPage();
      // Create new context without cookies to simulate unauthenticated user
      const newContext = await browser.newContext();
      const unauthPage = await newContext.newPage();

      await unauthPage.goto(`${BASE_URL}/events`);

      // Should redirect to login
      await unauthPage.waitForNavigation({ timeout: 5000 }).catch(() => {});

      const currentUrl = unauthPage.url();
      if (currentUrl.includes('/login')) {
        logResult(5, 'Protected Routes (Unauthenticated Redirect)', 'PASS', `Correctly redirected from /events to login`);
      } else {
        logResult(5, 'Protected Routes (Unauthenticated Redirect)', 'FAIL', `URL: ${currentUrl}, expected login redirect`);
      }

      await unauthPage.close();
      await newContext.close();
    } catch (error) {
      logResult(5, 'Protected Routes (Unauthenticated Redirect)', 'FAIL', error.message);
    }

    // TEST 6: Public Routes (accessible without login)
    console.log('\n========== TEST 6: Public Routes ==========');
    try {
      const publicContext = await browser.newContext();
      const publicPage = await publicContext.newPage();

      // Test login page
      await publicPage.goto(`${BASE_URL}/login`);
      const loginTitle = await publicPage.locator('h1, h2').first().textContent();

      if (loginTitle && loginTitle.toLowerCase().includes('login')) {
        logResult(6, 'Public Routes', 'PASS', '/login is accessible without authentication');
      } else {
        logResult(6, 'Public Routes', 'FAIL', `Login page not found, title: ${loginTitle}`);
      }

      await publicPage.close();
      await publicContext.close();
    } catch (error) {
      logResult(6, 'Public Routes', 'FAIL', error.message);
    }

    // TEST 7: Firestore Document Verification
    console.log('\n========== TEST 7: Firestore Document Verification ==========');
    try {
      logResult(7, 'Firestore Document Creation', 'INFO',
        `Registered user: ${TEST_EMAIL}\n  Display Name: ${TEST_DISPLAY_NAME}\n  Note: Firestore verification requires Firebase console access or admin SDK.\n  Check Firebase Console > Firestore > Collection 'users' for document with email: ${TEST_EMAIL}`);
    } catch (error) {
      logResult(7, 'Firestore Document Verification', 'FAIL', error.message);
    }

  } finally {
    await context.close();
    await browser.close();
  }

  // Print summary
  console.log('\n\n========== TEST SUMMARY ==========');
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const info = results.filter(r => r.status === 'INFO').length;

  console.log(`\nTotal Tests: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Info: ${info}`);

  console.log('\nDetailed Results:');
  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✓' : result.status === 'FAIL' ? '✗' : 'ℹ';
    console.log(`${icon} [${result.test}] ${result.name}: ${result.status}`);
    if (result.details) console.log(`    ${result.details}`);
  });

  // Save results to file
  fs.writeFileSync('/tmp/test-results.json', JSON.stringify(results, null, 2));
  console.log('\n\nTest results saved to /tmp/test-results.json');
}

runTests().catch(console.error);
