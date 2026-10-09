# Vanilla Frontend Migration Plan

## Objective

Replace the React 19 marketing frontend with a static, accessible implementation using semantic HTML5, Tailwind CSS, and focused vanilla JavaScript. Preserve the service, gallery, weather, contact, FAQ, consent, and navigation experiences while reducing the initial JavaScript payload and eliminating React-specific dependencies.

## Architecture

| Existing concern | Replacement |
|---|---|
| `index.tsx` and `App.tsx` | `src/main.js` initializes scoped browser behaviors from static HTML. |
| React components and Framer Motion | Semantic sections in `index.html`; CSS transitions and `IntersectionObserver` for light reveal behavior. |
| React Helmet and imperative schema injection | Static metadata and JSON-LD in `index.html`; no duplicate Open Graph fields. |
| Multiple weather fetch paths | One `getWeather()` request function with an in-memory promise cache shared by widget, alert, and page title treatment. |
| React Hook Form and DOMPurify | Native HTML constraints plus a small client-side validator; Netlify receives the standard encoded form submission. |
| React state for dialogs, cookie notice, menu, gallery, and back-to-top | Small, independent vanilla event handlers with ARIA state updates and a persisted consent choice. |

## Approved audit work mapped to implementation

| Audit item | Implementation approach |
|---|---|
| F1 | Never include form values in error telemetry; report only a category and status. |
| F2 | Use one idempotent global error hook with a cleanup function; no framework lifecycle coupling. |
| F3 | Enforce CSP and related policies through `netlify.toml` headers, not runtime metadata. |
| O1 | Add a cached weather service in `src/main.js`. |
| O2 | Remove React, motion, Helmet, React Hook Form, Zod, DOMPurify, and icon packages; set a CI bundle-size budget. |
| O3 | Keep one canonical, one Open Graph description, and static JSON-LD script tags. |
| O4 | Complete the staged migration in this branch because this repository is a single-page static marketing site. |
| E1 | Add Playwright checks for the contact form, mobile menu, consent state, FAQ disclosure, and weather failure state. |
| E2 | Add CI commands for production dependency audit and a dist asset-size assertion. |

## File changes

The implementation will replace `index.html`, `index.css`, `index.tsx`, `vite.config.ts`, `package.json`, and TypeScript/React components with `src/main.js`, a Tailwind-compatible stylesheet, and static page markup. The Netlify weather function remains server-side and gains defensive request-time behavior. Legacy React files will be removed after replacement so no React code remains in the production source tree.
