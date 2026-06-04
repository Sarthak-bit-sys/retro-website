import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useStickyOffset } from '../hooks/useStickyOffset';
import AmbientDotMatrix from './AmbientDotMatrix';

// Import static images for Hobbies section
// @ts-expect-error - Vite resolves PNG imports automatically
import hobby01 from '../assets/images/hobbies/hobby-01.png';
// @ts-expect-error - Vite resolves PNG imports automatically
import hobby02 from '../assets/images/hobbies/hobby-02.png';
// @ts-expect-error - Vite resolves PNG imports automatically
import hobby03 from '../assets/images/hobbies/hobby-03.png';
// @ts-expect-error - Vite resolves PNG imports automatically
import hobby04 from '../assets/images/hobbies/hobby-04.png';
// @ts-expect-error - Vite resolves PNG imports automatically
import hobby05 from '../assets/images/hobbies/hobby-05.png';

const HOBBY_IMAGES: Record<string, string> = {
  'frame-01': hobby01,
  'frame-02': hobby02,
  'frame-03': hobby03,
  'frame-04': hobby04,
  'frame-05': hobby05
};

interface FrameConfig {
  id: string;
  number: string;
  title: string;
  description: string;
  shape: 'rectangular' | 'circular' | 'hexagonal' | 'octagonal' | 'beveled';
  floatDelay: number;
}

const FRAMES_CONFIG: FrameConfig[] = [
  {
    id: 'frame-01',
    number: '01',
    title: '// STREET RHYTHMS',
    description: 'The beauty of everyday chaos.',
    shape: 'rectangular',
    floatDelay: 0,
  },
  {
    id: 'frame-02',
    number: '02',
    title: '// LIGHT & STORIES',
    description: 'Where light defines the narrative.',
    shape: 'circular',
    floatDelay: 1.2,
  },
  {
    id: 'frame-03',
    number: '03',
    title: '// HUMAN STRENGTH',
    description: 'Stories of resilience in every corner.',
    shape: 'hexagonal',
    floatDelay: 0.6,
  },
  {
    id: 'frame-04',
    number: '04',
    title: '// WALKING PERSPECTIVES',
    description: 'Different streets, different lessons.',
    shape: 'octagonal',
    floatDelay: 1.8,
  },
  {
    id: 'frame-05',
    number: '05',
    title: '// PLACES & PEOPLE',
    description: 'Every place has a story to tell.',
    shape: 'beveled',
    floatDelay: 2.4,
  }
];

