# AUDIT ISSUES - ACTIONABLE TRACKER

## 🔴 CRITICAL (Must Fix Before Production)

### Issue #1: Missing @types/node
- **Status**: 🔴 BLOCKING
- **Effort**: 5 minutes
- **File**: tsconfig.json (line 1)
- **Command**: `npm install --save-dev @types/node`
- **Verification**: `npm run build` should complete without type errors

---

### Issue #2: Missing react-helmet-async Package
- **Status**: 🔴 BLOCKING
- **Effort**: 10 minutes
- **Files**: 
  - components/SEOMetadata.tsx (missing import)
  - App.tsx (uses <HelmetProvider>)
- **Steps**:
  1. `npm install react-helmet-async`
  2. Add import to components/SEOMetadata.tsx: `import { Helmet } from 'react-helmet-async';`
  3. Verify in index.tsx HelmetProvider wraps App
  4. Test: Navigate to home, inspect `<head>`, verify meta tags present

---

### Issue #3: Toast Notification System - No UI Component
- **Status**: 🔴 BLOCKING
- **Effort**: 30 minutes
- **Files**:
  - lib/toast.ts (complete, exports ToastManager)
  - features/contact/ContactForm.tsx (uses toast but nothing displays)
  - App.tsx (needs ToastContainer import)
- **Steps**:
  1. Create components/ToastContainer.tsx with Toast UI
  2. Import ToastContainer in App.tsx
  3. Add to main app layout: `<ToastContainer />`
  4. Test: Submit contact form, verify success/error toast appears
- **Acceptance Criteria**:
  - ✅ Toast appears on form success
  - ✅ Toast appears on form error
  - ✅ Toast auto-dismisses after 3-5 seconds
  - ✅ Multiple toasts stack properly

---

### Issue #4: API Key Exposed in Browser
- **Status**: 🔴 BLOCKING
- **Effort**: 1-2 hours
- **Files**:
  - hooks/useDynamicSEO.ts (line 10)
  - features/landing/Hero.tsx (line 25)
- **Risks**: Rate limiting, potential abuse, security breach
- **Solution**:
  1. Create `netlify/functions/weather.js` serverless function
  2. Move API key to environment variable (backend only)
  3. Update useDynamicSEO and Hero to call `/api/weather` instead
  4. Remove VITE_WEATHER_API_KEY exposure
- **Verification**:
  - ✅ No API key in browser Network tab
  - ✅ Weather still loads correctly
  - ✅ Errors handled gracefully

---

### Issue #5: Sentry Error Monitoring Not Configured
- **Status**: 🔴 BLOCKING (for production)
- **Effort**: 1 hour
- **Files**: lib/errorReporter.ts (line 35-50)
- **Steps**:
  1. Create Sentry account at sentry.io
  2. `npm install @sentry/react @sentry/tracing`
  3. Add VITE_SENTRY_DSN to .env
  4. Update lib/errorReporter.ts: sendToMonitoring() to use Sentry
  5. Initialize Sentry in index.tsx (wrap App)
  6. Test: Throw error in console, verify appears in Sentry dashboard
- **Acceptance Criteria**:
  - ✅ Errors logged to Sentry dashboard
  - ✅ Error context (URL, user agent, stack) included
  - ✅ Severity levels correct (error vs critical)

---

### Issue #6: Missing Schema.injectSchemas() Function
- **Status**: 🔴 BLOCKING
- **Effort**: 20 minutes
- **File**: lib/schema.ts
- **Issue**: SEOMetadata calls `injectSchemas()` but function doesn't exist
- **Steps**:
  1. Add `injectSchemas()` function to lib/schema.ts
  2. Add missing `generateOrganizationSchema()` function
  3. Test: Inspect page source, verify `<script type="application/ld+json">` present
- **Verification**:
  - ✅ Structured data visible in page source
  - ✅ No console errors about missing function
  - ✅ Schema.org markup validates (google.com/test/rich-results)

---

### Issue #7: Missing robots.txt
- **Status**: 🔴 BLOCKING (SEO)
- **Effort**: 10 minutes
- **File**: Create `/public/robots.txt`
- **Content**:
  ```
  User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /api
  
  Sitemap: https://snowproshanover.com/sitemap.xml
  ```
- **Verification**:
  - ✅ Visit https://snowproshanover.com/robots.txt
  - ✅ Check Google Search Console (submitted)

---

