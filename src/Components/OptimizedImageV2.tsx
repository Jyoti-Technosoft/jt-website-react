import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import imageManifest from '../imageManifest.json';

interface OptimizedImageProps {
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
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
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
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get WebP version if available
  const getWebPSrc = useCallback((originalSrc: string): string => {
    // Remove leading slash and public path
    const cleanSrc = originalSrc.replace(/^\/assets\//, '').replace(/^\/public\//, '');
    
    // Check if WebP version exists in manifest
    if (imageManifest[cleanSrc]) {
      return `/assets/webp/${imageManifest[cleanSrc]}`;
    }
    
    return originalSrc;
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

  // Try WebP first, fallback to original
  const webpSrc = getWebPSrc(src);
  const finalSrc = webpSrc !== src ? webpSrc : src;

  return (
    <Box
      component="div"
      className={className}
      style={{
        position: 'relative',
        width,
        height,
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
      
      <Box
        component="img"
        src={finalSrc}
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

export default React.memo(OptimizedImage);
