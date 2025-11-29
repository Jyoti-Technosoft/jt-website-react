# Testing Guide for Recent Changes

This guide helps you verify that:
1. ✅ PWA features have been removed
2. ✅ `react-app-rewired` configuration is working
3. ✅ Webpack optimizations are being applied

## Prerequisites

Make sure dependencies are installed:
```bash
npm install
# or
yarn install
```

## 1. Test react-app-rewired Configuration

### Step 1.1: Verify react-app-rewired is being used
```bash
# Start the dev server and check for config-overrides.js loading
npm start
```

**Expected behavior:**
- Dev server starts without errors
- No warnings about missing `config-overrides.js`
- Console should show webpack compilation (config-overrides only applies in production builds)

### Step 1.2: Test Production Build with Optimizations
```bash
# Build the project
npm run build
```

**What to check:**
1. **Build succeeds** without errors
2. **Check build output** for chunk files:
   ```bash
   ls -lh build/static/js/
   ```
   You should see separate chunks like:
   - `react.*.chunk.js` (React-specific chunk)
   - `mui.*.chunk.js` (Material-UI chunk)
   - `vendors.*.chunk.js` (Other vendor libraries)
   - `router.*.chunk.js` (React Router chunk)
   - `common.*.chunk.js` (Shared code)

3. **Check for gzip files** (compression plugin):
   ```bash
   find build -name "*.gz" | head -5
   ```
   Should show `.gz` files for JS, CSS, HTML, and SVG files > 8KB

### Step 1.3: Verify Code Splitting
```bash
# Analyze bundle structure
npm run build:analyze
```

**Expected results:**
- Bundle analyzer opens in browser
- You should see separate chunks for:
  - React/React-DOM
  - Material-UI
  - React Router
  - Other vendors
  - Common/shared code

## 2. Test PWA Removal

### Step 2.1: Verify Service Worker Files are Removed
```bash
# Check that service worker files don't exist
ls public/service-worker.js 2>&1
ls public/sw-enhanced.js 2>&1
ls src/serviceWorker*.ts 2>&1
```

**Expected:** All commands should return "No such file or directory"

### Step 2.2: Verify Manifest is Removed
```bash
# Check manifest file
ls public/manifest.json 2>&1
```

**Expected:** Should return "No such file or directory"

### Step 2.3: Check HTML for PWA References
```bash
# Search for PWA-related tags in HTML
grep -i "manifest\|service-worker\|apple-mobile-web-app" public/index.html
```

**Expected:** No matches found (or only comments)

### Step 2.4: Check Source Code for PWA Imports
```bash
# Search for service worker registration
grep -r "serviceWorker\|registerSW" src/ --exclude-dir=node_modules
```

**Expected:** No matches found

### Step 2.5: Test in Browser (Manual)
1. Build and serve the app:
   ```bash
   npm run build
   npx serve -s build
   ```

2. Open browser DevTools (F12) → Application tab:
   - **Service Workers**: Should show "No service workers registered"
   - **Manifest**: Should show "No manifest detected"
   - **Application → Storage**: No service worker caches should exist

3. Check Network tab:
   - No requests to `/service-worker.js` or `/sw-enhanced.js`
   - No requests to `/manifest.json`

## 3. Test Webpack Optimizations

### Step 3.1: Verify Code Splitting Configuration
```bash
# Build and check chunk files
npm run build

# Count chunk files
ls build/static/js/*.chunk.js | wc -l
```

**Expected:** Multiple chunk files (at least 5-6), indicating code splitting is working

### Step 3.2: Verify Compression Plugin
```bash
# Build and check for .gz files
npm run build

# List compressed files
find build -name "*.gz" -type f | head -10
```

**Expected:** Multiple `.gz` files for JS, CSS, HTML, and SVG files

### Step 3.3: Check Bundle Sizes
```bash
# Run performance test
npm run performance:test
```

**Expected output:**
- Build succeeds
- Bundle analysis shows chunked files
- Performance score is calculated

### Step 3.4: Verify Tree Shaking
```bash
# Build and check main bundle size
npm run build
du -sh build/static/js/main.*.js
```

**Expected:** Main bundle should be smaller due to tree shaking and code splitting

## 4. Comprehensive Test Suite

Run all tests in sequence:

```bash
# 1. Clean previous builds
rm -rf build

# 2. Test development server
echo "Testing dev server..."
npm start &
DEV_PID=$!
sleep 10
kill $DEV_PID 2>/dev/null || true

# 3. Test production build
echo "Testing production build..."
npm run build

# 4. Verify build output
echo "Verifying build output..."
[ -d "build" ] && echo "✅ Build directory exists" || echo "❌ Build failed"
[ ! -f "build/manifest.json" ] && echo "✅ Manifest removed" || echo "❌ Manifest still exists"
[ ! -f "build/service-worker.js" ] && echo "✅ Service worker removed" || echo "❌ Service worker still exists"

# 5. Check for chunk files
CHUNK_COUNT=$(ls build/static/js/*.chunk.js 2>/dev/null | wc -l)
[ $CHUNK_COUNT -gt 3 ] && echo "✅ Code splitting working ($CHUNK_COUNT chunks)" || echo "❌ Code splitting may not be working"

# 6. Check for compressed files
GZ_COUNT=$(find build -name "*.gz" 2>/dev/null | wc -l)
[ $GZ_COUNT -gt 0 ] && echo "✅ Compression plugin working ($GZ_COUNT files)" || echo "⚠️  No compressed files found"

# 7. Run performance test
echo "Running performance tests..."
npm run performance:test

echo "✅ All tests completed!"
```

## 5. Quick Verification Checklist

- [ ] `npm start` works without errors
- [ ] `npm run build` completes successfully
- [ ] Build output contains multiple chunk files
- [ ] No `manifest.json` in `public/` or `build/`
- [ ] No service worker files in `public/` or `src/`
- [ ] No service worker registration in `src/index.tsx`
- [ ] Bundle analyzer shows separate chunks for React, MUI, Router
- [ ] `.gz` files are generated in build output
- [ ] Browser DevTools shows no service workers registered
- [ ] No PWA-related meta tags in HTML

## 6. Troubleshooting

### Issue: Build fails with "Cannot find module 'react-app-rewired'"
**Solution:**
```bash
npm install react-app-rewired --save-dev
```

### Issue: Config overrides not applying
**Check:**
1. Verify `config-overrides.js` exists in project root
2. Verify scripts use `react-app-rewired` not `react-scripts`
3. Check for syntax errors in `config-overrides.js`

### Issue: Service worker still appears
**Solution:**
1. Clear browser cache
2. Unregister service workers manually in DevTools
3. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 7. Performance Comparison

Compare before/after metrics:

```bash
# Before (if you have a backup)
# Note the bundle sizes

# After
npm run build
du -sh build/static/js/
du -sh build/static/css/
```

**Expected improvements:**
- Better code splitting (more, smaller chunks)
- Gzip compression enabled
- No PWA overhead

---

**Note:** The `config-overrides.js` optimizations only apply to **production builds** (`npm run build`), not development (`npm start`).

