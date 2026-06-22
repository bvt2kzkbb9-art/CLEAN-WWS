export const spacing = {
  // Base unit: 4px
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',

  // Aliases for common patterns
  gutter: '16px', // Standard padding/margin
  section: '32px', // Between major sections
  component: '8px', // Between components

  // Common combinations
  padding: {
    xs: '4px',
    sm: '8px',
    md: '12px 16px',
    lg: '16px 24px',
    xl: '24px 32px',
  },

  margin: {
    xs: '4px',
    sm: '8px',
    md: '12px 16px',
    lg: '16px 24px',
    xl: '24px 32px',
  },

  gap: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
} as const
