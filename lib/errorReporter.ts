/**
 * Error Reporter Service
 * Centralized error logging and reporting
 */

interface ErrorReport {
  message: string;
  error: Error;
  context?: Record<string, unknown>;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

/**
 * Log error to console with formatting
 */
function logToConsole(report: ErrorReport): void {
  const style = {
    info: 'color: #0ea5e9',
    warning: 'color: #f59e0b',
    error: 'color: #ef4444',
    critical: 'color: #dc2626; background: #fecaca',
  };

  console.group(
    `%c[${report.severity.toUpperCase()}] ${report.message}`,
    style[report.severity]
  );
  console.error('Error:', report.error);
  if (report.context) {
    console.table(report.context);
  }
  console.log('Timestamp:', report.timestamp);
  console.groupEnd();
}

/**
 * Send error to remote monitoring service (e.g., Sentry)
 * This is a placeholder for actual Sentry integration
 */
function sendToMonitoring(report: ErrorReport): void {
  // TODO: Integrate with Sentry or similar service
  // Example:
  // if (window.Sentry) {
  //   window.Sentry.captureException(report.error, {
  //     contexts: {
  //       app: report.context,
  //     },
  //     level: report.severity,
  //   });
  // }

  // For now, we'll just log it
  const entry = {
    timestamp: report.timestamp,
    message: report.message,
    severity: report.severity,
    error: report.error.message,
    stack: report.error.stack,
    ...report.context,
  };

  // Could send to backend endpoint
  // navigator.sendBeacon('/api/errors', JSON.stringify(entry));
}

/**
 * Report an error with automatic context collection
 */
export function reportError(
  message: string,
  error: Error,
  context?: Record<string, unknown>,
  severity: 'info' | 'warning' | 'error' | 'critical' = 'error'
): void {
  const report: ErrorReport = {
    message,
    error,
    context: {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      ...context,
    },
    timestamp: new Date().toISOString(),
    severity,
  };

  logToConsole(report);
  sendToMonitoring(report);
}

/**
 * Report a warning (lower severity than error)
 */
export function reportWarning(
  message: string,
  error: Error,
  context?: Record<string, unknown>
): void {
  reportError(message, error, context, 'warning');
}

/**
 * Report critical error (highest severity)
 */
export function reportCritical(
  message: string,
  error: Error,
  context?: Record<string, unknown>
): void {
  reportError(message, error, context, 'critical');
}

/**
 * Global error handler setup
 */
export function setupGlobalErrorHandlers(): void {
  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    reportError('Uncaught Error', event.error as Error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error
      ? event.reason
      : new Error(String(event.reason));

    reportError('Unhandled Promise Rejection', error, {
      promise: String(event.promise),
    });
  });
}
