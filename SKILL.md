---
name: react-landing-page-development
description: Complete workflow for building enterprise-grade landing pages using React, TypeScript, Tailwind CSS, and Netlify with a focus on functionality, scalability, maintainability, and simplicity.
applies_to: 
  - "**/*.tsx"
  - "**/*.ts"
---

# React Landing Page Development Skill

For the **snowproshanover** project: Enterprise-standard web app development using React 19, TypeScript, Tailwind CSS, Framer Motion, and Netlify.

## Tech Stack
- **Framework**: React 19 + TypeScript (v5.7+)
- **Styling**: Tailwind CSS with tailwind-merge & clsx utilities
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build**: Vite
- **Deployment**: Netlify
- **SEO**: React Helmet

## Project Folder Structure
```
components/         # Reusable, domain-agnostic components
  Navigation.tsx
  Footer.tsx
  ErrorBoundary.tsx
  ...
features/          # Feature-specific components organized by domain
  landing/
  contact/
  gallery/
hooks/             # Custom React hooks for shared logic
lib/               # Utilities (cn() for Tailwind classes, etc.)
public/            # Static assets
```

## Core Patterns & Conventions

### 1. Component Architecture

**Always use Functional Components with React.FC:**
```tsx
interface ComponentProps {
  prop1: string;
  prop2?: boolean;
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 = false }) => {
  return <div>Content</div>;
};
```

**Reusable components** go in `/components` (Navigation, Footer, ErrorBoundary, Modals, etc.)  
**Feature-specific components** go in `/features` (Hero, ServicesSection, ContactForm, Gallery, etc.)  
**Hooks for shared logic** go in `/hooks` (useDynamicSEO, custom state management, etc.)

### 2. Styling Rules

**Use Tailwind CSS classes directly:**
```tsx
className="text-lg font-bold text-brand hover:text-brand-hover transition-all"
```

**Use `cn()` utility (from lib/utils) for conditional classes:**
```tsx
import { cn } from '../lib/utils';

className={cn(
  "base-class transition-all",
  isActive && "active-state",
  scrolled ? "scrolled-state" : "normal-state"
)}
```

**Custom CSS classes** available (defined in tailwind.config.js):
- `.glass` / `.glass-dark` - Glassmorphism backgrounds
- `.font-display` - Special display font
- `.brand` colors - Brand-specific colors
- `brand-hover` - Brand hover states

### 3. Form Handling

**Use React Hook Form + Zod for validation:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name required'),
});

export const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
    </form>
  );
};
```

### 4. State Management

**For component-level state:** Use `useState`  
**For shared logic:** Extract into custom hooks (e.g., `useDynamicSEO`)  
**For global concerns:** Use context + hooks (if needed)

Example from App.tsx pattern:
```tsx
const [isOffline, setIsOffline] = useState(!navigator.onLine);
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleOnline = () => setIsOffline(false);
  window.addEventListener('online', handleOnline);
  return () => window.removeEventListener('online', handleOnline);
}, []);
```

### 5. SEO & Metadata

**Use React Helmet for meta tags:**
```tsx
import { Helmet } from 'react-helmet-async';

