import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';
import AmbientDotMatrix from './AmbientDotMatrix';
import { Terminal, X, FileCode2, BarChart3, HelpCircle, Check, Image as ImageIcon } from 'lucide-react';
import { useStickyOffset } from '../hooks/useStickyOffset';

// @ts-expect-error - Vite resolves PNG imports automatically
import reviseSmarterPng from '../assets/images/case-studies/revise-smarter.png';
// @ts-expect-error - Vite resolves PNG imports automatically
import textileTraceabilityPng from '../assets/images/case-studies/textile-traceability.png';
// @ts-expect-error - Vite resolves PNG imports automatically
import travelmaticPlatformPng from '../assets/images/case-studies/travelmatic-platform.png';
// @ts-expect-error - Vite resolves PNG imports automatically
import yolearnLandingPng from '../assets/images/case-studies/yolearn-landing.png';

const CASE_STUDY_IMAGES: Record<string, string> = {
  'revise-smarter': reviseSmarterPng,
  'textile-traceability': textileTraceabilityPng,
  'travelmatic-platform': travelmaticPlatformPng,
  'yolearn-landing': yolearnLandingPng
};

const CASE_STUDY_LINKS: Record<string, string> = {
  'revise-smarter': 'https://quartz-jackrabbit-284.notion.site/Helping-Students-Revise-Smarter-with-AI-Guided-Study-Path-3269bfb079298036b783ff37d646fb8b',
  'textile-traceability': 'https://quartz-jackrabbit-284.notion.site/Solving-Inventory-Source-Tracking-for-Textile-Businesses-2c19bfb07929801d9d97d136f3f7fb0c',
  'travelmatic-platform': 'https://quartz-jackrabbit-284.notion.site/Saving-2-Minutes-per-Booking-to-Help-Agents-Handle-More-Bookings-31b9bfb07929801f8e06de9469bb0b0f',
  'yolearn-landing': 'https://quartz-jackrabbit-284.notion.site/Increasing-Conversions-by-20-Through-a-Redesigned-Landing-Experience-31d9bfb079298009bcf5fe2ed4ed4978'
};

