
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary class component to catch JavaScript errors anywhere in their child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 */
// Fix: Explicitly extend React.Component to ensure this.props and this.state are correctly typed and recognized by the compiler.
export class ErrorBoundary extends React.Component<Props, State> {
  // Fix: Initialize state as a class property. This ensures 'this.state' is defined for the TypeScript compiler and avoids scoping issues in the constructor.
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    // Fix: Access hasError from the state object. Inheriting from React.Component ensures 'this.state' is available.
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="text-brand" size={40} />
          </div>
          <h1 className="text-3xl font-display text-white mb-4">Something went wrong</h1>
          <p className="text-snow-200 mb-8 max-w-md">
            The application encountered an unexpected error. Don't worry, your snow removal request is still our priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-brand text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} /> Reload App
            </button>
            <a
              href="tel:6474500225"
              className="px-8 py-3 glass text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Call Directly
            </a>
          </div>
        </div>
      );
    }

    // Fix: Access children via this.props to return the wrapped content. Inheriting from React.Component ensures 'this.props' is available.
    return this.props.children;
  }
}
