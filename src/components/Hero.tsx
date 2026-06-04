import React from 'react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data';
import PerspectiveDotMatrix from './PerspectiveDotMatrix';
import { useStickyOffset } from '../hooks/useStickyOffset';

interface HeroProps {
  onOpenLead: (projectName: string) => void;
  onExploreFeatures: () => void;
}

const Hero = React.memo(function Hero({ onOpenLead, onExploreFeatures }: HeroProps) {
  const { elementRef, stickyTop } = useStickyOffset();

  return (
    <section 
      id="hero"
      ref={elementRef}
      style={{ top: stickyTop }}
      className="relative md:sticky z-[10] w-full min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 bg-[#051105]"
    >
      {/* Immersive 3D Perspective Dot Matrix Background (matching reference image) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <PerspectiveDotMatrix />
      </div>

      {/* Background Radiance & Scanline Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00ff66]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center">
        
        {/* Name / Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3.5 max-w-[1400px] mx-auto"
        >
          <h1 className="font-display text-3xl sm:text-[42px] md:text-[54px] lg:text-[58px] font-bold tracking-tighter [word-spacing:-0.08em] md:[word-spacing:-0.12em] text-[#00ff66] phosphor-glow leading-tight uppercase">
            {HERO_DATA.name}
          </h1>
        </motion.div>

        {/* Professional tag / description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[13px] sm:text-base md:text-lg text-[#00ff66]/85 max-w-[1100px] mx-auto leading-relaxed mb-10 uppercase font-medium"
        >
          &gt; {HERO_DATA.role} &lt;_
        </motion.p>

        {/* Operational Metrics Block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1240px] mx-auto border-2 border-[#00ff66]/40 py-6 px-4 bg-[#051105]/80 font-mono text-xs retro-border"
        >
          {HERO_DATA.metrics.map((metric, idx) => (
            <div 
              key={idx} 
              className={`text-center flex flex-col justify-center ${idx > 0 ? 'border-t md:border-t-0 md:border-l border-[#00ff66]/20 pt-4 md:pt-0' : ''}`}
            >
              <div className="font-bold text-sm sm:text-base md:text-lg mb-2.5 px-2 leading-tight text-[#00ff66] phosphor-glow">
                {metric.value}
              </div>
              <div className="text-[#00ff66]/85 text-xs sm:text-[13px] font-semibold tracking-wide px-1.5 uppercase leading-snug">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default Hero;
