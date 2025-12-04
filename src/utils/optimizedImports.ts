// Optimized imports for better tree shaking and bundle size reduction
// This file provides optimized import strategies for all major dependencies

// Material-UI optimized imports
export const muiOptimizedImports = {
  // Core components - import only what's needed
  core: {
    Box: () => import('@mui/material/Box'),
    Typography: () => import('@mui/material/Typography'),
    Button: () => import('@mui/material/Button'),
    Container: () => import('@mui/material/Container'),
    Grid: () => import('@mui/material/Grid'),
    Paper: () => import('@mui/material/Paper'),
    Card: () => import('@mui/material/Card'),
    CardContent: () => import('@mui/material/CardContent'),
    CardActions: () => import('@mui/material/CardActions'),
  },
  
  // Form components
  form: {
    TextField: () => import('@mui/material/TextField'),
    Select: () => import('@mui/material/Select'),
    MenuItem: () => import('@mui/material/MenuItem'),
    FormControl: () => import('@mui/material/FormControl'),
    InputLabel: () => import('@mui/material/InputLabel'),
    Checkbox: () => import('@mui/material/Checkbox'),
    Radio: () => import('@mui/material/Radio'),
    RadioGroup: () => import('@mui/material/RadioGroup'),
    FormControlLabel: () => import('@mui/material/FormControlLabel'),
  },
  
  // Navigation components
  navigation: {
    AppBar: () => import('@mui/material/AppBar'),
    Toolbar: () => import('@mui/material/Toolbar'),
    Drawer: () => import('@mui/material/Drawer'),
    List: () => import('@mui/material/List'),
    ListItem: () => import('@mui/material/ListItem'),
    ListItemText: () => import('@mui/material/ListItemText'),
    ListItemIcon: () => import('@mui/material/ListItemIcon'),
    Breadcrumbs: () => import('@mui/material/Breadcrumbs'),
    Link: () => import('@mui/material/Link'),
  },
  
  // Layout components
  layout: {
    Divider: () => import('@mui/material/Divider'),
    Stack: () => import('@mui/material/Stack'),
    Chip: () => import('@mui/material/Chip'),
    Avatar: () => import('@mui/material/Avatar'),
    Badge: () => import('@mui/material/Badge'),
    Tooltip: () => import('@mui/material/Tooltip'),
  },
  
  // Feedback components
  feedback: {
    CircularProgress: () => import('@mui/material/CircularProgress'),
    LinearProgress: () => import('@mui/material/LinearProgress'),
    Skeleton: () => import('@mui/material/Skeleton'),
    Alert: () => import('@mui/material/Alert'),
    Snackbar: () => import('@mui/material/Snackbar'),
    Backdrop: () => import('@mui/material/Backdrop'),
  },
  
  // Data display components
  dataDisplay: {
    Table: () => import('@mui/material/Table'),
    TableBody: () => import('@mui/material/TableBody'),
    TableCell: () => import('@mui/material/TableCell'),
    TableContainer: () => import('@mui/material/TableContainer'),
    TableHead: () => import('@mui/material/TableHead'),
    TableRow: () => import('@mui/material/TableRow'),
    TablePagination: () => import('@mui/material/TablePagination'),
    Pagination: () => import('@mui/material/Pagination'),
  },
};

// Material-UI Icons optimized imports
export const muiIconsOptimizedImports = {
  // Navigation icons
  navigation: {
    Menu: () => import('@mui/icons-material/Menu'),
    Close: () => import('@mui/icons-material/Close'),
    ArrowBack: () => import('@mui/icons-material/ArrowBack'),
    ArrowForward: () => import('@mui/icons-material/ArrowForward'),
    Home: () => import('@mui/icons-material/Home'),
    Search: () => import('@mui/icons-material/Search'),
  },
  
  // Action icons
  action: {
    Edit: () => import('@mui/icons-material/Edit'),
    Delete: () => import('@mui/icons-material/Delete'),
    Add: () => import('@mui/icons-material/Add'),
    Save: () => import('@mui/icons-material/Save'),
    Cancel: () => import('@mui/icons-material/Cancel'),
    Refresh: () => import('@mui/icons-material/Refresh'),
  },
  
  // Communication icons
  communication: {
    Email: () => import('@mui/icons-material/Email'),
    Phone: () => import('@mui/icons-material/Phone'),
    LocationOn: () => import('@mui/icons-material/LocationOn'),
    Share: () => import('@mui/icons-material/Share'),
    Message: () => import('@mui/icons-material/Message'),
  },
  
  // Social icons
  social: {
    Facebook: () => import('@mui/icons-material/Facebook'),
    Twitter: () => import('@mui/icons-material/Twitter'),
    LinkedIn: () => import('@mui/icons-material/LinkedIn'),
    Instagram: () => import('@mui/icons-material/Instagram'),
    YouTube: () => import('@mui/icons-material/YouTube'),
  },
  
  // Technology icons
  technology: {
    Code: () => import('@mui/icons-material/Code'),
    Web: () => import('@mui/icons-material/Web'),
    Smartphone: () => import('@mui/icons-material/Smartphone'),
    Computer: () => import('@mui/icons-material/Computer'),
    Cloud: () => import('@mui/icons-material/Cloud'),
    Security: () => import('@mui/icons-material/Security'),
  },
};