const HobbiesInterests = React.memo(function HobbiesInterests() {
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

  // Render static high-quality photo with filters bypassed and absolutely no upload overlays
  const renderPhotoContent = (frame: FrameConfig) => {
    const photoUrl = HOBBY_IMAGES[frame.id];

    return (
      <div className="relative w-full h-full z-20 overflow-hidden">
        <img
          src={photoUrl}
          alt={frame.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 pointer-events-none select-none"
          style={{ filter: 'none', mixBlendMode: 'normal', opacity: 1, imageRendering: 'auto' }}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.img-fallback')) {
              const fallback = document.createElement('div');
              fallback.className = 'img-fallback';
              fallback.style.cssText = [
                'width:100%',
                'height:100%',
                'min-height:120px',
                'display:flex',
                'flex-direction:column',
                'align-items:center',
                'justify-content:center',
                'gap:8px',
                'background:#051105',
                'color:rgba(0,255,102,0.3)',
                'font-family:monospace',
                'font-size:10px',
                'letter-spacing:2px',
                'text-transform:uppercase',
                'padding:16px',
              ].join(';');
              fallback.innerHTML = `<div style="font-size:20px;opacity:0.4">📷</div><div>[ NO SIGNAL ]</div><div style="font-size:8px;opacity:0.4;margin-top:2px">${frame.title.replace('// ', '')}</div>`;
              parent.appendChild(fallback);
            }
          }}
        />
      </div>
    );
  };

  // Wrap standard frames inside stylized geometric contours
  const renderFrameContainer = (frame: FrameConfig) => {
    switch (frame.shape) {
      case 'circular':
        return (
          <div className="relative w-full h-[340px] flex items-center justify-center group">
            <div className="absolute w-[290px] h-[290px] border border-dashed border-[#00ff66]/25 rounded-full animate-[spin_55s_linear_infinite] pointer-events-none group-hover:border-[#00ff66]/60"></div>
            <div className="absolute w-[306px] h-[306px] border border-[#00ff66]/10 rounded-full pointer-events-none"></div>
            <div className="w-[270px] h-[270px] rounded-full overflow-hidden border border-[#00ff66]/30 bg-black flex items-center justify-center relative shadow-[0_0_15px_rgba(0,255,102,0.15)] z-20 hover:border-[#00ff66] transition-all duration-300">
              {renderPhotoContent(frame)}
            </div>
          </div>
        );

      case 'hexagonal':
        return (
          <div className="relative w-full h-[340px] flex items-center justify-center group">
            <div 
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} 
              className="bg-[#00ff66]/20 group-hover:bg-[#00ff66] transition-colors duration-300 p-[1.5px] w-full h-full"
            >
              <div 
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} 
                className="bg-black w-full h-full relative overflow-hidden flex items-center justify-center"
              >
                {renderPhotoContent(frame)}
              </div>
            </div>
          </div>
        );

      case 'octagonal':
        return (
          <div className="relative w-full h-[340px] flex items-center justify-center group">
            <div 
              style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)' }} 
              className="bg-[#00ff66]/20 group-hover:bg-[#00ff66] transition-colors duration-300 p-[1.5px] w-full h-full"
            >
              <div 
                style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)' }} 
                className="bg-black w-full h-full relative overflow-hidden flex items-center justify-center"
              >
                {renderPhotoContent(frame)}
              </div>
            </div>
          </div>
        );

      case 'beveled':
        return (
          <div className="relative w-full h-[340px] flex items-center justify-center group">
            <div 
              style={{ clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)' }} 
              className="bg-[#00ff66]/20 group-hover:bg-[#00ff66] transition-colors duration-300 p-[1.5px] w-full h-full"
            >
              <div 
                style={{ clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)' }} 
                className="bg-black w-full h-full relative overflow-hidden flex items-center justify-center"
              >
                {renderPhotoContent(frame)}
              </div>
            </div>
          </div>
        );

      case 'rectangular':
      default:
        return (
          <div className="relative w-full h-[340px] flex items-center justify-center group overflow-hidden">
            <div className="border border-[#00ff66]/20 group-hover:border-[#00ff66]/80 rounded-lg bg-black w-full h-full relative overflow-hidden flex items-center justify-center transition-all p-1">
              {renderPhotoContent(frame)}
            </div>
          </div>
        );
    }
  };

  return (
    <section 
      id="hobbies"
      ref={elementRef}
      style={{ 
        top: stickyTop,
        contain: 'paint layout',
        willChange: 'transform'
      }}
      className="relative md:sticky z-[50] w-full min-h-screen flex flex-col justify-center py-16 md:py-24 bg-[#051105] border-t border-[#00ff66]/40 scroll-mt-20 overflow-hidden text-left"
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10"
      >
        
        {/* TEXT CONTENT ROW: Scaled up to match About Me typography standards */}
        <div className="max-w-[1200px] font-sans mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-widest uppercase mb-6 phosphor-glow">
            FRAMES BEYOND DESIGN
          </h2>
          
          <h3 className="font-sans font-medium text-xl sm:text-2xl text-[#00ff66] tracking-wide mb-8 leading-tight">
            Capturing Moments, Collecting Stories
          </h3>
          
          <div className="space-y-6 text-base sm:text-lg text-[#00ff66]/90 leading-relaxed font-sans max-w-[1000px] tracking-wide font-normal">
            <p>
              When I’m not designing products, I enjoy exploring digital games and the way they create immersive experiences and interactive storytelling. I also enjoy photography, especially capturing moments, perspectives, and small details that often go unnoticed.
            </p>
            <p>
              Beyond that, I enjoy conversations around spirituality, life, and deeper perspectives — topics that help me stay curious, reflective, and connected beyond the digital world.
            </p>
          </div>
        </div>

        {/* PHOTOGRAPHY GALLERY: Balanced responsive gallery with centered second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {FRAMES_CONFIG.map((frame, idx) => {
            // Apply balanced col-spans with exact offset centering for row 2 (idx 3 and 4) on lg screens.
            // On md (tablets), the 5th card spans 2 columns to maintain full span balance.
            let responsiveCls = "";
            if (idx === 4) {
              responsiveCls = "md:col-span-2 lg:col-span-2 lg:col-start-4";
            } else if (idx === 3) {
              responsiveCls = "md:col-span-1 lg:col-span-2 lg:col-start-2";
            } else {
              responsiveCls = "md:col-span-1 lg:col-span-2";
            }

            return (
              <div
                key={frame.id}
                className={`bg-black/40 border border-[#00ff66]/20 hover:border-[#00ff66] rounded-lg p-5 flex flex-col justify-between transition-all duration-300 retro-border relative will-change-gpu ${responsiveCls}`}
              >
                {/* Meta Layout Header Inside Cards */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#00ff66]/10 text-[10px] font-mono select-none">
                  <span className="text-[#00ff66]/40 uppercase tracking-widest">[ SLOT_0{idx+1} ]</span>
                  <span className="text-[#00ff66]/65 font-bold uppercase tracking-wider">
                    {frame.shape}
                  </span>
                </div>

                {/* Scaled Frame Container */}
                <div className="my-2.5">
                  {renderFrameContainer(frame)}
                </div>

                {/* Labels Block below image */}
                <div className="mt-4 pt-4 border-t border-[#00ff66]/10 flex flex-col space-y-1.5 text-left font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#00ff66] tracking-wider truncate mr-1 uppercase">
                      {frame.title}
                    </span>
                  </div>
                  <span className="text-xs text-[#00ff66]/70 font-sans tracking-normal leading-relaxed select-none">
                    {frame.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </motion.div>
          </>
        ) : (
          <div className="min-h-[50vh] w-full flex items-center justify-center font-mono text-[#00ff66]/40">
            LOADING_HOBBIES...
          </div>
        )}
      </div>
    </section>
  );
});

export default HobbiesInterests;