const CaseStudies = React.memo(function CaseStudies() {
  const { elementRef, stickyTop } = useStickyOffset();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
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

  const activeCase = CASE_STUDIES.find(cs => cs.id === selectedCaseId);

  return (
    <section 
      id="casestudies"
      ref={elementRef}
      style={{ 
        top: stickyTop,
        contain: 'paint layout',
        willChange: 'transform'
      }}
      className="relative md:sticky z-[40] w-full min-h-screen flex flex-col justify-center py-16 md:py-24 bg-[#051105] border-t border-[#00ff66]/40 scroll-mt-20 overflow-hidden"
    >
      <div ref={containerRef} className="w-full flex flex-col justify-center min-h-[50vh]">
        {isVisible ? (
          <>
            {/* Subtle ambient version of the same dot matrix pattern to create consistency and keep content highlighted */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <AmbientDotMatrix />
              <div className="absolute inset-0 scanlines opacity-35 pointer-events-none z-10"></div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10"
            >
              
              {/* Section Header */}
              <div className="max-w-[1200px] mb-16 font-mono text-left">
                <h2 className="font-display font-bold text-4xl sm:text-5xl text-white phosphor-glow tracking-widest uppercase mb-5">
                  Beyond the Final Screens
                </h2>
                <p className="text-base sm:text-lg text-[#00ff66]/85 leading-relaxed tracking-wide font-sans max-w-[1000px]">
                  Designed AI experiences and B2B products across travel, edtech, and traceability systems — focusing on solving real user problems through research, workflow optimization, and product thinking.
                </p>
              </div>

        {/* 2x2 Clean Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-mono text-xs text-left">
          {CASE_STUDIES.map((project, idx) => {
            const staticScreenshot = CASE_STUDY_IMAGES[project.id];

            return (
              <div
                key={project.id}
                className="bg-black border border-[#00ff66]/30 hover:border-[#00ff66] rounded flex flex-col justify-start p-4 sm:p-5 transition-all duration-300 retro-border relative group h-full z-10 will-change-gpu"
              >
                {/* 1. Case Study Title */}
                <div className="min-h-[72px] sm:min-h-[108px] flex items-start mb-2">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-widest group-hover:text-[#00ff66] group-hover:phosphor-glow transition-colors line-clamp-2 leading-tight text-left">
                    {project.title}
                  </h3>
                </div>

                {/* 3. Product Screenshot - Static Local File only */}
                <div className="mb-2.5 rounded border border-[#00ff66]/25 bg-black relative select-none screenshot-container uploaded overflow-hidden min-h-[180px] flex items-center justify-center">
                  <img 
                    src={staticScreenshot} 
                    alt={`${project.title} Screenshot`} 
                    className="pointer-events-none select-none w-full h-full object-contain object-center p-1.5 mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.img-fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'img-fallback';
                        fallback.style.cssText = 'width:100%;min-height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#051105;color:rgba(0,255,102,0.35);font-family:monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:24px;';
                        fallback.innerHTML = '<div style="font-size:22px;opacity:0.5">⬛</div><div>[ NO_SIGNAL ]</div><div style="font-size:9px;opacity:0.5;margin-top:4px">screenshot · awaiting upload</div>';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>

                {/* 4. Brief Description */}
                <div className="min-h-[56px] sm:min-h-[72px] flex items-start mb-2">
                  <p className="text-[#00ff66]/95 text-base sm:text-[17px] font-sans leading-relaxed tracking-wide line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* 5. Impact Statement */}
                <div className="min-h-[96px] sm:min-h-[112px] flex items-center mb-3 bg-[#041205] border border-[#00ff66]/20 p-3 sm:p-4 rounded shadow-inner">
                  <div className="space-y-1.5 w-full">
                    <span className="text-xs sm:text-[13px] font-bold text-[#00ff66] uppercase tracking-wide font-sans block">Outcome Metric</span>
                    <p className="text-white text-lg sm:text-[19px] font-bold leading-snug font-sans tracking-normal select-text">
                      {project.metrics[0]}
                    </p>
                  </div>
                </div>

                {/* 6. CTA Button */}
                <div className="mt-auto pt-3 border-t border-[#00ff66]/15 flex items-center justify-end">
                  <a
                    href={CASE_STUDY_LINKS[project.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-transparent border border-[#00ff66]/60 hover:bg-[#00ff66] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,102,0.5)] text-[#00ff66] font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded transition-all duration-200 cursor-pointer text-sm tracking-widest uppercase font-mono select-none"
                  >
                    VIEW CASE STUDY &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
          </>
        ) : (
          <div className="min-h-[60vh] w-full flex items-center justify-center font-mono text-sm text-[#00ff66]/40">
            LOADING_CASE_STUDIES...
          </div>
        )}
      </div>

      {/* Dynamic CRT Detailed Modal View */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCaseId && activeCase && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              
              {/* Modal Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCaseId(null)}
                className="absolute inset-0 bg-[#051105]/96 backdrop-blur-md"
              ></motion.div>

              {/* Modal core window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative bg-black border border-[#00ff66] max-w-4xl w-full rounded shadow-2xl p-6 font-mono text-xs text-left retro-border max-h-[85vh] overflow-y-auto z-10"
              >
                {/* Closing Trigger Corner */}
                <button
                  onClick={() => setSelectedCaseId(null)}
                  className="absolute top-4 right-4 bg-[#051105] hover:bg-[#00ff66] hover:text-black border border-[#00ff66]/40 hover:border-[#00ff66] text-[#00ff66] w-8 h-8 rounded flex items-center justify-center transition-all cursor-pointer shadow"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Title Section */}
                <div className="border-b-2 border-[#00ff66]/30 pb-4 mb-6 pr-10">
                  <div className="flex items-center gap-2 text-[#00ff66]/60 text-[10px] uppercase mb-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>PORTFOLIO_CASE_STUDIES // CASE_ID_{activeCase.id.toUpperCase()}</span>
                  </div>
                  <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-widest phosphor-glow uppercase leading-snug">
                    {activeCase.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-[#00ff66] px-2.5 py-0.5 rounded font-bold uppercase">
                      DESIGN PHASE: {activeCase.year}
                    </span>
                    <span className="text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-500 px-2.5 py-0.5 rounded font-bold uppercase">
                      ROLE: {activeCase.role}
                    </span>
                  </div>
                </div>

                {/* Modal Grid Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Schematic preview block */}
                  <div className="md:col-span-5 flex flex-col gap-4">
                    <div className="p-4 bg-[#051105] border border-[#00ff66]/30 rounded flex flex-col justify-center items-center overflow-hidden">
                      <div className="text-[#00ff66]/60 text-[9px] font-bold uppercase tracking-wider mb-2 self-start flex items-center gap-1.5">
                        <ImageIcon className="w-3 h-3" />
                        <span>[PRODUCT_SCREENSHOT_VIEW]</span>
                      </div>
                      <div className="w-full aspect-[4/3] relative rounded overflow-hidden border border-[#00ff66]/10 case-study-screenshot uploaded flex items-center justify-center">
                        <img 
                          src={CASE_STUDY_IMAGES[activeCase.id]} 
                          alt="Product snapshot" 
                          loading="lazy"
                          decoding="async"
                          className="object-contain rounded shadow border border-zinc-800 mx-auto w-full h-full" 
                          style={{
                            filter: 'none',
                            mixBlendMode: 'normal',
                            opacity: 1
                          }}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.img-fallback')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'img-fallback';
                              fallback.style.cssText = 'width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:#051105;color:rgba(0,255,102,0.3);font-family:monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;';
                              fallback.innerHTML = '<div>[ NO_SIGNAL ]</div><div style="font-size:8px;opacity:0.5">screenshot · awaiting upload</div>';
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Skills/Directives matched */}
                    <div className="p-4 bg-[#0a1e0a]/40 border border-[#00ff66]/20 rounded">
                      <div className="text-[#00ff66]/60 text-[9px] font-bold uppercase tracking-wider mb-2.5">
                        [DIRECTIVE_BADGES]
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCase.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] border border-[#00ff66]/40 rounded px-2 py-0.5 bg-black text-[#00ff66]/90 font-bold uppercase">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Analytical details panels */}
                  <div className="md:col-span-7 space-y-5">
                    
                    {/* Problem statement */}
                    <div className="bg-black p-4 border border-[#00ff66]/30 rounded">
                      <h4 className="text-white font-bold text-xs uppercase mb-2 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-500" />
                        THE WORKPLACE_CHALLENGE
                      </h4>
                      <p className="text-[#00ff66]/85 leading-relaxed uppercase text-[11px]">
                        {activeCase.problem}
                      </p>
                    </div>

                    {/* Solution details */}
                    <div className="bg-black p-4 border border-[#00ff66]/30 rounded">
                      <h4 className="text-white font-bold text-xs uppercase mb-2 flex items-center gap-1.5">
                        <FileCode2 className="w-4 h-4 text-[#00ff66]" />
                        THE DESIGN_SOLUTION
                      </h4>
                      <p className="text-[#00ff66]/85 leading-relaxed uppercase text-[11px]">
                        {activeCase.solution}
                      </p>
                    </div>

                    {/* Impact metrics details */}
                    <div className="bg-black p-4 border border-emerald-500/30 rounded">
                      <h4 className="text-white font-bold text-xs uppercase mb-3 flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-[#00ff66]" />
                        SYSTEM_OUTCOME_IMPACT
                      </h4>
                      <ul className="space-y-2">
                        {activeCase.metrics.map((metric, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start bg-[#051105] p-2 rounded border border-[#00ff66]/15">
                            <Check className="w-4 h-4 text-[#00ff66] flex-shrink-0" />
                            <span className="text-white text-[11px] font-bold uppercase font-sans tracking-tight leading-snug">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* Modal footer navigation */}
                <div className="border-t border-[#00ff66]/30 pt-4 mt-6 flex flex-wrap items-center justify-between text-[10px] text-[#00ff66]/50 font-mono">
                  <span>PORTFOLIO_PROJECT_DETAIL</span>
                  <button
                    onClick={() => setSelectedCaseId(null)}
                    className="bg-[#00ff66] text-zinc-950 font-bold px-4 py-2 rounded hover:bg-emerald-400 transition-colors uppercase cursor-pointer text-xs"
                  >
                    CLOSE CASE STUDY
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
});

export default CaseStudies;
