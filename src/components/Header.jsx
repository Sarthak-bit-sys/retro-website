import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-sm border-b-2 border-green-500' 
          : 'bg-transparent'
      }`}
      style={{ color: '#00ff41' }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between font-mono text-sm">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4" style={{ color: '#00ff41' }} />
            <span className="text-glow font-bold">SYSTEM_ONLINE</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('work')}
              className="hover:text-glow transition-all"
            >
              [PROJECTS]
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-glow transition-all"
            >
              [ABOUT]
            </button>
            <button 
              onClick={() => scrollToSection('interests')}
              className="hover:text-glow transition-all"
            >
              [INTERESTS]
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-glow transition-all"
            >
              [CONTACT]
            </button>
          </nav>

          <div className="text-xs">
            {formatTime()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;