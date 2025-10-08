import { useEffect } from 'react';

// Accessibility utilities and improvements
export const AccessibilityEnhancer: React.FC = () => {
  useEffect(() => {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA landmarks
    const main = document.querySelector('main');
    if (!main) {
      const mainElement = document.createElement('main');
      mainElement.id = 'main-content';
      mainElement.setAttribute('role', 'main');
      document.body.appendChild(mainElement);
    }

    // Add focus management for modals and dropdowns
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key handling
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }

      // Tab key handling for better navigation
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Add high contrast mode detection
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    const handleContrastChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };

    prefersHighContrast.addEventListener('change', handleContrastChange);
    if (prefersHighContrast.matches) {
      document.body.classList.add('high-contrast');
    }

    // Add reduced motion detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    };

    prefersReducedMotion.addEventListener('change', handleMotionChange);
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      prefersHighContrast.removeEventListener('change', handleContrastChange);
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return null;
};

// Utility functions for accessibility
export const addAriaLabels = (element: HTMLElement, label: string) => {
  element.setAttribute('aria-label', label);
};

export const addAriaDescribedBy = (element: HTMLElement, descriptionId: string) => {
  element.setAttribute('aria-describedby', descriptionId);
};

export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `;
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export default AccessibilityEnhancer;



