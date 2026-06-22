import { memo, InputHTMLAttributes, useState } from 'react'
import { colors, spacing, radius, typography } from '@/theme'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

function InputComponent({
  label,
  error,
  hint,
  icon,
  iconPosition = 'left',
  disabled,
  type = 'text',
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const borderColor = error ? colors.error : isFocused ? colors.primary : colors.border.default

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.base,
    border: `1px solid ${borderColor}`,
    borderRadius: radius.input,
    backgroundColor: disabled ? colors.border.light : colors.background.paper,
    color: colors.text.primary,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    paddingLeft: icon && iconPosition === 'left' ? `${parseInt(spacing.lg) * 2 + 24}px` : undefined,
    paddingRight: icon && iconPosition === 'right' ? `${parseInt(spacing.lg) * 2 + 24}px` : undefined,
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
    position: 'relative',
  }

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    pointerEvents: 'none',
    [iconPosition === 'left' ? 'left' : 'right']: spacing.lg,
  }

  return (
    <div style={containerStyle}>
      {label && (
        <label
          style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.text.primary,
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <input
          type={type}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          style={inputStyle}
          {...props}
        />
        {icon && <div style={iconStyle}>{icon}</div>}
      </div>

      {error && (
        <span
          style={{
            fontSize: typography.fontSize.xs,
            color: colors.error,
          }}
        >
          {error}
        </span>
      )}

      {hint && !error && (
        <span
          style={{
            fontSize: typography.fontSize.xs,
            color: colors.text.secondary,
          }}
        >
          {hint}
        </span>
      )}
    </div>
  )
}

export const Input = memo(InputComponent)
