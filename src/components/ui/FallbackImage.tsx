"use client";

import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  className?: string;
}

const FallbackImage: React.FC<FallbackImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc, 
  className, 
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      }
    }
  };

  if (hasError && !fallbackSrc) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg ${className}`}>
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold border border-amber-100">
             DGE
          </div>
          <ImageOff className="w-4 h-4 text-gray-300" />
        </div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default FallbackImage;
