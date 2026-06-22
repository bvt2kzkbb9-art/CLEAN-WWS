import { memo, HTMLAttributes, ReactNode, useEffect } from 'react'
import { colors, spacing, radius, shadows, animations } from '@/theme'

interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  closeButton?: boolean
}

const sizeMap = {
  sm: '400px',
  md: '600px',
  lg: '800px',
}

function ModalComponent({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeButton = true,
  ...props
}: ModalProps) {
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: `fadeIn ${animations.duration.standard} ${animations.easing.easeOut}`,
  }

  const modalStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: colors.background.paper,
    borderRadius: radius.modal,
    boxShadow: shadows.lg,
    width: '90%',
    maxWidth: sizeMap[size],
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: `slideInUp ${animations.duration.standard} ${animations.easing.easeOut}`,
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.lg} ${spacing.lg}`,
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

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.text.secondary,
    cursor: 'pointer',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    padding: 0,
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {title && (
          <div style={headerStyle}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {title}
            </div>
            {closeButton && (
              <button
                style={closeButtonStyle}
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div style={bodyStyle}>{children}</div>

        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>
  )
}

export const Modal = memo(ModalComponent)
