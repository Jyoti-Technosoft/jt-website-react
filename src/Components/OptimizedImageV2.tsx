import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import imageManifest from '../imageManifest.json';

interface ImageManifestEntry {
  original: string;
  webp: string;
  avif: string | null;
  webpSrcSet?: string;
  avifSrcSet?: string;
  width?: number | null;
  height?: number | null;
  size: number;
}

interface ImageManifest {
  [key: string]: ImageManifestEntry;
}

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
  sizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
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
  sizes = '100vw',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getManifestEntry = useCallback((originalSrc: string): ImageManifestEntry | null => {
    const cleanSrc = originalSrc
      .replace(/^\/assets\//, '')
      .replace(/^assets\//, '')
      .replace(/^\/public\/assets\//, '');

    const manifest = imageManifest as ImageManifest;
    return manifest[cleanSrc] || null;
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

  const manifestEntry = getManifestEntry(src);
  const avifSrc = manifestEntry?.avif ? `/assets/${manifestEntry.avif}` : null;
  const webpSrc = manifestEntry?.webp ? `/assets/${manifestEntry.webp}` : null;
  const imageWidth = width || manifestEntry?.width || undefined;
  const imageHeight = height || manifestEntry?.height || undefined;

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
      
      <picture>
        {avifSrc && (
          <source
            srcSet={manifestEntry?.avifSrcSet || avifSrc}
            sizes={sizes}
            type="image/avif"
          />
        )}
        {webpSrc && (
          <source
            srcSet={manifestEntry?.webpSrcSet || webpSrc}
            sizes={sizes}
            type="image/webp"
          />
        )}
        <Box
          component="img"
          src={imageSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          width={imageWidth}
          height={imageHeight}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: (loading === 'eager' || props.fetchPriority === 'high' || !isLoading) ? 1 : 0,
            transition: (loading === 'eager' || props.fetchPriority === 'high') ? 'none' : 'opacity 0.3s ease-in-out',
            zIndex: 2,
            position: 'relative',
          }}
          {...props}
        />
      </picture>
      
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
