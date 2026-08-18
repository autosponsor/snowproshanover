# AUDIT QUICK START GUIDE
## Enterprise-Grade Codebase Audit - Implementation Roadmap

---

## 📋 PHASE 1: CRITICAL FIXES (4-6 hours) ⚠️ REQUIRED BEFORE ANY DEPLOYMENT

### ✅ Step-by-Step Fix Plan

#### 1️⃣ Fix TypeScript Types (5 min)
```bash
npm install --save-dev @types/node
npm run build  # Verify no type errors
```

---

#### 2️⃣ Install React Helmet (10 min)
```bash
npm install react-helmet-async
```

Verify import in `components/SEOMetadata.tsx`:
```typescript
import { Helmet } from 'react-helmet-async';
```

---

#### 3️⃣ Create Toast Notification Component (30 min)

**Create file**: `components/ToastContainer.tsx`
```typescript
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { toast, Toast } from '../lib/toast';
import { cn } from '../lib/utils';

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return toast.subscribe(setToasts);
  }, []);

  const bgClass = (type: Toast['type']) => {
    const classes = {
      success: 'bg-green-500 shadow-green-500/50',
      error: 'bg-red-500 shadow-red-500/50',
      warning: 'bg-yellow-500 shadow-yellow-500/50',
      info: 'bg-blue-500 shadow-blue-500/50',
    };
    return classes[type];
  };

  const Icon = (type: Toast['type']) => {
    const icons = {
      success: <CheckCircle size={20} />,
      error: <AlertCircle size={20} />,
      warning: <AlertTriangle size={20} />,
      info: <Info size={20} />,
    };
    return icons[type];
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'px-6 py-4 rounded-xl text-white font-bold shadow-2xl pointer-events-auto',
              'flex items-center gap-3',
              bgClass(t.type)
            )}
          >
            {Icon(t.type)}
            <span className="flex-1">{t.message}</span>
            {t.action && (
              <button
                onClick={t.action.onClick}
                className="ml-4 underline hover:opacity-75 transition"
              >
                {t.action.label}
              </button>
            )}
            <button
              onClick={() => toast.remove(t.id)}
              className="ml-2 hover:opacity-75 transition"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
```

**Update**: `App.tsx` line 80:
```typescript
import { ToastContainer } from './components/ToastContainer';

// Inside App component JSX (before closing </div>):
<ToastContainer />
```

**Test**: 
```bash
npm run dev
# Visit form, submit, verify toast appears
```

---

#### 4️⃣ Move API Key to Backend (1-2 hours)

**Create**: `netlify/functions/weather.js`
```javascript
exports.handler = async (event) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' })
    };
  }

  try {
    const city = event.queryStringParameters?.city || 'Hanover,CA';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Weather API responded with ${response.status}`);
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
```

**Update**: `hooks/useDynamicSEO.ts`
```typescript
import { useEffect, useState } from 'react';

export const useDynamicSEO = () => {
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    const updateDynamicSEO = async () => {
      try {
        const response = await fetch('/.netlify/functions/weather?city=Hanover,CA');
        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();
        const condition = data.weather[0]?.main?.toLowerCase() || '';
        setIsSnowing(
          condition.includes('snow') || 
          condition.includes('ice') || 
          condition.includes('blizzard')
        );
      } catch (e) {
        console.warn("Weather update failed", e);
      }
    };

    updateDynamicSEO();
  }, []);

  return { isSnowing };
};
```

**Update**: `features/landing/Hero.tsx` WeatherWidget similarly

---

#### 5️⃣ Setup Sentry (1 hour)

**Install**:
```bash
npm install @sentry/react @sentry/tracing
```

**Create `.env.local`**:
```
VITE_SENTRY_DSN=https://YOUR_KEY@YOUR_SENTRY_DOMAIN.ingest.sentry.io/PROJECT_ID
```

**Update**: `lib/errorReporter.ts`
```typescript
import * as Sentry from '@sentry/react';

