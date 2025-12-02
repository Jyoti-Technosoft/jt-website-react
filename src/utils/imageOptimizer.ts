// Enhanced automatic image optimization utility
// This works with existing <img> tags without code changes

interface ImageOptimizationConfig {
  enableLazyLoading: boolean;
  enableWebP: boolean;
  enableAVIF: boolean;
  quality: 'low' | 'medium' | 'high';
  lazyLoadThreshold: number;
  preloadCriticalImages: boolean;
}

interface OptimizedImage {
  original: string;
  webp: string;
  avif: string;
  loaded: boolean;
  error: boolean;
}

class ImageOptimizer {
  private config: ImageOptimizationConfig;
  private formatSupport: { webp: boolean; avif: boolean } | null = null;
  private optimizedImages: Map<string, OptimizedImage> = new Map();
  private observer: IntersectionObserver | null = null;

  constructor(config: Partial<ImageOptimizationConfig> = {}) {
    this.config = {
      enableLazyLoading: true,
      enableWebP: true,
      enableAVIF: true,
      quality: 'high',
      lazyLoadThreshold: 100,
      preloadCriticalImages: true,
      ...config
    };
  }

  // Check browser format support with caching
  private async checkFormatSupport(): Promise<{ webp: boolean; avif: boolean }> {
    if (this.formatSupport) return this.formatSupport;

    const webp = await this.testFormatSupport('image/webp');
    const avif = await this.testFormatSupport('image/avif');

    this.formatSupport = { webp, avif };
    return this.formatSupport;
  }

  private testFormatSupport(type: string): Promise<boolean> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      
      try {
        const dataURL = canvas.toDataURL(type);
        resolve(dataURL.indexOf(`data:${type}`) === 0);
      } catch {
        resolve(false);
      }
    });
  }

  // Generate optimized image paths
  private generateOptimizedPaths(src: string): OptimizedImage {
    const baseName = src.replace(/\.(png|jpg|jpeg)$/i, '');
    //const extension = src.match(/\.(png|jpg|jpeg)$/i)?.[1] || 'png';
    
    return {
      original: src,
      webp: `${baseName}.webp`,
      avif: `${baseName}.avif`,
      loaded: false,
      error: false
    };
  }

  // Preload critical images
  private preloadCriticalImages() {
    if (!this.config.preloadCriticalImages) return;

    const criticalImages = document.querySelectorAll('img[data-priority="true"], img[loading="eager"]');
    
    criticalImages.forEach((img) => {
      this.optimizeImage(img as HTMLImageElement, true);
    });
  }

  // Optimize a single image
  private async optimizeImage(img: HTMLImageElement, isPriority: boolean = false) {
    const originalSrc = img.src;
    
    // Skip if already processed
    if (img.dataset.optimized === 'true') return;
    
    // Skip if not an asset image
    if (!originalSrc.includes('/assets/')) return;

    try {
      const support = await this.checkFormatSupport();
      const optimizedPaths = this.generateOptimizedPaths(originalSrc);
      
      // Determine best format
      let bestFormat = 'original';
      if (this.config.enableAVIF && support.avif) {
        bestFormat = 'avif';
      } else if (this.config.enableWebP && support.webp) {
        bestFormat = 'webp';
      }

      // If no optimization needed, mark as processed
      if (bestFormat === 'original') {
        img.dataset.optimized = 'true';
        return;
      }

      const optimizedSrc = bestFormat === 'avif' ? optimizedPaths.avif : optimizedPaths.webp;
      
      // Test if optimized version exists
      const testImg = new Image();
      
      testImg.onload = () => {
        // Optimized version exists, use it
        img.src = optimizedSrc;
        img.dataset.optimized = 'true';
        img.dataset.format = bestFormat;
        
        // Add performance tracking
        this.trackImageOptimization(originalSrc, optimizedSrc, bestFormat);
      };
      
      testImg.onerror = () => {
        // Optimized version doesn't exist, keep original
        img.dataset.optimized = 'true';
        img.dataset.format = 'original';
      };
      
      testImg.src = optimizedSrc;
      
    } catch (error) {
      console.warn('Image optimization failed:', error);
      img.dataset.optimized = 'true';
    }
  }

  // Track optimization performance
  private trackImageOptimization(original: string, optimized: string, format: string) {
    // You can integrate with analytics here
    console.log(`Image optimized: ${original} → ${optimized} (${format})`);
  }

  // Set up lazy loading with Intersection Observer
  private setupLazyLoading() {
    if (!this.config.enableLazyLoading || !('IntersectionObserver' in window)) {
      // Fallback: optimize all images immediately
      this.optimizeAllImages();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            this.optimizeImage(img);
            this.observer?.unobserve(img);
          }
        });
      },
      {
        rootMargin: `${this.config.lazyLoadThreshold}px`
      }
    );

    // Observe all images
    const images = document.querySelectorAll('img[src*="/assets/"]:not([data-priority="true"])');
    images.forEach((img) => {
      this.observer?.observe(img);
    });
  }

  // Optimize all images immediately
  private optimizeAllImages() {
    const images = document.querySelectorAll('img[src*="/assets/"]');
    images.forEach((img) => {
      this.optimizeImage(img as HTMLImageElement);
    });
  }

  // Initialize the optimizer
  public async initialize() {
    if (typeof window === 'undefined') return;

    // Preload critical images first
    this.preloadCriticalImages();

    // Set up lazy loading for other images
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupLazyLoading();
      });
    } else {
      this.setupLazyLoading();
    }

    // Also run on window load for any dynamically added images
    window.addEventListener('load', () => {
      this.optimizeAllImages();
    });
  }

  // Clean up
  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Create global instance
const imageOptimizer = new ImageOptimizer({
  enableLazyLoading: true,
  enableWebP: true,
  enableAVIF: true,
  quality: 'high',
  lazyLoadThreshold: 100,
  preloadCriticalImages: true
});

// Export functions for easy use
export const initializeImageOptimization = () => {
  imageOptimizer.initialize();
};

export const optimizeImageSrc = (src: string): string => {
  // Simple fallback function for manual use
  return src;
};

export const destroyImageOptimizer = () => {
  imageOptimizer.destroy();
};

// Export the class for advanced usage
export { ImageOptimizer };
