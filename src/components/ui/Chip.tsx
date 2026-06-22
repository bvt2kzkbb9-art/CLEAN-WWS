import { memo, HTMLAttributes } from 'react'
import { colors, spacing, radius, typography } from '@/theme'

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined'
  onRemove?: () => void
  icon?: React.ReactNode
}

function ChipComponent({
  variant = 'default',
  onRemove,
  icon,
  style,
  children,
  ...props
}: ChipProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    borderRadius: radius.button,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  }

  const variantStyle: React.CSSProperties = {
    ...(variant === 'default'
      ? {
          backgroundColor: colors.border.light,
          color: colors.text.primary,
        }
      : {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.border.default}`,
          color: colors.text.primary,
        }),
  }

  const customStyle: React.CSSProperties = {
    ...style,
    ...baseStyle,
    ...variantStyle,
  }

  const closeButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    borderRadius: '50%',
    color: colors.text.secondary,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,
  }

  return (
    <div style={customStyle} {...props}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          style={closeButtonStyle}
          onClick={onRemove}
          aria-label="Remove chip"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export const Chip = memo(ChipComponent)
