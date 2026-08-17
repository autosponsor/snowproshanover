/**
 * Environment Variable Validation
 * Ensures all required environment variables are present and valid at runtime
 */

import { z } from 'zod';

const envSchema = z.object({
  // Public browser configuration only. Server credentials are never exposed here.
  VITE_SENTRY_DSN: z.string().optional(),
  
  // App Configuration
  VITE_APP_VERSION: z.string().optional().default('1.0.0'),
  
  // Build-time variables
  MODE: z.enum(['development', 'production']).optional().default('development'),
});

type Env = z.infer<typeof envSchema>;

/**
 * Parse and validate environment variables
 * Throws an error if validation fails
 */
export function getEnv(): Env {
  try {
    const parsed = envSchema.parse(import.meta.env);
    
    // Log warnings for missing optional but recommended variables in production
    if (import.meta.env.MODE === 'production') {
      if (!import.meta.env.VITE_SENTRY_DSN) {
        console.warn('Warning: VITE_SENTRY_DSN not configured. Error monitoring disabled.');
      }
    }
    
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => `${String(err.path[0])}: ${err.message}`)
        .join(', ');
      
      throw new Error(`Environment validation failed: ${missingVars}`);
    }
    throw error;
  }
}

// Export typed environment variables
export const env = getEnv();

// Type-safe access to individual variables
export function getSentryDsn(): string | undefined {
  return env.VITE_SENTRY_DSN;
}

export function getAppVersion(): string {
  return env.VITE_APP_VERSION;
}

export function isProduction(): boolean {
  return import.meta.env.MODE === 'production';
}

export function isDevelopment(): boolean {
  return import.meta.env.MODE === 'development';
}
