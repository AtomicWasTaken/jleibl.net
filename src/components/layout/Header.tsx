import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MobileMenu = dynamic(() => import('./MobileMenu').then(mod => ({ default: mod.MobileMenu })), {
  ssr: false,
  loading: () => (
    <div className="p-2 theme-accent rounded-lg theme-border">
      <svg className="w-5 h-5 theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </div>
  )
});

export const Header = () => {
  return (
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
  );
}; 