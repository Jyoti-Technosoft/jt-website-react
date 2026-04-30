/**
 * Design Tokens for Jyoti Technosoft Website
 * Centralized design system for consistent styling across the application
 */

export const colors = {
  // Primary brand colors
  primary: {
    50: '#1f5795',    // Deep blue
    100: '#3f87df',   // Light blue
    900: '#0a2540',   // Dark blue
  },
  
  // Secondary colors
  secondary: {
    50: '#2ea67d',    // Green
    100: '#52c41a',   // Light green
    900: '#1a5f3f',   // Dark green
  },
  
  // Neutral colors
  neutral: {
    50: '#f8fafc',    // Very light gray
    100: '#f1f5f9',  // Light gray
    200: '#e2e8f0',  // Gray
    300: '#d1d5db',  // Medium gray
    400: '#94a3b8',  // Gray
    500: '#6b7280',  // Dark gray
    600: '#475569',  // Darker gray
    700: '#334155',  // Very dark gray
    800: '#1e293b',  // Almost black
    900: '#111827',  // Black
  },
  
  // Semantic colors
  white: '#ffffff',
  black: '#000000',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    accent: '#f0f7ff',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  // Text colors
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    muted: '#94a3b8',
    light: '#d1d5db',
    inverse: '#ffffff',
    blue: '#1f5795',
  },
  
  // Border colors
  border: {
    light: '#e2e8f0',
    medium: '#d1d5db',
    dark: '#94a3b8',
    primary: '#1f5795',
    soft: 'rgba(31, 87, 149, 0.08)',
  },
  
  // Shadow colors
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0.15)',
    card: '0 4px 6px rgba(31, 87, 149, 0.08)',
    soft: '0 8px 32px rgba(31, 87, 149, 0.14)',
    button: '0 2px 4px rgba(31, 87, 149, 0.2)',
  },
} as const;

export const spacing = {
  // Base spacing unit (rem)
  base: 0.25,  // 4px at 16px base
  
  // Spacing scale
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  
  // Component-specific spacing
  section: '4rem',     // 64px
  card: '1.5rem',    // 24px
  button: '0.75rem',  // 12px
  input: '0.5rem',   // 8px
  gap: '1rem',       // 16px
  icon: '0.75rem',   // 12px
} as const;

export const typography = {
  // Font families
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Georgia", serif',
    mono: '"Fira Code", "Courier New", monospace',
  },
  
  // Font sizes (rem)
  fontSize: {
    xs: 0.75,    // 12px
    sm: 0.875,   // 14px
    base: 1,      // 16px
    lg: 1.125,  // 18px
    xl: 1.25,    // 20px
    '2xl': 1.5,   // 24px
    '3xl': 1.875, // 28px
    '4xl': 2.25,  // 36px
    '5xl': 3,     // 48px
    
    // Component-specific sizes
    hero: {
      title: 2.5,     // 40px
      subtitle: 1.125,  // 18px
      description: 1,     // 16px
    },
    section: {
      title: 2,       // 32px
      subtitle: 1.125,  // 18px
      description: 1,     // 16px
    },
    card: {
      title: 1.125,   // 18px
      body: 1,       // 16px
      caption: 0.875,  // 14px
    },
    button: {
      small: 0.875,  // 14px
      medium: 1,     // 16px
      large: 1.125,  // 20px
    },
  },
  
  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    heading: 1.2,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;

export const borderRadius = {
  none: '0px',
  sm: '2px',
  md: '4px',
  lg: '6px',
  xl: '8px',
  '2xl': '12px',
  '3xl': '16px',
  full: '9999px',
  
  // Component-specific
  button: '8px',
  card: '14px',
  modal: '12px',
} as const;

export const shadows = {
  card: '0 4px 6px rgba(31, 87, 149, 0.08)',
  cardHover: '0 8px 32px rgba(31, 87, 149, 0.14)',
  button: '0 2px 4px rgba(31, 87, 149, 0.2)',
  modal: '0 25px 50px rgba(0, 0, 0.25)',
  navigation: '0 2px 8px rgba(0, 0, 0.15)',
} as const;

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  modal: 1050,
  navigation: 1100,
  tooltip: 1200,
} as const;

export const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
} as const;

// Combined theme object
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
} as const;
