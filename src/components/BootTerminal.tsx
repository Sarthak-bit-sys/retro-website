import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface BootTerminalProps {
  onComplete: () => void;
}

const FRIENDLY_MESSAGES = [
  "Hi there...",
  "How are you today?",
  "Initializing portfolio experience...",
  "Loading projects...",
  "Preparing case studies...",
  "Almost ready...",
  "Welcome, explorer.",
  "Website loaded successfully."
];

export default function BootTerminal({ onComplete }: BootTerminalProps) {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentTypedText, setCurrentTypedText] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  // 1. Typing effect engine
  useEffect(() => {
    if (activeIndex >= FRIENDLY_MESSAGES.length) {
      return;
    }

    const currentFullMessage = FRIENDLY_MESSAGES[activeIndex];
    let charIndex = 0;
    let typed = '';

    const typingTimer = setInterval(() => {
      if (charIndex < currentFullMessage.length) {
        typed += currentFullMessage[charIndex];
        setCurrentTypedText(typed);
        charIndex++;
      } else {
        clearInterval(typingTimer);
        // Line completed, wait a brief pause then move to completed lines & start next
        const delayTimer = setTimeout(() => {
          setCompletedLines(prev => [...prev, currentFullMessage]);
          setCurrentTypedText('');
          setActiveIndex(prev => prev + 1);
        }, 120);

        return () => clearTimeout(delayTimer);
      }
    }, 14); // super-responsive 14ms per character

    return () => clearInterval(typingTimer);
  }, [activeIndex]);

  // 2. Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [completedLines, currentTypedText]);

  // 3. Use an onComplete ref to avoid resetting the parallel timer on parent re-renders
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // 4. Parallel progressive timer to finish at exactly 4000ms
  useEffect(() => {
    const start = Date.now();
    const duration = 4000;
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calculatedProgress);
      
      if (elapsed >= duration) {
        clearInterval(progressInterval);
      }
    }, 30);

    const completeTimer = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, []); // Bound to mount: executes cleanly independent of dependencies and updates

  const progressTicks = Math.floor(progress / 5);
  const progressBarText = `[${'█'.repeat(progressTicks)}${'-'.repeat(20 - progressTicks)}] ${progress}%`;

  return (
    <div 
      id="boot-terminal-overlay" 
      className="fixed inset-0 bg-[#020702] z-55 flex flex-col justify-between p-4 sm:p-6 md:p-8 font-mono select-none overflow-hidden text-[#00ff66]"
    >
      {/* Visual Scanline & Dot-matrix CRT overlays */}
      <div className="absolute inset-0 scanlines opacity-80 pointer-events-none z-10"></div>
      <div className="absolute inset-0 dot-matrix-overlay opacity-30 pointer-events-none z-10"></div>
      <div className="scanline-rolling-band z-20"></div>

      {/* Title Header Block */}
      <div className="border border-[#00ff66]/40 p-4 bg-black rounded flex flex-col sm:flex-row items-center justify-between gap-4 shadow shadow-[#00ff66]/15 relative z-30">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-5 h-5 text-[#00ff66] animate-pulse" />
          <span className="font-display text-2xl uppercase tracking-widest text-[#00ff66] phosphor-glow">
            SARTHAK_SYS_OS://STARTUP_SHELL
          </span>
        </div>
      </div>

      {/* Main Terminal Output Content */}
      <div className="flex-1 my-4 border border-[#00ff66]/30 bg-black/95 p-6 rounded overflow-hidden flex flex-col relative z-30">
        
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto space-y-3.5 pr-2 pt-2 scrollbar-thin text-left text-base sm:text-xl font-bold font-display tracking-widest"
        >
          {completedLines.map((ln, idx) => (
            <div key={idx} className="leading-relaxed hover:bg-[#00ff66]/5 px-2 py-1 rounded transition-all duration-100 flex items-start gap-2">
              <span className="text-[#00ff66]/50 shrink-0 select-none">&gt;</span>
              <span className="phosphor-glow uppercase">{ln}</span>
            </div>
          ))}
          
          {/* Active typed character line */}
          {currentTypedText && (
            <div className="leading-relaxed bg-[#00ff66]/5 px-2 py-1 rounded flex items-start gap-2 text-white">
              <span className="text-[#00ff66] shrink-0 select-none animate-pulse">&gt;</span>
              <span className="phosphor-glow uppercase">{currentTypedText}</span>
              <span className="w-2.5 h-5 bg-[#00ff66] animate-pulse inline-block self-center"></span>
            </div>
          )}
        </div>
      </div>

      {/* Progress & Connection Indicators Footer */}
      <div className="border border-[#00ff66]/30 p-4 bg-black rounded flex flex-col md:flex-row items-center justify-between gap-4 shadow shadow-[#00ff66]/10 relative z-30 text-xs">
        <div className="w-full md:w-auto flex flex-col gap-1 text-left">
          <div className="text-base tracking-widest font-extrabold text-[#00ff66] phosphor-glow">
            {progressBarText}
          </div>
        </div>
      </div>
    </div>
  );
}
