import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';

interface AdvancedImageOptimizerProps {
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
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const AdvancedImageOptimizer: React.FC<AdvancedImageOptimizerProps> = ({
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
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
}) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : '');
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Enhanced WebP and AVIF support detection
  const getImageFormat = useCallback(() => {
    if (typeof window === 'undefined') return 'webp';
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    // Check AVIF support first (better compression)
    if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
      return 'avif';
    }
    
    // Fallback to WebP
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      return 'webp';
    }
    
    return 'original';
  }, []);

  // Generate optimized src with multiple format support
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    if (!originalSrc) return '';
    
    const format = getImageFormat();
    let optimizedSrc = originalSrc;
    
    if (format === 'avif') {
      if (originalSrc.includes('.png')) {
        optimizedSrc = originalSrc.replace('.png', '.avif');
      } else if (originalSrc.includes('.jpg') || originalSrc.includes('.jpeg')) {
        optimizedSrc = originalSrc.replace(/\.(jpg|jpeg)/, '.avif');
      }
    } else if (format === 'webp') {
      if (originalSrc.includes('.png')) {
        optimizedSrc = originalSrc.replace('.png', '.webp');
      } else if (originalSrc.includes('.jpg') || originalSrc.includes('.jpeg')) {
        optimizedSrc = originalSrc.replace(/\.(jpg|jpeg)/, '.webp');
      }
    }

    return optimizedSrc;
  }, [getImageFormat]);

  // Intersection Observer for lazy loading with better performance
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
        rootMargin: '100px 0px', // Increased margin for better UX
        threshold: 0.01,
      }
    );

    observerRef.current = observer;
    observer.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // Load image when in view with error handling
  useEffect(() => {
    if (isInView && !imageSrc) {
      const optimizedSrc = getOptimizedSrc(src);
      setImageSrc(optimizedSrc);
    }
  }, [isInView, src, imageSrc, getOptimizedSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    
    onError?.();
  }, [fallbackSrc, imageSrc, onError]);

  // Generate responsive image srcset
  const generateSrcSet = useCallback((baseSrc: string) => {
    if (!baseSrc) return '';
    
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    const srcSet = sizes
      .map(size => `${baseSrc}?w=${size}&q=${quality} ${size}w`)
      .join(', ');
    
    return srcSet;
  }, [quality]);

  const optimizedSrc = getOptimizedSrc(imageSrc);
  const srcSet = generateSrcSet(optimizedSrc);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <Skeleton
      variant="rectangular"
      width={width || '100%'}
      height={height || 200}
      animation="wave"
      sx={{
        borderRadius: 1,
        ...sx,
      }}
    />
  );

  // Blur placeholder component
  const BlurPlaceholder = () => (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: blurDataURL ? `url(${blurDataURL})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(10px)',
        transform: 'scale(1.1)',
        zIndex: 1,
      }}
    />
  );

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width: width || '100%',
        height: height || 'auto',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {isLoading && placeholder === 'blur' && <BlurPlaceholder />}
      {isLoading && placeholder === 'empty' && <LoadingSkeleton />}
      
      {imageSrc && (
        <Box
          component="img"
          src={optimizedSrc}
          srcSet={srcSet}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          className={className}
          sizes={sizes}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            ...(hasError && {
              filter: 'grayscale(100%)',
              opacity: 0.5,
            }),
          }}
          onLoad={handleLoad}
          onError={handleError}
          // Critical: Set explicit dimensions to prevent CLS
          style={{
            width: width || '100%',
            height: height || 'auto',
          }}
        />
      )}
    </Box>
  );
};

export default memo(AdvancedImageOptimizer);
