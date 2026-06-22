export interface ErrorMessageProps {
  error: string | null
  onDismiss?: () => void
  onRetry?: () => void
}

export function ErrorMessage({ error, onDismiss, onRetry }: ErrorMessageProps) {
  if (!error) return null

  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#ffebee',
        border: '1px solid #ef5350',
        borderRadius: '4px',
        color: '#c62828',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>Error:</strong> {error}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {onRetry && (
            <button
              onClick={onRetry}
              style={{
                padding: '0.4rem 0.8rem',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Retry
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              style={{
                padding: '0.4rem 0.8rem',
                backgroundColor: 'transparent',
                color: '#c62828',
                border: '1px solid #c62828',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
