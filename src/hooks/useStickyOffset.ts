import { useState, useEffect, useRef } from 'react';

export function useStickyOffset() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState<string>('0px');

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let rafId: number | null = null;

    const updateOffset = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!el) return;

        const elementHeight = el.offsetHeight;
        const windowHeight = window.innerHeight;
        const isMd = window.innerWidth >= 768; // Matches tailwind md: breakpoint

        const computedOffset = (isMd && elementHeight > windowHeight)
          ? `${windowHeight - elementHeight}px`
          : '0px';

        setStickyTop(prev => prev !== computedOffset ? computedOffset : prev);
      });
    };

    // Run first measurement
    updateOffset();

    // Observe changes inside the element to handle dynamic content or photo uploads perfectly
    const observer = new ResizeObserver(() => {
      updateOffset();
    });
    observer.observe(el);

    // Track frame size and media viewport changes
    window.addEventListener('resize', updateOffset, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return { elementRef, stickyTop };
}


