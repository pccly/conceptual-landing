"use client";

import React, { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component to catch and handle React errors gracefully
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback or default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

/**
 * Default error fallback UI
 */
function DefaultErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">Oops! Something went wrong</h1>
        <p className="text-xl mb-8 opacity-80">
          We encountered an unexpected error. Please refresh the page to try
          again.
        </p>
        {error && process.env.NODE_ENV === "development" && (
          <details className="text-left bg-black/30 p-6 rounded-lg mb-8">
            <summary className="cursor-pointer font-mono text-sm mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs overflow-auto whitespace-pre-wrap break-words">
              {error.message}
              {"\n\n"}
              {error.stack}
            </pre>
          </details>
        )}
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
