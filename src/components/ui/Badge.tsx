import { memo, HTMLAttributes } from 'react'
import { colors, spacing, radius, typography } from '@/theme'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
}

const variantStyles = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.text.inverse,
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.text.inverse,
  },
  success: {
    backgroundColor: colors.success,
    color: colors.text.inverse,
  },
  warning: {
    backgroundColor: colors.warning,
    color: colors.text.inverse,
  },
  error: {
    backgroundColor: colors.error,
    color: colors.text.inverse,
  },
  info: {
    backgroundColor: colors.info,
    color: colors.text.inverse,
  },
}

const sizeStyles = {
  sm: {
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: typography.fontSize.xs,
    height: '20px',
  },
  md: {
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.fontSize.sm,
    height: '28px',
  },
}

function BadgeComponent({
  variant = 'primary',
  size = 'md',
  style,
  children,
  ...props
}: BadgeProps) {
  const customStyle: React.CSSProperties = {
    ...style,
    ...variantStyles[variant],
    ...sizeStyles[size],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.button,
    fontWeight: typography.fontWeight.semibold,
    whiteSpace: 'nowrap',
  }

  return (
    <span style={customStyle} {...props}>
      {children}
    </span>
  )
}

export const Badge = memo(BadgeComponent)
