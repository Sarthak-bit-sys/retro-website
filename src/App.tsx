import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import CaseStudies from './components/CaseStudies';
import Playground from './components/Playground';
import HobbiesInterests from './components/HobbiesInterests';
import BootTerminal from './components/BootTerminal';
import RetroCursor from './components/RetroCursor';
import { Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [bootKey, setBootKey] = useState<number>(0);
  const [isBootActive, setIsBootActive] = useState<boolean>(true);
  const [fadeBoot, setFadeBoot] = useState<boolean>(false);

  // Use a stable callback to handle completion of the boot sequence smoothly
  const handleBootComplete = React.useCallback(() => {
    setFadeBoot(true);
    const unmountTimer = setTimeout(() => {
      setIsBootActive(false);
    }, 1000);
    return () => clearTimeout(unmountTimer);
  }, []);

  // Use stable callbacks for Hero layout controls to bypass recreation on parent renders
  const handleOpenLead = React.useCallback((projectName: string) => {}, []);
  const handleExploreFeatures = React.useCallback(() => {}, []);

  // Trigger boot sequence timeout (lasts exactly 4 seconds)
  useEffect(() => {
    setIsBootActive(true);
    setFadeBoot(false);
  }, [bootKey]);

  const triggerReboot = () => {
    setBootKey(prev => prev + 1);
  };

  return (
    <div 
      key={bootKey}
      className={`min-h-screen bg-[#051105] text-[#00ff66] selection:bg-[#00ff66]/30 selection:text-white antialiased overflow-x-clip relative font-sans transition-colors duration-500 ${
        isBootActive ? 'animate-boot-flicker pointer-events-none' : ''
      }`}
    >
      {/* Absolute background matrix grid pattern - hidden during boot */}
      {fadeBoot && (
        <div className="absolute inset-0 dot-matrix pointer-events-none opacity-40 z-0 transition-opacity duration-1000"></div>
      )}

      {/* Screen physical Scanlines layout filter */}
      <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-10"></div>
      
      {/* 2. Boot Screen Overlay covering the entire screen perfectly */}
      {isBootActive && (
        <div 
          className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ease-out ${
            fadeBoot ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-[#020702]'
          }`}
        >
          <BootTerminal onComplete={handleBootComplete} />
        </div>
      )}

      {/* Retro cursor active when not booting */}
      {!isBootActive && <RetroCursor />}

      {/* 3. Main portfolio content revealed only when boot completes */}
      {fadeBoot && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="relative flex flex-col min-h-screen z-10"
        >
          {/* 1. Global Navigation bar */}
          <Header />

          {/* 2. Sleek presentational Hero frame */}
          <Hero 
            onOpenLead={handleOpenLead} 
            onExploreFeatures={handleExploreFeatures} 
          />

          {/* 3. About Me story console */}
          <Playground />

          {/* 4. Company / Experience Tab-matrix */}
          <AboutMe />

          {/* 5. Grid directory showing exactly 4 stylized Case Studies */}
          <CaseStudies />

          {/* 6. Hobbies & Interests spec board (Frames Beyond Design) */}
          <HobbiesInterests />
        </motion.div>
      )}

      {/* Booting HUD Indicator overlaid during the 4s flicker cycle - hidden during transition */}
      {isBootActive && !fadeBoot && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[101] bg-[#051105] border border-[#00ff66] px-4 py-2 font-mono text-xs flex items-center gap-2 shadow-md">
          <Terminal className="w-4 h-4 text-[#00ff66] animate-pulse" />
          <span>CYBERNETIC_BOOT_INTENT: [4000ms FLICKER SEQUENCE CURRENTLY ACTIVE]</span>
        </div>
      )}
    </div>
  );
}
