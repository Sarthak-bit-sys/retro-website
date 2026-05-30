import React from 'react';
import { ExternalLink, Folder } from 'lucide-react';
import { portfolioData } from '../mock';

const CaseStudies = () => {
  const { caseStudies } = portfolioData;

  return (
    <section id="work" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 font-mono">
            <div className="text-xs opacity-70 mb-2">
              C:\PORTFOLIO&gt; DIR PROJECTS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-glow mb-4">
              FEATURED PROJECTS
            </h2>
            <div className="text-sm opacity-80">
              &gt; DIRECTORY LISTING: {caseStudies.length} FILE(S) FOUND
            </div>
          </div>

          <div className="space-y-8">
            {caseStudies.map((project, index) => (
              <div 
                key={project.id}
                className="terminal-box p-6 hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] transition-all duration-300 group"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="aspect-video bg-black border-2 border-green-500/30 overflow-hidden relative">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        style={{ filter: 'grayscale(100%) brightness(0.8) sepia(100%) hue-rotate(50deg) saturate(400%)' }}
                      />
                      <div className="absolute inset-0 scanlines"></div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 font-mono space-y-3">
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <Folder className="h-3 w-3" />
                      <span>PROJECT_{String(index + 1).padStart(2, '0')}</span>
                      <span className="ml-auto">[{project.year}]</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-glow">
                      {project.title.toUpperCase()}
                    </h3>
                    
                    <div className="text-xs">
                      <span className="opacity-70">TYPE:</span> {project.category}
                    </div>
                    
                    <p className="text-sm opacity-90 leading-relaxed">
                      &gt; {project.description}
                    </p>
                    
                    <div className="pt-2">
                      <div className="text-xs opacity-70 mb-2">STACK:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 border border-green-500/50 text-xs"
                          >
                            [{tag}]
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="inline-flex items-center gap-2 text-sm hover:text-glow transition-all mt-4">
                      <ExternalLink className="h-4 w-4" />
                      [OPEN_PROJECT]
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;