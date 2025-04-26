import { useState, useEffect } from "react";

export function useImageWithFallback(
  src?: string,
  fallbackSrc = "/fallback.png"
) {
  const [imageUrl, setImageUrl] = useState(src);

  useEffect(() => {
    if (!src) {
      setImageUrl(fallbackSrc);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageUrl(src);
    };
    img.onerror = () => {
      setImageUrl(fallbackSrc);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  return imageUrl;
}
