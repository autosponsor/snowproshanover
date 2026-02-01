# ❄️ Snow Pros - Hanover Snow Removal

**The Definitive Winter Maintenance Solution for Hanover, ON.**

Snow Pros represents the intersection of industrial-grade reliability and premium digital experience. This platform is engineered to provide the residents and businesses of Hanover with a high-trust, high-performance interface for managing winter clearing.

---

## 🎨 The "World-Class" Look: Snow Pros Aesthetic

The visual identity of Snow Pros is defined as **"Industrial Luxury."** It combines the rugged, high-visibility cues of heavy machinery with the clean, sophisticated transparency of modern software.

### 1. Palette & Tone
- **Ice White (#F9FAFB):** Our primary background. Provides a clean, "fresh snow" canvas that feels spacious and airy.
- **Safety Orange (#F97316):** Our primary accent. Inspired by high-visibility winter gear and heavy-duty plow lights. It signifies action, urgency, and professional safety.
- **Navy Depth (#0F172A):** Used for deep backgrounds and "Glass-Dark" components. It represents the early morning hours (3:00 AM) when our crews are most active.
- **Glacier Accents:** Subtle gradients moving from pure white to light sky blue (#BAE6FD) to mimic the crystalline structure of ice.

### 2. Design Pillars
- **Glassmorphism:** We utilize frosted glass effects (`backdrop-blur`) to create layers of depth. This represents the clarity we bring to a chaotic storm.
- **Aggressive Typography:** Pairing *Space Grotesk* (technical, sharp, wide) for headers with *Inter* (functional, readable) for body text creates an "Engineering-Grade" feel.
- **Micro-interactions:** Every button press and hover uses spring physics (`framer-motion`) to provide tactile feedback, mimicking the solid feel of industrial equipment.

---

## 🚀 Technical Architecture

Built on a modern React 19 stack, the application focuses on **SEO Resilience** and **Weather-Dynamic UX.**

### Key Features
- **Dynamic Weather SEO:** The site automatically updates its `<title>` and `<meta>` tags based on real-time weather alerts in Hanover. If a blizzard is detected, the site transforms into "Emergency Mode."
- **Service Verification:** Integrated gallery components highlighting "Proof of Work" with location-based captions.
- **Zero-Risk Trust Flow:** Transparent sections explaining the "Post-Completion Payment" model and photo-documentation process.
- **Offline Resilience:** A custom service-worker style alert triggers when connectivity is lost, providing immediate click-to-call functionality for emergencies.

---

## 🛠️ Tech Stack
- **Framework:** React 19 (High Performance)
- **Styling:** Tailwind CSS (Utility-First Design)
- **Animations:** Framer Motion (Industrial Spring Physics)
- **Icons:** Lucide-React (Precision Vectors)
- **Validation:** Zod + React Hook Form (Robust Data Handling)
- **API:** WeatherAPI (Real-time Hanover conditions)

---

## 🌍 Deployment Configuration (Netlify)

This project is optimized for deployment on **Netlify** with full Support for Single Page Application (SPA) routing and secure headers.

### 1. Build Settings
- **Base directory:** Project Root
- **Build command:** (Standard Vite/React build, if applicable)
- **Publish directory:** `.` (Current directory for this specific project structure)

### 2. Environment Variables
To ensure the weather widget functions correctly, you should configure the following variable in the Netlify Dashboard (**Site Settings > Environment variables**):


### 3. Redirects & Security
The `netlify.toml` file is configured to:
- Handle `/*` to `/index.html` redirects for React Router stability.
- Apply high-security headers (X-Frame-Options, X-Content-Type-Options).
- Optimize caching for static assets.

---

## 📦 How to Deploy Manually

1. **Push to GitHub:** Initialize a repository and push the code.
2. **Connect to Netlify:**
   - Log in to [Netlify](https://app.netlify.com).
   - Click "Add new site" > "Import an existing project".
   - Select your GitHub repository.
3. **Configure:**
   - Use the provided `netlify.toml` settings.
4. **Deploy:** Hit "Deploy Site".

---

## ⚖️ Legal & Compliance
- **Privacy Policy:** Built-in modal covering Canadian privacy standards.
- **Terms of Service:** Hanover-specific service triggers (2-inch accumulation rule).
- **Insurance:** Mention of full WSIB and Liability coverage throughout the UI for commercial trust.

---
*Designed for the Hanover Winter. Powered by Snow Pros.*
