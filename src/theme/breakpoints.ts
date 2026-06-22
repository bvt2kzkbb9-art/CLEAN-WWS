export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const mediaQueries = {
  xs: `@media (min-width: 320px)`,
  sm: `@media (min-width: 640px)`,
  md: `@media (min-width: 768px)`,
  lg: `@media (min-width: 1024px)`,
  xl: `@media (min-width: 1280px)`,
  '2xl': `@media (min-width: 1536px)`,

  // Mobile-first helpers
  below: {
    sm: `@media (max-width: 639px)`,
    md: `@media (max-width: 767px)`,
    lg: `@media (max-width: 1023px)`,
    xl: `@media (max-width: 1279px)`,
  },
} as const

export const deviceSizes = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
} as const
