'use client';

import { memo, ReactNode, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import cn from 'classnames';

import { ImageType } from '@/shared/types/common';

import fallbackImage from '@/assets/images/fallback.png';

import styles from './AppImage.module.scss';

interface AppImageProps extends Omit<ImageProps, 'alt' | 'src'> {
  alt: string;
  src?: ImageType | null;
  className?: string;
  fallback?: ReactNode;
}

export const AppImage = memo(({
  className, alt, src, fallback, width = 0, height = 0, onError, ...imageProps
}:AppImageProps) => {
  const [error, setError] = useState(false);
  if (!src || error) {
    if (!fallback) {
      return (
        <Image
          src={fallbackImage}
          alt={alt}
          width={width}
          height={height}
          className={cn(className, styles.img, 'w-full')}
          {...imageProps}
        />
      );
    }
    return <div className={className}>{fallback}</div>;
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className, styles.img, 'w-full')}
      onError={(event) => {
        setError(true);
        onError?.(event);
      }}
      {...imageProps}
    />
  );
});
