import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';
import { SiPhp, SiJavascript, SiMysql, SiReact } from 'react-icons/si';
import { MdWeb, MdArchitecture, MdDesignServices, MdSpeed } from 'react-icons/md';

interface Tech {
  name: string;
  icon: React.ReactNode;
}

interface Interest {
  name: string;
  icon: React.ReactNode;
}

const technologies: Tech[] = [
  { name: 'PHP', icon: <SiPhp /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'React', icon: <SiReact /> }
];

const interests: Interest[] = [
  { name: 'Web Development', icon: <MdWeb /> },
  { name: 'System Architecture', icon: <MdArchitecture /> },
  { name: 'UI/UX Design', icon: <MdDesignServices /> },
  { name: 'Performance Optimization', icon: <MdSpeed /> }
];

export const About = () => {
  return (
    <section id="about" className="py-20 sm:py-40 px-4 sm:px-8 theme-bg-gradient">
      <div className="max-w-(--breakpoint-xl) mx-auto">
        <FadeIn>
          <div className="flex items-baseline gap-4 mb-12 sm:mb-24">
            <h2 className="font-['DM_Sans'] text-3xl sm:text-6xl font-semibold tracking-tight theme-primary">
              About
            </h2>
            <div className="h-px grow bg-white/10 relative top-[-4px]"></div>
          </div>
        </FadeIn>
        
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 sm:gap-24">
          <div className="space-y-6 sm:space-y-8">
            <FadeIn>
              <div className="aspect-square bg-linear-to-tr theme-bg-05 rounded-2xl overflow-hidden border theme-border hover:border-white/10 transition-colors mx-auto md:mx-0 max-w-[280px] md:max-w-none">
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
                <h3 className="font-['DM_Sans'] text-xl sm:text-2xl font-medium theme-primary">
                  Jan-Marlon Leibl
                </h3>
                <p className="font-['Instrument_Sans'] theme-text-70 text-base sm:text-lg">
                  Fullstack Developer
                </p>
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
                    <h3 className="text-sm sm:text-base theme-text-40 uppercase tracking-[0.2em]">
                      Technologies
                    </h3>
                    <div className="h-px grow theme-border"></div>
                  </div>
                  <ul className="space-y-4 sm:space-y-5">
                    {technologies.map((tech) => (
                      <li 
                        key={tech.name} 
                        className="text-base sm:text-lg group flex items-center gap-3 theme-text-70 hover:theme-text-90 transition-colors cursor-default bg-white/[0.02] px-3 py-2 rounded-md"
                      >
                        <span className="text-lg theme-text-40 group-hover:theme-text-90 transition-colors">{tech.icon}</span>
                        {tech.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-sm sm:text-base theme-text-40 uppercase tracking-[0.2em]">
                      Interests
                    </h3>
                    <div className="h-px grow theme-border"></div>
                  </div>
                  <ul className="space-y-4 sm:space-y-5">
                    {interests.map((interest) => (
                      <li 
                        key={interest.name} 
                        className="text-base sm:text-lg group flex items-center gap-3 theme-text-70 hover:theme-text-90 transition-colors cursor-default bg-white/[0.02] px-3 py-2 rounded-md"
                      >
                        <span className="text-lg theme-text-40 group-hover:theme-text-90 transition-colors">{interest.icon}</span>
                        {interest.name}
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
  );
}; 