### Issue #8: Missing Sitemap
- **Status**: 🔴 BLOCKING (SEO)
- **Effort**: 10 minutes
- **File**: Create `/public/sitemap.xml`
- **Content**: Minimal sitemap with homepage
- **Verification**:
  - ✅ Visit https://snowproshanover.com/sitemap.xml
  - ✅ Submit to Google Search Console

---

---

## 🟠 HIGH PRIORITY (Before General Release)

### Issue #9: No Input Sanitization
- **Status**: 🟠 HIGH
- **Effort**: 30 minutes
- **File**: features/contact/ContactForm.tsx (line 50)
- **Command**: `npm install dompurify && npm install --save-dev @types/dompurify`
- **Steps**:
  1. Import DOMPurify
  2. Sanitize form data before sending
  3. Test: Try injecting HTML in form field, verify it's cleaned
- **Acceptance Criteria**:
  - ✅ No XSS vectors in form submission
  - ✅ Valid text still passes through

---

### Issue #10: Missing CSP Meta Tag
- **Status**: 🟠 HIGH
- **Effort**: 20 minutes
- **File**: components/SEOMetadata.tsx
- **Action**: Add Content-Security-Policy meta tag to Helmet
- **Verification**: Check in DevTools, verify CSP active

---

### Issue #11: Accessibility - Missing Image Alt Strategies
- **Status**: 🟠 HIGH
- **Effort**: 45 minutes
- **Files**:
  - features/landing/Hero.tsx
  - features/landing/ServicesSection.tsx
  - Any component with background images
- **Action**: Replace decorative background-images with proper img + role="img" or aria-label
- **Verification**: Run Lighthouse accessibility audit, score > 90

---

### Issue #12: Weather API Error Handling Inconsistent
- **Status**: 🟠 HIGH
- **Effort**: 1 hour
- **Files**:
  - hooks/useDynamicSEO.ts
  - features/landing/Hero.tsx
  - lib/api.ts (partially implemented)
- **Action**: Centralize weather API calls, use consistent error handling
- **Verification**:
  - ✅ Invalid API key handled gracefully
  - ✅ Network error shows fallback UI
  - ✅ Timeout handled (5 seconds)

---

### Issue #13: No React.lazy() for Below-Fold Content
- **Status**: 🟠 HIGH
- **Effort**: 45 minutes
- **File**: App.tsx
- **Action**: Lazy load Gallery, TestimonialSlider with React.Suspense
- **Verification**: 
  - ✅ npm run build
  - ✅ Check build output for code splitting
  - ✅ Network tab: Gallery JS loads on scroll

---

### Issue #14: Missing Loading States in Form
- **Status**: 🟠 HIGH
- **Effort**: 20 minutes
- **File**: features/contact/ContactForm.tsx
- **Action**: Show loading spinner on submit button while `isSubmitting` true
- **Verification**: Submit form, button disabled and shows spinner

---

### Issue #15: No Sentry Exception Tracking in ErrorBoundary
- **Status**: 🟠 HIGH
- **Effort**: 20 minutes
- **File**: components/ErrorBoundary.tsx
- **Action**: Call `Sentry.captureException()` in `componentDidCatch`
- **Verification**: Trigger error boundary, check Sentry dashboard

---

## 🟡 MEDIUM PRIORITY (Post-Launch)

### Issue #16: Skill.md Name Mismatch
- **Status**: 🟡 MEDIUM
- **Effort**: 5 minutes
- **File**: SKILL.md (line 2)
- **Current**: `name: react-landing-page-development`
- **Should be**: `name: snowproshanover`
- **Verification**: No warnings in VS Code

---

### Issue #17: No Performance Monitoring
- **Status**: 🟡 MEDIUM
- **Effort**: 30 minutes
- **Command**: `npm install web-vitals`
- **Action**: Initialize web-vitals in index.tsx
- **Verification**: Check browser console, see Core Web Vitals metrics

---

### Issue #18: No Service Worker (PWA)
- **Status**: 🟡 MEDIUM
- **Effort**: 2 hours
- **Command**: `npm install --save-dev workbox-cli`
- **Action**: Generate service worker with workbox
- **Verification**: 
  - ✅ App works offline
  - ✅ Chrome DevTools > Application shows service worker

---

### Issue #19: No Environment Variable Validation
- **Status**: 🟡 MEDIUM
- **Effort**: 30 minutes
- **Action**: Create lib/env.ts with Zod schema for all env vars
- **Verification**: 
  - ✅ Error thrown if required env var missing
  - ✅ Type-safe access: `env.VITE_WEATHER_API_KEY`

