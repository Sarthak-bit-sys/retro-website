import React from 'react';
import { Camera, Music, Mountain, BookOpen } from 'lucide-react';
import { portfolioData } from '../mock';

const iconMap = {
  camera: Camera,
  music: Music,
  mountain: Mountain,
  'book-open': BookOpen
};

const Interests = () => {
  const { interests } = portfolioData;

  return (
    <section id="interests" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 font-mono">
            <div className="text-xs opacity-70 mb-2">
              C:\PORTFOLIO&gt; SCAN INTERESTS.SYS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-glow mb-4">
              PERSONAL PROTOCOLS
            </h2>
            <div className="text-sm opacity-80">
              &gt; RECREATIONAL SUBROUTINES LOADED
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {interests.map((interest, index) => {
              const IconComponent = iconMap[interest.icon];
              return (
                <div 
                  key={interest.id}
                  className="terminal-box p-6 space-y-4 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs opacity-70">
                      [0{index + 1}]
                    </div>
                    <IconComponent className="h-8 w-8 text-glow" />
                  </div>
                  
                  <h3 className="text-lg font-bold font-mono">
                    {interest.title.toUpperCase()}
                  </h3>
                  
                  <p className="text-xs opacity-80 font-mono leading-relaxed">
                    &gt; {interest.description}
                  </p>
                  
                  <div className="text-[10px] opacity-50">
                    STATUS: ACTIVE
                  </div>
                </div>
              );
            })}
          </div>

          {/* ASCII Art */}
          <div className="text-xs font-mono opacity-20 text-center mt-12">
            <pre>
{`     _____                 _____                 _____          
    [     ]~~~~~~~~~~~~~~~[     ]~~~~~~~~~~~~~~~[     ]
    |  I  |               |  N  |               |  T  |
    [_____]~~~~~~~~~~~~~~~[_____]~~~~~~~~~~~~~~~[_____]`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;