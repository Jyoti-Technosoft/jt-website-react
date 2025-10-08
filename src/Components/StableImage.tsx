import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';

interface StableImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  className?: string;
  sx?: any;
  fallbackSrc?: string;
  priority?: boolean;
}

const StableImage: React.FC<StableImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  className,
  sx,
  fallbackSrc = '/assets/placeholder.png',
  priority = false,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  }, [fallbackSrc, imageSrc]);

  // Ensure dimensions are set to prevent layout shift
  const imageStyle = {
    width: width || '100%',
    height: height || 'auto',
    display: 'block',
    objectFit: 'cover' as const,
    ...sx,
  };

  return (
    <Box
      component="img"
      src={imageSrc}
      alt={alt}
      loading={priority ? 'eager' : loading}
      className={className}
      sx={{
        ...imageStyle,
        opacity: isLoading ? 0.7 : 1,
        transition: 'opacity 0.3s ease',
        ...(hasError && {
          filter: 'grayscale(100%)',
          opacity: 0.5,
        }),
      }}
      onLoad={handleLoad}
      onError={handleError}
      // Critical: Set explicit dimensions to prevent CLS
      width={width}
      height={height}
    />
  );
};

export default React.memo(StableImage);



