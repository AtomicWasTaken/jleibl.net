import { useEffect, useRef, useMemo, createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lenis from '@studio-freight/lenis';
import Head from 'next/head';
import Image from "next/image";

import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';

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
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const shine = `
  @keyframes shine {
    0% {
      background-position: 200% 0;
    }
    45% {
      background-position: 0% 0;
    }
    55% {
      background-position: -50% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const GermanyText = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <motion.div 
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
      whileHover={{ opacity: 0.8 }}
    >
      <motion.div 
        style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.9)" }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setTheme('black')}
        className={theme === 'black' ? 'ring-1 ring-white/20' : ''}
      />
      <motion.div 
        style={{ flex: 1, backgroundColor: "rgba(255, 0, 0, 0.9)" }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setTheme('red')}
        className={theme === 'red' ? 'ring-1 ring-white/20' : ''}
      />
      <motion.div 
        style={{ flex: 1, backgroundColor: "rgba(255, 204, 0, 0.9)" }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setTheme('gold')}
        className={theme === 'gold' ? 'ring-1 ring-white/20' : ''}
      />
    </motion.div>
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

        .theme-transition {
          transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
      <div className="min-h-screen theme-transition">
        <Head>
          <title>Jan-Marlon Leibl • Software Developer</title>
          <meta name="description" content="Welcome to the website of Jan-Marlon Leibl! As an aspiring software developer, I dive deep into the world of PHP and love to turn creative ideas into reality." />
          <meta name="keywords" content="Software development, PHP, frontend development, projects, technology, Jan-Marlon Leibl" />
        </Head>

        <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/20 border-b theme-border theme-transition">
          <nav className="max-w-screen-xl mx-auto px-4 sm:px-8 py-4 sm:py-4 flex justify-between items-center font-['DM_Sans']">
            <a href="/" className="text-xl sm:text-xl font-medium tracking-tight theme-primary theme-transition">
              JL
            </a>
            <div className="flex items-center gap-6 sm:gap-12 text-base sm:text-base tracking-wide">
              <a href="#work" className="theme-secondary hover:theme-primary theme-transition">
                Work
              </a>
              <a href="#about" className="theme-secondary hover:theme-primary theme-transition">
                About
              </a>
              <a href="mailto:jleibl@proton.me" className="px-6 py-2.5 theme-accent theme-border hover:bg-white/[0.06] theme-transition">
                Contact
              </a>
            </div>
          </nav>
        </header>

        <section className="min-h-[100dvh] flex items-center px-4 sm:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-white/[0.01] to-transparent"></div>
          <div className="max-w-screen-xl w-full relative pt-24">
            <FadeIn className="space-y-12 sm:space-y-16">
              <div className="space-y-8 sm:space-y-8">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full theme-accent theme-border hover:theme-border theme-transition">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="theme-secondary uppercase tracking-[0.2em] text-sm font-['Instrument_Sans']">Available for Work</span>
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-['DM_Sans'] text-2xl sm:text-3xl theme-secondary tracking-wide font-medium theme-transition">Jan-Marlon Leibl</h2>
                    <div>
                      <h1 className="font-['DM_Sans'] text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] max-w-4xl theme-primary theme-transition">
                        Software Developer
                        <br />
                        <span className="theme-secondary">based in <GermanyText /></span>
                      </h1>
                    </div>
                  </div>
                </div>
                <p className="font-['Instrument_Sans'] theme-secondary text-xl sm:text-2xl max-w-2xl leading-relaxed tracking-wide theme-transition">
                  Passionate about creating digital experiences, with a focus on PHP and modern web technologies.
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-4">
                  <a 
                    href="#work"
                    className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-colors text-base tracking-wide font-medium group"
                  >
                    View My Work
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
          </a>
          <a
                    href="mailto:jleibl@proton.me"
                    className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-white/10 rounded-full hover:bg-white/[0.05] transition-colors text-base tracking-wide group"
                  >
                    Get in Touch
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
          </a>
        </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 font-['Instrument_Sans'] text-base tracking-wide border-t border-white/10 pt-8 sm:pt-8">
                <div className="space-y-2.5 sm:space-y-2.5 group">
                  <span className="text-white/40 block uppercase tracking-[0.2em] text-sm">Email</span>
                  <a 
                    href="mailto:jleibl@proton.me" 
                    className="hover:text-white/90 transition-colors flex items-center gap-2.5 group-hover:gap-3 duration-300"
                  >
                    jleibl@proton.me
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
                <div className="space-y-2.5 sm:space-y-2.5">
                  <span className="text-white/40 block uppercase tracking-[0.2em] text-sm">Role</span>
                  <span className="text-white/90">Fullstack Developer</span>
                </div>
                <div className="space-y-2.5 sm:space-y-2.5">
                  <span className="text-white/40 block uppercase tracking-[0.2em] text-sm">Experience</span>
                  <span className="text-white/90">5+ Years</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="about" className="py-32 sm:py-40 px-4 sm:px-8 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="max-w-screen-xl mx-auto">
            <FadeIn>
              <div className="flex items-baseline gap-4 mb-16 sm:mb-24">
                <h2 className="font-['DM_Sans'] text-5xl sm:text-6xl font-semibold tracking-tight">About</h2>
                <div className="h-px flex-grow bg-white/10 relative top-[-4px]"></div>
              </div>
            </FadeIn>
            
            <div className="grid md:grid-cols-[1fr,2fr] gap-16 sm:gap-24">
              <div className="space-y-8 sm:space-y-8">
                <FadeIn>
                  <div className="aspect-square bg-gradient-to-tr from-white/[0.05] to-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.05] hover:border-white/10 transition-colors">
                  <Image
                      src="/profile-image.jpg"
                      alt="Jan-Marlon Leibl"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div className="space-y-2.5">
                    <h3 className="font-['DM_Sans'] text-2xl font-medium">Jan-Marlon Leibl</h3>
                    <p className="font-['Instrument_Sans'] text-white/70 text-lg">Fullstack Developer</p>
                  </div>
                </FadeIn>
              </div>
              
              <FadeIn delay={0.2}>
                <div className="space-y-12 sm:space-y-16 font-['Instrument_Sans']">
                  <div className="space-y-8 sm:space-y-8">
                    <p className="text-2xl sm:text-2xl text-white/90 leading-relaxed">
                      Hello! I'm Jan-Marlon, but please call me Jan. I started my journey in programming at the age of 11 with C#, fascinated by a desktop application my friend created.
                    </p>
                    <p className="text-xl sm:text-xl text-white/70 leading-relaxed">
                      Today, I specialize in PHP and TypeScript development, constantly pushing the boundaries of what's possible on the web. My journey has led me from creating simple applications to developing complex systems used by thousands.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-12 sm:gap-16">
                    <div className="space-y-8 sm:space-y-8">
                      <div className="flex items-baseline gap-4">
                        <h3 className="text-base text-white/40 uppercase tracking-[0.2em]">Technologies</h3>
                        <div className="h-px flex-grow bg-white/10"></div>
                      </div>
                      <ul className="space-y-5">
                        {['PHP', 'JavaScript', 'MySQL', 'React'].map((tech) => (
                          <li 
                            key={tech} 
                            className="text-lg sm:text-lg group flex items-center gap-3 hover:text-white/90 transition-colors cursor-default"
                          >
                            <span className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/90 transition-colors"></span>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-8 sm:space-y-8">
                      <div className="flex items-baseline gap-4">
                        <h3 className="text-base text-white/40 uppercase tracking-[0.2em]">Interests</h3>
                        <div className="h-px flex-grow bg-white/10"></div>
                      </div>
                      <ul className="space-y-5">
                        {[
                          'Web Development',
                          'System Architecture',
                          'UI/UX Design',
                          'Performance Optimization'
                        ].map((interest) => (
                          <li 
                            key={interest} 
                            className="text-lg sm:text-lg group flex items-center gap-3 hover:text-white/90 transition-colors cursor-default"
                          >
                            <span className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/90 transition-colors"></span>
                            {interest}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 sm:pt-8 flex gap-4 sm:gap-6">
                    <a 
                      href="https://github.com/AtomicWasTaken" 
          target="_blank"
          rel="noopener noreferrer"
                      className="flex-1 text-center px-8 py-4 border border-white/10 rounded-full hover:bg-white/[0.05] transition-colors text-base tracking-wide font-medium"
                    >
                      View GitHub
        </a>
        <a
                      href="https://www.linkedin.com/in/janmarlonleibl/" 
          target="_blank"
          rel="noopener noreferrer"
                      className="flex-1 text-center px-8 py-4 border border-white/10 rounded-full hover:bg-white/[0.05] transition-colors text-base tracking-wide font-medium"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="work" className="py-32 sm:py-40 px-4 sm:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>
          <div className="max-w-screen-xl mx-auto relative">
            <FadeIn>
              <div className="flex flex-col gap-3 mb-16 sm:mb-24">
                <span className="text-white/40 uppercase tracking-[0.2em] text-base font-['Instrument_Sans']">Portfolio</span>
                <div className="flex items-baseline gap-4">
                  <h2 className="font-['DM_Sans'] text-5xl sm:text-6xl font-semibold tracking-tight">Selected Work</h2>
                  <div className="h-px flex-grow bg-white/10"></div>
                </div>
              </div>
            </FadeIn>
            
            <div className="grid gap-32 sm:gap-40">
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
                      <div className="font-['Instrument_Sans'] text-base text-white/40 uppercase tracking-[0.2em] py-2 pr-4">
                        {project.year}
                      </div>
                      <div className="h-px flex-grow bg-white/10"></div>
                    </div>

                    <div className="pt-16 sm:pt-16 grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 sm:gap-16">
                      <div className="space-y-6 sm:space-y-8">
                        <h3 className="font-['DM_Sans'] text-5xl sm:text-6xl font-semibold tracking-tight text-white group-hover:text-white/90 transition-colors">
                          {project.title}
                        </h3>
                        <p className="font-['Instrument_Sans'] text-xl sm:text-xl text-white/70 leading-relaxed group-hover:text-white/80 transition-colors max-w-xl">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-8 sm:space-y-12">
                        <div className="space-y-5 sm:space-y-6">
                          <h4 className="font-['Instrument_Sans'] text-base text-white/40 uppercase tracking-[0.2em]">Technologies</h4>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-4">
                            {project.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex} 
                                className="text-base text-white/70 font-['Instrument_Sans'] tracking-wide py-2 group-hover:text-white/80 transition-colors"
                              >
                                {tag}{tagIndex !== project.tags.length - 1 && (
                                  <span className="mx-4 sm:mx-4 text-white/20 select-none">•</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -inset-x-6 sm:-inset-x-8 -inset-y-6 rounded-3xl border border-white/0 group-hover:border-white/5 transition-colors"></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-32 sm:mt-32 bg-gradient-to-b from-white/[0.02] via-white/[0.03] to-white/[0.02] border-t border-white/[0.05]">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-32 sm:py-32">
            <div className="grid gap-20 sm:gap-24">
              <FadeIn>
                <div className="text-center space-y-5">
                  <h2 className="font-['DM_Sans'] text-6xl sm:text-7xl font-semibold tracking-tight">Let's Connect</h2>
                  <p className="font-['Instrument_Sans'] text-white/70 text-xl sm:text-2xl max-w-2xl mx-auto">
                    Always interested in new opportunities and collaborations.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="flex flex-col items-center gap-10 sm:gap-12">
                  <a 
                    href="mailto:jleibl@proton.me" 
                    className="group flex items-center gap-3 text-3xl sm:text-4xl text-white/90 hover:text-white transition-colors"
                  >
                    jleibl@proton.me
                    <svg className="hidden sm:block w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>

                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="pt-8 sm:pt-12 text-center">
                  <p className="text-white/40 text-sm tracking-[0.1em]">
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
