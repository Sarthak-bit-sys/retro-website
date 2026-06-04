import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const Header = React.memo(function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEmailClick = () => {
    const email = 'sarthkb78@zohomail.in';
    const subject = 'Reaching out for product design opportunity at';
    const body = 'Hi Sarthak,';

    // Gmail URL - opens Gmail web compose
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Mailto URL - opens default email app
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Try Gmail first
    window.open(gmailUrl, '_blank');

    // Also trigger mailto as fallback after 500ms
    setTimeout(() => {
      const emailLink = document.createElement('a');
      emailLink.href = mailtoUrl;
      emailLink.click();
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    
    // Adding passive flag guarantees scroll operations are never blocked by JavaScript threads
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    const headerHeight = 70;
    const el = document.getElementById(id);
    if (!el) return;

    // Calculate absolute offset of target element
    const scrollTarget = el.getBoundingClientRect().top + window.scrollY - headerHeight;

    // Fast, seamless jump without any scroll-induced layout stuttering
    window.scrollTo({ top: scrollTarget, behavior: 'instant' });
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-350 ${
        scrolled 
          ? 'bg-[#051105] border-b border-[#00ff66]/30 py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-12 items-center">
          {/* LEFT: Sarthak logo */}
          <div className="col-span-12 md:col-span-3 flex items-center justify-between md:justify-start">
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="font-display font-bold text-2xl tracking-widest text-white phosphor-glow uppercase">SARTHAK</span>
            </div>

            {/* Mobile Hamburger Menu (only shown on mobile screens) */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded text-[#00ff66] hover:text-white focus:outline-none border border-[#00ff66]/20 bg-[#00ff66]/5"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* CENTER: Centered Navigation Group with About, Experience, Work, Interests */}
          <nav className="hidden md:flex col-span-6 justify-center items-center gap-6 lg:gap-8 font-mono text-base tracking-widest font-semibold">
            <button 
              onClick={() => scrollToSection('playground')} 
              data-cursor-label="[ ABOUT ]"
              className="text-[#00ff66]/75 hover:text-[#00ff66] phosphor-glow-subtle transition-all cursor-pointer hover:underline uppercase"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              data-cursor-label="[ EXPERIENCE ]"
              className="text-[#00ff66]/75 hover:text-[#00ff66] phosphor-glow-subtle transition-all cursor-pointer hover:underline uppercase"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('casestudies')} 
              data-cursor-label="[ WORK ]"
              className="text-[#00ff66]/75 hover:text-[#00ff66] phosphor-glow-subtle transition-all cursor-pointer hover:underline uppercase"
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('hobbies')} 
              data-cursor-label="[ HOBBIES ]"
              className="text-[#00ff66]/75 hover:text-[#00ff66] phosphor-glow-subtle transition-all cursor-pointer hover:underline uppercase"
            >
              Interests
            </button>
          </nav>

          {/* RIGHT: Actions (LinkedIn, Email) aligned elegantly to the right */}
          <div className="col-span-3 md:flex hidden justify-end items-center gap-2">
            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/sarthak-bajaj-a06368206/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="[ LINKEDIN ]"
              className="bg-[#00ff66]/5 hover:bg-[#00ff66]/15 hover:shadow-[0_0_12px_rgba(0,255,102,0.2)] hover:border-[#00ff66] border border-[#00ff66]/35 px-3 py-2 rounded text-xs select-none text-[#00ff66] font-mono tracking-widest transition-all duration-200 flex items-center gap-1 font-bold uppercase cursor-pointer"
            >
              <span>LinkedIn</span>
            </a>

            {/* Email Button */}
            <button
              onClick={handleEmailClick}
              data-cursor-label="[ EMAIL ]"
              className="bg-[#00ff66]/5 hover:bg-[#00ff66]/15 hover:shadow-[0_0_12px_rgba(0,255,102,0.2)] hover:border-[#00ff66] border border-[#00ff66]/35 px-3 py-2 rounded text-xs select-none text-[#00ff66] font-mono tracking-widest transition-all duration-200 flex items-center gap-1 font-bold uppercase cursor-pointer text-left"
            >
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#051105]/95 border-b border-[#00ff66]/30 px-4 pt-2 pb-6"
          >
            <div className="flex flex-col gap-4 mt-2 font-mono text-base tracking-widest font-semibold uppercase">
              <button
                onClick={() => scrollToSection('playground')}
                className="text-[#00ff66] hover:text-white py-2 cursor-pointer border-b border-[#00ff66]/10 text-left font-semibold uppercase tracking-widest"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-[#00ff66] hover:text-white py-2 cursor-pointer border-b border-[#00ff66]/10 text-left font-semibold uppercase tracking-widest"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('casestudies')}
                className="text-[#00ff66] hover:text-white py-2 cursor-pointer border-b border-[#00ff66]/10 text-left font-semibold uppercase tracking-widest"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('hobbies')}
                className="text-[#00ff66] hover:text-white py-2 cursor-pointer border-b border-[#00ff66]/10 text-left font-semibold uppercase tracking-widest"
              >
                Interests
              </button>
              
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="https://www.linkedin.com/in/sarthak-bajaj-a06368206/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00ff66]/5 hover:bg-[#00ff66]/15 border border-[#00ff66]/35 text-[#00ff66] py-3 rounded text-center text-sm font-mono tracking-widest transition-all duration-200 flex items-center justify-center gap-2 font-bold uppercase cursor-pointer"
                >
                  <span>LinkedIn</span>
                </a>

                <button
                  onClick={handleEmailClick}
                  className="bg-[#00ff66]/5 hover:bg-[#00ff66]/15 border border-[#00ff66]/35 text-[#00ff66] py-3 rounded text-center text-sm font-mono tracking-widest transition-all duration-200 flex items-center justify-center gap-1.5 font-bold uppercase cursor-pointer text-left"
                >
                  <span>Email</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

export default Header;
