import { memo, HTMLAttributes, ReactNode } from 'react'
import { colors, spacing, typography } from '@/theme'

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

function EmptyStateComponent({
  icon,
  title,
  description,
  action,
  style,
  ...props
}: EmptyStateProps) {
  const containerStyle: React.CSSProperties = {
    ...style,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing.xxl} ${spacing.lg}`,
    minHeight: '300px',
    textAlign: 'center',
  }

  const iconStyle: React.CSSProperties = {
    fontSize: '64px',
    marginBottom: spacing.lg,
    opacity: 0.5,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    maxWidth: '400px',
  }

  return (
    <div style={containerStyle} {...props}>
      {icon && <div style={iconStyle}>{icon}</div>}
      <h3 style={titleStyle}>{title}</h3>
      {description && <p style={descriptionStyle}>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}

export const EmptyState = memo(EmptyStateComponent)
