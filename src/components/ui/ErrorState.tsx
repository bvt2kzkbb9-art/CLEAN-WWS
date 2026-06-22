import { memo, HTMLAttributes, ReactNode } from 'react'
import { colors, spacing, typography } from '@/theme'

interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: ReactNode
  error?: Error | null
}

function ErrorStateComponent({
  title,
  description,
  action,
  error,
  style,
  ...props
}: ErrorStateProps) {
  const containerStyle: React.CSSProperties = {
    ...style,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing.xxl} ${spacing.lg}`,
    minHeight: '300px',
    textAlign: 'center',
    backgroundColor: `${colors.error}11`,
    borderRadius: '8px',
    border: `1px solid ${colors.error}33`,
  }

  const iconStyle: React.CSSProperties = {
    fontSize: '64px',
    marginBottom: spacing.lg,
    color: colors.error,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.error,
    marginBottom: spacing.sm,
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    maxWidth: '400px',
  }

  const errorDetailsStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    backgroundColor: colors.background.paper,
    padding: spacing.md,
    borderRadius: '4px',
    marginBottom: spacing.lg,
    maxWidth: '100%',
    wordBreak: 'break-word',
    textAlign: 'left',
  }

  return (
    <div style={containerStyle} {...props}>
      <div style={iconStyle}>⚠️</div>
      <h3 style={titleStyle}>{title}</h3>
      {description && <p style={descriptionStyle}>{description}</p>}
      {error && (
        <pre style={errorDetailsStyle}>{error.message || String(error)}</pre>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}

export const ErrorState = memo(ErrorStateComponent)
