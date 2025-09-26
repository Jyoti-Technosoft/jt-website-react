import React, { useState, useCallback } from 'react';
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
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  // Generate WebP version if supported
  const getOptimizedSrc = (originalSrc: string) => {
    if (typeof window !== 'undefined' && 'WebP' in window) {
      // Check if WebP is supported
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      
      if (webpSupported && originalSrc.includes('.png')) {
        return originalSrc.replace('.png', '.webp');
      }
    }
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(imageSrc);

  return (
    <Box
      component="img"
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      sx={{
        ...sx,
        opacity: isLoading ? 0.7 : 1,
        transition: 'opacity 0.3s ease',
        ...(hasError && {
          filter: 'grayscale(100%)',
          opacity: 0.5,
        }),
      }}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default React.memo(OptimizedImage);
