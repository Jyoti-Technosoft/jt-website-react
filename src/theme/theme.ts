import { createTheme, Theme } from '@mui/material/styles';

import { theme as designTokens } from './designTokens';

/**
 * Material-UI theme configuration with design tokens
 * Integrates our design system with MUI's theming system
 */
export const appTheme: Theme = createTheme({
  palette: {
    primary: {
      main: designTokens.colors.primary[50] as string,
      light: designTokens.colors.primary[100] as string,
      dark: designTokens.colors.primary[900] as string,
      contrastText: '#ffffff',
    },
    secondary: {
      main: designTokens.colors.secondary[50] as string,
      light: designTokens.colors.secondary[100] as string,
      dark: designTokens.colors.secondary[900] as string,
      contrastText: '#ffffff',
    },
    background: {
      default: designTokens.colors.background.primary,
      paper: designTokens.colors.background.secondary,
    },
    text: {
      primary: designTokens.colors.text.primary,
      secondary: designTokens.colors.text.secondary,
      disabled: designTokens.colors.text.muted,
    },
    divider: designTokens.colors.border.light,
    error: {
      main: designTokens.colors.error,
    },
    warning: {
      main: designTokens.colors.warning,
    },
    info: {
      main: designTokens.colors.info,
    },
    success: {
      main: designTokens.colors.success,
    },
  },
  
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    h1: {
      fontSize: designTokens.typography.fontSize.hero.title,
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.heading,
      letterSpacing: designTokens.typography.letterSpacing.tight,
    },
    h2: {
      fontSize: designTokens.typography.fontSize.section.title,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.heading,
      letterSpacing: designTokens.typography.letterSpacing.tight,
    },
    h3: {
      fontSize: designTokens.typography.fontSize['2xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.heading,
    },
    h4: {
      fontSize: designTokens.typography.fontSize.xl,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.heading,
    },
    h5: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.heading,
    },
    h6: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.heading,
      letterSpacing: designTokens.typography.letterSpacing.wide,
    },
    subtitle1: {
      fontSize: designTokens.typography.fontSize.section.subtitle,
      fontWeight: designTokens.typography.fontWeight.medium,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    subtitle2: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.relaxed,
    },
    body1: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    body2: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    button: {
      fontSize: 1,
      fontWeight: 600,
      textTransform: 'none',
    },
    caption: {
      fontSize: 0.875,
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  
  spacing: designTokens.spacing as any,
  
  shape: {
    borderRadius: designTokens.borderRadius.card as any,
  },
  
  shadows: [
    designTokens.shadows.card,
    designTokens.shadows.cardHover,
    designTokens.shadows.button,
    designTokens.shadows.modal,
    designTokens.shadows.navigation,
  ] as any,
  
  transitions: {
    duration: {
      short: 150,
      standard: 250,
      complex: 350,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(31, 87, 149, 0.2)',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '12px 16px',
          minHeight: '44px',
          
          '&:hover': {
            boxShadow: '0 2px 4px rgba(31, 87, 149, 0.2)',
            transform: 'translateY(-1px)',
          },
          
          '&.Mui-disabled': {
            opacity: 0.6,
            boxShadow: 'none',
          },
        },
      },
    },
    
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 4px 6px rgba(31, 87, 149, 0.08)',
          border: '1px solid rgba(31, 87, 149, 0.08)',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          
          '&:hover': {
            boxShadow: '0 8px 32px rgba(31, 87, 149, 0.14)',
            transform: 'translateY(-2px)',
            borderColor: 'rgba(31, 87, 149, 0.2)',
          },
        },
      },
    },
    
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.025em',
        },
        h2: {
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '-0.025em',
        },
        h3: {
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.2,
        },
        h4: {
          fontSize: 20,
          fontWeight: 600,
          lineHeight: 1.2,
        },
        h5: {
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1.2,
        },
        h6: {
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '0.025em',
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 500,
          lineHeight: 1.5,
        },
        subtitle2: {
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.75,
        },
        body1: {
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.5,
        },
        body2: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
        },
        button: {
          fontSize: 16,
          fontWeight: 600,
          textTransform: 'none',
        },
        caption: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
        },
      },
    },
  },
});

export default appTheme;
