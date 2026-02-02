
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
You **must** set the following environment variables in the Netlify Dashboard (**Site Settings > Environment variables**) to enable the live weather widget:

| Key | Example Value | Description |
|-----|---------------|-------------|
| `VITE_WEATHER_API_KEY` | `432e73bbfd1d41b7b1841248261901` | Your WeatherAPI.com token |

*Note: The application is configured to gracefully hide the weather widget if the key is missing.*

### 2. Netlify Build Configuration
Ensure your Netlify site is configured with these settings:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: `20+`

### 3. Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ❄️ Business Operations

- **Form Submissions**: Go to the "Forms" tab in your Netlify dashboard to see quotes.
- **Service Updates**: Update `features/gallery/Gallery.tsx` to refresh the proof-of-work photos.
- **Privacy/Terms**: Modals are editable within `App.tsx` to match local legal requirements.

---
*Developed for Snow Pros Hanover - Industrial Strength Reliability.*
