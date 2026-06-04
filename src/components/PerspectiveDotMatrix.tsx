import React, { useEffect, useRef } from 'react';

export default function PerspectiveDotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let time = 0;

    // Fast, responsive spacing for balanced visual density & extremely optimized vertex count
    const SPACING = 28; 

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

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // High quality deterministic coordinate hash noise
    const getNoise = (c: number, r: number) => {
      const val = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
      return val - Math.floor(val);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear layout with true dark transparent pass
      ctx.clearRect(0, 0, width, height);

      time += 0.005;

      const centerX = width / 2;
      const centerY = height / 2;

      // Precompiled cluster structures with squared radius to avoid Math.sqrt in filter passes
      const baseClusters = [
        { bx: width * 0.18, by: height * 0.28, rad: Math.min(width, height) * 0.38, speed: 0.14, phase: 0.0, weight: 0.38 },
        { bx: width * 0.82, by: height * 0.38, rad: Math.min(width, height) * 0.34, speed: 0.11, phase: 1.8, weight: 0.32 },
        { bx: width * 0.48, by: height * 0.72, rad: Math.min(width, height) * 0.30, speed: 0.09, phase: 3.5, weight: 0.30 },
        { bx: width * 0.32, by: height * 0.62, rad: Math.min(width, height) * 0.35, speed: 0.12, phase: 2.2, weight: 0.28 },
        { bx: width * 0.76, by: height * 0.22, rad: Math.min(width, height) * 0.28, speed: 0.15, phase: 4.8, weight: 0.24 },
        { bx: width * 0.12, by: height * 0.78, rad: Math.min(width, height) * 0.24, speed: 0.17, phase: 0.9, weight: 0.22 }
      ];

      // Organic dynamic shifting applied to cluster variables
      const activeClusters = baseClusters.map(c => {
        const cx = c.bx + Math.sin(time * c.speed + c.phase) * 14;
        const cy = c.by + Math.cos(time * c.speed + c.phase) * 14;
        return {
          cx,
          cy,
          rad: c.rad,
          radSq: c.rad * c.rad,
          weight: c.weight,
          phase: c.phase
        };
      });

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      const startX = (width % SPACING) / 2;
      const startY = (height % SPACING) / 2;

      for (let col = 0; col < cols; col++) {
        const x = startX + col * SPACING;
        for (let row = 0; row < rows; row++) {
          const y = startY + row * SPACING;

          // Elliptical radial falloff so that the background gradually fades to black towards edges
          const dx = (x - centerX) / (width * 0.58);
          const dy = (y - centerY) / (height * 0.52);
          const radialFactor = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy));
          const fadeOpacity = Math.pow(radialFactor, 0.95);

          if (fadeOpacity <= 0.02) continue;

          // Safe, cached layout hash parameter
          const dotHash = getNoise(col, row);

          // Fast squared check filter to avoid Math.sqrt or trig calculation for non-cluster pixels
          let maxClusterEffect = 0;
          for (let i = 0; i < activeClusters.length; i++) {
            const cl = activeClusters[i];
            const cdx = x - cl.cx;
            const cdy = y - cl.cy;
            const distSq = cdx * cdx + cdy * cdy;
            if (distSq < cl.radSq) {
              const dist = Math.sqrt(distSq);
              const factor = 1 - dist / cl.rad;
              const pulse = 0.65 + 0.35 * Math.sin(time * 0.45 + cl.phase + dotHash * 1.5);
              maxClusterEffect = Math.max(maxClusterEffect, factor * pulse * cl.weight);
            }
          }

          // Slow ambient breathing wave for global texturing
          const wave = Math.sin(time * 0.20 + (col * 0.06) + (row * 0.04)) * 0.035;

          // --- 1. BACKGROUND LAYER (Tiny, subtle micro-dots) ---
          const bgAlpha = Math.max(0.08, (0.13 + wave + dotHash * 0.05) * fadeOpacity);
          if (bgAlpha > 0.005) {
            ctx.fillStyle = `rgba(0, 255, 102, ${bgAlpha})`;
            ctx.fillRect(x - 0.6, y - 0.6, 1.2, 1.2);
          }

          // --- 2. MID LAYER (Medium dots with soft glows, rendered on ~70% of coordinates) ---
          if (dotHash > 0.30) {
            const midAlpha = Math.max(0.12, (0.19 + wave * 1.4 + maxClusterEffect * 0.22) * fadeOpacity);
            if (midAlpha > 0.005) {
              // Outer soft bloom glow
              ctx.fillStyle = `rgba(0, 255, 102, ${midAlpha * 0.14})`;
              ctx.fillRect(x - 2.4, y - 2.4, 4.8, 4.8);

              // Crisp Core
              ctx.fillStyle = `rgba(0, 255, 102, ${midAlpha})`;
              ctx.fillRect(x - 0.95, y - 0.95, 1.9, 1.9);
            }
          }

          // --- 3. FOREGROUND LAYER (Larger, brighter dots appearing in cluster nodes) ---
          if (maxClusterEffect > 0.08 && dotHash > 0.55) {
            const foreAlpha = Math.max(0.11, Math.min(0.35, (0.16 + maxClusterEffect * 0.65) * fadeOpacity));
            if (foreAlpha > 0.005) {
              // Wide bloom aura
              ctx.fillStyle = `rgba(0, 255, 102, ${foreAlpha * 0.22})`;
              ctx.fillRect(x - 3.8, y - 3.8, 7.6, 7.6);

              // Broad trace shimmer
              ctx.fillStyle = `rgba(0, 255, 102, ${foreAlpha * 0.10})`;
              ctx.fillRect(x - 7.0, y - 7.0, 14.0, 14.0);

              // Core display pixel
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

    // Ensure full scrolling visual rendering performance using intersection bounds
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
