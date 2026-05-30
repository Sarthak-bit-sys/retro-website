import React from 'react';
import { portfolioData } from '../mock';

const About = () => {
  const { about } = portfolioData;

  const stats = [
    { label: 'YEARS_EXP', value: about.experience, command: 'GET_EXPERIENCE' },
    { label: 'PROJECTS', value: about.projects, command: 'COUNT_PROJECTS' },
    { label: 'CLIENTS', value: about.clients, command: 'LIST_CLIENTS' }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 font-mono">
            <div className="text-xs opacity-70 mb-2">
              C:\PORTFOLIO&gt; TYPE ABOUT.TXT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-glow mb-4">
              SYSTEM INFORMATION
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="terminal-box p-6 space-y-4">
              <div className="text-xs opacity-70 pb-2 border-b border-green-500/30">
                &gt; EXECUTING: WHOAMI.EXE
              </div>
              <p className="font-mono text-sm leading-relaxed opacity-90">
                {about.bio}
              </p>
              
              <div className="grid grid-cols-3 gap-3 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="border border-green-500/30 p-3 text-center">
                    <div className="text-2xl font-bold text-glow">
                      {stat.value}
                    </div>
                    <div className="text-[10px] opacity-70 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="terminal-box p-6 space-y-4">
              <div className="text-xs opacity-70 pb-2 border-b border-green-500/30">
                &gt; ANALYZING SKILL_SET.DAT
              </div>
              <div className="space-y-4 font-mono">
                {about.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>{skill.name.toUpperCase()}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-4 border border-green-500/30 relative overflow-hidden">
                      <div 
                        className="h-full bg-green-500/30 relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 flex items-center text-[8px] px-1">
                          {'█'.repeat(Math.floor(skill.level / 5))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ASCII Art Divider */}
          <div className="text-xs font-mono opacity-20 text-center mt-12">
            <pre>
{`════════════════════════════════════════════════════════════════`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;