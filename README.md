
# ❄️ Snow Pros Hanover

Professional residential and commercial snow clearing for Hanover, Ontario. The site is a static, high-performance Netlify application built with semantic HTML5, Tailwind CSS, and focused vanilla JavaScript.

## Project structure

| Area | Location | Purpose |
|---|---|---|
| Page markup | `index.html` | Content, metadata, structured data, and Netlify form detection. |
| Browser behavior | `src/main.js` | Navigation, modal, consent, gallery, form, and cached weather interactions. |
| Styles | `src/styles.css` | Tailwind layers and site-specific component styles. |
| Weather service | `netlify/functions/weather.js` | Server-side OpenWeatherMap proxy with input controls and caching. |
| Quality controls | `.github/workflows/quality.yml` | Linting, tests, build, bundle budget, and dependency-audit checks. |

## Deployment checklist

Set `OPENWEATHERMAP_API_KEY` as a **server-only** Netlify environment variable. The weather function is the only code that reads it. Never use a `VITE_` prefix for this key or commit a real credential.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `22` |

Netlify discovers the static `snow-pros-quote` form in `index.html`. After deployment, submit a real test request and verify it appears in **Forms** and reaches the configured notification destination.

## Local development

```bash
npm ci
npm run dev
npm run verify
```

The full quality gate runs ESLint, unit tests, Playwright end-to-end tests, a production build, a JavaScript bundle budget, and a production dependency audit.

## Operations

Form submissions are available in the Netlify **Forms** dashboard. Update page content in `index.html`, browser interactions in `src/main.js`, and styles in `src/styles.css`. The production security headers are defined in `netlify.toml`.
