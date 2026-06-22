import { memo, ImgHTMLAttributes } from 'react'
import { colors, radius } from '@/theme'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  initials?: string
  status?: 'online' | 'offline' | 'away'
}

const sizeMap = {
  sm: { size: '32px', fontSize: '0.75rem' },
  md: { size: '40px', fontSize: '0.875rem' },
  lg: { size: '64px', fontSize: '1.125rem' },
  xl: { size: '96px', fontSize: '1.5rem' },
}

function AvatarComponent({ size = 'md', initials, status, alt, src, ...props }: AvatarProps) {
  const { size: sizeValue, fontSize } = sizeMap[size]

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    width: sizeValue,
    height: sizeValue,
  }

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: radius.avatar,
    backgroundColor: colors.border.light,
    objectFit: 'cover',
    display: src ? 'block' : 'none',
  }

  const fallbackStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: radius.avatar,
    backgroundColor: colors.primary,
    display: src ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize,
    fontWeight: 600,
    color: colors.text.inverse,
  }

  const statusIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: status === 'online' ? colors.success : status === 'away' ? colors.warning : colors.text.secondary,
    border: `2px solid ${colors.background.paper}`,
  }

  return (
    <div style={containerStyle}>
      {src && <img src={src} alt={alt} style={imageStyle} {...props} />}
      {!src && <div style={fallbackStyle}>{initials}</div>}
      {status && <div style={statusIndicatorStyle} title={status} />}
    </div>
  )
}

export const Avatar = memo(AvatarComponent)
