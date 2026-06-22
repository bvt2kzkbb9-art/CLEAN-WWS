import { memo, HTMLAttributes } from 'react'
import { colors, radius, animations } from '@/theme'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

function SkeletonComponent({
  variant = 'rectangular',
  width = '100%',
  height = '20px',
  style,
  ...props
}: SkeletonProps) {
  const baseStyle: React.CSSProperties = {
    backgroundColor: colors.border.light,
    animation: `pulse ${animations.duration.complex} ${animations.easing.easeInOut} infinite`,
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    text: {
      ...baseStyle,
      height: height,
      borderRadius: radius.button,
    },
    circular: {
      ...baseStyle,
      borderRadius: '50%',
      width: width,
      height: width,
    },
    rectangular: {
      ...baseStyle,
      borderRadius: radius.card,
      width: width,
      height: height,
    },
  }

  const customStyle: React.CSSProperties = {
    ...style,
    ...variantStyles[variant],
  }

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      <div style={customStyle} {...props} />
    </>
  )
}

export const Skeleton = memo(SkeletonComponent)
