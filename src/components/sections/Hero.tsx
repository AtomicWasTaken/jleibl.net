import { motion } from 'framer-motion';
import { FadeIn } from '../ui/FadeIn';
import { GermanyFlag } from '../ui/GermanyFlag';

export const Hero = () => {
  return (
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
                    <span className="theme-secondary">based in <GermanyFlag /></span>
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
  );
}; 