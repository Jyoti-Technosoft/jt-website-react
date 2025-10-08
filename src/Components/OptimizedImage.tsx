import React, { useState, useCallback, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  className?: string;
  sx?: any;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  className,
  sx,
  fallbackSrc = '/assets/placeholder.png',
  onLoad,
  onError,
  priority = false,
  sizes = '100vw',
}) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : '');
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !imageSrc) {
      setImageSrc(src);
    }
  }, [isInView, src, imageSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    onError?.();
  }, [fallbackSrc, imageSrc, onError]);

  // Generate optimized src with WebP support and responsive images
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc) return '';
    
    // Check WebP support
    const supportsWebP = () => {
      if (typeof window === 'undefined') return false;
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    let optimizedSrc = originalSrc;
    
    // Convert to WebP if supported
    if (supportsWebP()) {
      if (originalSrc.includes('.png')) {
        optimizedSrc = originalSrc.replace('.png', '.webp');
      } else if (originalSrc.includes('.jpg') || originalSrc.includes('.jpeg')) {
        optimizedSrc = originalSrc.replace(/\.(jpg|jpeg)/, '.webp');
      }
    }

    return optimizedSrc;
  };

  const optimizedSrc = getOptimizedSrc(imageSrc);

  return (
    <Box
      ref={imgRef}
      component="img"
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      className={className}
      sizes={sizes}
      sx={{
        ...sx,
        opacity: isLoading ? 0.7 : 1,
        transition: 'opacity 0.3s ease',
        ...(hasError && {
          filter: 'grayscale(100%)',
          opacity: 0.5,
        }),
        ...(isLoading && {
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'loading 1.5s infinite',
        }),
      }}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default React.memo(OptimizedImage);


