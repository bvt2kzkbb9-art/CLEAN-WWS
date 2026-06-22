#!/bin/bash

echo "========== Application Health Check =========="
echo ""

# Check if dev server is running
echo "[CHECK 1] Dev Server Status"
if curl -s http://localhost:5173/ > /dev/null 2>&1; then
  echo "✓ Dev server is running on http://localhost:5173"
else
  echo "✗ Dev server is NOT running"
  exit 1
fi

echo ""
echo "[CHECK 2] Environment Configuration"
if [ -f ".env.local" ]; then
  echo "✓ .env.local file exists"

  # Check for required Firebase variables
  REQUIRED_VARS=(
    "VITE_FIREBASE_API_KEY"
    "VITE_FIREBASE_AUTH_DOMAIN"
    "VITE_FIREBASE_PROJECT_ID"
    "VITE_FIREBASE_STORAGE_BUCKET"
    "VITE_FIREBASE_MESSAGING_SENDER_ID"
    "VITE_FIREBASE_APP_ID"
  )

  ALL_SET=true
  for var in "${REQUIRED_VARS[@]}"; do
    if grep -q "^${var}=" .env.local; then
      VALUE=$(grep "^${var}=" .env.local | cut -d'=' -f2)
      if [ -z "$VALUE" ]; then
        echo "  ✗ $var is empty"
        ALL_SET=false
      else
        echo "  ✓ $var is configured"
      fi
    else
      echo "  ✗ $var is missing"
      ALL_SET=false
    fi
  done

  if [ "$ALL_SET" = true ]; then
    echo "✓ All required Firebase variables are configured"
  else
    echo "✗ Some Firebase variables are missing or empty"
  fi
else
  echo "✗ .env.local file not found"
  exit 1
fi

echo ""
echo "[CHECK 3] TypeScript Compilation"
if npm run build > /tmp/build.log 2>&1; then
  echo "✓ TypeScript compilation successful"
else
  echo "✗ TypeScript compilation failed"
  echo "See errors below:"
  tail -20 /tmp/build.log
  exit 1
fi

echo ""
echo "[CHECK 4] Build Artifacts"
if [ -d "dist" ]; then
  FILE_COUNT=$(find dist -type f | wc -l)
  echo "✓ Build output directory exists with $FILE_COUNT files"
else
  echo "✗ Build output directory not found"
fi

echo ""
echo "[CHECK 5] Required Files"
REQUIRED_FILES=(
  "src/services/auth.ts"
  "src/context/AuthContext.tsx"
  "src/components/ProtectedRoute.tsx"
  "src/pages/Login.tsx"
  "src/pages/Register.tsx"
  "src/firebase/config.ts"
  "src/router.tsx"
)

ALL_EXIST=true
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file exists"
  else
    echo "  ✗ $file is missing"
    ALL_EXIST=false
  fi
done

if [ "$ALL_EXIST" = true ]; then
  echo "✓ All required files present"
else
  echo "✗ Some required files are missing"
fi

echo ""
echo "========== Health Check Complete =========="
echo ""
echo "Next Steps:"
echo "1. Open http://localhost:5173 in your browser"
echo "2. Test the registration flow (TEST 1)"
echo "3. Check console for any errors (F12)"
echo "4. Verify user document in Firebase Console"
echo ""
