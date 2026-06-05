import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
  alt: string;
  wrapperClassName?: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallback = '',
  alt,
  wrapperClassName = '',
  className = '',
  style,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error' | 'retrying'>('loading');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setCurrentSrc(src);
    setStatus('loading');
    setRetryCount(0);
  }, [src]);

  useEffect(() => {
    console.log(`[OptimizedImage] Registering asset path: "${src}"`);
  }, [src]);

  const handleLoad = () => {
    console.log(`[OptimizedImage] Loaded asset successfully: "${currentSrc}"`);
    setStatus('loaded');
  };

  const handleError = () => {
    console.error(`[OptimizedImage] Failed to compile or draw asset: "${currentSrc}"`);
    
    if (retryCount < 2) {
      const nextRetry = retryCount + 1;
      setRetryCount(nextRetry);
      setStatus('retrying');
      console.warn(`[OptimizedImage] Initiating retry mechanism on "${src}" (Attempt ${nextRetry}/2)`);
      
      const separator = src.includes('?') ? '&' : '?';
      setCurrentSrc(`${src}${separator}retry=${Date.now()}-${nextRetry}`);
    } else if (fallback && currentSrc !== fallback) {
      console.warn(`[OptimizedImage] Fallback triggered. Swapping "${currentSrc}" with "${fallback}"`);
      setCurrentSrc(fallback);
      setStatus('error');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full flex items-center justify-center bg-black/40 ${wrapperClassName}`}>
      {/* Dynamic CRT decoded overlay spinner */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 font-mono text-[10px] text-[#00ff66]/50 animate-pulse z-10">
          [ DECODING_STREAM_0{retryCount + 1}... ]
        </div>
      )}

      {/* Dynamic CRT retry overlay */}
      {status === 'retrying' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/85 font-mono text-[10px] text-amber-500 animate-pulse z-10">
          [ COMPOSITOR_RETRY_0{retryCount}... ]
        </div>
      )}

      {/* Ultimate offline placeholder */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 border border-[#00ff66]/20 text-[#00ff66]/40 p-2 font-mono text-[10px] text-center z-10 select-none">
          <span className="font-bold text-amber-500 mb-1">[ SIGNAL_LOSS ]</span>
          <span className="text-[8px] opacity-75 select-text break-all px-1 max-w-full truncate">{alt}</span>
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full ${className} ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={style}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