function sendToMonitoring(report: ErrorReport): void {
  if (import.meta.env.PROD && window.location.hostname !== 'localhost') {
    Sentry.captureException(report.error, {
      level: report.severity as any,
      contexts: {
        app: report.context,
      },
      tags: {
        component: 'error-reporter'
      }
    });
  }

  // Still log to console in dev
  logToConsole(report);
}
```

**Update**: `index.tsx`
```typescript
import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
    integrations: [
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

#### 6️⃣ Fix Schema Injection (20 min)

**Update**: `lib/schema.ts`

Add these functions:
```typescript
export function injectSchemas(schemas: any[]): void {
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function generateOrganizationSchema(config: SchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Snow Pros Hanover",
    url: config.url,
    logo: config.image,
    sameAs: [
      "https://www.facebook.com/profile.php?id=61588002715600",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "(647) 450-0225",
    },
  };
}
```

---

#### 7️⃣ Create robots.txt (10 min)

**Create**: `public/robots.txt`
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /.well-known

Sitemap: https://snowproshanover.com/sitemap.xml
```

---

#### 8️⃣ Create Sitemap (10 min)

**Create**: `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://snowproshanover.com/</loc>
    <lastmod>2026-08-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### ✅ Phase 1 Verification
```bash
npm run verify
# ✅ Lint, strict TypeScript, automated tests, and production build pass
# ✅ No warnings

npm run dev
# ✅ Visit form, submit
# ✅ Toast notification appears
# ✅ Browser DevTools Network tab shows NO API key exposed
# ✅ Console shows no errors
# ✅ No red flags in Sentry dashboard

curl https://snowproshanover.com/robots.txt
# ✅ Returns robots.txt content

curl https://snowproshanover.com/sitemap.xml
# ✅ Returns sitemap.xml content
```

---

## 📋 PHASE 2: HIGH PRIORITY (6-8 hours)

### 9️⃣ Input Sanitization (30 min)
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

**Update**: `features/contact/ContactForm.tsx` onSubmit():
```typescript
import DOMPurify from 'dompurify';

const onSubmit = async (data: FormData) => {
  // Sanitize all inputs
  const sanitized = {
    name: DOMPurify.sanitize(data.name, { ALLOWED_TAGS: [] }),
    phone: DOMPurify.sanitize(data.phone, { ALLOWED_TAGS: [] }),
    address: DOMPurify.sanitize(data.address, { ALLOWED_TAGS: [] }),
    details: DOMPurify.sanitize(data.details || '', { ALLOWED_TAGS: [] }),
  };

  // ... rest of submission
};
```

---

### 🔟 Add CSP Meta Tag (20 min)

**Update**: `components/SEOMetadata.tsx` (add to Helmet):
```typescript
<meta
  httpEquiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' https://api.openweathermap.org;"
/>
```

---

### 1️⃣1️⃣ Improve Accessibility (45 min)

Replace decorative background images with proper semantic markup.

**Before** (Hero.tsx):
```tsx
<div className="absolute inset-0 z-0">
  <img src="..." className="w-full h-full object-cover" alt="Snow background" />
</div>
```

**After**:
```tsx
<div 
  className="absolute inset-0 z-0 bg-cover bg-center"
  style={{ backgroundImage: 'url(...)' }}
  role="img"
  aria-label="Heavy snow removal truck in action"
/>
```

For meaningful images, add proper alt text:
```tsx
<img 
  src="..." 
  alt="Professional snow removal truck clearing residential driveway"
  loading="lazy"
/>
```

---

### 1️⃣2️⃣ Lazy Load Components (45 min)

**Update**: `App.tsx`
```typescript
import { lazy, Suspense } from 'react';

const Gallery = lazy(() => import('./features/gallery/Gallery').then(m => ({ default: m.Gallery })));
const TestimonialSlider = lazy(() => import('./components/TestimonialSlider'));

export const App: React.FC = () => {
  return (
    <main>
      <Hero />
      <TrustBanner />
      <ServicesSection />
      
      <Suspense fallback={<div className="h-96 bg-gradient-to-b from-snow-100 to-snow-50 animate-pulse" />}>
        <Gallery />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-snow-100 animate-pulse" />}>
        <TestimonialSlider />
      </Suspense>
      
      <ContactSection />
    </main>
  );
};
```

**Export Gallery and TestimonialSlider properly**:
```typescript
// features/gallery/Gallery.tsx
export { Gallery };  // Make sure it's exported as named export
```

---

### 1️⃣3️⃣ Add Loading States (20 min)

**Update**: `features/contact/ContactForm.tsx`
```typescript
import { Loader2 } from 'lucide-react';

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* fields */}
    
    <button 
      type="submit"
      disabled={isSubmitting}
      className={cn(
        "w-full px-8 py-4 rounded-xl font-black text-white uppercase tracking-widest transition-all",
        isSubmitting 
          ? "bg-brand/50 opacity-75 cursor-not-allowed"
          : "bg-brand hover:bg-brand-hover shadow-xl"
      )}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="inline mr-2 h-5 w-5 animate-spin" />
          Submitting...
        </>
      ) : (
        'Request Quote'
      )}
    </button>
  </form>
);
```

---

## 📊 QUICK VERIFICATION MATRIX

| Issue | Phase | Status | Command |
|-------|-------|--------|---------|
| @types/node | 1 | `npm run build` | ✅ No errors |
| react-helmet | 1 | `npm run dev` | ✅ Meta tags present |
| Toast UI | 1 | Form submit | ✅ Toast visible |
| API key | 1 | DevTools Network | ✅ Not exposed |
| Sentry | 1 | Sentry dashboard | ✅ Errors logged |
| Schema | 1 | Page source | ✅ JSON-LD visible |
| robots.txt | 1 | curl endpoint | ✅ File served |
| Sitemap | 1 | curl endpoint | ✅ File served |
| Sanitization | 2 | Form submit | ✅ HTML stripped |
| CSP | 2 | DevTools | ✅ Header present |
| A11y | 2 | Lighthouse | ✅ Score > 90 |
| Lazy load | 2 | DevTools Network | ✅ Code split |
| Loading states | 2 | Form submit | ✅ Button disabled |

---

## 🚀 DEPLOYMENT CHECKLIST

Before pushing to production:

```bash
# Build and test
npm run verify         # ✅ Lint, types, tests, and production build pass
npm run preview        # ✅ Test locally

# Verify critical fixes
echo "✅ Checking fixes..."
grep -r "react-helmet-async" src/          # ✅ Imported
grep -r "DOMPurify" src/                   # ✅ Sanitization
grep -r "@sentry/react" src/               # ✅ Error tracking
test -f "public/robots.txt"               # ✅ robots.txt exists
test -f "public/sitemap.xml"              # ✅ sitemap.xml exists

# Final git commit
git add .
git commit -m "fix: critical audit issues - types, helmet, toast, API key, Sentry, schema"
git push origin main

# Netlify deploys automatically
# Verify: Visit https://snowproshanover.com
# DevTools: No red/yellow warnings
# Lighthouse: Score 90+ all categories
```

---

## 📞 SUPPORT & REFERENCES

| Topic | Resource |
|-------|----------|
| React Helmet | https://github.com/nfl/react-helmet-async |
| Sentry Setup | https://docs.sentry.io/platforms/javascript/guides/react/ |
| DOMPurify | https://github.com/cure53/DOMPurify |
| Schema.org | https://schema.org/ |
| Google Test Rich Results | https://search.google.com/test/rich-results |
| Netlify Functions | https://docs.netlify.com/functions/overview/ |
| Web Accessibility | https://www.w3.org/WAI/WCAG21/quickref/ |

---

**Time Estimate**: Phase 1 (4-6 hrs) + Phase 2 (6-8 hrs) = **10-14 hours total**

**Ready to Deploy After**: All Phase 1 + Phase 2 items complete ✅

