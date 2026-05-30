import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../mock';

const Hero = () => {
  const { hero } = portfolioData;
  const [bootSequence, setBootSequence] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const sequences = [
      'SYSTEM BOOT INITIATED...',
      'LOADING BIOS v2.4.1...',
      'MEMORY CHECK: 640K OK',
      'INITIALIZING PORTFOLIO.SYS...',
      'LOADING USER DATA...',
      'SYSTEM READY'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < sequences.length) {
        setBootSequence(index);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const bootMessages = [
    'SYSTEM BOOT INITIATED...',
    'LOADING BIOS v2.4.1...',
    'MEMORY CHECK: 640K OK',
    'INITIALIZING PORTFOLIO.SYS...',
    'LOADING USER DATA...',
    'SYSTEM READY'
  ];

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {!showContent ? (
            <div className="space-y-2 font-mono text-sm">
              {bootMessages.slice(0, bootSequence + 1).map((msg, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-glow">&gt;</span>
                  <span>{msg}</span>
                  {index === bootSequence && <span className="cursor"></span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="terminal-box p-8 space-y-6">
                <div className="flex items-center gap-2 text-xs pb-4 border-b border-green-500/30">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  <span className="ml-2">TERMINAL://PORTFOLIO/HOME</span>
                </div>
                
                <div className="space-y-4 font-mono">
                  <div className="text-xs opacity-70">
                    C:\PORTFOLIO&gt; GET_USER_INFO
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-glow-strong">
                    {hero.name}
                  </h1>
                  <div className="text-xl md:text-2xl">
                    ROLE: {hero.title}
                  </div>
                  <div className="text-sm md:text-base opacity-80 max-w-2xl">
                    &gt; {hero.tagline}
                  </div>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button 
                      onClick={scrollToWork}
                      className="terminal-button flex items-center gap-2"
                    >
                      [VIEW_PROJECTS]
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="terminal-button">
                      [DOWNLOAD_CV]
                    </button>
                  </div>
                </div>
              </div>

              {/* ASCII Art Decoration */}
              <div className="text-xs font-mono opacity-30 text-center">
                <pre>
{`  ___  ___  ___  ___  ___  ___  ___  ___  ___  ___
 | . || . || . || . || . || . || . || . || . || . |
 |___||___||___||___||___||___||___||___||___||___|`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Matrix-style Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="text-xs font-mono leading-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i}>
              {Array.from({ length: 200 }).map((_, j) => (
                <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;