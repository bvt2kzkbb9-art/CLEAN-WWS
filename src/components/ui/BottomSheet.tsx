import { memo, HTMLAttributes, ReactNode, useEffect } from 'react'
import { colors, spacing, radius, shadows, animations } from '@/theme'

interface BottomSheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

function BottomSheetComponent({
  isOpen,
  onClose,
  title,
  children,
  footer,
  ...props
}: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    animation: `fadeIn ${animations.duration.standard} ${animations.easing.easeOut}`,
  }

  const sheetStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.paper,
    borderTopLeftRadius: radius.modal,
    borderTopRightRadius: radius.modal,
    boxShadow: shadows.lg,
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: `slideUp ${animations.duration.standard} ${animations.easing.easeOut}`,
    zIndex: 1001,
  }

  const handleStyle: React.CSSProperties = {
    width: '40px',
    height: '4px',
    backgroundColor: colors.border.default,
    borderRadius: '2px',
    margin: `${spacing.md} auto`,
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderBottom: `1px solid ${colors.border.default}`,
    flexShrink: 0,
  }

  const bodyStyle: React.CSSProperties = {
    padding: spacing.lg,
    overflow: 'auto',
    flex: 1,
  }

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing.md,
    padding: `${spacing.lg} ${spacing.lg}`,
    borderTop: `1px solid ${colors.border.default}`,
    justifyContent: 'flex-end',
    flexShrink: 0,
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        style={overlayStyle}
        onClick={onClose}
      />
      <div style={sheetStyle} {...props}>
        <div style={handleStyle} />

        {title && (
          <div style={headerStyle}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {title}
            </div>
          </div>
        )}

        <div style={bodyStyle}>{children}</div>

        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </>
  )
}

export const BottomSheet = memo(BottomSheetComponent)
