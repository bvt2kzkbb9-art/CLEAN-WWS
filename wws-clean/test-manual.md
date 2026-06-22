# Application Testing Checklist

**App URL:** http://localhost:5173
**Test Email:** Use any unique email (e.g., testuser_YOUR_NAME@example.com)
**Test Password:** Test123456 (minimum 6 characters)
**Display Name:** Test User

## Environment Check

Dev Server Status: Running on http://localhost:5173
Firebase Config: Loaded from .env.local
Vite Build: Ready

---

## TEST 1: Register New User
**Expected:** User registration succeeds and redirects to home page

**Steps:**
1. Open http://localhost:5173/register in browser
2. Fill in form:
   - Display Name: "Test User"
   - Email: "testuser_<timestamp>@example.com"
   - Password: "Test123456"
   - Confirm Password: "Test123456"
3. Click "Register" button
4. Verify:
   - [ ] Form submits without validation errors
   - [ ] Redirected to home page (http://localhost:5173/)
   - [ ] User name appears in top-right user menu
   - [ ] No "Loading..." state persists

**Status:** [ ] PASS [ ] FAIL
**Details:** _________________________________

---

## TEST 2: Login
**Expected:** User can log in with email and password

**Steps:**
1. Open http://localhost:5173/login in browser (or use Register from TEST 1)
2. Fill in form:
   - Email: "testuser_<same_timestamp>@example.com"
   - Password: "Test123456"
3. Click "Login" button
4. Verify:
   - [ ] Form submits without validation errors
   - [ ] Redirected to home page (http://localhost:5173/)
   - [ ] User menu shows correct email/name

**Status:** [ ] PASS [ ] FAIL
**Details:** _________________________________

---

## TEST 3: Logout
**Expected:** User logs out and returns to login page

**Steps:**
1. Click user menu (top-right corner with user name/email)
2. Click "Logout" button
3. Verify:
   - [ ] Menu closes
   - [ ] Redirected to login page (http://localhost:5173/login)
   - [ ] User menu disappears from navbar
   - [ ] Cannot access protected routes without re-logging in

**Status:** [ ] PASS [ ] FAIL
**Details:** _________________________________

---

## TEST 4: Session Persistence (Page Refresh)
**Expected:** User remains logged in after page refresh

**Steps:**
1. Log in using TEST 2 steps
2. Verify logged in successfully with user menu visible
3. Press F5 or Cmd+R to refresh page
4. Wait for page to load (max 5 seconds)
5. Verify:
   - [ ] Page loads normally without redirect to login
   - [ ] User menu still visible with same user
   - [ ] No "Loading..." state or blank page during load
   - [ ] Can navigate to protected routes

**Status:** [ ] PASS [ ] FAIL
**Details:** _________________________________

---

## TEST 5: Protected Routes (Unauthenticated Redirect)
**Expected:** Unauthenticated users redirected to login

**Steps:**
1. Log out (TEST 3) - ensure you're completely logged out
2. Open new tab or clear browser cookies for this domain
3. Direct navigate to: http://localhost:5173/events
4. Verify:
   - [ ] Immediately redirects to login page
   - [ ] URL changes to http://localhost:5173/login
   - [ ] No error message or broken page

**Advanced: Test other protected routes:**
- [ ] http://localhost:5173/ (home) → redirects to login
- [ ] http://localhost:5173/search → redirects to login
- [ ] http://localhost:5173/messages → redirects to login
- [ ] http://localhost:5173/profile/xyz → redirects to login

**Status:** [ ] PASS [ ] FAIL
**Details:** _________________________________

---

## TEST 6: Public Routes (Accessible Without Login)
**Expected:** Login and Register pages accessible without authentication

**Steps:**
1. Log out completely (clear cookies or new private window)
2. Direct navigate to: http://localhost:5173/login
3. Verify:
   - [ ] Page loads without redirect
   - [ ] Login form is visible
   - [ ] Can enter email and password

**Then test register:**
1. Navigate to: http://localhost:5173/register
2. Verify:
   - [ ] Page loads without redirect
   - [ ] Register form is visible with all fields (Display Name, Email, Password, Confirm Password)
   - [ ] Can fill in form

**Status:** [ ] PASS [ ] FAIL
**Details:** _________________________________

---

## TEST 7: Firestore Document Verification
**Expected:** User document created in Firestore with all required fields

**Steps:**
1. Go to Firebase Console: https://console.firebase.google.com
2. Select project: "cleanwws"
3. Go to Firestore Database
4. Find Collection: "users"
5. Verify user document exists with email from TEST 1:
   - [ ] Document ID = user's UID
   - [ ] uid field present and matches ID
   - [ ] email field = registration email
   - [ ] displayName field = "Test User"
   - [ ] photoURL field = "" (empty string)
   - [ ] createdAt field = timestamp (within last minute)
   - [ ] updatedAt field = timestamp (within last minute)
   - [ ] role field = "user"
   - [ ] isActive field = true

**Status:** [ ] PASS [ ] FAIL
**Details:** _________________________________

---

## Error Handling Tests (Optional)

### TEST 8: Invalid Password During Login
**Expected:** User-friendly error message

**Steps:**
1. Go to login page
2. Enter valid registered email
3. Enter wrong password
4. Click Login
5. Verify:
   - [ ] Shows error: "Incorrect password"
   - [ ] User remains on login page
   - [ ] Can retry with correct password

**Status:** [ ] PASS [ ] FAIL

### TEST 9: Non-existent User Login
**Expected:** Appropriate error message

**Steps:**
1. Go to login page
2. Enter: nonexistent@example.com
3. Enter any password
4. Click Login
5. Verify:
   - [ ] Shows error: "User not found"
   - [ ] User remains on login page

**Status:** [ ] PASS [ ] FAIL

### TEST 10: Duplicate Email Registration
**Expected:** Cannot register with already-used email

**Steps:**
1. Go to register page
2. Use email from TEST 1 (same user)
3. Fill in different password and name
4. Click Register
5. Verify:
   - [ ] Shows error: "This email is already registered"
   - [ ] User remains on register page
   - [ ] Firestore document NOT duplicated

**Status:** [ ] PASS [ ] FAIL

---

## Browser Console Checks

After each test, open Developer Tools (F12) and check Console tab:
- [ ] No red error messages
- [ ] No warning about missing environment variables
- [ ] No TypeScript compilation errors

**Status:** [ ] PASS [ ] FAIL

---

## SUMMARY

**Critical Tests (Must PASS):**
- [x] TEST 1: Register New User
- [x] TEST 2: Login
- [x] TEST 3: Logout
- [x] TEST 4: Session Persistence
- [x] TEST 5: Protected Routes
- [x] TEST 6: Public Routes
- [x] TEST 7: Firestore Document

**Optional Tests (Nice to have):**
- [ ] TEST 8: Invalid Password Error
- [ ] TEST 9: Non-existent User Error
- [ ] TEST 10: Duplicate Email Error

---

## How to Report Results

If all tests PASS:
```
✓ All tests completed successfully
✓ Application is ready for ETAP 3
```

If any test FAILS:
1. Note the test number and exact error
2. Check browser console for detailed error messages
3. Provide feedback with:
   - Test number
   - Expected behavior
   - Actual behavior
   - Error message (if any)
   - Steps to reproduce

---

**Created:** 2026-06-22
**Project:** Weekend Warrior Social - Authentication Testing
