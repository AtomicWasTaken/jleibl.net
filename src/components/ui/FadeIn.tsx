import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const FadeIn = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up',
  distance = 20
}: FadeInProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px"
  });

  const directionOffset = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  };

  const { x, y } = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ 
        type: "spring",
        damping: 20,
        stiffness: 100, 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 