/**
 * Error Reporter Service
 * Centralized error logging and reporting
 */

import * as Sentry from '@sentry/react';

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
 * Send error to remote monitoring service (Sentry)
 */
function sendToMonitoring(report: ErrorReport): void {
  // Send to Sentry in production
  if (import.meta.env.MODE === 'production' && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureException(report.error, {
      level: report.severity === 'critical' ? 'fatal' : report.severity,
      contexts: {
        app: report.context,
      },
      tags: {
        message: report.message,
      },
    });
  }

  // Also keep console logging for development
  const entry = {
    timestamp: report.timestamp,
    message: report.message,
    severity: report.severity,
    error: report.error.message,
    stack: report.error.stack,
    ...report.context,
  };

  if (import.meta.env.MODE === 'development') {
    console.debug('Error report entry:', entry);
  }
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
 * Initialize Sentry error reporting
 */
export function initializeSentry(): void {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (sentryDsn && import.meta.env.MODE === 'production') {
    Sentry.init({
      dsn: sentryDsn,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.1,
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',
      beforeSend(event) {
        // Filter out certain errors if needed
        return event;
      },
    });
  }
}

/**
 * Global error handler setup
 */
export function setupGlobalErrorHandlers(): void {
  // Initialize Sentry
  initializeSentry();

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
