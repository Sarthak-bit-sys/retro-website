import React from 'react';
import { Mail, MapPin, Clock, Github, Linkedin, Send } from 'lucide-react';
import { portfolioData } from '../mock';

const Footer = () => {
  const { contact } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-green-500/30 bg-black/50">
      <div id="contact" className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6 font-mono">
              <div className="text-xs opacity-70">
                C:\PORTFOLIO&gt; INITIATE CONTACT_PROTOCOL
              </div>
              <h3 className="text-3xl font-bold text-glow">
                ESTABLISH CONNECTION
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <span>&gt; {contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4" />
                  <span>&gt; {contact.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4" />
                  <span>&gt; {contact.availability}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 font-mono">
              <div className="text-xs opacity-70">
                &gt; SOCIAL_LINKS.EXE
              </div>
              <div className="flex gap-3">
                <button className="w-12 h-12 border-2 border-green-500 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all">
                  <Github className="h-5 w-5" />
                </button>
                <button className="w-12 h-12 border-2 border-green-500 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all">
                  <Linkedin className="h-5 w-5" />
                </button>
                <button className="w-12 h-12 border-2 border-green-500 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all">
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <div className="pt-4">
                <button className="terminal-button w-full md:w-auto">
                  [SEND_MESSAGE]
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-green-500/30 pt-8">
            <div className="font-mono text-xs opacity-70 space-y-2">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  &copy; {currentYear} {portfolioData.hero.name.toUpperCase()} // ALL RIGHTS RESERVED
                </div>
                <div className="flex gap-6">
                  <button className="hover:text-glow transition-all">[PRIVACY]</button>
                  <button className="hover:text-glow transition-all">[TERMS]</button>
                  <button className="hover:text-glow transition-all">[LICENSE]</button>
                </div>
              </div>
              <div className="text-center md:text-left pt-4">
                SYSTEM STATUS: OPERATIONAL // UPTIME: 99.9% // VERSION: 1.0.0
              </div>
            </div>
          </div>

          {/* ASCII Art Footer */}
          <div className="text-xs font-mono opacity-10 text-center mt-8">
            <pre>
{`  _______________________________________________________________
 [ END OF TRANSMISSION // THANK YOU FOR VISITING // SYSTEM HALT ]`}
            </pre>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;