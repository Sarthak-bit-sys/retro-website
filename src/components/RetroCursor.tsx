import React, { useState, useEffect, useRef } from 'react';
import { playClickSound, playHoverSound, getSoundEnabled } from '../utils/sound';

export default function RetroCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const lagRef = useRef<HTMLDivElement | null>(null);

  const positionRef = useRef({ x: -100, y: -100 });
  const laggedPositionRef = useRef({ x: -100, y: -100 });
  const isClickingRef = useRef(false);

  const [isInteractive, setIsInteractive] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const lastHoveredRef = useRef<Element | null>(null);
  const isInteractiveRef = useRef(false);
  const cursorLabelRef = useRef<string | null>(null);
  
  // rAF handle for throttling DOM hit-test
  const hitTestFrameRef = useRef<number | null>(null);

  // 1. Global click + touch sound
  useEffect(() => {
    const handleGlobalTrigger = () => playClickSound();
    window.addEventListener('mousedown', handleGlobalTrigger, { capture: true });
    window.addEventListener('touchstart', handleGlobalTrigger, { capture: true, passive: true });
    return () => {
      window.removeEventListener('mousedown', handleGlobalTrigger, { capture: true });
      window.removeEventListener('touchstart', handleGlobalTrigger, { capture: true });
    };
  }, []);

  // 2. Mouse tracking & hit detection
  useEffect(() => {
    const touchCheck =
      window.matchMedia('(pointer: coarse)').matches ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsTouchDevice(touchCheck);
    if (touchCheck) return;

    const onMouseMove = (e: MouseEvent) => {
      // Write coordinates to ref only - avoids component-wide re-render cycles
      positionRef.current = { x: e.clientX, y: e.clientY };

      // Throttle expensive document.elementFromPoint hit-tests to one per rAF frame
      if (hitTestFrameRef.current !== null) return;
      hitTestFrameRef.current = requestAnimationFrame(() => {
        hitTestFrameRef.current = null;
        const { x, y } = positionRef.current;
        const target = document.elementFromPoint(x, y);
        if (!target) return;

        const interactiveEl = target.closest(
          'a, button, input, select, textarea, [role="button"], .interactive-vintage, [data-cursor-label]'
        );

        if (interactiveEl) {
          // Discrete states ONLY change state if value actually changed
          if (!isInteractiveRef.current) {
            isInteractiveRef.current = true;
            setIsInteractive(true);
          }

          const label = interactiveEl.getAttribute('data-cursor-label') ??
            (interactiveEl.closest('#casestudies') ? '[ VIEW FILE ]' : null);

          if (label !== cursorLabelRef.current) {
            cursorLabelRef.current = label;
            setCursorLabel(label);
          }

          if (lastHoveredRef.current !== interactiveEl) {
            playHoverSound();
            lastHoveredRef.current = interactiveEl;
          }
        } else {
          if (isInteractiveRef.current) {
            isInteractiveRef.current = false;
            setIsInteractive(false);
          }
          if (cursorLabelRef.current !== null) {
            cursorLabelRef.current = null;
            setCursorLabel(null);
          }
          lastHoveredRef.current = null;
        }
      });
    };

    const handleMouseDownCursor = () => {
      isClickingRef.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }
    };
    
    const handleMouseUpCursor = () => {
      isClickingRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const applyInvisibleCursor = () => {
      const style = document.createElement('style');
      style.id = 'hide-default-cursor';
      style.innerHTML = `
        *, html, body, a, button, input, select, textarea, [role="button"], .group, iframe {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    applyInvisibleCursor();
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDownCursor, { capture: true });
    window.addEventListener('mouseup', handleMouseUpCursor, { capture: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', handleMouseDownCursor, { capture: true });
      window.removeEventListener('mouseup', handleMouseUpCursor, { capture: true });
      document.getElementById('hide-default-cursor')?.remove();
      if (hitTestFrameRef.current !== null) cancelAnimationFrame(hitTestFrameRef.current);
    };
  }, []);

  // 3. Single stable rAF cursor translation loop - bypasses React states, updates DOM directly
  useEffect(() => {
    if (isTouchDevice) return;
    let frameId: number;

    const update = () => {
      const target = positionRef.current;
      
      // Directly alter style coordinates (GPU supported) - avoids triggering style re-flows
      if (cursorRef.current) {
        cursorRef.current.style.left = `${target.x}px`;
        cursorRef.current.style.top = `${target.y}px`;
      }
      
      const dx = target.x - laggedPositionRef.current.x;
      const dy = target.y - laggedPositionRef.current.y;
      
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        laggedPositionRef.current.x += dx * 0.16;
        laggedPositionRef.current.y += dy * 0.16;
      } else {
        laggedPositionRef.current.x = target.x;
        laggedPositionRef.current.y = target.y;
      }
      
      if (lagRef.current) {
        lagRef.current.style.left = `${laggedPositionRef.current.x}px`;
        lagRef.current.style.top = `${laggedPositionRef.current.y}px`;
      }
      
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        id="retro-cursor"
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-screen select-none"
        style={{
          left: '-100px',
          top: '-100px',
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'transform 0.1s ease',
        }}
      >
        {isInteractive ? (
          <div className="flex flex-col items-center justify-center">
            <span className="text-xl leading-none text-[#00ff66] font-extrabold select-none animate-pulse phosphor-glow">
              █
            </span>
          </div>
        ) : (
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#00ff66] phosphor-glow rounded-sm"></div>
            <div className="absolute w-3.5 h-[1.5px] bg-[#00ff66]/80"></div>
            <div className="absolute h-3.5 w-[1.5px] bg-[#00ff66]/80"></div>
          </div>
        )}
        {cursorLabel && (
          <div className="absolute top-6 left-6 bg-black border border-[#00ff66] text-[#00ff66] px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded shadow shadow-[#00ff66]/30 phosphor-glow whitespace-nowrap z-[9999]">
            {cursorLabel}
          </div>
        )}
      </div>

      <div
        id="retro-cursor-lag"
        ref={lagRef}
        className="fixed pointer-events-none z-[9999] select-none"
        style={{
          left: '-100px',
          top: '-100px',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-8 h-8 relative border border-[#00ff66]/20 transition-all duration-300 ${
          isInteractive ? 'scale-150 rotate-45 border-dashed border-[#00ff66]/40' : 'scale-100 rotate-0'
        }`}>
          {isInteractive && (
            <span className="absolute -top-3.5 -right-3 text-[8px] font-mono text-[#00ff66]/40 uppercase bg-black/40 px-1 rounded scale-75 select-none">
              CTRL
            </span>
          )}
        </div>
      </div>
    </>
  );
}
