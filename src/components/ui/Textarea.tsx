import { memo, TextareaHTMLAttributes, useState } from 'react'
import { colors, spacing, radius, typography } from '@/theme'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

function TextareaComponent({
  label,
  error,
  hint,
  disabled,
  ...props
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false)

  const borderColor = error ? colors.error : isFocused ? colors.primary : colors.border.default

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.base,
    border: `1px solid ${borderColor}`,
    borderRadius: radius.input,
    backgroundColor: disabled ? colors.border.light : colors.background.paper,
    color: colors.text.primary,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    resize: 'vertical',
    minHeight: '100px',
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
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

      <textarea
        disabled={disabled}
        onFocus={(e) => {
          setIsFocused(true)
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          props.onBlur?.(e)
        }}
        style={textareaStyle}
        {...props}
      />

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

export const Textarea = memo(TextareaComponent)
