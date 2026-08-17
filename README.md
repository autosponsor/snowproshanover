
# ❄️ Snow Pros Hanover - Production Environment

Professional residential and commercial snow clearing for Hanover, ON. This application is optimized for high-performance deployment on Netlify.

## 🛠 Project Structure

- **Frontend**: React 19 + Vite 6
- **Styling**: Tailwind CSS 3 (Build-time PostCSS pipeline)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: Netlify Forms (Anti-spam protection enabled)

## 🚀 Deployment Checklist

### 1. Environment Variables

Set the following **server-only** variable in the Netlify dashboard under **Site settings → Environment variables**. The weather function is the only code that reads it; never expose this credential with a `VITE_` prefix or commit it to the repository.

| Key | Example value | Purpose |
|---|---|---|
| `OPENWEATHERMAP_API_KEY` | `your_openweathermap_api_key` | Authorizes the serverless weather function to retrieve weather for Hanover, ON. |

> If the previous OpenWeatherMap key was ever committed or served to browsers, revoke it and create a replacement before deployment.

### 2. Netlify Build Configuration

Ensure the site uses the following settings:

| Setting | Value |
|---|---|
| Build command | `npm run verify` |
| Publish directory | `dist` |
| Node version | `22` |

Netlify automatically discovers the static `snow-pros-quote` form supplied in `index.html`. After the next deployment, submit a real test lead and verify that it appears in **Forms** and reaches the configured notification destination.

### 3. Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run the full local quality gate (lint, types, tests, production build)
npm run verify
```

## ❄️ Business Operations

- **Form Submissions**: Go to the **Forms** tab in the Netlify dashboard to see quotes, then confirm the notification destination after every form-configuration change.
- **Service Updates**: Update `features/gallery/Gallery.tsx` to refresh the proof-of-work photos.
- **Privacy/Terms**: Modals are editable within `App.tsx` to match local legal requirements.

---
*Developed for Snow Pros Hanover - Industrial Strength Reliability.*
