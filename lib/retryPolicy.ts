/**
 * Retry policy with exponential backoff
 */

interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  shouldRetry?: (error: Error, attempt: number) => boolean;
}

const defaultConfig: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 100,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
};

/**
 * Calculate delay with exponential backoff
 */
function calculateDelay(attempt: number, config: RetryConfig): number {
  const exponentialDelay = config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt - 1);
  return Math.min(exponentialDelay, config.maxDelayMs);
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * @param fn - Async function to retry
 * @param config - Retry configuration
 * @returns Result of the function
 * @throws Last error if all attempts fail
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  config?: Partial<RetryConfig>
): Promise<T> {
  const finalConfig: RetryConfig = { ...defaultConfig, ...config };

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= finalConfig.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if we should retry
      if (finalConfig.shouldRetry && !finalConfig.shouldRetry(lastError, attempt)) {
        throw lastError;
      }

      // If this was the last attempt, throw the error
      if (attempt === finalConfig.maxAttempts) {
        throw lastError;
      }

      // Wait before retrying
      const delay = calculateDelay(attempt, finalConfig);
      await sleep(delay);
    }
  }

  throw lastError || new Error('Retry failed');
}

/**
 * Retry with timeout
 */
export async function retryWithTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number = 5000,
  config?: Partial<RetryConfig>
): Promise<T> {
  return Promise.race([
    retryWithBackoff(fn, config),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ]);
}
