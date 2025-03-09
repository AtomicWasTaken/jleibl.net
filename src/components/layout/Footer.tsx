import { FadeIn } from '../ui/FadeIn';

export const Footer = () => {
  return (
    <footer role="contentinfo" className="mt-20 sm:mt-32 theme-bg-gradient border-t theme-border">
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 sm:px-8 py-20 sm:py-32">
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
  );
}; 