// React Router optimized imports
export const routerOptimizedImports = {
  // Core router components
  core: {
    BrowserRouter: () => import('react-router-dom').then(m => ({ default: m.BrowserRouter })),
    Routes: () => import('react-router-dom').then(m => ({ default: m.Routes })),
    Route: () => import('react-router-dom').then(m => ({ default: m.Route })),
    Link: () => import('react-router-dom').then(m => ({ default: m.Link })),
    NavLink: () => import('react-router-dom').then(m => ({ default: m.NavLink })),
  },
  
  // Hooks
  hooks: {
    useNavigate: () => import('react-router-dom').then(m => ({ default: m.useNavigate })),
    useLocation: () => import('react-router-dom').then(m => ({ default: m.useLocation })),
    useParams: () => import('react-router-dom').then(m => ({ default: m.useParams })),
  },
};

// Other optimized imports
export const otherOptimizedImports = {
  // React
  react: {
    lazy: () => import('react').then(m => ({ default: m.lazy })),
    Suspense: () => import('react').then(m => ({ default: m.Suspense })),
    memo: () => import('react').then(m => ({ default: m.memo })),
    useCallback: () => import('react').then(m => ({ default: m.useCallback })),
    useMemo: () => import('react').then(m => ({ default: m.useMemo })),
    useEffect: () => import('react').then(m => ({ default: m.useEffect })),
    useState: () => import('react').then(m => ({ default: m.useState })),
  },
  
  // Axios
  axios: {
    default: () => import('axios'),
    get: () => import('axios').then(m => ({ default: m.default.get })),
    post: () => import('axios').then(m => ({ default: m.default.post })),
  },
  
  // Web Vitals
  webVitals: {
    onCLS: () => import('web-vitals').then(m => ({ default: m.onCLS })),
    onINP: () => import('web-vitals').then(m => ({ default: m.onINP })),
    onFCP: () => import('web-vitals').then(m => ({ default: m.onFCP })),
    onLCP: () => import('web-vitals').then(m => ({ default: m.onLCP })),
    onTTFB: () => import('web-vitals').then(m => ({ default: m.onTTFB })),
  },
};

// Import optimization utilities
export const importOptimization = {
  // Create optimized import function
  createOptimizedImport: <T>(importFunc: () => Promise<{ default: T }>) => {
    let cached: T | null = null;
    let loading: Promise<T> | null = null;
    
    return () => {
      if (cached) {
        return Promise.resolve(cached);
      }
      
      if (loading) {
        return loading;
      }
      
      loading = importFunc().then(module => {
        cached = module.default;
        return cached;
      });
      
      return loading;
    };
  },
  
  // Preload critical imports
  preloadCriticalImports: () => {
    const criticalImports = [
      () => import('@mui/material/Box'),
      () => import('@mui/material/Typography'),
      () => import('@mui/material/Button'),
      () => import('react-router-dom'),
    ];
    
    // Preload after initial load
    setTimeout(() => {
      criticalImports.forEach(importFunc => {
        importFunc().catch(console.warn);
      });
    }, 1000);
  },
  
  // Get import statistics
  getImportStatistics: () => {
    return {
      muiComponents: Object.keys(muiOptimizedImports).length,
      muiIcons: Object.keys(muiIconsOptimizedImports).length,
      routerComponents: Object.keys(routerOptimizedImports).length,
      otherImports: Object.keys(otherOptimizedImports).length,
    };
  },
};

// Bundle size optimization tips
export const bundleOptimizationTips = {
  // Import optimization
  imports: {
    good: `
      // ✅ Good - specific imports
      import Box from '@mui/material/Box';
      import Typography from '@mui/material/Typography';
      import Button from '@mui/material/Button';
    `,
    bad: `
      // ❌ Bad - barrel imports
      import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
    `,
  },
  
  // Lazy loading
  lazyLoading: {
    good: `
      // ✅ Good - lazy loading
      const HeavyComponent = lazy(() => import('./HeavyComponent'));
    `,
    bad: `
      // ❌ Bad - immediate loading
      import HeavyComponent from './HeavyComponent';
    `,
  },
  
  // Tree shaking
  treeShaking: {
    good: `
      // ✅ Good - enables tree shaking
      import Menu from '@mui/icons-material/Menu';
    `,
    bad: `
      // ❌ Bad - imports entire library
      import Menu from '@mui/icons-material/Menu';
    `,
  },
};

export default {
  muiOptimizedImports,
  muiIconsOptimizedImports,
  routerOptimizedImports,
  otherOptimizedImports,
  importOptimization,
  bundleOptimizationTips,
};
