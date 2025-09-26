import { lazy } from 'react';

// Lazy load heavy components
export const LazyReCAPTCHA = lazy(() => 
  import('react-google-recaptcha').then(module => ({
    default: module.default
  }))
);

// Lazy load Material-UI icons that are used less frequently
export const LazyChevronLeftIcon = lazy(() => 
  import('@mui/icons-material/ChevronLeft').then(module => ({
    default: module.default
  }))
);

export const LazyChevronRightIcon = lazy(() => 
  import('@mui/icons-material/ChevronRight').then(module => ({
    default: module.default
  }))
);

export const LazyBusinessCenterIcon = lazy(() => 
  import('@mui/icons-material/BusinessCenter').then(module => ({
    default: module.default
  }))
);

export const LazyPeopleAltIcon = lazy(() => 
  import('@mui/icons-material/PeopleAlt').then(module => ({
    default: module.default
  }))
);

export const LazyAccessTimeIcon = lazy(() => 
  import('@mui/icons-material/AccessTime').then(module => ({
    default: module.default
  }))
);

export const LazyGamepadIcon = lazy(() => 
  import('@mui/icons-material/Gamepad').then(module => ({
    default: module.default
  }))
);
