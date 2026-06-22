import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by ErrorBoundary:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <h1 style={{ color: '#d32f2f', marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details
                style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  textAlign: 'left',
                  color: '#d32f2f',
                  fontSize: '0.85rem',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error details</summary>
                <pre style={{ marginTop: '0.5rem', overflow: 'auto' }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
