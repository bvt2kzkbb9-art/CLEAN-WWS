import { memo, ButtonHTMLAttributes } from 'react'
import { colors, spacing, radius, shadows, typography } from '@/theme'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const variantColors: Record<'primary' | 'secondary' | 'ghost' | 'danger', { bg: string; color: string; bgHover?: string; border?: string }> = {
  primary: { bg: colors.primary, color: colors.text.inverse, bgHover: colors.primaryDark },
  secondary: { bg: colors.secondary, color: colors.text.inverse, bgHover: colors.secondaryDark },
  ghost: { bg: 'transparent', color: colors.primary, border: colors.border.default },
  danger: { bg: colors.error, color: colors.text.inverse, bgHover: colors.errorDark },
}

const sizeMap = {
  sm: { fontSize: typography.fontSize.sm, padding: `${spacing.sm} ${spacing.md}`, height: '32px' },
  md: { fontSize: typography.fontSize.base, padding: `${spacing.md} ${spacing.lg}`, height: '40px' },
  lg: { fontSize: typography.fontSize.lg, padding: `${spacing.lg} ${spacing.xl}`, height: '48px' },
}

function ButtonComponent({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  const variantColor = variantColors[variant]
  const sizeStyle = sizeMap[size]

  const customStyle: React.CSSProperties = {
    ...style,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    border: variant === 'ghost' ? `1px solid ${variantColor.border}` : 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    fontWeight: typography.fontWeight.semibold,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: radius.button,
    fontFamily: typography.fontFamily.base,
    backgroundColor: variantColor.bg,
    color: variantColor.color,
    boxShadow: variant === 'ghost' ? 'none' : (variant === 'primary' || variant === 'secondary') ? shadows.md : 'none',
    opacity: disabled || isLoading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    fontSize: sizeStyle.fontSize,
    padding: sizeStyle.padding,
    height: sizeStyle.height,
  }

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  )

  return (
    <button
      disabled={disabled || isLoading}
      style={customStyle}
      {...props}
    >
      {isLoading ? '...' : content}
    </button>
  )
}

// Add styles to component
const Button = memo(ButtonComponent)
export { Button }
