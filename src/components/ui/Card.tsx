import { memo, HTMLAttributes } from 'react'
import { colors, spacing, radius, shadows } from '@/theme'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
}

const variantStyles = {
  default: {
    boxShadow: shadows.md,
    border: 'none',
  },
  outlined: {
    boxShadow: 'none',
    border: `1px solid ${colors.border.default}`,
  },
  elevated: {
    boxShadow: shadows.lg,
    border: 'none',
  },
}

const paddingStyles = {
  sm: spacing.md,
  md: spacing.lg,
  lg: spacing.xl,
}

function CardComponent({
  variant = 'default',
  padding = 'md',
  style,
  children,
  ...props
}: CardProps) {
  const variantStyle = variantStyles[variant]

  const customStyle: React.CSSProperties = {
    ...style,
    backgroundColor: colors.background.paper,
    borderRadius: radius.card,
    padding: paddingStyles[padding],
    ...variantStyle,
  }

  return (
    <div style={customStyle} {...props}>
      {children}
    </div>
  )
}

export const Card = memo(CardComponent)