---

### Issue #20: TypeScript Unused Variables Flag Conflicts
- **Status**: 🟡 MEDIUM
- **Effort**: 20 minutes
- **File**: tsconfig.json
- **Action**: Update to use `_` prefix for intentional unused vars
- **Verification**: No TypeScript warnings on build

---

## 🟢 LOW PRIORITY (Nice-to-Have)

### Issue #21: Add Bundle Analysis
- **Status**: 🟢 LOW
- **Effort**: 15 minutes
- **Command**: `npm install --save-dev vite-plugin-visualizer`
- **Action**: Update vite.config.ts, run `npm run build`, open dist/stats.html
- **Benefit**: Identify large dependencies

---

### Issue #22: Add Husky Pre-commit Hooks
- **Status**: 🟢 LOW
- **Effort**: 20 minutes
- **Commands**:
  ```bash
  npm install husky --save-dev
  npx husky install
  npx husky add .husky/pre-commit "npm run build"
  ```
- **Benefit**: Prevent broken builds from being committed

---

### Issue #23: Add Prettier Formatting
- **Status**: 🟢 LOW
- **Effort**: 20 minutes
- **Command**: `npm install --save-dev prettier`
- **Action**: Create .prettierrc, format codebase
- **Benefit**: Consistent code style

---

### Issue #24: Add ESLint Configuration
- **Status**: 🟢 LOW
- **Effort**: 30 minutes
- **Commands**:
  ```bash
  npm install --save-dev eslint eslint-plugin-react
  npx eslint --init
  ```
- **Benefit**: Catch potential bugs, enforce best practices

---

### Issue #25: Add PWA Manifest
- **Status**: 🟢 LOW
- **Effort**: 20 minutes
- **Action**: Create /public/manifest.json, add meta tags to index.html
- **Benefit**: Installable web app on mobile

---

---

## 📊 SUMMARY STATISTICS

| Category | Count | Time Estimate |
|----------|-------|-----------------|
| 🔴 CRITICAL | 8 | 8-10 hours |
| 🟠 HIGH | 7 | 6-8 hours |
| 🟡 MEDIUM | 5 | 4-6 hours |
| 🟢 LOW | 5 | 3-4 hours |
| **TOTAL** | **25** | **21-28 hours** |

---

## ✅ VERIFICATION CHECKLIST

After fixing each issue, mark complete:

### Phase 1: Critical (BLOCKING)
- [ ] Issue #1: @types/node installed
- [ ] Issue #2: react-helmet-async working
- [ ] Issue #3: Toast notifications visible
- [ ] Issue #4: API key removed from browser
- [ ] Issue #5: Sentry configured
- [ ] Issue #6: Schema.injectSchemas() working
- [ ] Issue #7: robots.txt deployed
- [ ] Issue #8: sitemap.xml deployed

### Phase 2: High Priority (BEFORE LAUNCH)
- [ ] Issue #9: Input sanitization working
- [ ] Issue #10: CSP meta tag present
- [ ] Issue #11: Lighthouse a11y > 90
- [ ] Issue #12: Weather API centralized
- [ ] Issue #13: Code splitting working
- [ ] Issue #14: Form loading states visible
- [ ] Issue #15: ErrorBoundary sends to Sentry

### Phase 3: Medium Priority (POST-LAUNCH)
- [ ] Issue #16: SKILL.md name corrected
- [ ] Issue #17: web-vitals configured
- [ ] Issue #18: Service worker working
- [ ] Issue #19: Env validation working
- [ ] Issue #20: TypeScript warnings resolved

### Phase 4: Low Priority (FUTURE)
- [ ] Issue #21: Bundle analysis visible
- [ ] Issue #22: Husky pre-commit hooks
- [ ] Issue #23: Prettier formatting
- [ ] Issue #24: ESLint configured
- [ ] Issue #25: PWA manifest installed

---

## 🎯 EXPECTED OUTCOMES

After completing ALL fixes:
- ✅ Zero TypeScript errors
- ✅ Lighthouse score 90+ (all categories)
- ✅ No security vulnerabilities (OWASP Top 10)
- ✅ WCAG 2.1 Level AA accessibility
- ✅ Production-ready error monitoring
- ✅ SEO optimized (robots.txt, sitemap, schema)
- ✅ Form fully functional with feedback
- ✅ Offline-capable with service worker
- ✅ Mobile responsive and PWA-installable
- ✅ Enterprise-grade code quality

