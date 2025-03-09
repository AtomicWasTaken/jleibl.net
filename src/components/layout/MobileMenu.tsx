import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GermanyFlag } from '../ui/GermanyFlag';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
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
              className="fixed inset-0 bg-black z-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            <motion.div 
              className="fixed top-0 bottom-0 right-0 w-full sm:w-80 z-100 h-[100dvh]"
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 1 }}
            >
              <div className="nav-glass w-full h-full flex flex-col shadow-2xl" 
                   style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
                <motion.button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 theme-accent rounded-lg theme-border z-110"
                  aria-label="Close menu"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
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
                      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
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
                          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 + index * 0.1 }}
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
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
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
                      <GermanyFlag />
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