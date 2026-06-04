import React, { useEffect, useRef } from 'react';

export default function AmbientDotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let time = 0;
    const SPACING = 20;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.restore();
      ctx.save();
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const getNoise = (c: number, r: number) => {
      const val = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
      return val - Math.floor(val);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);
      time += 0.002;
      const centerX = width / 2;
      const centerY = height / 2;
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const startX = (width % SPACING) / 2;
      const startY = (height % SPACING) / 2;

      for (let col = 0; col < cols; col++) {
        const x = startX + col * SPACING;
        for (let row = 0; row < rows; row++) {
          const y = startY + row * SPACING;
          const dx = (x - centerX) / (width * 0.70);
          const dy = (y - centerY) / (height * 0.65);
          const radialFactor = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy));
          const fadeOpacity = Math.max(0.40, Math.pow(radialFactor, 0.75));
          const dotHash = getNoise(col, row);
          const wave = Math.sin(time + (col * 0.04) + (row * 0.03)) * 0.006;

          const baseAlpha = Math.max(0.026, (0.042 + wave + dotHash * 0.015) * fadeOpacity);
          if (baseAlpha > 0.005) {
            ctx.fillStyle = `rgba(0, 255, 102, ${baseAlpha})`;
            ctx.fillRect(x - 0.6, y - 0.6, 1.2, 1.2);
          }
          if (dotHash > 0.30) {
            const midAlpha = Math.max(0.032, (0.055 + wave * 1.2) * fadeOpacity);
            if (midAlpha > 0.005) {
              ctx.fillStyle = `rgba(0, 255, 102, ${midAlpha * 0.15})`;
              ctx.fillRect(x - 2.4, y - 2.4, 4.8, 4.8);
              ctx.fillStyle = `rgba(0, 255, 102, ${midAlpha})`;
              ctx.fillRect(x - 0.95, y - 0.95, 1.9, 1.9);
            }
          }
          if (dotHash > 0.72) {
            const foreAlpha = Math.max(0.045, (0.082 + wave * 1.5) * fadeOpacity);
            if (foreAlpha > 0.005) {
              ctx.fillStyle = `rgba(0, 255, 102, ${foreAlpha * 0.18})`;
              ctx.fillRect(x - 4.0, y - 4.0, 8.0, 8.0);
              ctx.fillStyle = `rgba(0, 255, 102, ${foreAlpha})`;
              ctx.fillRect(x - 1.4, y - 1.4, 2.8, 2.8);
            }
          }
        }
      }
    };

    const startLoop = () => {
      if (animationFrameId !== null) return;
      const loop = () => {
        draw();
        animationFrameId = requestAnimationFrame(loop);
      };
      animationFrameId = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    // Only draw when section is substantially visible — threshold 0.15 prevents
    // multiple canvases drawing simultaneously during scroll overlap
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      stopLoop();
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
