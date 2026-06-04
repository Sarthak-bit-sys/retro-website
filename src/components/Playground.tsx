import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useStickyOffset } from '../hooks/useStickyOffset';
import AmbientDotMatrix from './AmbientDotMatrix';

const Playground = React.memo(function Playground() {
  const { elementRef, stickyTop } = useStickyOffset();
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
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
      id="playground"
      ref={elementRef}
      style={{ 
        top: stickyTop,
        contain: 'paint layout',
        willChange: 'transform'
      }}
      className="relative md:sticky z-[20] w-full min-h-screen flex flex-col justify-center py-16 md:py-24 bg-[#051105] border-t border-[#00ff66]/40 scroll-mt-20 overflow-hidden"
    >
      <div ref={containerRef} className="w-full flex flex-col justify-center min-h-[70vh]">
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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* LEFT SIDE: Story Content */}
                <div className="lg:col-span-8 text-left">
                  <div>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-widest uppercase mb-6 phosphor-glow">
                      ABOUT ME
                    </h2>
                    
                    <h3 className="font-sans font-medium text-xl sm:text-2xl text-[#00ff66] tracking-wide mb-8 leading-tight">
                      From Journalism to Product Design
                    </h3>
                    
                    <div className="space-y-6 text-base sm:text-lg text-[#00ff66]/90 leading-relaxed font-sans max-w-4xl tracking-wide font-normal">
                      <p>
                        I started my journey in 2021 with Journalism and Mass Communication, where I was introduced to storytelling, research, graphic design, video editing, and communication.
                      </p>
                      
                      <p>
                        During college, while working on graphic design projects, I started exploring different areas of design beyond visuals and branding.
                      </p>
                      
                      <p>
                        As I explored more design fields, I came across UX Design and became curious about how digital products are planned, structured, and experienced by users. That curiosity gradually turned into a deeper interest in user behavior, workflows, and product thinking.
                      </p>
                      
                      <p>
                        Over time, I transitioned into Product Design, where I now focus on designing AI-driven and B2B experiences that simplify complex systems and create meaningful user interactions.
                      </p>
                    </div>
                  </div>
                </div>

                 {/* RIGHT SIDE: Profile Image with CRT terminal styling */}
                <div className="lg:col-span-4 flex flex-col items-center">
                  <div className="w-full max-w-md flex flex-col items-center gap-4">
                    {/* Outer retro shell monitor cabinet frame */}
                    <div 
                      className="relative border border-[#00ff66]/40 bg-black p-4 rounded-xl shadow-[0_0_20px_rgba(0,255,102,0.18)] retro-border w-full select-none will-change-gpu"
                    >
                      
                      {/* 4 Corner brackets overlay to reinforce terminal look */}
                      <div className="absolute top-2 left-2 border-t-2 border-l-2 border-[#00ff66] w-4 h-4 z-30 pointer-events-none"></div>
                      <div className="absolute top-2 right-2 border-t-2 border-r-2 border-[#00ff66] w-4 h-4 z-30 pointer-events-none"></div>
                      <div className="absolute bottom-2 left-2 border-b-2 border-l-2 border-[#00ff66] w-4 h-4 z-30 pointer-events-none"></div>
                      <div className="absolute bottom-2 right-2 border-b-2 border-r-2 border-[#00ff66] w-4 h-4 z-30 pointer-events-none"></div>

                       {/* Inner Screen Container */}
                      <div 
                        className="relative overflow-hidden aspect-[4/5] rounded bg-gradient-to-b from-[#0a1e0a] to-[#010902] border border-[#00ff66]/25 flex flex-col justify-between p-4 pt-12"
                      >
                        
                        {/* Layered CRT Ambient Glow in Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,102,0.25)_0%,transparent_75%)] pointer-events-none z-0"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#00ff66]/12 blur-[56px] pointer-events-none z-0"></div>

                        {/* Scanline overlay texture */}
                        <div className="absolute inset-0 bg-scanlines pointer-events-none z-20 opacity-30 animate-pulse"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-20"></div>

                        {/* Header Label inside monitor screen - Highly visible overlay */}
                        <div className="absolute top-4 left-4 z-30 pointer-events-none font-mono text-[10px] tracking-wider">
                          <div className="flex items-center gap-1.5 bg-black/90 px-2.5 py-1 rounded border border-[#00ff66]/50 text-[#00ff66] font-bold shadow-[0_0_12px_rgba(0,255,102,0.4)]">
                            <span>PROFILE_FEED</span>
                            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse shadow-[0_0_6px_#00ff66]"></span>
                          </div>
                        </div>

                        {/* True Portrait Image Container */}
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden z-10 mb-2 select-none">
                          {imgError ? (
                            /* Fallback: stylized placeholder when image is missing/corrupt */
                            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-[#010902]">
                              {/* ASCII-art style avatar silhouette */}
                              <div className="font-mono text-[#00ff66]/40 text-[10px] leading-[14px] select-none text-center">
                                <div>{'  ████████  '}</div>
                                <div>{'██        ██'}</div>
                                <div>{'██  ◉  ◉  ██'}</div>
                                <div>{'██    ▽    ██'}</div>
                                <div>{'██  ╰──╯  ██'}</div>
                                <div>{'  ████████  '}</div>
                                <div>{'████████████'}</div>
                                <div>{'██          ██'}</div>
                              </div>
                              <div className="font-mono text-[10px] text-[#00ff66]/50 uppercase tracking-widest text-center">
                                <div>[ SIGNAL_PENDING ]</div>
                                <div className="text-[9px] text-[#00ff66]/30 mt-1">portrait.png · awaiting upload</div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src="/src/assets/images/about-me/portrait.png"
                              alt="Sarthak Bajaj Profile Portrait"
                              className="w-full h-full object-cover opacity-85 brightness-[1.08] contrast-[1.25]"
                              style={{
                                filter: 'grayscale(100%) brightness(1.15) contrast(1.3) sepia(100%) hue-rotate(95deg) saturate(380%)',
                              }}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              decoding="async"
                              onError={() => setImgError(true)}
                            />
                          )}
                          {/* Phosphor glaze overlay mix-blend layers */}
                          <div className="absolute inset-0 bg-[#00ff66]/15 mix-blend-color-dodge pointer-events-none z-20"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#00ff66]/10 to-transparent mix-blend-overlay pointer-events-none z-20"></div>
                        </div>

                        {/* Animated Equalizer Visualizer along bottom — pure CSS, zero JS layout cost */}
                        <div className="relative z-20 flex items-end gap-[2px] h-6 px-1 border-t border-[#00ff66]/25 pt-2 mb-1">
                          {Array.from({ length: 36 }).map((_, i) => {
                            const isMid = i > 10 && i < 26;
                            const maxH = isMid ? '90%' : '50%';
                            const minH = isMid ? '13%' : '8%';
                            const dur = `${0.5 + (i % 6) * 0.12}s`;
                            const del = `${(i % 5) * 0.08}s`;
                            return (
                              <div
                                key={i}
                                className="flex-1 bg-[#00ff66]/80 rounded-t-sm"
                                style={{
                                  minHeight: '2px',
                                  height: minH,
                                  animation: `eq-bar ${dur} ${del} ease-in-out infinite alternate`,
                                  ['--eq-max' as string]: maxH,
                                }}
                              />
                            );
                          })}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        ) : (
          <div className="min-h-screen w-full flex items-center justify-center font-mono text-sm text-[#00ff66]/40">
            LOADING_ABOUT_STREAM...
          </div>
        )}
      </div>
    </section>
  );
});

export default Playground;
