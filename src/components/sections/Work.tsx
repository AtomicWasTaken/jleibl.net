import { FadeIn } from '../ui/FadeIn';

interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
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
];

export const Work = () => {
  return (
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
          {projects.map((project, index) => (
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
  );
}; 