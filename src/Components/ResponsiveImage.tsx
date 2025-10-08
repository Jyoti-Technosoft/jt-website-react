import React, { useState, useCallback, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fallbackSrc,
  loading = 'lazy',
  className,
  style,
  width,
  height,
  onLoad,
  onError,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  sizes = '100vw',
  quality = 80,
  priority = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
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
      { threshold: 0.1 }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Generate WebP and AVIF sources
  const getOptimizedSources = useCallback((originalSrc: string) => {
    const baseName = originalSrc.replace(/\.(png|jpg|jpeg)$/i, '');
    const extension = originalSrc.match(/\.(png|jpg|jpeg)$/i)?.[1] || 'png';
    
    return {
      avif: `${baseName}.avif`,
      webp: `${baseName}.webp`,
      fallback: originalSrc
    };
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback if available
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    } else {
      onError?.();
    }
  }, [fallbackSrc, imageSrc, onError]);

  const optimizedSources = getOptimizedSources(src);
  const shouldLoad = isInView || priority;

  return (
    <Box
      component="div"
      ref={imgRef}
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        ...style,
      }}
    >
      {isLoading && (
        <Box
          component="img"
          src={placeholder}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(5px)',
            zIndex: 1,
          }}
        />
      )}
      
      {shouldLoad && (
        <picture>
          {/* AVIF format (best compression) */}
          <source
            srcSet={optimizedSources.avif}
            type="image/avif"
            sizes={sizes}
          />
          {/* WebP format (good compression, wide support) */}
          <source
            srcSet={optimizedSources.webp}
            type="image/webp"
            sizes={sizes}
          />
          {/* Fallback for older browsers */}
          <Box
            component="img"
            src={imageSrc}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out',
              zIndex: 2,
              position: 'relative',
            }}
            {...props}
          />
        </picture>
      )}
      
      {hasError && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '14px',
            zIndex: 3,
          }}
        >
          Image failed to load
        </Box>
      )}
    </Box>
  );
};

export default React.memo(ResponsiveImage);
