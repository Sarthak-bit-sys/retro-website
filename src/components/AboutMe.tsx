import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import { useStickyOffset } from '../hooks/useStickyOffset';
import AmbientDotMatrix from './AmbientDotMatrix';

const COMPANIES = [
  {
    id: '01',
    name: 'YOLEARN.AI',
    category: 'EdTech Platform'
  },
  {
    id: '02',
    name: 'TRAVELMATIC',
    category: "Italy's #1 B2B Travel Platform"
  },
  {
    id: '03',
    name: 'QUADRANT_HOMES',
    category: 'Housing Platform'
  },
  {
    id: '04',
    name: 'FORAY_GLOBAL_HK',
    category: 'Textile Industry'
  }
];

const AboutMe = React.memo(function AboutMe() {
  const { elementRef, stickyTop } = useStickyOffset();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '250px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about"
      ref={elementRef}
      style={{ 
        top: stickyTop,
        contain: 'paint layout',
        willChange: 'transform'
      }}
      className="relative md:sticky z-[30] w-full min-h-screen flex flex-col justify-center py-16 md:py-24 bg-[#051105] border-t border-[#00ff66]/40 scroll-mt-20 overflow-hidden"
    >
      <div ref={containerRef} className="w-full flex flex-col justify-center min-h-[50vh]">
        {isVisible ? (
          <>
            {/* Subtle ambient version of the same dot matrix pattern to create consistency and keep content highlighted */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <AmbientDotMatrix />
            </div>

            {/* Subtle green radial ambient illumination matching the design vocabulary of About Me */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#00ff66]/10 blur-[56px] pointer-events-none z-0"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10"
            >
              
              {/* Split Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
                
                {/* Left Column: Heading & Description */}
                <div className="lg:col-span-5 font-mono text-left">
                  <div>
                    <h2 id="company-experience-title" className="font-display font-bold text-3xl sm:text-4xl text-white phosphor-glow tracking-widest uppercase mb-6">
                      COMPANY EXPERIENCE
                    </h2>
                    
                    <p className="text-base sm:text-lg text-[#00ff66]/85 leading-relaxed font-sans tracking-wide">
                      Designed AI, SaaS, B2B, and operational products across startups and growing businesses, helping teams simplify workflows, improve adoption, and build better user experiences.
                    </p>
                  </div>
                </div>

                {/* Right Column: Unified Terminal Container with 2x2 Grid */}
                <div className="lg:col-span-7">
                  <div className="border border-[#00ff66]/40 bg-[#051105]/85 rounded p-4 sm:p-6 relative retro-border will-change-gpu">
                    {/* Scanline background decorative element */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00ff66]/2 to-transparent pointer-events-none opacity-40"></div>

                    {/* 2x2 Company Registry Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {COMPANIES.map((company) => (
                        <div
                          key={company.id}
                          className="border border-[#00ff66]/25 bg-black/60 p-5 rounded hover:border-[#00ff66]/60 hover-card-flicker transition-all duration-300 relative group flex flex-col justify-center overflow-hidden cursor-pointer active:scale-98 will-change-gpu"
                          style={{ minHeight: '100px' }}
                        >
                          {/* Company Information */}
                          <div>
                            <h3 className="font-display font-bold text-xl text-white group-hover:text-[#00ff66] transition-colors duration-200 uppercase tracking-tight leading-tight">
                              {company.name}
                            </h3>
                            <p className="text-[#00ff66]/70 font-mono text-[11px] font-medium tracking-wide uppercase mt-1.5 leading-snug">
                              {company.category}
                            </p>
                          </div>

                          {/* Interactive corner graphic decorator */}
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#00ff66]/15 group-hover:border-[#00ff66]/40 transition-colors duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          </>
        ) : (
          <div className="min-h-screen w-full flex items-center justify-center font-mono text-sm text-[#00ff66]/40">
            LOADING_EXPERIENCE_STREAM...
          </div>
        )}
      </div>
    </section>
  );
});

export default AboutMe;
