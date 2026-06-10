"use client";

import { CldImage } from 'next-cloudinary';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  blur?: number;
  brightness?: number;
  grayscale?: boolean;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width = 400, 
  height = 400, 
  className = "",
  blur,
  brightness,
  grayscale
}: OptimizedImageProps) {
  // ✅ CORRECTION : Remplacer raw/upload par image/upload
  let correctedSrc = src;
  if (src && src.includes('/raw/upload/')) {
    correctedSrc = src.replace('/raw/upload/', '/image/upload/');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effects: any[] = [];
  
  if (blur) effects.push({ blur });
  if (brightness) effects.push({ brightness });
  if (grayscale) effects.push({ grayscale: true });

  return (
    <CldImage
      src={correctedSrc}
      alt={alt}
      width={width}
      height={height}
      crop="fill"
      gravity="auto"
      effects={effects.length > 0 ? effects : undefined}
      className={className}
    />
  );
}