import { useEffect, createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lenis from '@studio-freight/lenis';
import Head from 'next/head';
import Image from "next/image";
import React from 'react';

import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';
import Link from 'next/link';

type Theme = 'black' | 'red' | 'gold';
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'black',
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('black');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);
};

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        type: "spring",
        damping: 20,
        stiffness: 100, 
        delay, 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GermanyText = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <motion.div 
      role="group"
      aria-label="Theme switcher with German flag colors"
      style={{
        display: "inline-flex",
        width: "3em",
        height: "0.6em",
        marginLeft: "0.1em",
        verticalAlign: "middle",
        borderRadius: "1px",
        overflow: "hidden",
        opacity: 0.6,
        cursor: "pointer"
      }}
      whileHover={{ 
        opacity: 0.8,
        transition: { duration: 0.2 }
      }}
    >
      <motion.button
        aria-label="Switch to dark theme"
        aria-pressed={theme === 'black'}
        style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", borderLeft: "2px solid rgba(255, 255, 255, 0.1)", borderTop: "2px solid rgba(255, 255, 255, 0.1)", borderBottom: "2px solid rgba(255, 255, 255, 0.1)" }}
        onClick={() => setTheme('black')}
        className={theme === 'black' ? 'ring-1 ring-white/20' : ''}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
      <motion.button
        aria-label="Switch to red theme"
        aria-pressed={theme === 'red'}
        style={{ flex: 1, backgroundColor: "rgba(255, 0, 0)" }}
        onClick={() => setTheme('red')}
        className={theme === 'red' ? 'ring-1 ring-white/20' : ''}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
      <motion.button
        aria-label="Switch to gold theme"
        aria-pressed={theme === 'gold'}
        style={{ flex: 1, backgroundColor: "rgba(255, 204, 0)" }}
        onClick={() => setTheme('gold')}
        className={theme === 'gold' ? 'ring-1 ring-white/20' : ''}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
    </motion.div>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);
  
  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="p-2 theme-accent rounded-lg theme-border"
        aria-label="Open menu"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <svg className="w-5 h-5 theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </motion.button>
      
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            <motion.div 
              className="fixed top-0 bottom-0 right-0 w-full sm:w-80 z-[100] h-[100dvh]"
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                mass: 1
              }}
            >
              {/* Glass background and content wrapper with explicit backdrop filter */}
              <div className="nav-glass w-full h-full flex flex-col shadow-2xl" 
                   style={{ 
                     backdropFilter: 'blur(16px)',
                     WebkitBackdropFilter: 'blur(16px)'
                   }}>
                {/* Close button */}
                <motion.button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 theme-accent rounded-lg theme-border z-[110]"
                  aria-label="Close menu"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.2 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </motion.button>
              
                <div className="w-full h-full p-6 pt-16 flex flex-col overflow-y-auto">
                  <nav className="mb-8">
                    <motion.div 
                      className="flex flex-col space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.1 
                      }}
                    >
                      {[
                        { href: "#work", label: "Work" },
                        { href: "#about", label: "About" }
                      ].map((item, index) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="p-4 text-xl theme-primary rounded-lg theme-accent flex items-center hover:theme-bg-05 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            delay: 0.2 + index * 0.1 
                          }}
                        >
                          <span>{item.label}</span>
                          <svg className="ml-auto w-5 h-5 theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </motion.a>
                      ))}
                    </motion.div>
                  </nav>
                
                  <motion.div 
                    className="mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.4 
                    }}
                  >
                    <div className="pt-4 border-t theme-border">
                      <motion.a 
                        href="mailto:jleibl@proton.me" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-3 w-full py-4 px-6 theme-primary border theme-border rounded-lg hover:theme-bg-05 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <span>Contact Me</span>
                      </motion.a>
                    </div>
                  
                    <div className="pt-6 flex justify-center pb-6">
                      <GermanyText />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default function Home() {
  useSmoothScroll();

  return (
    <ThemeProvider>
      <style jsx global>{`
        .black { background: #0A0A0A; }
        .red { background: #1A0000; }
        .gold { background: #1A1400; }
        
        .black .theme-primary { color: rgba(255, 255, 255, 0.9); }
        .red .theme-primary { color: rgba(255, 0, 0, 0.9); }
        .gold .theme-primary { color: rgba(255, 204, 0, 0.9); }
        
        .black .theme-secondary { color: rgba(255, 255, 255, 0.6); }
        .red .theme-secondary { color: rgba(255, 0, 0, 0.6); }
        .gold .theme-secondary { color: rgba(255, 204, 0, 0.6); }
        
        .black .theme-accent { background-color: rgba(255, 255, 255, 0.03); }
        .red .theme-accent { background-color: rgba(255, 0, 0, 0.03); }
        .gold .theme-accent { background-color: rgba(255, 204, 0, 0.03); }
        
        .black .theme-border { border-color: rgba(255, 255, 255, 0.1); }
        .red .theme-border { border-color: rgba(255, 0, 0, 0.1); }
        .gold .theme-border { border-color: rgba(255, 204, 0, 0.1); }

        .black .theme-text-40 { color: rgba(255, 255, 255, 0.4); }
        .red .theme-text-40 { color: rgba(255, 0, 0, 0.4); }
        .gold .theme-text-40 { color: rgba(255, 204, 0, 0.4); }

        .black .theme-text-70 { color: rgba(255, 255, 255, 0.7); }
        .red .theme-text-70 { color: rgba(255, 0, 0, 0.7); }
        .gold .theme-text-70 { color: rgba(255, 204, 0, 0.7); }

        .black .theme-text-90 { color: rgba(255, 255, 255, 0.9); }
        .red .theme-text-90 { color: rgba(255, 0, 0, 0.9); }
        .gold .theme-text-90 { color: rgba(255, 204, 0, 0.9); }

        .black .theme-bg-05 { background-color: rgba(255, 255, 255, 0.05); }
        .red .theme-bg-05 { background-color: rgba(255, 0, 0, 0.05); }
        .gold .theme-bg-05 { background-color: rgba(255, 204, 0, 0.05); }

        .black .nav-glass { 
          background: rgba(10, 10, 10, 0.8);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .red .nav-glass { 
          background: rgba(26, 0, 0, 0.8);
          box-shadow: 0 8px 32px rgba(26, 0, 0, 0.1);
        }
        .gold .nav-glass { 
          background: rgba(26, 20, 0, 0.8);
          box-shadow: 0 8px 32px rgba(26, 20, 0, 0.1);
        }

        .black .nav-item-active {
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 2px solid rgba(255, 255, 255, 0.8);
        }
        .red .nav-item-active {
          background: rgba(255, 0, 0, 0.05);
          border-bottom: 2px solid rgba(255, 0, 0, 0.8);
        }
        .gold .nav-item-active {
          background: rgba(255, 204, 0, 0.05);
          border-bottom: 2px solid rgba(255, 204, 0, 0.8);
        }
        
        .nav-item {
          position: relative;
          overflow: hidden;
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .black .nav-item::after {
          background-color: rgba(255, 255, 255, 0.8);
        }
        .red .nav-item::after {
          background-color: rgba(255, 0, 0, 0.8);
        }
        .gold .nav-item::after {
          background-color: rgba(255, 204, 0, 0.8);
        }
        
        .nav-item:hover::after {
          transform: translateX(0);
        }

        .black .theme-bg-gradient { background: linear-gradient(to bottom, rgba(255, 255, 255, 0.02), transparent); }
        .red .theme-bg-gradient { background: linear-gradient(to bottom, rgba(255, 0, 0, 0.02), transparent); }
        .gold .theme-bg-gradient { background: linear-gradient(to bottom, rgba(255, 204, 0, 0.02), transparent); }

        .black .theme-button-primary { background-color: rgba(255, 255, 255, 0.9); color: #0A0A0A; }
        .red .theme-button-primary { background-color: rgba(255, 0, 0, 0.9); color: #1A0000; }
        .gold .theme-button-primary { background-color: rgba(255, 204, 0, 0.9); color: #1A1400; }

        .black .theme-button-primary:hover { background-color: rgba(255, 255, 255, 0.8); }
        .red .theme-button-primary:hover { background-color: rgba(255, 0, 0, 0.8); }
        .gold .theme-button-primary:hover { background-color: rgba(255, 204, 0, 0.8); }

        .black .theme-button-secondary { border-color: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.9); }
        .red .theme-button-secondary { border-color: rgba(255, 0, 0, 0.1); color: rgba(255, 0, 0, 0.9); }
        .gold .theme-button-secondary { border-color: rgba(255, 204, 0, 0.1); color: rgba(255, 204, 0, 0.9); }

        .black .theme-button-secondary:hover { background-color: rgba(255, 255, 255, 0.05); }
        .red .theme-button-secondary:hover { background-color: rgba(255, 0, 0, 0.05); }
        .gold .theme-button-secondary:hover { background-color: rgba(255, 204, 0, 0.05); }

        .theme-transition {
          transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
      <div className="min-h-screen theme-transition">
        <Head>
          <title>Jan-Marlon Leibl • Fullstack Software Developer | PHP & TypeScript Expert</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          <meta name="title" content="Jan-Marlon Leibl • Fullstack Software Developer | PHP & TypeScript Expert" />
          <meta name="description" content="Experienced Fullstack Developer specializing in PHP and TypeScript. Creating high-performance web applications and digital experiences with modern technologies." />
          <meta name="keywords" content="Software Development, PHP Developer, TypeScript, Fullstack Engineer, Web Development, System Architecture, MySQL, React, Performance Optimization" />
          <meta name="author" content="Jan-Marlon Leibl" />
          <meta name="robots" content="index, follow" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jleibl.net/" />
          <meta property="og:title" content="Jan-Marlon Leibl • Fullstack Software Developer" />
          <meta property="og:description" content="Experienced Fullstack Developer specializing in PHP and TypeScript. Creating high-performance web applications and digital experiences with modern technologies." />
          <meta property="og:image" content="https://jleibl.net/profile-image.jpg" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
          <meta property="og:image:alt" content="Jan-Marlon Leibl - Fullstack Software Developer" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://jleibl.net/" />
          <meta name="twitter:title" content="Jan-Marlon Leibl • Fullstack Software Developer" />
          <meta name="twitter:description" content="Experienced Fullstack Developer specializing in PHP and TypeScript. Creating high-performance web applications and digital experiences with modern technologies." />
          <meta name="twitter:image" content="https://jleibl.net/profile-image.jpg" />
          <meta name="twitter:image:alt" content="Jan-Marlon Leibl - Fullstack Software Developer" />

          <link rel="icon" href="/profile-image.jpg" type="image/jpeg" />

          <link rel="canonical" href="https://jleibl.net/" />
        </Head>

        <motion.header 
          className="fixed top-0 left-0 right-0 z-40 nav-glass backdrop-blur-lg theme-transition" 
          role="banner"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 100,
            mass: 1,
            delay: 0.2
          }}
        >
          <div className="max-w-screen-xl mx-auto">
            <nav className="py-5 px-6 sm:px-8 flex justify-between items-center font-['DM_Sans']" role="navigation" aria-label="Main navigation">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2 group" aria-label="Home">
                  <div className="relative w-10 h-10 rounded-full theme-accent flex items-center justify-center border theme-border overflow-hidden group-hover:border-opacity-80 transition-all duration-300">
                    <span className="text-lg font-bold tracking-tight theme-primary theme-transition">JL</span>
                    <div className="absolute inset-0 theme-bg-05 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                  </div>
                  <span className="text-lg font-medium tracking-tight theme-primary theme-transition hidden sm:block">
                    Jan-Marlon Leibl
                  </span>
                </Link>
              </div>
              
              <div className="hidden md:flex items-center">
                <div className="flex bg-black/10 backdrop-blur-md rounded-full overflow-hidden theme-border border divide-x divide-white/5">
                  {["Work", "About"].map((item) => (
                    <a 
                      key={item}
                      href={`#${item.toLowerCase()}`} 
                      className="nav-item px-6 py-2 theme-secondary hover:theme-primary theme-transition"
                      aria-label={`View my ${item.toLowerCase()}`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
                
                <div className="ml-6">
                  <motion.a 
                    href="mailto:jleibl@proton.me" 
                    className="flex items-center gap-2 px-6 py-2 theme-bg-05 theme-primary border theme-border rounded-full hover:bg-opacity-100 transition-all duration-300 group"
                    aria-label="Contact me via email"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg className="w-4 h-4 theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-sm">Contact</span>
                    <div className="w-0 overflow-hidden group-hover:w-4 transition-all duration-500">
                      <svg className="w-4 h-4 theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </motion.a>
                </div>
              </div>
              
              <div className="flex md:hidden">
                <MobileMenu />
              </div>
            </nav>
          </div>
          
          <div className="h-px w-full theme-border opacity-50"></div>
        </motion.header>

        <section className="min-h-[100dvh] flex items-center px-4 sm:px-8 relative pt-24 sm:pt-8">
          <div className="absolute inset-0 theme-bg-gradient"></div>
          <div className="max-w-screen-xl w-full relative pt-8 sm:pt-24">
            <FadeIn className="space-y-8 sm:space-y-16">
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-6 sm:space-y-8">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full theme-accent theme-border theme-transition">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="theme-secondary uppercase tracking-[0.2em] text-xs sm:text-sm font-['Instrument_Sans']">Available for Work</span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="font-['DM_Sans'] text-xl sm:text-3xl theme-secondary tracking-wide font-medium theme-transition">
                      Jan-Marlon Leibl
                    </h2>
                    <div>
                      <h1 className="font-['DM_Sans'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] sm:leading-[0.95] max-w-4xl theme-primary theme-transition">
                        Software Developer
                        <br />
                        <span className="theme-secondary">based in <GermanyText /></span>
                      </h1>
                    </div>
                  </div>
                </div>
                <p className="font-['Instrument_Sans'] theme-secondary text-lg sm:text-2xl max-w-2xl leading-relaxed tracking-wide theme-transition">
                  Passionate about creating digital experiences, with a focus on PHP and modern web technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.a 
                    href="#work"
                    className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 theme-button-primary rounded-lg sm:rounded-full transition-colors text-sm sm:text-base tracking-wide font-medium group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View My Work
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="mailto:jleibl@proton.me"
                    className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border theme-border rounded-lg sm:rounded-full theme-button-secondary hover:theme-bg-05 transition-colors text-sm sm:text-base tracking-wide group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Get in Touch
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 font-['Instrument_Sans'] text-sm sm:text-base tracking-wide border-t theme-border pt-6 sm:pt-8">
                <div className="space-y-1.5 sm:space-y-2.5 group">
                  <span className="theme-text-40 block uppercase tracking-[0.2em] text-xs sm:text-sm">Email</span>
                  <a 
                    href="mailto:jleibl@proton.me" 
                    className="theme-text-90 hover:theme-primary transition-colors flex items-center gap-2 sm:gap-2.5 group-hover:gap-3 duration-300"
                  >
                    jleibl@proton.me
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-300" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
                <div className="space-y-1.5 sm:space-y-2.5">
                  <span className="theme-text-40 block uppercase tracking-[0.2em] text-xs sm:text-sm">Role</span>
                  <span className="theme-text-90">
                    Fullstack Developer
                  </span>
                </div>
                <div className="space-y-1.5 sm:space-y-2.5">
                  <span className="theme-text-40 block uppercase tracking-[0.2em] text-xs sm:text-sm">Experience</span>
                  <span className="theme-text-90">
                    5+ Years
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="about" className="py-20 sm:py-40 px-4 sm:px-8 theme-bg-gradient">
          <div className="max-w-screen-xl mx-auto">
            <FadeIn>
              <div className="flex items-baseline gap-4 mb-12 sm:mb-24">
                <h2 className="font-['DM_Sans'] text-3xl sm:text-6xl font-semibold tracking-tight theme-primary">About</h2>
                <div className="h-px flex-grow bg-white/10 relative top-[-4px]"></div>
              </div>
            </FadeIn>
            
            <div className="grid md:grid-cols-[1fr,2fr] gap-12 sm:gap-24">
              <div className="space-y-6 sm:space-y-8">
                <FadeIn>
                  <div className="aspect-square bg-gradient-to-tr theme-bg-05 rounded-2xl overflow-hidden border theme-border hover:border-white/10 transition-colors mx-auto md:mx-0 max-w-[280px] md:max-w-none">
                    <Image
                      src="/profile-image.jpg"
                      alt="Jan-Marlon Leibl - Fullstack Software Developer"
                      width={400}
                      height={400}
                      priority
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="font-['DM_Sans'] text-xl sm:text-2xl font-medium theme-primary">Jan-Marlon Leibl</h3>
                    <p className="font-['Instrument_Sans'] theme-text-70 text-base sm:text-lg">Fullstack Developer</p>
                  </div>
                </FadeIn>
              </div>
              
              <FadeIn delay={0.2}>
                <div className="space-y-10 sm:space-y-16 font-['Instrument_Sans']">
                  <div className="space-y-6 sm:space-y-8">
                    <p className="text-xl sm:text-2xl theme-text-90 leading-relaxed">
                      Hello! I&apos;m Jan-Marlon, but please call me Jan. I started my journey in programming at the age of 11 with C#, fascinated by a desktop application my friend created.
                    </p>
                    <p className="text-base sm:text-xl theme-text-70 leading-relaxed">
                      Today, I specialize in PHP and TypeScript development, constantly pushing the boundaries of what&apos;s possible on the web. My journey has led me from creating simple applications to developing complex systems used by thousands.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16">
                    <div className="space-y-6 sm:space-y-8">
                      <div className="flex items-baseline gap-4">
                        <h3 className="text-sm sm:text-base theme-text-40 uppercase tracking-[0.2em]">Technologies</h3>
                        <div className="h-px flex-grow theme-border"></div>
                      </div>
                      <ul className="space-y-4 sm:space-y-5">
                        {['PHP', 'JavaScript', 'MySQL', 'React'].map((tech) => (
                          <li 
                            key={tech} 
                            className="text-base sm:text-lg group flex items-center gap-3 theme-text-70 hover:theme-text-90 transition-colors cursor-default"
                          >
                            <span className="w-2 h-2 rounded-full theme-text-40 group-hover:theme-text-90 transition-colors"></span>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                      <div className="flex items-baseline gap-4">
                        <h3 className="text-sm sm:text-base theme-text-40 uppercase tracking-[0.2em]">Interests</h3>
                        <div className="h-px flex-grow theme-border"></div>
                      </div>
                      <ul className="space-y-4 sm:space-y-5">
                        {[
                          'Web Development',
                          'System Architecture',
                          'UI/UX Design',
                          'Performance Optimization'
                        ].map((interest) => (
                          <li 
                            key={interest} 
                            className="text-base sm:text-lg group flex items-center gap-3 theme-text-70 hover:theme-text-90 transition-colors cursor-default"
                          >
                            <span className="w-2 h-2 rounded-full theme-text-40 group-hover:theme-text-90 transition-colors"></span>
                            {interest}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <motion.a 
                      href="https://github.com/AtomicWasTaken" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center px-6 sm:px-8 py-3 sm:py-4 border theme-border rounded-lg sm:rounded-full hover:theme-bg-05 transition-colors text-sm sm:text-base tracking-wide font-medium theme-text-90"
                      whileHover={{ scale: 1.02 }}
                    >
                      View GitHub
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/janmarlonleibl/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center px-6 sm:px-8 py-3 sm:py-4 border theme-border rounded-lg sm:rounded-full hover:theme-bg-05 transition-colors text-sm sm:text-base tracking-wide font-medium theme-text-90"
                      whileHover={{ scale: 1.02 }}
                    >
                      Connect on LinkedIn
                    </motion.a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="work" className="py-20 sm:py-40 px-4 sm:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none theme-bg-gradient"></div>
          <div className="max-w-screen-xl mx-auto relative">
            <FadeIn>
              <div className="flex flex-col gap-3 mb-12 sm:mb-24">
                <span className="theme-text-40 uppercase tracking-[0.2em] text-sm sm:text-base font-['Instrument_Sans']">Portfolio</span>
                <div className="flex items-baseline gap-4">
                  <h2 className="font-['DM_Sans'] text-3xl sm:text-6xl font-semibold tracking-tight theme-primary">Selected Work</h2>
                  <div className="h-px flex-grow theme-border"></div>
                </div>
              </div>
            </FadeIn>
            
            <div className="grid gap-24 sm:gap-40">
              {[
                {
                  title: 'ventry.host v2',
                  year: '2025',
                  description: 'Free file hosting revamped with a modern design and improved user experience.',
                  tags: ['Next.js', 'Tailwind CSS', 'TypeScript']
                },
                {
                  title: 'ventry.host',
                  year: '2023',
                  description: 'A free file hosting solution with thousands of daily visitors.',
                  tags: ['PHP', 'JavaScript', 'MySQL']
                },
                {
                  title: 'ShareUpload',
                  year: '2022',
                  description: 'High-performance file sharing platform with unlimited storage.',
                  tags: ['PHP', 'MySQL', 'Performance']
                },
                {
                  title: 'RestoreM',
                  year: '2023',
                  description: 'Discord server backup and restoration service.',
                  tags: ['PHP', 'MySQL', 'Discord API']
                }
              ].map((project, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="group relative">
                    <div className="absolute top-0 left-0 right-0 flex items-center gap-4">
                      <div className="font-['Instrument_Sans'] text-sm sm:text-base theme-text-40 uppercase tracking-[0.2em] py-2 pr-4">
                        {project.year}
                      </div>
                      <div className="h-px flex-grow theme-border"></div>
                    </div>

                    <div className="pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-6 sm:gap-16">
                      <div className="space-y-4 sm:space-y-8">
                        <h3 className="font-['DM_Sans'] text-3xl sm:text-6xl font-semibold tracking-tight theme-primary group-hover:theme-text-90 transition-colors">
                          {project.title}
                        </h3>
                        <p className="font-['Instrument_Sans'] text-base sm:text-xl theme-text-70 leading-relaxed group-hover:theme-text-70 transition-colors max-w-xl">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-6 sm:space-y-12">
                        <div className="space-y-4 sm:space-y-6">
                          <h4 className="font-['Instrument_Sans'] text-sm sm:text-base theme-text-40 uppercase tracking-[0.2em]">Technologies</h4>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            {project.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex} 
                                className="text-sm sm:text-base theme-text-70 font-['Instrument_Sans'] tracking-wide py-1 sm:py-2 group-hover:theme-text-90 transition-colors"
                              >
                                {tag}{tagIndex !== project.tags.length - 1 && (
                                  <span className="mx-3 sm:mx-4 theme-text-40 select-none">•</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -inset-x-4 sm:-inset-x-8 -inset-y-4 sm:-inset-y-6 rounded-2xl sm:rounded-3xl border border-white/0 group-hover:theme-border transition-colors"></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <footer role="contentinfo" className="mt-20 sm:mt-32 theme-bg-gradient border-t theme-border">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-20 sm:py-32">
            <div className="grid gap-16 sm:gap-24">
              <FadeIn>
                <div className="text-center space-y-4 sm:space-y-5">
                  <h2 className="font-['DM_Sans'] text-4xl sm:text-7xl font-semibold tracking-tight theme-primary">Let&apos;s Connect</h2>
                  <p className="font-['Instrument_Sans'] theme-text-70 text-lg sm:text-2xl max-w-2xl mx-auto">
                    Always interested in new opportunities and collaborations.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="flex flex-col items-center gap-8 sm:gap-12">
                  <a 
                    href="mailto:jleibl@proton.me" 
                    className="group flex items-center gap-2 sm:gap-3 text-xl sm:text-4xl theme-text-90 hover:theme-primary transition-colors"
                  >
                    jleibl@proton.me
                    <svg className="w-5 h-5 sm:w-8 sm:h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="pt-6 sm:pt-12 text-center">
                  <p className="theme-text-40 text-xs sm:text-sm tracking-[0.1em]">
                    © {new Date().getFullYear()} Jan-Marlon Leibl. All rights reserved.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