export const SEOMetadata: React.FC<{ title: string; description: string }> = 
  ({ title, description }) => (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
```

**Create page-specific metadata** for each major section.

### 6. Error Handling

**Wrap major sections in ErrorBoundary:**
```tsx
<ErrorBoundary>
  <ComponentThatMightError />
</ErrorBoundary>
```

**Handle network errors gracefully:**
```tsx
const [isOffline, setIsOffline] = useState(!navigator.onLine);

useEffect(() => {
  window.addEventListener('offline', () => setIsOffline(true));
  window.addEventListener('online', () => setIsOffline(false));
}, []);

return isOffline ? <OfflineBanner /> : <Component />;
```

### 7. Animation Guidelines

**Use Framer Motion for smooth transitions:**
```tsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

**Keep animations purposeful** – use for feedback, flow, and emphasis (not distraction).

## Quality Standards & Best Practices

### Functionality
- All features work as intended across desktop and mobile
- No broken links or 404s (unless intentional)
- Forms validate and submit correctly
- API calls have fallbacks and error states

### Scalability
- Components are modular and reusable
- Easy to add new pages/sections without duplicating code
- Feature folder structure supports growth
- Custom hooks abstract complex logic

### Manageability
- Clear file organization (components/ vs features/ vs hooks/)
- Consistent naming conventions (PascalCase for components)
- TypeScript interfaces for all props
- Comments for non-obvious logic

### Maintainability
- Type annotations on all functions and components
- Props interface defined for each component
- Avoid prop drilling (use context/hooks if needed)
- Keep components focused (single responsibility)
- Extract common patterns into utilities (lib/utils)

### Simplicity
- Write only the code needed to accomplish the goal
- Avoid over-engineering or premature optimization
- Prefer simple state over complex state management
- Use built-in React patterns before third-party solutions

### Security
- Sanitize user input (especially in forms)
- Use Content Security Policy headers (in netlify.toml)
- Validate data on both client and server (Zod schemas)
- Never expose sensitive keys in client code
- Use environment variables for API endpoints

## Workflow: Creating a New Component

1. **Define Props Interface:**
   ```tsx
   interface MyComponentProps {
     title: string;
     onClose?: () => void;
   }
   ```

2. **Choose Location:**
   - Reusable → `/components`
   - Feature-specific → `/features/[domain]`

3. **Write Component:**
   ```tsx
   export const MyComponent: React.FC<MyComponentProps> = ({ title, onClose }) => {
     const [state, setState] = useState(false);
     
     return <div>{title}</div>;
   };
   ```

4. **Style with Tailwind:**
   ```tsx
   className={cn("base-classes", condition && "conditional-classes")}
   ```

5. **Type-check:** Run `npm run build` to verify TypeScript errors.

## Workflow: Adding a New Page/Section

1. **Create feature folder** in `/features/[feature-name]`
2. **Create main component** (e.g., `FeatureSection.tsx`)
3. **Create sub-components** if needed (e.g., `FeatureCard.tsx`)
4. **Export from main component** for easy imports
5. **Import in App.tsx** and add to layout
6. **Add navigation link** if needed
7. **Create SEO metadata** using React Helmet
8. **Test responsive design** (mobile, tablet, desktop)

## Workflow: Form Implementation

1. **Define Zod schema** for validation
2. **Create form component** with React Hook Form
3. **Use Zod resolver** for validation
4. **Render form fields** with error displays
5. **Handle submission** with proper error feedback
6. **Add loading state** during submission
7. **Show success/error messages**

## Workflow: Deployment

1. **Build locally:** `npm run build`
2. **Test build output:** `npm run preview`
3. **Commit changes:** `git commit -m "description"`
4. **Push to main:** `git push origin main`
5. **Netlify auto-deploys** on push to main
6. **Verify on netlify.toml** build commands are correct
7. **Check performance** using Lighthouse in DevTools

## Decision Points

### Should this be a component or hook?
- **Component:** Has visual output (JSX)
- **Hook:** Pure logic that can be reused across components

### Where should this logic live?
- **Component file:** If used only by this component
- **Hook file:** If reused by multiple components
- **Utility file:** If pure function with no React dependencies
- **Context:** Only if prop drilling becomes problematic

### Is this configuration efficient and simple?
- Ask: "Can I accomplish this with fewer lines?"
- Ask: "Will another dev understand this quickly?"
- Prefer built-in React over third-party packages (unless necessary)
- Avoid premature optimization

### Should this be in features or components?
- **components/:** Navigation, Footer, ErrorBoundary, shared UI (Buttons, Cards, Modals)
- **features/:** Domain-specific sections (Hero, Services, Gallery, Contact)

## Common Gotchas & Solutions

| Issue | Solution |
|-------|----------|
| Tailwind classes not applying | Check `cn()` usage, ensure class is in tailwind.config.js |
| Mobile styling breaks | Always design mobile-first, use `md:`, `lg:` breakpoints |
| Forms don't validate | Verify Zod schema matches form fields, check zodResolver setup |
| Components re-render unnecessarily | Lift state higher or use custom hooks to memoize |
| TypeScript errors in props | Always define interface, use `React.FC<Props>` |
| Animations feel sluggish | Reduce transition duration, use `will-change` in Tailwind |
| Offline page not showing | Check navigator.onLine listener is set up correctly |

## Testing Your Work

- **TypeScript:** `npm run build` (catches type errors)
- **Visual:** `npm run preview` (test build locally)
- **Mobile:** Test in browser DevTools mobile view or physical device
- **Performance:** Use Lighthouse audit in Chrome DevTools
- **Accessibility:** Use axe DevTools browser extension

## Related Commands

- `npm run dev` – Start development server with hot reload
- `npm run build` – Compile and optimize for production
- `npm run preview` – Test production build locally

---

**Use this skill when:** Creating components, adding pages, styling sections, setting up forms, managing SEO, or deploying changes to this project.
